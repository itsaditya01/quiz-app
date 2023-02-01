const express = require("express");
const router = express.Router();

const { Login, Registration } = require("../controller/authController");

router.post("/login", Login);

router.post("/signup", Registration);

module.exports = router;
