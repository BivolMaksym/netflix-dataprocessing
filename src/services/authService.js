const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const DB = require('../config/db.config')
const Auth = require('../auth');

class AuthService {
    constructor() {
        this.db = new DB();
        this.auth = new Auth('ffd6457677c8c2c39e7d21f440d9458125caeebbd882845a357a5e89d23db51c');
    }

    async userNameExists(username) {
        const exisitingUser = await this.getUserByUsername(username);
        return !!exisitingUser; //Returns true if user exists.
    }

    async signup(username, password, role = 'user') {
        const usernameAlreadyExists = await this.userNameExists(username);
        const db = this.db;
        console.log('signup');
        if (usernameAlreadyExists) {
            throw new Error('Username already exists. Please choose a different username.');
        }

        bcrypt.genSalt(10, function (err, salt) {

            bcrypt.hash(password, salt, function (err, hash) {
                const sql = 'INSERT INTO user (username, password, role) VALUES (?, ?, ?)';
                db.query(sql, [username, hash, role]).then(() => {
                    console.log('opgeslagen');
                });
            });
        });

    }

    async login(username, password) {
        try {
            const user = await this.getUserByUsername(username);

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        console.log('return token');
                        resolve(this.auth.generateToken(user));
                    } else {
                        reject(new Error('Invalid credentials!'));
                    }
                });
            });
        } catch (err) {
            throw new Error('Login error: ' + err.message);
        }
    }

    async verifyToken(token) {
        return this.auth.verifyToken(token);
    }

    async getUserByID(userID) {
        const result = await this.db.getUserByID(userID);
        return result.length === 1 ? new User(result[0].id, result[0].username, result[0].password, result[0].role) : null;
    }

    async getAllUsers() {
        const results = await this.db.getAllUsers();
        return results.map((result) => new User(result.id, result.username, result.password, result.role));
    }

    async updateUser(userID, userData) {
        await this.db.updateUser(userID, userData);
    }

    async updateUserRole(requesterID, targetUserID, newRole) {
        await this.db.updateUserRole(targetUserID, newRole);
    }

    async deleteUser(userID) {
        await this.db.deleteUser(userID);
    }

    async getUserByUsername(username) {


        const sql = `SELECT *
                     FROM user
                     WHERE username = '${username}'`;

        return this.db.query(sql, [username]).then((r) => {
            let user = new User();

            if (r.length === 1) {

                user.userID = r[0].UserID;
                user.username = r[0].Username;
                user.password = r[0].Password;
                user.role = r[0].role;
                return user;

            } else {
                console.log('user niet gevonden / of meerder users gevonden');
            }
        });

    }
}

module.exports = AuthService;