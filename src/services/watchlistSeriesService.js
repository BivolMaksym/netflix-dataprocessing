const WatchlistSeries = require('../models/watchlistSeries.model');
const DB = require('../config/db.config');

class WatchlistSeriesService {
    constructor() {
        this.db = new DB();
    }

    async getAllWatchlistSeries() {
        const results = await this.db.query('SELECT * FROM WatchlistSeries');
        return results.map((result) => new WatchlistSeries(result.WatchlistSeriesID, result.WatchlistID, result.SeriesID));
    }

    async getWatchlistSeriesByID(watchlistSeriesID) {
        const result = await this.db.query('SELECT * FROM WatchlistSeries WHERE WatchlistSeriesID = ?', [watchlistSeriesID]);
        return result.length === 1 ? new WatchlistSeries(result[0].WatchlistSeriesID, result[0].WatchlistID, result[0].SeriesID) : null;
    }

    async createWatchlistSeries(watchlistID, newWatchlistSeries) {
        // Perform validation and insertion logic
        await this.db.query('INSERT INTO WatchlistSeries (WatchlistID, SeriesID) VALUES (?, ?)', [watchlistID, newWatchlistSeries.seriesID]);
    }

    async deleteWatchlistSeries(watchlistSeriesID) {
        await this.db.query('DELETE FROM WatchlistSeries WHERE SeriesID = ?', [watchlistSeriesID]);
    }
}

module.exports = WatchlistSeriesService;
