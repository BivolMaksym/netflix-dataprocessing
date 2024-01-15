const express = require('express');

const router = express.Router();

const GenreController = require('../controller/genre.controller');

const genreController = new GenreController();



module.exports = router;