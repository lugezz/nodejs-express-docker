const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'User must have an username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8
    }
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'User must have a password'],
    //     validate: {
    //         // This only works on CREATE and SAVE!!!
    //         validator: function(el) {
    //             return el === this.password;
    //         }
    //     }
    // }
}); 

const User = mongoose.model('User', userSchema);

module.exports = User;