const express = require('express');
const WatchlistMovieController = require('../controller/watchlistMovie.controller');

const router = express.Router();
const watchlistMovieController = new WatchlistMovieController();

// Get all watchlist movies
router.get('/', watchlistMovieController.getAllWatchlistMovies);

// Get watchlist movie by ID
router.get('/:id', watchlistMovieController.getWatchlistMovieByID);

// Create watchlist movie
router.post('/', watchlistMovieController.createWatchlistMovie);

// Delete watchlist movie
router.delete('/:id', watchlistMovieController.deleteWatchlistMovie);

module.exports = router;
