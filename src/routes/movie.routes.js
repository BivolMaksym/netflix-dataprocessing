const express = require('express');
const Movie = require("../controller/movie.controller.js");

const router = express.Router();
const movie = new Movie();

// Add new movie 
router.post("/:movieID", movie.createMovie);

// Remove a movie
router.delete("/:movieID", movie.removeMovie);

// Retrieve all movies
router.get("/", movie.getAllMovies);

//Retrieve a movie with certain ID 
router.get("/:movieID", movie.getMovieByItsID);

//Update movie using its ID
router.put("/:movieID", movie.updateMovie);

module.exports = router;

