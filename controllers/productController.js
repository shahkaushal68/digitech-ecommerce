const slugify = require('slugify')
const { successResponse, failResponse } = require("../response");
const Product = require('../models/productModel');
const { query } = require('express');
const User = require('../models/userModel');
const { get } = require('mongoose');


const addProduct = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, {
                replacement: '-',
                lower: true,
                trim: true
            })
        }
        const addProductData = await new Product(req.body).save();
        res.send(successResponse("Product added Successfully", addProductData));
    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error))
    }
}

const fetchAllProducts = async (req, res) => {
    try {

        //--------------------------Advanced Filtering-------------------------
        const excludeFields = ["sort", "page", "limit", "fields"];
        const queryObj = { ...req.query };
        excludeFields.forEach((el) => {
            delete queryObj[el]
        });
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        //queryStr = JSON.parse(queryStr);

        let query = Product.find(JSON.parse(queryStr));
        //---------------------------Sorting --------------------------------
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy)
        } else {
            query = query.sort("-createdAt");
        }
        //------------------------limiting fields--------------------------------
        if (req.query.fields) {
            const limitFields = req.query.fields.split(",").join(" ");
            query = query.select(limitFields);
        } else {
            query = query.select("-__v");
        }
        //------------------------Pagination-----------------------------------------
        const page = req.query.page * 1 || 1 // Multiply by 1 bcz convert string value into number
        const limit = req.query.limit * 1 || 5
        //for Page 1 data 1 to 10 -- for page data 11 to 20
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productsCount = await Product.countDocuments();
            if (skip >= productsCount) return res.send(failResponse("This page is not found!"))
        }

        /*----------------------another Method based on Mongoose opertaor   ------------------------------------*/

        // const allProductData2 = await Product.find()
        //     .where("price")
        //     .gte(req.query.price)
        //     .where("ratings")
        //     .lte(req.query.ratings);

        /*---------------------- ------------------------------------*/

        //Sorting

        const allProductData = await query;

        //console.log("==============allProductData", allProductData);

        res.send(successResponse("Product Fetch Successfully", allProductData));

    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error))
    }
}

const wishListProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.body.productId;
        const user = await User.findById(userId);
        //console.log("productId--------", productId);
        //console.log("user---------", user);
        const isAlreadyAdded = !!user?.wishList?.find((id) => id.toString() === productId.toString());
        //console.log("isAlreadyAdded-----------", isAlreadyAdded);
        if (isAlreadyAdded) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { wishList: productId }
                },
                {
                    new: true
                }
            )
            res.send(successResponse("wishlist Updeted", updatedUser));
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push: { wishList: productId }
                },
                {
                    new: true
                }

            )
            res.send(successResponse("wishlist Updeted", updatedUser));
        }

    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error))
    }
}


const ratingProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, ratings } = req.body
        //console.log({ userId, productId, ratings });
        const findProduct = await Product.findById(productId);
        console.log({ findProduct });
        const alreadyRatedByUser = findProduct.ratings.find((item) => item.ratedBy.toString() === userId.toString());
        //console.log("alreadyRatedByUser=", alreadyRatedByUser);
        if (alreadyRatedByUser) {
            await Product.findOneAndUpdate(
                {
                    ratings: { $elemMatch: alreadyRatedByUser }
                },
                {
                    $set: { "ratings.$.star": ratings }
                },
                {
                    new: true
                }
            )

        } else {
            await Product.findByIdAndUpdate(
                productId,
                {
                    $push: {
                        "ratings": {
                            star: ratings,
                            ratedBy: userId
                        }
                    }
                },
                {
                    new: true
                }
            )

        }
        const getTotalRatings = findProduct?.ratings?.length;
        console.log({ getTotalRatings });
        const sumOfAllRating = findProduct?.ratings?.map((rate) => rate.star).reduce((pre, curr) => pre + curr, 0);
        const actualRating = Math.round(sumOfAllRating / getTotalRatings);

        const finalProduct = await Product.findByIdAndUpdate(
            productId,
            {
                totalRating: actualRating
            },
            {
                new: true
            }
        )
        res.send(successResponse("", finalProduct))
    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error));
    }
}


module.exports = { addProduct, fetchAllProducts, wishListProduct, ratingProduct }