const Profile = require('../models/profile.model');
const DB = require('../config/db.config');

class ProfileService {
    constructor() {
        this.db = new DB();
    }

    validateProfile(profile) {
        if (profile.Age <= 0 || profile.Age > 170) {
            throw new Error('Invalid age. Age must be between 1 and 170.');
        }

        if (!/^[a-zA-Z0-9\s]*$/.test(profile.ProfileName)) {
            throw new Error('Invalid profile name. Profile name must not contain special characters.');
        }

        if (profile.ProfileName.length > 30) {
            throw new Error('Invalid profile name length. Profile name must not exceed 30 characters.');
        }
    }

    async validateProfileLimit(userID) {
        const profilesCount = await this.db.query('SELECT COUNT(*) as count FROM Profile WHERE UserID = ?', [userID]);
        if (profilesCount[0].count >= 4) {
            throw new Error('User has reached the maximum allowed number of profiles (4).');
        }
    }

    async getAllProfiles() {
        const results = await this.db.query('SELECT * FROM Profile');
        return results.map(result => new Profile(result.ProfileID, result.UserID, result.ClassificationID, result.WatchlistID, result.ProfileName, result.ProfilePhoto, result.Age, result.Language));
    }

    async getProfileByProfileID(profileID) {
        const result = await this.db.query('SELECT * FROM Profile WHERE ProfileID = ?', [profileID]);
        return result.length === 1 ? new Profile(result[0].ProfileID, result[0].UserID, result[0].ClassificationID, result[0].WatchlistID, result[0].ProfileName, result[0].ProfilePhoto, result[0].Age, result[0].Language) : null;
    }

    async updateProfile(profileID, updatedProfile) {
        this.validateProfile(updatedProfile);
        await this.db.query('UPDATE Profile SET ProfileName = ?, ProfilePhoto = ?, Age = ?, Language = ? WHERE ProfileID = ?',
            [updatedProfile.ProfileName, updatedProfile.ProfilePhoto, updatedProfile.Age, updatedProfile.Language, updatedProfile.profileID]);
    }

    async createProfile(userID, newProfile) {
        await this.validateProfileLimit(userID);
        this.validateProfile(newProfile);
        await this.db.query('INSERT INTO Profile (UserID, WatchlistID, ProfileName, ProfilePhoto, Age, Language) VALUES (?, ?, ?, ?, ?, ?)',
            [newProfile.userID, newProfile.WatchlistID, newProfile.ProfileName, newProfile.ProfilePhoto, newProfile.Age, newProfile.Language]);
    }


    async deleteProfile(profileID) {
        await this.db.query('DELETE FROM Profile WHERE ProfileID = ?', [profileID]);
    }
}

module.exports = ProfileService;
