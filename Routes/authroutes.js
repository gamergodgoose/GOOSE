const router=
require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const { decrypt } = require("dotenv");
const jwt=
require("jsonwebtoken");
router.post("/signup", async (req,res)=>{
    try{
        const{username,email,password} = req.body;
        const existingemail= awaituser.findone({email});
        if(existingemail){
            return res.status(400).json({message:"email already exists"})
        } 
         const existingname = awaituser.findone({name});
        if(existingname){
            return res.status(400).json({message:"name already exists"})
        } 
        const hashed= await bcrypt .hash(password,10); 
        const user = await user.create({
            username,email,password: hashed
        });
        res.json({message:"Signup succesful!", user})
    } catch(error){
    console.log(err);
    res.status(500).json({message:"Server error"})
    };
    
    
});
router.post("/login", async (req,res)=>{
 try{ 
    const{email,password} = req.body;
    const user= await User.findone({email});
    if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const valid = await bcrypt.compare(password,user.password);
         if(!valid){
            return res.status(400).json({message:"Wrong password"})
        }
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"},
        );
        res.json ({
            msg:"Login successful",
            token,
            user
        });
}       catch (err) {
    console.log(err);
    res.status(500).json ({msg:"Server error"});
}
});
module.exports=router;
       

    
