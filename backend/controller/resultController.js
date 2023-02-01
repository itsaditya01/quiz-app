const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.AddResult = async (req, res) => {
  try {
    const { quizid, marks } = req.body;
    const studentid = req.user;
    const studentname = req.name;

    pool.query(
      `insert into results (quizid, marks, studentid, studentname) values ($1, $2, $3, $4)`,
      [quizid, marks, studentid, studentname],
      (err, result) => {
        if (err) {
          res.status(404).json({ success: false, message: err.message });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Result added successfully." });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetResults = async (req, res) => {
  try {
    const is_teacher = req.is_teacher;
    const id = req.user;

    if (is_teacher) {
      pool.query(
        `select r.quizid, q.category, q.totalmarks, q.teacherid, r.studentid, r.marks, s.name from results r inner join quiz_users s on r.studentid = s.id inner join quiz q on r.quizid = q.id where q.teacherid = $1;`,
        [id],
        (err, results) => {
          if (err) {
            res.status(404).json({ success: false, message: err.message });
          } else {
            res.status(200).json({ success: true, data: results.rows });
          }
        }
      );
    } else {
      pool.query(
        `select r.marks, r.quizid, r.studentid, q.teacherid, q.category, q.teachername, q.totalmarks from results r inner join quiz q on r.quizid = q.id where r.studentid = $1`,
        [id],
        (err, results) => {
          if (err) {
            res.status(404).json({
              success: false,
              message: err.message
            });
          } else {
            res.status(200).json({ success: true, data: results.rows });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
