const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Task = require("./app/models/task.model");
const User = require("./app/models/user.model");
const bodyParser = require("body-parser");

app = express();

//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://studentz:studentz@cluster0.qxb6w.mongodb.net/tasksV2?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let taskRotes = require("./app/routes/task.routes"); //importing todo route
let userRoutes = require("./app/routes/user.routes"); //importing user route
taskRotes(app); //register the routes
userRoutes(app);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
const PORT = process.env.PORT || 8001;
app.listen(PORT);
console.log(`Server started on port ${PORT}`);
