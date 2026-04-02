const express =require("express");
const router=express.Router();
const {createquiz,updateQuiz}=require('../Controllers/QuizController');
router.post("/create",createquiz);
router.put("/update/:id",updateQuiz);
module.exports=router;