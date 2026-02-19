const mongoose=require("mongoose")
const questionschema=new mongoose.Schema ({
    question:String,
    options:[String],
    answer:String,
}); 
const lobbyschema=new mongoose.schema({
    name:String,
    host:String,
    isPrivate:Boolean,
    players:[String],
    code:String,
    questions:[questionschema],
})
module.exports=mongoose.model("user",lobbyschema);
 
