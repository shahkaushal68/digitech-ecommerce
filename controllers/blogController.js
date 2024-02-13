const Blog = require("../models/blogModel");
const { failResponse, successResponse } = require("../response");
const { use } = require("../routes");

const createBlog = async (req, res) => {
    try {
        const addBlogData = await new Blog(req.body).save();
        res.send(successResponse("blog added successfully", addBlogData));
    } catch (error) {
        //console.log("error", error);
        res.send(failResponse(error));
    }
}

const fetchAllBlog = async (req, res) => {
    try {
        const fetchBlogData = await Blog.find().populate("likeBy");
        res.send(successResponse("get All Blogs successfully", fetchBlogData));
    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error));
    }
}

const fetchSingleBlog = async (req, res) => {
    try {
        const fetchSingleBlogData = await Blog.findById(req.params.id);
        const updateView = await Blog.findByIdAndUpdate(req.params.id, {
            $inc: { numViews: 1 }
        }, { new: true });
        res.send(successResponse("get Blog successfully", fetchSingleBlogData));
    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error));
    }
}

const likeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;
        const blog = await Blog.findById(blogId);
        //console.log("Id====", { blogId, userId });
        const blogAlreadyDisliked = !!blog.disLikeBy.find((saveId) => saveId.toString() === userId.toString());

        if (blogAlreadyDisliked) {
            const updateBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { disLikeBy: userId },
                    isDisLiked: false
                },
                {
                    new: true
                }
            )
            res.send(successResponse("Like Blog successfully", updateBlog));
        }

        if (blog.isLiked) {
            const updateBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { likeBy: userId },
                    isLiked: false,
                },
                { new: true }
            )
            res.send(successResponse("Like Blog successfully", updateBlog));
        } else {
            const updateBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $push: { likeBy: userId },
                    isLiked: true,
                },
                { new: true }
            )
            res.send(successResponse("Like Blog successfully", updateBlog));
        }

    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error));
    }
}

const disLikeBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;
        const blog = await Blog.findById(blogId);
        //console.log("Id====", { blogId, userId });
        const blogAlreadyLiked = !!blog?.likeBy?.find((saveId) => saveId.toString() === userId.toString());

        //console.log("blogAlreadyLiked----------", blogAlreadyLiked);

        if (blogAlreadyLiked) {
            const updateBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { likeBy: userId },
                    isLiked: false
                },
                {
                    new: true
                }
            )
            res.send(successResponse("Dislike Blog successfully", updateBlog));
        }

        if (blog.isDisLiked) {
            const updateBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $pull: { disLikeBy: userId },
                    isDisLiked: false,
                },
                { new: true }
            )
            res.send(successResponse("Dislike Blog successfully", updateBlog));
        } else {
            const updateBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    $push: { disLikeBy: userId },
                    isDisLiked: true,
                },
                { new: true }
            )
            res.send(successResponse("Dislike Blog successfully", updateBlog));
        }

    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error));
    }
}


module.exports = { createBlog, fetchAllBlog, fetchSingleBlog, likeBlog, disLikeBlog }