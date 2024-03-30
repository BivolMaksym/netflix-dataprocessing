const WatchlistSeries = require('../models/watchlistSeries.model');
const DB = require('../config/db.config');

class WatchlistSeriesService {
    constructor() {
        this.db = new DB();
    }

    async getAllWatchlistSeries() {
        const results = await this.db.query('CALL get_all_watchlist_series()');
        return results.map((result) => new WatchlistSeries(result.WatchlistSeriesID, result.WatchlistID, result.SeriesID));
    }

    async getWatchlistSeriesByID(watchlistSeriesID) {
        const result = await this.db.query('CALL get_watchlist_series_by_id(?)', [watchlistSeriesID]);
        return result.length === 1 ? new WatchlistSeries(result[0].WatchlistSeriesID, result[0].WatchlistID, result[0].SeriesID) : null;
    }

    async createWatchlistSeries(watchlistID, seriesID) {
        await this.db.query('CALL create_watchlist_series(?, ?)', [watchlistID, seriesID]);
    }

    async deleteWatchlistSeries(watchlistSeriesID) {
        await this.db.query('CALL delete_watchlist_series(?)', [watchlistSeriesID]);
    }
}

module.exports = WatchlistSeriesService;
