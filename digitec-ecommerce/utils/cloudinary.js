const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUploading = async (imagePath) => {
    //console.log("imagePath-----------", imagePath);
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "kaushal-images",
            resource_type: "auto"

        });
        //console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = { cloudinaryUploading }