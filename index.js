const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();



const authRoute = require("./routes/auth");
const hotelRoute = require("./routes/hotel");
const roomsRoute = require("./routes/rooms");
const userRoute = require("./routes/user");


app.use(cookieParser())
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotel", hotelRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
  } catch (err) {
    console.log(err);
  }
};
mongoose.connection.on("connected", () => {
  console.log("Mongodb Connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb Disconnected");
});



app.get('/',(req, res) => {
    res.send('<h1><center>Backend Is Ready</center></h1>')
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, connect(), () => {
  console.log("Backend Server is Working");
});
