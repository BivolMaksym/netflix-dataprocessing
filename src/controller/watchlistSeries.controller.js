const WatchlistSeriesService = require('../services/watchlistSeriesService');
const watchlistSeriesService = new WatchlistSeriesService();

class WatchlistSeriesController {
    async getAllWatchlistSeries(req, res) {
        try {
            const watchlistSeries = await watchlistSeriesService.getAllWatchlistSeries();
            res.json(watchlistSeries);
        } catch (error) {
            console.error('Error getting watchlist series: ' + error.message);
            res.status(500).send('Error getting watchlist series.');
        }
    }

    async getWatchlistSeriesByID(req, res) {
        const { watchlistSeriesID } = req.params;
        try {
            const watchlistSeries = await watchlistSeriesService.getWatchlistSeriesByID(watchlistSeriesID);
            res.json(watchlistSeries);
        } catch (error) {
            console.error('Error getting watchlist series by ID: ' + error.message);
            res.status(500).send('Error getting watchlist series by ID.');
        }
    }

    async createWatchlistSeries(req, res) {
        const { watchlistID } = req.params;
        const { seriesID } = req.body;
        try {
            await watchlistSeriesService.createWatchlistSeries(watchlistID, { seriesID });
            res.status(201).send('Watchlist series created successfully!');
        } catch (error) {
            console.error('Error creating watchlist series: ' + error.message);
            res.status(500).send('Error creating watchlist series.');
        }
    }

    async deleteWatchlistSeries(req, res) {
        const { watchlistSeriesID } = req.params;
        try {
            await watchlistSeriesService.deleteWatchlistSeries(watchlistSeriesID);
            res.status(200).send('Watchlist series deleted successfully!');
        } catch (error) {
            console.error('Error deleting watchlist series: ' + error.message);
            res.status(500).send('Error deleting watchlist series.');
        }
    }
}

module.exports = WatchlistSeriesController;
