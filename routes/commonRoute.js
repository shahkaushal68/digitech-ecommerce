const express = require('express')
const router = express.Router();
const { doUpload } = require("../controllers/tempController");
const { upload } = require('../utils/multer');


router.post('/', upload.array("image"), doUpload);


module.exports = router