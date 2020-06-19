const Keys = require('../../models/Keys');

module.exports = (app) => {
    app.get('/api/keys', (req, res, next) => {
        Keys.find({}).then(function(keys) {
            res.json(keys);
        });
    });
}