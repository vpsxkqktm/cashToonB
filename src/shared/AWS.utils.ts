import * as AWS from "aws-sdk";
import * as fs from "fs";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const uploadS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  console.log(file);
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "cashtoon-uploader",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

export const MultipleUploadS3 = async (files, userId, folderName) => {
  const fileNames = await Promise.all(files.map((file) => file.filename));
  console.log(fileNames);
  return;
};
