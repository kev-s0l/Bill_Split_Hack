require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    balance: Number
});
const User = mongoose.model("User", UserSchema);

// Meal Schemahhh
const MealSchema = new mongoose.Schema({
    participants: [String],
    totalBill: Number
});
const Meal = mongoose.model("Meal", MealSchema);

// Nodemailer for email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Routes
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post("/users", async (req, res) => {
    const { name, email, balance } = req.body;
    try {
        const newUser = new User({ name, email, balance });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "invalid data" });
    }
});

app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, balance } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, balance }, { new: true });
        if (!user) return res.status(404).json({ error: "User not found" });
        
        // Send Email Notification
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Balance Updated",
            text: `Your new balance is $${balance}`
        });
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

app.post("/payments", async (req, res) => {
    const { userId, amount } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        
        user.balance -= amount;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Payment failed" });
    }
});

app.post("/meals", async (req, res) => {
    const { participants, totalBill } = req.body;
    try {
        const meal = new Meal({ participants, totalBill });
        await meal.save();
        
        // Split bill equally among participants
        const splitAmount = totalBill / participants.length;
        await User.updateMany(
            { email: { $in: participants } },
            { $inc: { balance: -splitAmount } }
        );

        res.status(201).json(meal);
    } catch (error) {
        res.status(500).json({ error: "Meal creation failed" });
    }
});

app.put("/meals/:id", async (req, res) => {
    const { id } = req.params;
    const { totalBill } = req.body;
    try {
        const meal = await Meal.findById(id);
        if (!meal) return res.status(404).json({ error: "Meal not found" });

        const oldTotal = meal.totalBill;
        meal.totalBill = totalBill;
        await meal.save();

        // Adjust balances accordingly
        const adjustment = (totalBill - oldTotal) / meal.participants.length;
        await User.updateMany(
            { email: { $in: meal.participants } },
            { $inc: { balance: -adjustment } }
        );
        
        res.json(meal);
    } catch (error) {
        res.status(500).json({ error: " update failed" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
