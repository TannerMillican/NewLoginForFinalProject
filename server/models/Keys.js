const mongoose = require('mongoose');

const KeysSchema = new mongoose.Schema({
    REACT_APP_CLIENT_ID: {
        type: String
    },
    REACT_APP_CLIENT_SECRET: {
        type: String
    },
    REACT_APP_ACCESS_TOKEN: {
        type: String
    }
});

module.exports = mongoose.model('Keys', KeysSchema);