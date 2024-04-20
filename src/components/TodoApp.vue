<template>
  <div class="container" style="max-width: 600px">
    <!-- Heading part -->
    <h2 class="text-success text-center mt-5">Todo App</h2>

    <!-- Input part -->
    <div class="d-flex mt-5">
      <input
        type="text"
        v-model="task"
        placeholder="Enter task"
        class="text input w-100"
        @keyup.enter="submitTask"
      />
      <button class="submit btn btn-success rounded-0" @click="submitTask" :disabled="!isTaskValid">
        SUBMIT
      </button>
    </div>

    <!-- Table part -->
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col" style="width: 15rem">Progress</th>
          <th scope="col" style="width: 7rem">Status</th>
          <th scope="col" class="text-center">Del</th>
          <th scope="col" class="text-center">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <span
              :class="{ 'line-through': task.status === 'finished' }"
              :style="{ 'text-decoration': task.status === 'finished' ? 'line-through' : 'none' }"
            >
              {{ task.name }}
            </span>
          </td>
          <td>
            <input
            type="range"
            v-model="task.progress"
            min="0"
            max="100"
            step="1"
            :class="{
              'bg-success': task.status === 'todo',
              'bg-warning': task.status === 'in-progress',
              'bg-info': task.status === 'finished',
            }"
            style="width: 80%;"
            @input="updateProgress(index)"
            />
            {{ task.progress }}
          </td>
          <td>
            <span
            class="pointer noselect"
              @click="changeStatus(index)"
              :class="{
              'text-success': task.status === statuses.todo,
              'text-info': task.status === statuses.finished,
              'text-warning': task.status === statuses.inProgress,
              }"
            >
              {{ (task.status) }}
            </span>
          </td>
          <td class="text-center">
            <div @click="deleteTask(index)" class="pointer">
              <span class="fa fa-trash pointer"></span>
            </div>
          </td>
          <td class="text-center">
            <div @click="editTask(index)" class="pointer">
              <p class="fa fa-pen pointer"></p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "FirstTry",
  props: {
    msg: String,
  },

  data() {
    return {
      task: "",
      editedTask: null,
      statuses: {
        todo: "todo",
        inProgress: "in-progress",
        finished: "finished",
      },
      tasks: [],
      isTaskValid: true,
    };
  },

  mounted() {
  // Get data from localStorage when the page loads
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    this.tasks = JSON.parse(storedTasks);
  }

},

  methods: {
    
    changeStatus(index) {
      const currentStatus = this.tasks[index].status;
      const statusValues = Object.values(this.statuses);
      const currentIndex = statusValues.indexOf(currentStatus);
      const newIndex = (currentIndex + 1) % statusValues.length;
      this.tasks[index].status = statusValues[newIndex];
      this.saveData();
    },

    updateProgress(index) {
      if (this.tasks[index].progress == 100) {
        this.tasks[index].status = 'finished';
      } else if (this.tasks[index].progress == 0) {
        this.tasks[index].status = 'todo';
      } else {
        this.tasks[index].status = 'in-progress';
      }
      this.saveData();
    },


    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveData();
    },

    editTask(index) {
      this.task = this.tasks[index].name;
      this.editedTask = index;
    },

    submitTask() {
      // Form checked
      if (this.task.trim() === "") {
        this.isTaskValid = false;
        return;
      }

      if (this.editedTask != null) {
        this.tasks[this.editedTask].name = this.task;
        this.editedTask = null;
      } else {
        this.tasks.push({
          name: this.task,
          status: "todo",
          progress: 0,
        });
      }
      
      this.task = "";
      this.isTaskValid = true;
      this.saveData();
    },

    saveData() {
      // Save changes to localStorage
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    
  },
};
</script>

<style scoped>
  .pointer {
    cursor: pointer;
    pointer-events: auto; /* Enable pointer interaction on content */
  }

  .line-through {
    text-decoration: line-through;
  }
</style>
