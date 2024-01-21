const express = require('express');
const ProfileController = require('../controller/profile.controller');

const router = express.Router();
const profileController = new ProfileController();

// Define routes
router.get('/', profileController.getAllProfiles);
router.get('/:profileID', profileController.getProfileByProfileID);
router.put('/', profileController.updateProfile);
router.post('/', profileController.createProfile);
router.delete('/', profileController.deleteProfile);

module.exports = router;
