const {
  uploadImageToBucket,
  getPreSignedUrl
} = require("../repository/image-dao");

async function imageUpload(imageFile) {
  try {
    if (!imageFile) {
      throw new Error("Missing image file");
    }

    const bucket = "recipes-explorer";
    const objectKey = `images/${Date.now()}_${imageFile.originalname}`;
    const contentType = imageFile.mimetype;

    await uploadImageToBucket(bucket, objectKey, contentType, imageFile.buffer);

    const presignedUrl = await getPreSignedUrl(bucket, objectKey);

    return presignedUrl;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { imageUpload };
