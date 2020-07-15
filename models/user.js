const mongoose = require('mongoose');
const Answer = require('./answer');
const Question = require('./question');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        //require: true,
    },
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }],

});

const User = mongoose.model('User', UserSchema);

module.exports = User;