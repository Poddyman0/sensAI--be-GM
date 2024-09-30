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