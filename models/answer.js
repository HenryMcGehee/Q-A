const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    answer: {
        type: String,
        require: true,
    },
}, {timestamps: true});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;