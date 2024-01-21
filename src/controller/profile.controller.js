const ProfileService = require('../services/profileService');

class ProfileController {
    constructor() {
        this.profileService = new ProfileService();
    }

    getAllProfiles = async (req, res) => {
        try {
            const profiles = await this.profileService.getAllProfiles();
            res.status(200).json(profiles);
        } catch (error) {
            console.error('Error fetching profiles:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    // ... (unchanged code)

    getProfileByProfileID = async (req, res) => {
        const profileID = parseInt(req.params.profileID); // Change from query to params
        try {
            const profile = await this.profileService.getProfileByProfileID(profileID);
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).send('Profile not found');
            }
        } catch (error) {
            console.error('Error fetching profile:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    updateProfile = async (req, res) => {
        const profileID = parseInt(req.body.profileID);
        const updatedProfile = req.body;

        try {
            await this.profileService.updateProfile(profileID, updatedProfile);
            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            console.error('Error updating profile:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    createProfile = async (req, res) => {
        const userID = parseInt(req.body.userID);
        const newProfile = req.body;

        try {
            await this.profileService.createProfile(userID, newProfile);
            res.status(201).json({ message: 'Profile created successfully' });
        } catch (error) {
            console.error('Error creating profile:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };

    deleteProfile = async (req, res) => {
        const profileID = parseInt(req.body.profileID);
        try {
            await this.profileService.deleteProfile(profileID);
            res.status(200).json({ message: 'Profile deleted successfully' });
        } catch (error) {
            console.error('Error deleting profile:', error.message);
            res.status(500).send('Internal Server Error');
        }
    };
}

module.exports = ProfileController;
