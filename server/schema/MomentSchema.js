const mongoose = require("mongoose");

const MomentSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId, 
        required: true
    },
    title:{
        type:String,
        required: true
    },
    tags:{
        type:Array,
        default:[]
    },
    imageUrl:{
        type:String,
    },
})

const Moment = mongoose.model("Moment", MomentSchema);

module.exports = Moment;