const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();


//Routers
const AuthRouter = require('./routes/AuthRouter')
const MomentRouter = require('./routes/MomentRouter')


mongoose.connect(
    'mongodb+srv://shubham:admin@testcluster.4cqpg.mongodb.net/moments?retryWrites=true&w=majority', 
    ()=> console.log('Connected to MongoDB')
)

app.use(express.json())
app.use(cors())

app.use('/auth', AuthRouter);
app.use('/moments', MomentRouter);

app.listen(PORT, ()=> console.log(`Server started on Port - ${PORT}`));