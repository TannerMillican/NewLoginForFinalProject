const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = (app) => {

    app.post('/api/account/signup', (req, res, next) => {

        const { body } =  req;
        const {
            userName,
            password,
        } = body;

        let {
            email
        } = body;

        if (!userName) {
            return res.send({
                success: false,
                message: 'Error: User Name cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }

        let newEmail = email.toLowerCase();

        User.find({
            email: newEmail,
        }).then(function(previousUsers) {

            for (let i = 0; i < previousUsers.length; i++) {
                if (previousUsers[i].email = newEmail) {
                    return res.send({
                        success: false,
                        message: 'Error: Email is already in use.'
                    })
                }
            };

            const newUser = new User();

            newUser.email = email;
            newUser.userName = userName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server errror.'
                    });
                }
                return res.send({
                    success: true,
                    message: 'User Account Created.'
                });
            });
        });
        
        

    });

    app.get('/api/account/signin', (req, res, next) => {

        const { query } = req;
        const { userName } = query;
        const { password } = query;

        let { email } = query;

        console.log(userName);
        console.log(password);
        console.log(email);

        if (!userName) {
            return res.send({
                success: false,
                message: "Error: User Name must be supplied."
            });
        };

        if (!email) {
            return res.send({
                success: false,
                message: "Error: Email must be supplied."
            });
        };

        if (!password) {
            return res.send({
                success: false,
                message: "Error: Password must be supplied."
            });
        }

        let newEmail = email.toLowerCase();
        console.log(newEmail)

        User.find({
            email: newEmail
        }).then(function(users) {

            if(users.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: Invalid Password"
                })
            }
            
            console.log(users);

            const user = users[0];

            if (!user.validPassword(password, user.password)) {
                return res.send({
                    success: false,
                    message: "Error: Invalid password"
                })
            }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server errror.'
                    });
                }
                return res.send({
                    success: true,
                    message: 'User Signed In.',
                    token: doc._id
                });
            });
        });
    });

    app.get('/api/account/verify', (req, res, next) => {
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }).then(function(sessions) {
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: Invalid"
                })
            } else {
                return res.send({
                    success: true,
                    message: "Good"
                })
            }
        })
    });

    app.get('/api/account/logout', (req, res, next) => {
        const { query } = req;
        const token = query.token;

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true
            }
        }).then(function(sessions) {
            
            return res.send({
                success: true,
                message: "Good"
            });
        });
    });

}