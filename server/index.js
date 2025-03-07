const express = require("express")
const mongoose = require("mongoose")
const cors = require ("cors")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://adrixngeles:KAK37@cluster0.4jw8w.mongodb.net/Accounts");