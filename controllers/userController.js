
const User = require("../models/userModel");
const { successResponse, failResponse, validationError } = require("../response");
const validateMongoId = require("../utils/validateMongoId");

const fetchAllUser = async (req, res) => {
    try {
        const allUserData = await User.find({});
        res.send(successResponse("User Successfully fetch", allUserData));
    } catch (error) {
        //console.log(" error", error);
        res.send(failResponse(error));
    }
}

const fetchSingleUser = async (req, res) => {
    try {
        //console.log("req.user-------", req.user);
        res.send(successResponse("User Successfully fetch"));

    } catch (error) {
        //console.log(" error", error);
        res.send(failResponse(error));
    }
}

const updateUser = async (req, res) => {
    try {
        if (req.body.email) return res.send(validationError("Email Can't be updated"));
        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            mobile: req.body.mobile
        }
        const updateUserData = await User.findByIdAndUpdate(req.user.id, updatedData, {
            new: true
        })
        res.send(successResponse("User Successfully Updated", updateUserData));
    } catch (error) {
        //console.log(" error", error);
        res.send(failResponse(error));
    }
}

const deleteUser = async (req, res) => {
    try {
        console.log("req.user-------", req.user);
        res.send(successResponse("User Successfully fetch"));

    } catch (error) {
        //console.log(" error", error);
        res.send(failResponse(error));
    }
}

const blockUser = async (req, res) => {
    try {
        const isValid = validateMongoId(req.params.id)
        if (!isValid) return res.send(validationError("Id is incorrect"));
        const blockResponseData = await User.findByIdAndUpdate(req.user.id, { isBlocked: req.body.isBlocked }, {
            new: true
        })
        //console.log("blockResponse------", blockResponseData);
        res.send(successResponse("User blocked Successfully", blockResponseData));

    } catch (error) {
        console.log(" error", error);
        res.send(failResponse(error));
    }
}

const unBlockUser = async (req, res) => {
    try {
        console.log("req.user-------", req.user);
        res.send(successResponse("User unblocked Successfully"));

    } catch (error) {
        //console.log(" error", error);
        res.send(failResponse(error));
    }
}

module.exports = { fetchAllUser, fetchSingleUser, updateUser, deleteUser, blockUser, unBlockUser }