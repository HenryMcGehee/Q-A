const mongoose = require('mongoose');
const Question = require('./question');

const AnswerSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    answer: {
        type: String,
        require: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
}, {timestamps: true});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;