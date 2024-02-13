const express = require('express');
const router = express.Router();

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const blogRouter = require("./blogRoute");
const commonRouter = require("./commonRoute");

// middleware that is specific to this router
router.use("/v1/auth", authRouter);
router.use("/v1/user", userRouter);
router.use("/v1/product", productRouter);
router.use("/v1/blog", blogRouter);
router.use("/v1/upload", commonRouter);

module.exports = router