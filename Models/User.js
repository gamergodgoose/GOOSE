const mongoose=require("mongoose")
const userschema=new mongoose.Schema ({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        default:"https://img.freepik.com/premium-vector/man-with-headphones-red-circle-with-face-that-says-he-is-wearing-headphones_969863-223064.jpg"
    }
});
module.exports=mongoose.model("user",userschema);
