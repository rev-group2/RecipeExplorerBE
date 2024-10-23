const {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const AWS_REGION = "us-west-1";
const client = new S3Client({ region: AWS_REGION });
const { logger } = require("../util/logger");

async function uploadImageToBucket(Bucket, Key, mime, image) {
  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body: image,
    ContentType: mime,
    ContentEncoding: "base64"
  });

  try {
    const response = await client.send(command);
    logger.info(`Uploaded image: ${response}`);
    return response;
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
}

async function getPreSignedUrl(Bucket, Key) {
  try {
    const command = new GetObjectCommand({ Bucket, Key });
    const response = await getSignedUrl(client, command, { expiresIn: 3600 });
    logger.info(`Signed url: ${response}`);
    return response;
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
}

module.exports = { uploadImageToBucket, getPreSignedUrl };
