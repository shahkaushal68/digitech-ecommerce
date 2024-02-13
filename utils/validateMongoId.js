const mongoose = require("mongoose");

const validateMongoId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);

}

module.exports = validateMongoId;
