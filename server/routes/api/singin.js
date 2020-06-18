const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //   Counter.find()
    //     .exec()
    //     .then((counter) => res.json(counter))
    //     .catch((err) => next(err));
    // });
  
    // app.post('/api/counters', function (req, res, next) {
    //   const counter = new Counter();
  
    //   counter.save()
    //     .then(() => res.json(counter))
    //     .catch((err) => next(err));
    // });

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

    app.post('/api/account/signin', (req, res, next) => {
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

        User.find({
            email: newEmail
        }).then(function(users) {

            if(users.length != 1) {
                return res.send({
                    success: false,
                    message: "Error: Invalid Password"
                })
            }
            
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
        })
    });

}