const express = require("express");
const { addUser, login } = require("../controllers/authController");

const router = express.Router();

router.route("/").post(addUser);
router.route("/login").post(login);
module.exports = router;