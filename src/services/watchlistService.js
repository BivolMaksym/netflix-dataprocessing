const Watchlist = require('../models/watchlist.model');
const DB = require('../config/db.config');

class WatchlistService {
    constructor() {
        this.db = new DB();
    }

    async getAllWatchlists() {
        const results = await this.db.query('SELECT * FROM Watchlist');
        return results.map((result) => new Watchlist(result.WatchlistID, result.ProfileID, result.dateAdded));
    }

    async getWatchlistByID(watchlistID) {
        const result = await this.db.query('SELECT * FROM Watchlist WHERE WatchlistID = ?', [watchlistID]);
        return result.length === 1 ? new Watchlist(result[0].WatchlistID, result[0].ProfileID, result[0].dateAdded) : null;
    }

    async createWatchlist(profileID) {
        await this.db.query('INSERT INTO Watchlist (ProfileID) VALUES (?)', [profileID]);
    }

    async deleteWatchlist(watchlistID) {
        await this.db.query('DELETE FROM Watchlist WHERE WatchlistID = ?', [watchlistID]);
    }
}

module.exports = WatchlistService;
