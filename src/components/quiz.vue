<template>
  <div id="quiz-main" class=" d-flex justify-content-center">
    <div
      v-if="finished"
      class="d-flex justify-content-center align-items-center flex-column"
      style="height: 100vh"
    >
      <div>
        <h3>You got {{ this.marks }} marks.</h3>
      </div>
      <div class="home-link">
        <router-link to="/home-student">
          Go to home >
        </router-link>
      </div>
    </div>
    <div class="container-fluid" v-else-if="!finished">
      <div class="modal-dialog">
        <div class="modal-content">
          <div>
            <!-- <countdown v-bind:minutes="duration"></countdown> -->
          </div>
          <div class="modal-header">
            <h3>
              Q.{{ this.ind + 1 }} {{ this.questions[this.ind].question }}
            </h3>
          </div>
          <div class="modal-body">
            <div class="col-xs-3 5"></div>
            <div class="quiz" id="quiz" data-toggle="buttons">
              <label
                class="element-animation1 btn btn-lg btn-danger btn-block"
                @click="answer = 'option1'"
                ><span class="btn-label"
                  ><font-awesome-icon
                    icon="fa-solid fa-chevron-right"
                  ></font-awesome-icon
                ></span>
                {{ this.questions[this.ind].option1 }}</label
              >
              <label
                class="element-animation2 btn btn-lg btn-danger btn-block"
                @click="answer = 'option2'"
                ><span class="btn-label"
                  ><font-awesome-icon
                    icon="fa-solid fa-chevron-right"
                  ></font-awesome-icon
                ></span>
                {{ this.questions[this.ind].option2 }}</label
              >
              <label
                class="element-animation3 btn btn-lg btn-danger btn-block"
                @click="answer = 'option3'"
                ><span class="btn-label"
                  ><font-awesome-icon
                    icon="fa-solid fa-chevron-right"
                  ></font-awesome-icon
                ></span>
                {{ this.questions[this.ind].option3 }}</label
              >
              <label
                class="element-animation4 btn btn-lg btn-danger btn-block"
                @click="answer = 'option4'"
                ><span class="btn-label"
                  ><font-awesome-icon
                    icon="fa-solid fa-chevron-right"
                  ></font-awesome-icon
                ></span>
                {{ this.questions[this.ind].option4 }}</label
              >
              <h5 class="mt-3" v-if="answer !== ''">
                Selected choice : {{ this.answer }}
              </h5>
            </div>
            <div class="add-button d-flex justify-content-end">
              <div
                @click="addResult"
                class="icon-holder"
                v-if="ind === totalquestions - 1"
              >
                <button type="button" class="btn btn-warning">finish</button>
              </div>
              <div
                @click="Check"
                class="icon-holder"
                v-else-if="ind < totalquestions"
              >
                <button type="button" class="btn btn-warning">
                  Next Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countdown from "./countdown.vue";
export default {
  components: { countdown: countdown },
  data() {
    return {
      ind: 0,
      questions: [],
      answer: "",
      marks: 0,
      totalquestions: null,
      finished: false,
      duration: 0,
      timer: null
    };
  },
  created() {
    this.fetchQuiz();
  },

  methods: {
    getQuizInfo: function() {
      fetch("http://localhost:3000/api/getquizinfo", {
        method: "get",
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.duration = data.duration_m;
        });
    },
    fetchQuiz: function() {
      this.$http
        .post("http://localhost:3000/api/getquiz", {
          quizid: this.$route.params.id
        })
        .then(response => response.json())
        .then(data => {
          this.questions = data.data;
          this.totalquestions = data.data.length;
        });
    },
    Check: function() {
      console.log(this.questions[this.ind].answer);
      console.log(this.answer);
      if (this.questions[this.ind].answer === this.answer) {
        this.marks += this.questions[this.ind].marks;
      }
      this.ind++;
      console.log(this.marks);
      this.answer = "";
    },
    addResult: function() {
      if (this.questions[this.ind].answer === this.answer) {
        this.marks += this.questions[this.ind].marks;
      }
      this.$http
        .post(
          "http://localhost:3000/api/addresult",
          {
            quizid: this.$route.params.id,
            marks: this.marks
          },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => response.json())
        .then(data => {
          this.questions = data.data;
          this.totalquestions = data.data.length;
        });
      this.finished = true;
    }
  }
};
</script>

<style scoped>
body {
  background-color: #816161;
}
#quiz-main {
  height: 100vh;
  max-width: 1000px;
  margin: auto auto;
  display: flex;
  align-items: center;
}
.quiz {
  display: flex;
  flex-direction: column;
  height: 500px;
}

label.btn {
  padding: 18px 60px;
  white-space: normal;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
}

label.btn:hover {
  text-shadow: 0 3px 2px rgba(0, 0, 0, 0.4);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
}

label.btn-block {
  text-align: left;
  position: relative;
  margin-top: 20px;
}

label .btn-label {
  position: absolute;
  border-radius: 5px;
  left: 0;
  top: 0;
  display: inline-block;
  padding: 0 10px;
  background: #49548b;
  height: 100%;
}

.btn-label svg {
  position: relative;
  top: 50%;
  transform: translateY(-77%);
}

label .glyphicon {
  top: 34%;
}

.element-animation1 {
  animation: animationFrames ease 0.8s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 0.8s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 0.8s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

.element-animation2 {
  animation: animationFrames ease 1s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 1s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 1s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

.element-animation3 {
  animation: animationFrames ease 1.2s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 1.2s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 1.2s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

.element-animation4 {
  animation: animationFrames ease 1.4s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames ease 1.4s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -ms-animation: animationFrames ease 1.4s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

@keyframes animationFrames {
  0% {
    opacity: 0;
    transform: translate(-1500px, 0px);
  }

  60% {
    opacity: 1;
    transform: translate(30px, 0px);
  }

  80% {
    transform: translate(-10px, 0px);
  }

  100% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

@-webkit-keyframes animationFrames {
  0% {
    opacity: 0;
    -webkit-transform: translate(-1500px, 0px);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate(30px, 0px);
  }

  80% {
    -webkit-transform: translate(-10px, 0px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translate(0px, 0px);
  }
}

.modal-header {
  background-color: transparent;
  color: inherit;
}

.modal-body {
  min-height: 300px;
}
</style>
