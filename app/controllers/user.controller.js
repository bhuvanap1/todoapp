let mongoose = require("mongoose");
const User = require("../models/user.model");

exports.getAllUsers = function (req, res) {
  User.find({}, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.createNewUser = function (req, res) {
  var new_user = new User(req.body);
  new_user.save(function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.getUser = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.updateUser = function (req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    function (err, user) {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.deleteUser = function (req, res) {
  User.remove(
    {
      _id: req.params.userId,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({ message: "User successfully deleted" });
    }
  );
};
