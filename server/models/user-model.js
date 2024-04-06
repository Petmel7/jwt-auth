const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, uniqe: true, require: true },
    password: { type: String, require: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String }
})

module.exports = model('User', UserSchema);