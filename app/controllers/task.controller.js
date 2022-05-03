const mongoose = require("mongoose");
const Task = require("../models/task.model");

exports.getAllTasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.createNewTask = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err) res.send(err);
    res.json({task, message:"Task added sucessfully"});
  });
};

exports.getTask = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};
exports.getAssignedTasks = function (req, res) {
  Task.find({ assigned_to: req.params.user }, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.updateTask = function (req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function (err, task) {
      if (err) res.send(err);
      res.json({ task, message: "Task successfully Completed" });
    }
  );
};

exports.deleteTask = function (req, res) {
  Task.remove(
    {
      _id: req.params.taskId,
    },
    function (err, task) {
      if (err) res.send(err);
      res.json({ message: "Task successfully deleted" });
    }
  );
};
