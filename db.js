const mongoose= require("mongoose");
const connectDb= async()=>{
    try {  
        await
        mongoose.conect(proccess.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch(err) {
        console.log(rr);
    }
        
 
};
module.exports=connectDb;