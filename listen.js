const { app, http, io } = require("./app.js");
const { PORT = 9090 } = process.env; // Use the same port for both Express and Socket.IO

require("./controllers/socketio.controllers.js");

// Listen on the same port for both Express and Socket.IO
http.listen(PORT, "0.0.0.0", () => {
  console.log(`Server (Express + Socket.IO) listening on ${PORT}`);
});
/*
const { app, http, io } = require("./app.js");
const { PORT = 9090 } = process.env;
const { IO_PORT = 4000 } = process.env;
require("./controllers/socketio.controllers.js");


http.listen(IO_PORT, () => {
  console.log(`Socket.IO listening on ${IO_PORT}`);
});

app.listen(PORT, "0.0.0.0", function () {
  console.log(`Listening on ${PORT}...`)
});
*/