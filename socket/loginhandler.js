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

  socket.on("enterGame", async () => {
    // emit confirm message which of user entereted sucessfully!
    socket.emit("enterSucess");

    // Emit loading message and show loading for 3 seconds
    socket.emit("loading", { message: "Loading..." });

    // start the process
    isActive = true;
  });

  socket.on("leaveGame", () => {
    socket.emit("leaveSucess");
  });
  socket.on("crash", (data) => {
    const { crashAmount, crashNumber } = data;
    const winningAmount = crashAmount * crashNumber;
    socket.emit("crashingRes", winningAmount);
  });

  socket.on("bet", (data) => {
    const { crashAmount, crashNumber } = data;
  });
};
