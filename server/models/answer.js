const mongoose = require('mongoose');
const _ = require('lodash');

const answerSchema = new mongoose.Schema({
    result: {
        type: String,
        required: true
    },
    function: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    correct: {
        type: Boolean,
        default: false
    }
});

answerSchema.statics.deleteOld = function (username) {
    let Answer = this;
    let limit = 5;

    return Answer.find({ creator: username }).then((answers) => {
        if (answers.length > limit) {
            let sortedAnswers = _.sortBy(answers, ['createdAt']);
            let timePoint = sortedAnswers[answers.length - limit - 1].createdAt;

            Answer.deleteMany({ creator: username, createdAt: { $lte: timePoint } }).then((answers) => {
                console.log(answers);
                return Promise.resolve(answers);
            });
        };

        return Promise.resolve();
    }).catch((err) => {
        return Promise.reject(err);
    });
};

const Answer = mongoose.model('Answer', answerSchema);

module.exports = { Answer };





