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
        // Insert a new watchlist
        const result = await this.db.query('INSERT INTO Watchlist (ProfileID) VALUES (?)', [profileID]);
        const watchlistID = result.insertId;

        // Update the Profile table with the new WatchlistID
        await this.db.query('UPDATE Profile SET WatchlistID = ? WHERE ProfileID = ?', [watchlistID, profileID]);

        return watchlistID;
    }

    async deleteWatchlistInProfile(watchlistID) {
        // Fetch the profile IDs associated with the watchlist
        const profileIDs = await this.db.query('SELECT ProfileID FROM Profile WHERE WatchlistID = ?', [watchlistID]);

        // Update each profile to remove the association with the watchlist
        for (const { ProfileID } of profileIDs) {
            await this.db.query('UPDATE Profile SET WatchlistID = NULL WHERE ProfileID = ?', [ProfileID]);
        }
    }

    async deleteWatchlist(watchlistID) {
        // Remove rows from WatchlistMovie associated with the watchlist
        await this.db.query('DELETE FROM WatchlistMovie WHERE WatchlistID = ?', [watchlistID]);

        // Remove rows from WatchlistSeries associated with the watchlist
        await this.db.query('DELETE FROM WatchlistSeries WHERE WatchlistID = ?', [watchlistID]);

        // Delete the watchlist
        await this.db.query('DELETE FROM Watchlist WHERE WatchlistID = ?', [watchlistID]);

        return watchlistID; // Optionally, you can return the watchlistID if needed
    }


}

module.exports = WatchlistService;
