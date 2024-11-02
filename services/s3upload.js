const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uuidv4() + "_" + file.originalname,
    Body: file.buffer,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = uploadFile;
