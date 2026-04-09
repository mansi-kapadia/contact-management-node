const express = require("express");
const router = express.Router();
const { registerUser , loginUser , currentUserInfo } = require("../controllers/userController")
const ValidateToken = require("../middleware/validateTokenHandler");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(ValidateToken, currentUserInfo);

module.exports = router;