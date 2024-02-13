const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "User",
        enum: ['User', 'Admin'],
    },
    cart: {
        type: [],
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }],
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    isBlocked: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;