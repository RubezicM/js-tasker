let mongoose = require('mongoose');

let Answer = mongoose.model('Answer', {
    result: {
        type: String,
        required: true
    }
});

module.exports = { Answer };





