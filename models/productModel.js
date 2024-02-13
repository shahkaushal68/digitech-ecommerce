const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowerCase: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }],
    category: {
        type: String
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "HP"]
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0,
        select: false
    },
    color: {
        type: String,
        enum: ["Black", "Red", "White"]
    },
    ratings: [
        {
            star: Number,
            ratedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    totalRating: {
        type: Number,
        default: 0
    }

},
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;