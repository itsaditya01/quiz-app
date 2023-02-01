<template>
  <div id="t-home">
    <app-header></app-header>
    <div id="todo">
      <div>
        <h3>{{ this.category }}</h3>
      </div>
      <div class="add-todo">
        <div class="input-todo">
          <input
            type="text"
            v-model.text="category"
            placeholder="Quiz category..."
          />
        </div>
        <div class="input-todo">
          <input
            type="number"
            v-model.number="totalmarks"
            placeholder="Total marks..."
          />
        </div>
        <div class="input-todo">
          <input
            type="number"
            v-model.number="duration"
            placeholder="Duration in minute..."
          />
        </div>
        <div class="add-button">
          <div @click="addQuiz" class="icon-holder">
            <button class="update-button">Add quiz</button>
          </div>
        </div>
      </div>
      <div v-for="todo in quizes" class="todo-outer">
        <div class="todo-inner">
          <div class="content">
            <h3>{{ todo.category }}</h3>
          </div>
          <div>
            <button>Add questions</button>
          </div>
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
      quizes: [],
      category: "",
      totalmarks: null,
      duration: null
    };
  },
  created() {
    this.fetchQuiz();
  },
  beforeUpdate() {
    this.fetchQuiz();
  },
  methods: {
    fetchQuiz: function() {
      fetch("http://localhost:3000/api/getteachersquiz", {
        method: "get",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          this.quizes = data.data;
        });
    },
    addQuiz: function() {
      this.$http
        .post(
          "http://localhost:3000/api/addquiz",
          {
            catogory: this.category,
            totalmarks: this.totalmarks,
            duration: this.duration
          },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          response.json();
        });
      this.fetchQuiz();
      this.category = "";
      this.totalmarks = null;
      this.duration = null;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
* {
  font-family: "Fira Sans", sans-serif;
}
#t-home {
  max-width: 1000px;
  margin: 30px auto 0 auto;
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
  flex-direction: column;
  margin: 50px 0;
  padding: 0px 50px;
}
.input-todo {
  display: flex;
  margin-bottom: 20px;
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
