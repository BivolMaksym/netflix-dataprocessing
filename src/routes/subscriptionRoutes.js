const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controller/subscription.controller');

const subscriptionController = new SubscriptionController();

// Define your subscription routes
router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:userID', subscriptionController.getSubscriptionByUserID);
router.put('/:userID', subscriptionController.updateSubscription);
router.post('/:userID', subscriptionController.createSubscription);
router.delete('/:userID', subscriptionController.deleteSubscription);

module.exports = router;
