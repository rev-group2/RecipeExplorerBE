const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const AWS_REGION = "us-west-1";
const client = new S3Client({ region: AWS_REGION });
const { logger } = require("../util/logger");

async function uploadImageToBucket(Bucket, Key, mime, image) {
  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body: image,
    ACL: "public-read",
    ContentType: mime
  });

  try {
    await client.send(command);
    const imageUrl = `https://${Bucket}.s3.${AWS_REGION}.amazonaws.com/${Key}`;
    logger.info(`Uploaded image: ${imageUrl}`);
    return imageUrl;
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

module.exports = { uploadImageToBucket };
