const multer = require("multer");
const path = require("path");


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb(null, path.join(__dirname, "../public/images"));
        cb(null, "./public/images2");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const multerFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".mp4") {
        cb(new Error("File type is not supported"), false);
        return;
    }
    cb(null, true)
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000 }
})

module.exports = { upload }