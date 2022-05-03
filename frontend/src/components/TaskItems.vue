<template>
  <div class="mt-5">
    <div class="container" style="max-width: 400px" v-if="!isLoggedIn">
      <form>
        <h5 class="text-muted mb-4">Login to Manage Tasks</h5>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="John Doe"
            v-model="userName"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="userPassword"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary form-control"
          @click="verifyUser"
        >
          Take me to my Tasks
        </button>
      </form>
    </div>

    <div class="container" style="max-width: 800px" v-else>
      <div class="row">
        <div class="col-md-8">
          <h5 class="text-muted mb-4">Assigned tasks</h5>
          <div class="list-group">
            <label class="list-group-item" v-for="task in myTasks" :key="task">
              <input
                class="form-check-input me-1"
                type="checkbox"
                :checked="task.status == 'completed'"
                :disabled="task.status == 'completed'"
                @change="updateTask(task._id, task)"
              />
              {{ task.title }}
              <div
                style="color: red; text-decoration: underline; cursor: pointer"
                class="text-danger float-end underline"
                @click="deleteTask(task._id)"
              >
                discard
              </div>
            </label>
          </div>
        </div>
        <div class="col-md-4 float-left">
          <h5 class="text-muted mb-4">Create New Task</h5>
          <form>
            <div class="mb-3">
              <input
                type="title"
                class="form-control"
                placeholder="Task Title: eg. Set up ngix "
                v-model="title"
              />
            </div>
            <div class="mb-3">
              <input
                type="datetime"
                class="form-control"
                placeholder="Due Date: eg. 12/2/2022"
                v-model="duedate"
              />
            </div>
            <div class="mb-3">
              <label for="">Assign task To: </label>
              <select class="form-select" v-model="selected">
                <option
                  v-for="user in validusers.filter(
                    (_user) => _user != currentUser
                  )"
                  :key="user"
                  v-bind:value="user"
                >
                  {{ user }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                v-model="currentUser"
                disabled
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary form-control"
              @click="submitNewTask"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components() {},

  setup() {},
  data() {
    return {
      myTasks: [],
      users: [],
      currentUser: "",
      clickedTaskId: "",
      isLoggedIn: false,
      userName: "",
      userPassword: "",
      validusers: [],
      title: "",
      duedate: "",
      selected: "",
    };
  },
  // Fetches users when the component is created.
  async created() {
    try {
      const response = await axios.get(`http://localhost:8001/users`);
      this.users = response.data;
    } catch (e) {
      this.errors.push(e);
    }
  },
  methods: {
    async verifyUser(e) {
      e.preventDefault();
      if (!this.userName || !this.userPassword) {
        alert("Credentials Invalid");
        return;
      }

      try {
        this.users.map((user) => {
          this.validusers.push(user.name);
          if (
            this.userName == user.name &&
            this.userPassword == user.password
          ) {
            this.currentUser = user.name;
            this.isLoggedIn = true;
          }
        });

        if (!this.isLoggedIn) {
          alert("Incorrent username or password");
          return;
        } else {
          this.getUserData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUserData() {
      try {
        const userTasks = await axios.get(
          `http://localhost:8001/alltasks/${this.currentUser}`
        );
        this.myTasks = userTasks.data;
      } catch (e) {
        this.errors.push(e);
      }
    },

    async deleteTask(id) {
      try {
        const deletedTask = await axios.delete(
          `http://localhost:8001/tasks/${id}`
        );
        alert(deletedTask.data.message);
        this.myTasks = this.myTasks.filter((task) => task._id != id);
      } catch (e) {
        this.errors.push(e);
      }
    },
    async updateTask(id, newTask) {
      try {
        const updatedTask = await axios.put(
          `http://localhost:8001/tasks/${id}`,
          { status: "completed" }
        );
        alert(updatedTask.data.message);

        this.myTasks.forEach((task, i) => {
          if (task._id == id) {
            this.myTasks[i] = newTask;
          }
        });
      } catch (e) {
        this.errors.push(e);
      }
    },

    async submitNewTask(e) {
      e.preventDefault();

      const dataToSubmit = {
        title: this.title,
        due_date: this.duedate,
        assigned_to: this.selected,
        assigned_by: this.currentUser,
        status: "pending",
      };

      try {
        const addedTask = await axios.post(
          `http://localhost:8001/tasks`,
          dataToSubmit
        );
        alert(addedTask.data.message);


        // this.myTasks.push(dataToSubmit);
      } catch (e) {
        this.errors.push(e);
      }
    },
  },
};
</script>
