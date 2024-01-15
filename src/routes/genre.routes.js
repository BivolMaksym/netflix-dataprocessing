const express = require('express');

const router = express.Router();

const GenreController = require('../controller/genre.controller');

const genreController = new GenreController();

application.get('/genres', genreController.getAllGenres);
application.get('/genres', genreController.getGenreById);

module.exports = router;