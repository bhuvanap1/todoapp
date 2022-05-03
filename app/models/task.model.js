var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: {
    type: String,
    required: "Kindly enter the name of the task",
  },
  due_date: {
    type: Date,
    required: "Tasks must have due dates",
  },
  assigned_to: {
    type: String,
    required: "Assign this task to someone.",
  },
  assigned_by: {
    type: String,
  },
  status: [{
    type: String,
    enum: ['pending', 'completed']
  }],
  default: ['pending']
});

module.exports = mongoose.model("todos", TaskSchema);
