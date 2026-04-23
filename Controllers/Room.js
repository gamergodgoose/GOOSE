const Room = require('../Models/room');
const Quiz = require('../Models/Quiz');

function generatecode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.createRoom = async (req, res) => {
    try {
        // Step 1 - create quiz
        const quiz = await Quiz.create({
            title: req.body.title,
            hostname: req.body.hostname,
            question: req.body.questions
        });

        // Step 2 - create room with that quiz id
        const room = await Room.create({
            randomcode: generatecode(),
            Quizid: quiz._id,
            hostname: req.body.hostname
        });

        res.json({
            randomcode: room.randomcode,
            roomId: room._id,
            quizId: quiz._id
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.joinRoom = async (req, res) => {
    try {
        const room = await Room.findOne({
            randomcode: req.body.roomCode
        });
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }
        room.Players.push({ name: req.body.playerName });
        await room.save();
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
