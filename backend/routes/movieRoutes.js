const express = require("express");
const { getMovies, addSingleMovie, deleteSingleMovie } = require("../controllers/movieController");
const { protect } = require("../controllers/authController");


const router = express.Router();

router.route("/").get(protect, getMovies).post(protect, addSingleMovie);
router.delete("/delete/:id", protect, deleteSingleMovie)
module.exports = router;