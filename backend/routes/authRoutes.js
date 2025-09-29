const express = require("express");
const { addUser, login, forgotPassword, resetPassword, deleteCurrentUser, getUsers } = require("../controllers/authController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.get("/", getUsers)
router.route("/signup").post(addUser);
router.route("/login").post(login);

router.route("/forgotpassword").post(protect, forgotPassword);
router.route("/resetpassword/:token").patch(protect, resetPassword);

router.delete("/deleteme", protect, deleteCurrentUser);

module.exports = router;