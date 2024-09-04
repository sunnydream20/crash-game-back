/** @format */

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

//store connecred users
let usersBets = [];

// require routers
app.use("/api", require("./routers"));

const PORT = process.env.PORT || 5000;

// crah
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
let randomNum;
let resultAmounts = {}; // Object to hold results for each user
io.on("connection", async (socket) => {
  usersBets.push({ socketId: socket.id, crashAmount: 0, crashNumber: 1 });
  //Handle wslogin even
  loginhandler(io, socket);
  // socket.on("wsLogin", wslogin.wslogin);
  socket.on("bet", (data) => {
    const { crashAmount, crashNumber } = data;
    const userBet = usersBets.find((user) => user.socketId === socket.id);
    // if (crashNumber <= randomNum) {
    //   resultAmount = crashAmount * crashNumber;
    // } else {
    //   resultAmount = -crashAmount;
    // }
    if (userBet) {
      userBet.crashAmount = crashAmount;
      userBet.crashNumber = crashNumber;
    }
  });
});

const startEmittingNumbers = () => {
  randomNum = getRandomNumber();
  countUpToNumber(randomNum, io);
};

const countUpToNumber = (targetNumber, io) => {
  currentNumber = 1.0; // Start counting from 1.00

  intervalId = setInterval(() => {
    // Check if we reached or exceeded the target
    currentNumber = parseFloat((currentNumber + 0.01).toFixed(2)); // Increment by 0.01

    io.emit("crashingnumber", currentNumber);
    if (currentNumber >= targetNumber) {
      io.emit("loading", { message: "Loading..." });

      usersBets.forEach((user) => {
        if (user.crashNumber <= randomNum) {
          resultAmounts[user.socketId] = user.crashAmount * user.crashNumber;
        } else {
          resultAmounts[user.socketId] = -user.crashAmount;
        }
      });
      for (const user of usersBets) {
        io.to(user.socketId).emit("result", {
          resultAmount: resultAmounts[user.socketId] || 0,
        });
      }
      // io.emit("result", resultAmount);
      resultAmounts = {};
      clearInterval(intervalId); // Stop the timer
      // wait for 3 seconds

      setTimeout(() => {
        startEmittingNumbers();
      }, 10000);
    }
  }, 200); // 100 ms interval for each increment
};

const getRandomNumber = () => {
  const randomValue = Math.random();

  let number;
  if (randomValue < 0.9) {
    // 90% chance for the range [1, 2]
    number = 1 + Math.random(); // Generates a float between 1 and 2
  } else if (randomValue < 0.99) {
    // 9% chance for the range [2.1, 3.9]
    number = 2.1 + Math.random() * (3.9 - 2.1); // Generates a float between 2 and 10
  } else if (randomValue < 0.999) {
    // 0.9% chance for the range [4, 5.9]
    number = 4 + Math.random() * (5.9 - 4); // Generates a float between 11 and 50
  } else {
    // 0.1% chance for the range [6, 10]
    number = 6 + Math.random() * (10 - 6); // Generates a float between 51 and 100
  }

  return parseFloat(number.toFixed(2)); // To return it with two decimal places
};

startEmittingNumbers();

io.listen(8000);
