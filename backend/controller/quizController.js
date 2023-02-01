const pool = require("../db");

const dotenv = require("dotenv");

dotenv.config();

exports.AddQuiz = async (req, res) => {
  try {
    const catogory = req.body.catogory;
    const teacherid = req.user;
    const totalmarks = req.body.totalmarks;
    const teachername = req.name;
    const duration_m = req.body.duration;

    pool.query(
      ` insert into quiz (category, teacherid, totalmarks, teachername, duration_m) values ($1, $2, $3, $4, $5);`,
      [catogory, teacherid, totalmarks, teachername, duration_m],
      function(err, results) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Quiz added successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetAllQuiz = async (req, res) => {
  try {
    pool.query(
      `select q.id, q.category, q.teacherid, q.duration_m, u.name from quiz q inner join quiz_users u on q.teacherid = u.id;`,
      (err, results) => {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.DeleteQuiz = async (req, res) => {
  try {
    const quizid = req.body.quizid;
    pool.query(
      `delete from questions where quizid = $1`,
      [quizid],
      (err, results) => {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          pool.query(
            `delete from results where quizid = $1`,
            [quizid],
            (err, results) => {
              if (err) {
                res.status(500).json({ success: false, message: err.message });
              } else {
                pool.query(
                  `delete from quiz where id = $1`,
                  [quizid],
                  (err, results) => {
                    if (err) {
                      res
                        .status(500)
                        .json({ success: false, message: err.message });
                    } else {
                      res
                        .status(200)
                        .json({ success: true, data: results.rows });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetQuizInfo = async (req, res) => {
  try {
    const quizid = req.body.quizid;
    pool.query(`select * from quiz where id = $1`, [quizid], (err, results) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      } else {
        res.status(200).json({ success: true, data: results.rows });
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetTeachersQuiz = async (req, res) => {
  try {
    const id = req.user;
    pool.query(
      `select q.id, q.category, q.teacherid, u.name from quiz q inner join quiz_users u on q.teacherid = u.id where q.teacherid = $1;`,
      [id],
      (err, results) => {
        if (err) {
          res.status(404).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetQuiz = async (req, res) => {
  try {
    const quizid = req.body.quizid;
    pool.query(
      `select * from questions where quizid = $1`,
      [quizid],
      (err, results) => {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.AddQuestion = async (req, res) => {
  try {
    const {
      quizid,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      marks
    } = req.body;

    pool.query(
      `insert into questions (quizid, question, option1, option2, option3, option4, answer, marks) values ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [quizid, question, option1, option2, option3, option4, answer, marks],
      async (err, result) => {
        if (err) {
          res.status(404).json({ success: false, message: err.message });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Question added successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetUser = async (req, res) => {
  try {
    const id = req.user;
    const is_teacher = req.is_teacher;
    const name = req.name;

    res.status(200).json({
      id: id,
      is_teacher,
      name
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
