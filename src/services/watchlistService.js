const Watchlist = require('../models/watchlist.model');
const DB = require('../config/db.config');

class WatchlistService {
    constructor() {
        this.db = new DB();
    }

    async getAllWatchlists() {
        const results = await this.db.query('CALL get_all_watchlists()');
        return results.map((result) => new Watchlist(result.WatchlistID, result.ProfileID, result.dateAdded));
    }

    async getWatchlistByID(watchlistID) {
        const result = await this.db.query('CALL get_watchlist_by_id(?)', [watchlistID]);
        return result.length === 1 ? new Watchlist(result[0].WatchlistID, result[0].ProfileID, result[0].dateAdded) : null;
    }

    async createWatchlist(profileID) {
        // Insert a new watchlist
        const result = await this.db.query('CALL create_watchlist(?, @newWatchlistID)', [profileID]);
        return result[0][0].newWatchlistID;
    }

    async deleteWatchlist(watchlistID) {
        await this.db.query('CALL delete_watchlist(?)', [watchlistID]);
        return watchlistID; 
    }
}

module.exports = WatchlistService;
