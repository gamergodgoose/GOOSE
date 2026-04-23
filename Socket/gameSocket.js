const Room = require("../Models/room");
const Quiz = require('../Models/Quiz');

module.exports = (io) => {
    io.on("connection", (socket) => {

        socket.on("joinRoom", ({ roomCode, playerName }) => {
            socket.join(roomCode);
            io.to(roomCode).emit("playerJoined", playerName);
        });

        socket.on("startQuiz", async ({ roomCode }) => {
            const room = await Room.findOne({ randomcode: roomCode });
            const quiz = await Quiz.findById(room.Quizid);
            let current = 0;

            const sendQuestion = async () => {
                if (current >= quiz.question.length) {
                    io.to(roomCode).emit("quizEnded");
                    return;
                }

                room.currentquestion = current;
                await room.save();

                io.to(roomCode).emit("newQuestion", quiz.question[current]);

                let time = quiz.question[current].timer || 15;

                const timer = setInterval(() => {
                    io.to(roomCode).emit("timer", time);
                    time--;

                    if (time < 0) {
                        clearInterval(timer);
                        current++;
                        sendQuestion();
                    }
                }, 1000);
            };

            sendQuestion();
        });

        socket.on("submitAnswer", async ({ roomCode, playerName, answer }) => {
            const room = await Room.findOne({ randomcode: roomCode });
            const quiz = await Quiz.findById(room.Quizid);

            const currentQuestion = quiz.question[room.currentquestion];
            const player = room.Players.find(p => p.name === playerName);

            if (player && currentQuestion.correctanswer === answer) {
                player.score += currentQuestion.points;
            }

            await room.save();
            io.to(roomCode).emit("leaderboard", room.Players);
        });

    });
};
