const Room= require('../Models/room');
function generatecode(){
    return Math.floor(100000+Math.random()*900000).toString();
}
exports.createRoom=async(req,res)=>{
    try{
        const room=await Room.create({
            roomCode:generatecode(),
            quizId: req.body.quizId,
            hostname:req.body.hostname
        });
        res.json(room);
    }

    catch (error){
        res.status(500).json({error:error.message});
    }
};
exports.joinRoom=async(req,res)=>{
    try{
        const room=await Room.findOne({
            roomCode:req.body.roomCode
        });
        room.Players.push({name:req.body.playerName});
        await room.save();
        res.json(room);
}
catch(error){
    res.status(500).json({error:error.message});
}
}





