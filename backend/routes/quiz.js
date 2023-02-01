const express = require("express");
const router = express.Router();
const verifytoken = require("../middleware/verifytoken");
const {
  AddQuiz,
  GetQuiz,
  AddQuestion,
  GetAllQuiz,
  GetUser,
  GetTeachersQuiz,
  GetQuizInfo,
  DeleteQuiz
} = require("../controller/quizController");
const { AddResult, GetResults } = require("../controller/resultController");

//routes for quiz
router.post("/addquiz", verifytoken, AddQuiz);
router.post("/getquiz", GetQuiz);
router.get("/getallquiz", GetAllQuiz);
router.get("/getteachersquiz", verifytoken, GetTeachersQuiz);
router.get("/getquizinfo", GetQuizInfo);
router.post("/deletequiz", DeleteQuiz);

//routes for question
router.post("/addquestion", verifytoken, AddQuestion);

//routes for results
router.post("/addresult", verifytoken, AddResult);
router.get("/getresults", verifytoken, GetResults);

//route for get user info
router.get("/getuser", verifytoken, GetUser);

module.exports = router;
