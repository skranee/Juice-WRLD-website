import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    role: {type: String, default: 'user'}
});

export default model('User', userSchema);
