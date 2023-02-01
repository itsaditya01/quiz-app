// quiz : id, category, teacherid, totalmarks, teachername, duration
// questions :  quizid, question, option 1, option 2, option 3, option 4, answer, marks
// quiz_users : id, name, password, is_teacher, email
// results : quizid, studentid, marks, studentname

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "quiz",
  password: "aditya",
  port: 5432,
});

module.exports = pool;
