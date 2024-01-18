const express = require('express');
const WatchlistController = require('../controller/watchlist.controller');

const router = express.Router();
const watchlistController = new WatchlistController();

// Get all watchlists
router.get('/', watchlistController.getAllWatchlists);

// Get watchlist by ID
router.get('/:id', watchlistController.getWatchlistByID);

// Create watchlist
router.post('/', watchlistController.createWatchlist);

// Delete watchlist
router.delete('/:id', watchlistController.deleteWatchlist);

module.exports = router;
