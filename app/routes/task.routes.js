module.exports = function (app) {
    var Task = require("../controllers/task.controller");
  
    // todoList Routes
    app.route("/tasks").get(Task.getAllTasks).post(Task.createNewTask);
  
    app
      .route("/tasks/:taskId")
      .get(Task.getTask)
      .put(Task.updateTask)
      .delete(Task.deleteTask);

    app.route("/alltasks/:user").get(Task.getAssignedTasks)
  };
  