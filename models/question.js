const mongoose = require('mongoose');
const Answer = require('./answer');
const User = require('./user');

const QuestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    question: {
        type: String,
        require: true,
    },
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
}, {timestamps: true});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;