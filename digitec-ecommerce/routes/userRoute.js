const express = require('express');
const router = express.Router();
const { fetchAllUser, fetchSingleUser, updateUser, blockUser, unBlockUser } = require('../controllers/userController');
const { checkAuth, checkOwnUser, checkIsAdmin } = require('../middlewares/authMiddleware');


router.get("/", checkAuth, checkIsAdmin, fetchAllUser);
router.get("/:id", fetchSingleUser);
router.put("/edit/:id", checkAuth, checkOwnUser, updateUser);
router.put("/blocked/:id", checkAuth, checkIsAdmin, blockUser);
router.put("/unBlocked/:id", checkAuth, checkIsAdmin, unBlockUser);

module.exports = router