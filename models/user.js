const mongoose = require('mongoose');
const Answer = require('./answer');
const Question = require('./question');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 4,
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