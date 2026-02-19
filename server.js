const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const { Server } = require("socket.io");
dotenv.config();
const app= express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{origin:"*"}
});
connectDB();
app.use(cors());
app.use(express.json());
app.use("/API/auth",require("./Routes/authroutes"));
app.use("/API/lobby",require("./Routes/lobbyRoutes"));
app.use("/API/user",require("./Routes/user"));

require("./Socket/gameSocket")(io);
server.listen(process.env.PORT, () => {
  console.log("Server Running");
});

 