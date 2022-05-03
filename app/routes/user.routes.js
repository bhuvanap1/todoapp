module.exports = function (app) {
  var User = require("../controllers/user.controller");

  // todoList Routes
  app.route("/users").get(User.getAllUsers).post(User.createNewUser);

  app
    .route("/users/:userId")
    .get(User.getUser)
    .put(User.updateUser)
    .delete(User.deleteUser);
};
