import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created_at: {
        type: Date
    }

}) 

export const User = mongoose.model('User', UserSchema);