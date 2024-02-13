const { successResponse, failResponse } = require("../response");
const { cloudinaryUploading } = require("../utils/cloudinary");

const doUpload = async (req, res) => {
    //console.log("req.files", req.files);
    try {
        let urls = [];
        for (let eachFile of req.files) {
            //console.log("file--", file);
            const testReslt = await cloudinaryUploading(eachFile.path);
            //console.log("testResult-----", testReslt);
            urls.push(testReslt.public_id);
            //flushSync.unlinksync(eachFile.path)
        }
        res.send(successResponse("Upload Successfully", urls));
    } catch (error) {
        console.log("error", error);
        res.send(failResponse(error))
    }
}

module.exports = { doUpload }