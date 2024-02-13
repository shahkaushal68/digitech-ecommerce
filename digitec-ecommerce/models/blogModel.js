const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: String,
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisLiked: {
        type: Boolean,
        default: false
    },
    likeBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    disLikeBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    author: {
        type: String,
        default: "Admin"
    }
},
    {

        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true,

    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;