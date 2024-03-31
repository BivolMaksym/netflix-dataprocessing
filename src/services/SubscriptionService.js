const Subscription = require('../models/subscriptions.model');
const DB = require('../config/db.config');

class SubscriptionService {
    constructor() {
        this.db = new DB();
    }

    async getAllSubscriptions() {
        const results = await this.db.query('CALL get_all_subscriptions()');
        return results.map(result => new Subscription(result.SubscriptionID, result.UserID, result.Description, result.Price, result.Quality, result.SignUpDate, result.FriendInvited, result.IsPaidAccount));
    }

    async getSubscriptionByUserID(userID) {
        const result = await this.db.query('CALL get_subscription_by_user_id(?)', [userID]);
        return result.length === 1
            ? new Subscription(result[0].SubscriptionID, result[0].UserID, result[0].Description, result[0].Price, result[0].Quality, result[0].SignUpDate, result[0].FriendInvited, result[0].IsPaidAccount)
            : null;
    }

    async updateSubscription(userID, updatedSubscription) {
        // Check if the updated 'Quality' value is valid
        const validQualities = ['HD', '4k', 'SD'];
        if (!validQualities.includes(updatedSubscription.Quality)) {
            throw new Error('Invalid quality. Accepted values are HD, 4k, or SD.');
        }

        await this.db.query('CALL update_subscription(?, ?, ?, ?, ?, ?, ?)', [userID, updatedSubscription.Description, updatedSubscription.Price, updatedSubscription.Quality, updatedSubscription.SignUpDate, updatedSubscription.FriendInvited, updatedSubscription.IsPaidAccount]);
    }

    async createSubscription(userID, newSubscription) {
        // Check if a subscription already exists for the given user
        const existingSubscription = await this.getSubscriptionByUserID(userID);
        if (existingSubscription) {
            throw new Error('A subscription already exists for this user.');
        }

        // Check if the provided 'Quality' value is valid
        const validQualities = ['HD', '4k', 'SD'];
        if (!validQualities.includes(newSubscription.Quality)) {
            throw new Error('Invalid quality. Accepted values are HD, 4k, or SD.');
        }

        // Perform validation and insertion logic
        await this.db.query('CALL create_subscription(?, ?, ?, ?, ?, ?, ?)', [userID, newSubscription.Description, newSubscription.Price, newSubscription.Quality, newSubscription.SignUpDate, newSubscription.FriendInvited, newSubscription.IsPaidAccount]);
    }

    async deleteSubscription(userID) {
        await this.db.query('CALL delete_subscription(?)', [userID]);
    }
}

module.exports = SubscriptionService;