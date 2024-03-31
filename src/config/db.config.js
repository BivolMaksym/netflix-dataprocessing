const mysql = require('mysql');
require('dotenv').config();

class DB {
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'qwerty',
            database: 'netflix',
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('MySQL connection failed: ' + err.stack);
                process.exit(1);
            }
            //console.log('Connected to MySQL database');
        });
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    getUserByID(userID) {
        const sql = 'SELECT * FROM user WHERE id = ?';
        return this.query(sql, [userID]);
    }

    getAllUsers() {
        const sql = 'SELECT * FROM user';
        return this.query(sql);
    }

    updateUser(userID, userData) {
        const {Username, Email, Password, ActivationStatus, LoginAttempts, BlockStatus, FreeDaysLeft} = userData
        const sql = 'UPDATE user SET Username = ?, Email = ?, Password = ?, ActivationStatus = ?, LoginAttempts = ?, BlockStatus = ?, FreeDaysLeft = ? WHERE id = ?';
        return this.query(sql, [Username, Email, Password, ActivationStatus, LoginAttempts, BlockStatus, FreeDaysLeft, userID]);
    }

    updateUserRole(userID, newRole) {
        const sql = 'UPDATE user SET role = ? WHERE id = ?';
        return this.query(sql, [newRole, userID]);
    }

    deleteUser(userID) {
        const sql = 'DELETE FROM user WHERE id = ?';
        return this.query(sql, [userID]);
    }
}

module.exports = DB;
