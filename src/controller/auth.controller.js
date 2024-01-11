const AuthService = require('../services/authService');

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    signup = async (req, res) => {
        const {username, password, role} = req.body;
        try {
            await this.authService.signup(username, password, role);
            res.status(201).send('User created succesfully!');
        } catch (err) {
            console.error('Error creating user: ' + err.message);
            res.status(500).send('Error creating user!');
        }
    };

    login = async (req, res) => {
        const {username, password} = req.body;

        try {
            const token = await this.authService.login(username, password);
            res.json({token});
        } catch (err) {
            console.error('Login error: ' + err.message);
            res.status(401).send('Invalid credentials!');
        }
    };

    protected = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).send('Unauthorized.');
        } else {
            try {
                await this.authService.verifyToken(token).then((decoded) => {
                    if (decoded.role === 'admin') {
                        // The admin has access to everything
                        res.json({
                            message: 'Access granted to admin page.',
                            user: decoded.username,
                            role: decoded.role
                        });
                    } else if (decoded.role === 'moderator') {
                        // The moderator has access to both the moderator and user page.
                        res.json({
                            message: 'Access granted to moderator page.',
                            user: decoded.username,
                            role: decoded.role
                        });
                    } else if (decoded.role === 'user') {
                        res.json({message: 'Access granted to user page.', user: decoded.username, role: decoded.role});
                    } else {
                        res.status(403).send('Forbidden');
                    }
                });
            } catch (err) {
                console.error('Token verification failed: ' + err.message);
                res.status(401).send('Unauthorized.');
            }
        }
    };

    updateRole = async (req, res) => {
        const {requesterID, targetUserID, newRole} = req.body;

        try {
            await this.authService.updateUserRole(requesterID, targetUserID, newRole);
            res.status(200).send('User role updated succesfully.');
        } catch (err) {
            console.error('Error updating user role: ' + err.message);
            res.status(403).send(err.message);
        }
    };
}

module.exports = AuthController;