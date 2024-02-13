const express = require('express');
const { addProduct, fetchAllProducts, wishListProduct, ratingProduct } = require('../controllers/productController');
const { checkAuth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/", fetchAllProducts);
router.post("/add", addProduct);
router.put("/wishlist", checkAuth, wishListProduct);
router.put("/rating", checkAuth, ratingProduct);

module.exports = router