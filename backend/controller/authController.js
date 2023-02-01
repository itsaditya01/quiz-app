const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET;
const tokenLife = process.env.TOKEN_LIFE;

exports.Login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.is_teacher;

    pool.query(
      `SELECT * FROM quiz_users WHERE email = $1 and is_teacher = $2;`,
      [email, userType],
      (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Error occured at server side"
          });
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];
          const data = {
            user: user.id,
            is_teacher: user.is_teacher,
            name: user.name
          };

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              res.status(404).json({
                success: false,
                message: "Error occured at password matching"
              });
            }
            // checking if password is matching or not

            if (isMatch) {
              jwt.sign(data, secret, { expiresIn: tokenLife }, (err, token) => {
                if (err) {
                  res
                    .status(404)
                    .json({ success: false, message: err.message });
                } else {
                  res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                      name: user.name
                    },
                    message: "Login Successful."
                  });
                }
              });
            } else {
              //password is incorrect
              res
                .status(200)
                .json({ success: false, message: "Password incorrect" });
            }
          });
        } else {
          res.status(200).json({
            success: false,
            message: "No user exist with this email id"
          });
        }
      }
    );
  } catch (error) {
    res.status(200).json({ success: false, message: error.message });
  }
};

exports.Registration = async (req, res) => {
  try {
    let { name, email, password, password2 } = req.body;
    userType = req.body.userType === "teacher" ? true : false;

    //to check password is matching or not
    if (password !== password2) {
      res.status(200).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    //to check email is already exist or not
    pool.query(
      `SELECT * FROM quiz_users WHERE email = $1`,
      [email],
      async (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Server error: " + err.message
          });
        }

        if (results.rows.length > 0) {
          res.status(200).json({
            success: false,
            message: "User with this email id already exists"
          });
        } else {
          //Create Hashing of password
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(password, salt);

          pool.query(
            `insert into quiz_users (name, email, password, is_teacher) values ($1, $2, $3, $4)`,
            [name, email, secPass, userType],
            async (err, result) => {
              if (err) {
                res.status(404).json({
                  success: false,
                  message: "Server error: " + err.message
                });
              } else {
                const query_result = await pool.query(
                  `select * from quiz_users where email = $1`,
                  [email]
                );
                const user = query_result.rows[0];
                const data = {
                  user: user.id,
                  is_teacher: user.is_teacher,
                  name: user.name
                };
                //create a auth-token
                const token = jwt.sign(data, secret, { expiresIn: tokenLife });
                res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`,
                  user: {
                    name: name
                  },
                  message: "User created successfully"
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
