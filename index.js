/** @format */

// /** @format */
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const { Server } = require("socket.io");

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust according to your client frontend URL
    methods: ["GET", "POST"],
  },
});

const loginhandler = require("./socket/loginhandler");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// cors config

app.use(cors());

// Connect Database
connectDB();

//socket connection

// require routers
app.use("/api", require("./routers"));

const PORT = process.env.PORT || 5000;

// crah
let crashInterval;
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);

  //Handle wslogin even
  loginhandler(io, socket);
  // socket.on("wsLogin", wslogin.wslogin);
});

io.listen(8000);
