const mongoose= require("mongoose");
const roomschema=new mongoose.Schema({
    randomcode: String,
    Quizid:String,
    hostname:String,
    Players:[
        {name:String,
            score:{
                type:Number,
                default:0
            }
        }
    ],
    currentquestion:{
        type:Number,default:0
    },
    status:{
        type:String,
        default:"Waiting..."
    }
});
module.exports= mongoose.model("room",roomschema);