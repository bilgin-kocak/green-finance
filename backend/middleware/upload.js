const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const s3Client = require("../config/s3");
const OSS = require("ali-oss");
const client = require("../config/oss");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const uploadToS3 = async (file) => {
//   const upload = new Upload({
//     client: s3Client,
//     params: {
//       Bucket: "devconnect-hackathon",
//       Key: `${Date.now()}-${file.originalname}`,
//       Body: file.buffer,
//     },
//   });

//   const data = await upload.done();
//   return data.Location;
// };

const uploadToOSS = async (file) => {
  try {
    const result = await client.put(
      `${Date.now()}-${file.originalname}`,
      file.buffer
    );
    return result.url;
  } catch (error) {
    console.error("Error uploading to OSS:", error);
    throw error;
  }
};

module.exports = { upload, uploadToOSS };
