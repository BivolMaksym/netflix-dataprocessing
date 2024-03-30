const Profile = require('../models/profile.model');
const DB = require('../config/db.config');

class ProfileService {
    constructor() {
        this.db = new DB();
    }

    async getAllProfiles() {
        return await this.db.query('CALL get_all_profiles()');
    }

    async getProfileByProfileID(profileID) {
        return await this.db.query('CALL get_profile_by_id(?)', [profileID]);
    }

    async updateProfile(profileID, updatedProfile) { //validation was moved to sql
        return await this.db.query('CALL update_profile(?, ?, ?, ?, ?)',
            [profileID, updatedProfile.ProfileName, updatedProfile.ProfilePhoto, updatedProfile.Age, updatedProfile.Language]);
    }

    async createProfile(userID, newProfile) { //validation was moved to sql
        return await this.db.query('CALL create_profile(?, ?, ?, ?, ?, ?)',
            [newProfile.userID, newProfile.WatchlistID, newProfile.ProfileName, newProfile.ProfilePhoto, newProfile.Age, newProfile.Language]);
    }

    async deleteProfile(profileID) {
        return await this.db.query('CALL delete_profile(?)', [profileID]);
    }
}

module.exports = ProfileService;
