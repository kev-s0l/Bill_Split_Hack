const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    description: {type: String, required: true },
    totalAmount: {type: Number, required: true },
    people: [
        { 
            name: String, 
            phone: String,
            amountOwned: Number, 
            status: { type: String, default: "pending" }
    }
],
createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Bill", BillSchema);