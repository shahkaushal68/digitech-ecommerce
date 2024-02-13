const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const { failResponse, successResponse, validationError } = require("../response");
const { transporter } = require('../utils/nodeMailer');


const register = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });
        if (isUserExist) return res.send(validationError("This email is already register"));
        const hasPassword = await bcrypt.hash(req.body.password, 10);
        //console.log("hasPassword------", hasPassword);
        const userResponse = await new User({ ...req.body, password: hasPassword }).save();
        //console.log("-----", userResponse);
        res.send(successResponse("Registeration Successfully", userResponse));


    } catch (error) {
        console.log("registration error", error);
        res.send(failResponse(error));
    }
}

const login = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });
        if (!isUserExist) return res.send(validationError("Please Register first"));
        const comparePassword = await bcrypt.compare(req.body.password, isUserExist.password);
        if (!comparePassword) return res.send(validationError("Password Dose not match!"));
        if (isUserExist && comparePassword) {
            const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRETE_KEY);
            res.send(successResponse("Login Successfully", { token }));
        }

    } catch (error) {
        console.log("login error", error);
        res.send(failResponse(error));
    }
}

const forgotPassword = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email });
        if (!isUserExist) return res.send(validationError("Please Enter Valid Email address"));
        var token = jwt.sign({ id: isUserExist?._id }, process.env.JWT_SECRETE_KEY, { expiresIn: "120s" });
        const setUserToken = await User.findByIdAndUpdate(isUserExist?._id, { verifyToken: token }, { new: true });
        if (setUserToken) {
            await transporter.sendMail({
                from: "kavadhruvik@gmail.com", // sender address
                to: req.body.email, // list of receivers
                subject: "Send Link For Change Password", // Subject line
                html: `This Link is Valid only for 2 mins: <a href="http://localhost:5001/newPassword/${setUserToken?._id}/${setUserToken?.verifyToken}">Click Here</a>`, // 
            });
            res.send(successResponse("Password Reset Link sent successfully"));
        }

    } catch (error) {
        console.log("login error", error);
        res.send(failResponse(error));
    }
}

module.exports = { register, login, forgotPassword }