const WatchlistService = require('../services/watchlistService');

class WatchlistController {
    constructor() {
        this.watchlistService = new WatchlistService();
    }

    getAllWatchlists = async (req, res) => {
        try {
            const watchlists = await this.watchlistService.getAllWatchlists();
            res.json(watchlists);
        } catch (error) {
            console.error('Error fetching watchlists: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    getWatchlistByID = async (req, res) => {
        const watchlistID = req.params.id;
        try {
            const watchlist = await this.watchlistService.getWatchlistByID(watchlistID);
            if (watchlist) {
                res.json(watchlist);
            } else {
                res.status(404).send('Watchlist not found');
            }
        } catch (error) {
            console.error('Error fetching watchlist: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    createWatchlist = async (req, res) => {
        const { profileID } = req.body;
        try {
            await this.watchlistService.createWatchlist(profileID);
            res.status(201).send('Watchlist created successfully!');
        } catch (error) {
            console.error('Error creating watchlist: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    deleteWatchlist = async (req, res) => {
        const watchlistID = req.params.id;
        try {
            await this.watchlistService.deleteWatchlist(watchlistID);
            res.status(200).send('Watchlist deleted successfully!');
        } catch (error) {
            console.error('Error deleting watchlist: ' + error.message);
            res.status(500).send('Internal Server Error');
        }
    };
}

module.exports = WatchlistController;
