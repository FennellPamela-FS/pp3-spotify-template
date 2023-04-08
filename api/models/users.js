// Student Schema......
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const validateEmail = (email) => {
    // check for characters in front and behind the @ symbol 
    return (/^\S+@\S+\.\S+$/).test(email)
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email address is required',
        validate: [validateEmail, 'Email Invalid'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,

    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now  // show the time each name and class was created
    },
});

userSchema.pre('save', function (next) {
    const user = this;
    // if user is new then run or if we are modifying pass then run 
    if (user.isNew || user.isModified('password')) {
        // run hashing and salting
        bcrypt.genSalt(10, (error, salt) => {
            // salt each time 
            // if error the return error, if no error then run bcrypt hash on the password for each salt
            if (error) { return next(error) }
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    // reach for bcrypt compare to candidatePassword
    bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
        if (error) { return callback(error) }
        callback(null, isMatch) // if no error then return isMatch
    })
}

module.exports = mongoose.model('User', userSchema);