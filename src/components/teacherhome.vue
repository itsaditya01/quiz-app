<template>
  <div>
    <app-header></app-header>
    <div id="t-home">
      <div id="quiz">
        <div class="add-quiz">
          <div class="input-quiz">
            <input
              type="text"
              v-model.text="category"
              placeholder="Quiz category..."
            />
          </div>
          <div class="input-quiz">
            <input
              type="number"
              v-model.number="totalmarks"
              placeholder="Total marks..."
            />
          </div>
          <div class="input-quiz">
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
        <h3>Click to add Question</h3>
        <div class="card mt-4" v-for="quiz in quizes">
          <div
            class="card-header d-flex justify-content-between align-items-center"
            id="headingOne"
          >
            <div>
              <h2 class="mb-0">
                <button
                  class="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  @click="AddId(quiz.id)"
                >
                  {{ quiz.category }}
                </button>
              </h2>
            </div>
            <div class="control-delete" @click="deleteQuiz(quiz.id)">
              <font-awesome-icon icon="fa-trash" />
            </div>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
            v-if="data.quizid === quiz.id"
          >
            <div class="card-body">
              <form v-on:submit.prevent="addQuestions">
                <div class="form-group">
                  <label for="exampleFormControlInput1">Question</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="question here..."
                    v-model="data.question"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Option 1</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput2"
                    placeholder="..."
                    v-model="data.option1"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput3">Option 2</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput3"
                    placeholder="..."
                    v-model="data.option2"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Option 3</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput4"
                    placeholder="..."
                    v-model="data.option3"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Option 4 </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput5"
                    placeholder="..."
                    v-model="data.option4"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Answer</label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    v-model="data.answer"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput3">Marks</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput6"
                    placeholder="..."
                    v-model.number="data.marks"
                  />
                </div>
                <div>
                  <button type="submit" class="btn btn-primary mt-3">
                    Add Question
                  </button>
                </div>
              </form>
            </div>
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
      duration: null,
      data: {
        quizid: null,
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
      },
      marks: null
    };
  },
  created() {
    this.fetchQuiz();
  },
  beforeUpdate() {
    this.fetchQuiz();
  },
  methods: {
    deleteQuiz: function(id) {
      this.$http
        .post("http://localhost:3000/api/deletequiz", {
          quizid: id
        })
        .then(response => response.json());
    },
    AddId: function(id) {
      if (!this.data.quizid) {
        this.data.quizid = id;
      } else {
        this.data.quizid = null;
      }
    },
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
    },
    addQuestions: function() {
      this.$http
        .post("http://localhost:3000/api/addquestion", this.data, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          response.json();
        });
      this.data.question = "";
      this.data.option1 = "";
      this.data.option2 = "";
      this.data.option3 = "";
      this.data.option4 = "";
      this.data.answer = "";
      this.data.marks = null;
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
#quiz {
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
.add-quiz {
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  padding: 0px 50px;
}
.input-quiz {
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
</style>
