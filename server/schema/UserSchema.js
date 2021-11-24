const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
    },
    mobile:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
})

const User = mongoose.model("User", UserSchema);

module.exports = User;