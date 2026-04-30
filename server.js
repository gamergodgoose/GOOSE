const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./db");
const { Server } = require("socket.io");
const setupSocket= require("./Socket/gameSocket");
dotenv.config();
const app= express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{origin:"*"}
});
connectDb();
app.use(cors());
app.use(express.json());
app.use("/API/quiz",require("./Routes/quizRoutes"));
app.use("/API/room",require("./Routes/roomRoutes"));


setupSocket(io);
server.listen(process.env.PORT, () => {
  console.log("Server Running");
});
 
