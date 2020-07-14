const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        require: true,
    },
}, {timestamps: true});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;