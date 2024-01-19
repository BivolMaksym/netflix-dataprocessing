const express = require('express');
const router = express.Router();
const WatchlistSeriesController = require('../controller/watchlistSeries.controller');
const watchlistSeriesController = new WatchlistSeriesController();

// Define routes
router.get('/', watchlistSeriesController.getAllWatchlistSeries);
router.get('/:watchlistSeriesID', watchlistSeriesController.getWatchlistSeriesByID);
router.post('/:watchlistID', watchlistSeriesController.createWatchlistSeries);
router.delete('/:watchlistSeriesID', watchlistSeriesController.deleteWatchlistSeries);

module.exports = router;
