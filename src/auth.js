const jwt = require('jsonwebtoken');

class Auth {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    generateToken(user) {
        return jwt.sign({id: user.userID, username: user.username, role: user.role}, this.secretKey, {expiresIn: '1h'});
    }

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            });
        });
    }
}

module.exports = Auth;