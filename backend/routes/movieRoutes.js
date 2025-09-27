const express = require("express");
const { getMovies, addSingleMovie } = require("../controllers/movieController");
const { protect } = require("../controllers/authController");


const router = express.Router();

router.route("/").get(protect, getMovies).post(protect, addSingleMovie);
module.exports = router;