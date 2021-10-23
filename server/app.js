const express = require("express");
const mongoose = require("mongoose");

const dbURI = require("./config/config");
const roomInfo = require("./routes/roomRoute");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/playlist/api/room", roomInfo);

// DB connection codes
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error: "));
conn.once("open", function () {
  console.log("DB Connected successfully");
});

app.use(function (req, res, next) {
  // Headers to remove possible errors in all requests
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
