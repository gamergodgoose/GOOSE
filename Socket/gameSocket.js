const Room=require("../Models/room");
const Quiz=require('../Models/Quiz');
const { Socket } = require("socket.io");
module.exports=(io)=>{
    io.on("connection",(socket)=>{
        socket.on("joinRoom",({roomCode,playerName})=>{
            socket.join(roomCode);
            io.to(roomCode).emit("Player joined",playerName);
        });
        socket.on("startQuiz",async({roomCode})=>{
            const room=await Room.findOne({roomCode});
            const quiz=await Quiz.findById(room.Quizid);
          let current=0;
          const sendQuestion=async()=>{
          if(current>=quiz.question.length){
            io.to(roomCode).emit("Quiz ended");
            return;
          }
          room.currentquestion=current;
          await room.save();

          io.to(roomCode).emit("newQuestion",quiz.questions[current]);

          let time = 15;

          const timer = setInterval(()=>{
            io.to(roomCode).emit("timer", time);
            time--;

            if (time < 0) {
                clearInterval(timer);
                current++;
                sendQuestion();
            }
          },1000);
          } 
          sendQuestion();
        });
        socket.on("submitAnswer",async ({ roomCode, playerName, answer}) =>{
            const room = await Room.findOne({ roomCode});
            const quiz = await Quiz.findById(room.Quizid);

            const currentQuestionIndex = room.currentquestion;
            const currentQuestion = quiz.question[currentQuestionIndex];

            const player = room.Players.find(p => p.name ===playerName);

            if (player && currentQuestion.correctanswer === answer) {
                player.score += currentQuestion.points;
            }

            await room.save();

            io.to(roomCode).emit("leaderboard", room.Players);
        });
    });
}
