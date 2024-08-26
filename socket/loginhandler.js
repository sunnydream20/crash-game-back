/** @format */

const auth = require("../middleware/auth");

module.exports = (io, socket) => {
  socket.on("wsLogin", async (wsloginReq) => {
    // socket users.

    socket.wsUsers = [];
    const token = wsloginReq.data.token;
    const result = await auth.verifyUser(token);
    console.log("socket___", result);
    const user = {
      wsId: socket.id,
      userId: result._id,
      userEmail: result.email,
    };
    socket.wsUsers.push(user);
    socket.emit("loginSuccess", result.email);
  });

  let isActive = false; // Flag to track if the game is active
  let intervalId;

  socket.on("enterGame", async () => {
    // emit confirm message which of user entereted sucessfully!
    socket.emit("enterSucess");

    // Emit loading message and show loading for 3 seconds
    socket.emit("loading", { message: "Loading..." });

    // start the process
    isActive = true;

    setTimeout(() => {
      startEmittingNumbers();
    }, 5000);
  });

  socket.on("leaveGame", () => {
    clearInterval(intervalId);
    isActive = false;
    socket.emit("leaveSucess");
  });

  const startEmittingNumbers = () => {
    countUpToNumber(getRandomNumber());
  };
  // socket.on("leaveGame", async () => {
  //   socket.emit("leaveSucess");
  // });

  const getRandomNumber = () => {
    const randomValue = Math.random();

    let number;
    if (randomValue < 0.9) {
      // 90% chance for the range [1, 2]
      number = 1 + Math.random(); // Generates a float between 1 and 2
    } else if (randomValue < 0.99) {
      // 9% chance for the range [2, 10]
      number = 2 + Math.random() * (10 - 2); // Generates a float between 2 and 10
    } else if (randomValue < 0.999) {
      // 0.9% chance for the range [11, 50]
      number = 11 + Math.random() * (50 - 11); // Generates a float between 11 and 50
    } else {
      // 0.1% chance for the range [51, 100]
      number = 51 + Math.random() * (100 - 51); // Generates a float between 51 and 100
    }

    return parseFloat(number.toFixed(2)); // To return it with two decimal places
  };

  const countUpToNumber = (targetNumber) => {
    let currentNumber = 1.0; // Start counting from 1.00

    intervalId = setInterval(() => {
      console.log(currentNumber.toFixed(2));
      // Check if we reached or exceeded the target
      currentNumber = parseFloat((currentNumber + 0.01).toFixed(2)); // Increment by 0.01

      socket.emit("crashingnumber", currentNumber);
      if (currentNumber >= targetNumber) {
        socket.emit("loading", { message: "Loading..." });

        clearInterval(intervalId); // Stop the timer
        // wait for 3 seconds

        setTimeout(() => {
          startEmittingNumbers();
        }, 5000);
        console.log(`Reached the target number: ${targetNumber.toFixed(2)}`);
      }
    }, 200); // 100 ms interval for each increment
  };
};
