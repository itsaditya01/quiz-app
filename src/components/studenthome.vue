<template>
  <div>
    <app-header></app-header>
    <div id="student-home">
      <div class="mt-5 text-center">
        <h3>List of quiz</h3>
      </div>
      <div v-for="quiz in quizes" class="card mb-3 mt-3">
        <div class="card-body">
          <h5 class="card-title">{{ quiz.category }}</h5>
          <p class="card-text">Duration: {{ quiz.duration_m }} Minutes</p>
          <button @click="StartQuiz(quiz.id)" class="btn btn-primary">
            Start quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "./header.vue";
export default {
  components: { "app-header": header },
  data() {
    return {
      is_teacher: true,
      quizes: []
    };
  },
  created() {
    this.fetchQuiz();
  },
  methods: {
    getUser: function() {
      this.$http
        .get("http://localhost:3000/api/getuser")
        .then(response => response.json())
        .then(data => {
          this.is_teacher = data.is_teacher;
        });
    },
    fetchQuiz: function() {
      fetch("http://localhost:3000/api/getallquiz", {
        method: "get",
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.quizes = data.data;
        });
    },
    StartQuiz: function(id) {
      this.$router.push({ path: "/quiz/" + id });
    }
  }
};
</script>

<style scoped>
#student-home {
  max-width: 1000px;
  margin: 30px auto 0 auto;
}
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
* {
  font-family: "Fira Sans", sans-serif;
}
#todo {
  margin: 30px 100px;
}
svg {
  font-size: 24px;
  transition: 0.4s;
}
svg:hover {
  color: rgb(155, 48, 40);
}
.controls {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.update-button {
  background: #ff4742;
  border: 1px solid #ff4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.update-button:hover,
.update-button:active {
  background-color: initial;
  background-position: 0 0;
  color: #ff4742;
}

.update-button:active {
  opacity: 0.5;
}
.control-delete {
  margin-left: 20px;
}
.add-todo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 50px 0;
  padding: 0px 50px;
}
.input-todo {
  display: flex;
  margin-right: 50px;
}
input {
  display: flex;
  width: 500px;
  height: 40px;
  border-radius: 5px;
  padding: 2px 10px;
}
.todo-outer {
  background-color: #1f8a70ab;
  border-radius: 10px;
}
.todo-inner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 5px 50px;
}
.todo-update {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 5px 50px;
}
.todo-update .content {
  display: flex;
  align-items: center;
  height: 59.03px;
  color: #00425a;
}
.control {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
