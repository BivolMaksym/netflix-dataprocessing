const SubscriptionService = require('../services/SubscriptionService');

class SubscriptionController {
    constructor() {
        this.subscriptionService = new SubscriptionService();
    }

    getAllSubscriptions = async (req, res) => {
        try {
            const subscriptions = await this.subscriptionService.getAllSubscriptions();
            res.json(subscriptions);
        } catch (error) {
            console.error('Error getting subscriptions:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    getSubscriptionByUserID = async (req, res) => {
        const userID = parseInt(req.params.userID);

        try {
            const subscription = await this.subscriptionService.getSubscriptionByUserID(userID);
            if (subscription) {
                res.json(subscription);
            } else {
                res.status(404).json({ error: 'Subscription not found for the given UserID' });
            }
        } catch (error) {
            console.error('Error getting subscription by UserID:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    updateSubscription = async (req, res) => {
        const userID = parseInt(req.params.userID);
        const updatedSubscription = req.body;

        try {
            await this.subscriptionService.updateSubscription(userID, updatedSubscription);
            res.json({ message: 'Subscription updated successfully' });
        } catch (error) {
            console.error('Error updating subscription:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    createSubscription = async (req, res) => {
        const userID = parseInt(req.params.userID);
        const newSubscription = req.body;

        try {
            await this.subscriptionService.createSubscription(userID, newSubscription);
            res.status(201).json({ message: 'Subscription created successfully' });
        } catch (error) {
            console.error('Error creating subscription:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    deleteSubscription = async (req, res) => {
        const userID = parseInt(req.params.userID);

        try {
            await this.subscriptionService.deleteSubscription(userID);
            res.json({ message: 'Subscription deleted successfully' });
        } catch (error) {
            console.error('Error deleting subscription:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };
}

module.exports = SubscriptionController;
