const {
  uploadImageToBucket,
  getPreSignedUrl
} = require("../repository/image-dao");

async function imageUpload(imageFile) {
  const bucket = "recipes-explorer";
  const objectKey = `images/${Date.now()}_${imageFile.originalname}`;
  const contentType = imageFile.mimetype;

  await uploadImageToBucket(bucket, objectKey, contentType, imageFile.buffer);

  const presignedUrl = await getPreSignedUrl(bucket, objectKey);

  return presignedUrl;
}

module.exports = { imageUpload };
