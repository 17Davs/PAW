const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, 'Username is required!']
    },
    email:{
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email.']
    },
    pass:{
        type: String,
        required: [true, 'Password is required!']
    },
    admin:{
        type: Boolean,
        default: false
    },
    active:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

/* Hash password */
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.pass = await bcrypt.hash(this.pass, salt);
    next();
})

/* Log-In method */
userSchema.statics.login = async function(email, pass) {
    const user = await this.findOne({ email });

    if (user) {
        console.log(user);
        const auth = await bcrypt.compare(pass, user.pass);
        if (auth) {return user;}
    }
    throw Error('Email or Password incorrect.');
}

const User = mongoose.model('user', userSchema);
module.exports = User;