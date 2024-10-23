const {
  uploadImageToBucket,
  getPreSignedUrl
} = require("../repository/image-dao");

async function imageUpload(imageFile) {
  const bucket = "recipes-explorer";
  const objectKey = `images/${Date.now()}_${imageFile.name}`;
  const contentType = imageFile.type;

  await uploadImageToBucket(bucket, objectKey, contentType, imageFile);

  const presignedUrl = await getPreSignedUrl(bucket, objectKey);

  return presignedUrl;
}

module.exports = { imageUpload };
