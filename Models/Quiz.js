const mongoose = require('mongoose');
const questionschema = new mongoose.Schema({
    question: String,
    options: [String],
    correctanswer: String,
    timer:{
        type:Number, 
        default:15
    },
    points:{
        type:Number,
        default:50
    }
});
const quizschema=new mongoose.Schema({
    title:String,
    hostname:String,
    question:[questionschema]
});
module.exports=mongoose.model("quiz",quizschema);