
const jwt = require('jsonwebtoken');
const { unauthorized, validationError } = require('../response');
const User = require('../models/userModel');

const checkAuth = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.send(unauthorized("Token is Required!"));
    }
    token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
        jwt.verify(token, process.env.JWT_SECRETE_KEY, function (err, decoded) {
            //console.log("err",err); 
            if (err) return res.send(unauthorized("Token is Invalid"));
            if (decoded) {
                //console.log("decoded-----", decoded);
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.send(unAuthorized("You are not authnticated"));
    }
}
const checkOwnUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        next()
    } else {
        return res.send(validationError("You are not allow to edit other user profile"));
    }
}
const checkIsAdmin = async (req, res, next) => {
    const checkRole = await User.findById(req.user.id);
    //console.log("checkRole", checkRole);
    if (checkRole?.role !== "Admin") {
        return res.send(validationError("Only Admin Can Allow"));
    } else {
        next();
    }
}

module.exports = { checkAuth, checkIsAdmin, checkOwnUser }