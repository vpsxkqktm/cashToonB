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
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  //console.log(objectName);
  //console.log(readStream);
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
  let fileNames = [];
  let createReadStream = [];
  const readStream = [];
  let locations = [];

  const file = await Promise.all(files);

  for (var key in file) {
    fileNames.push(file[key]["filename"]);
    createReadStream.push(file[key]["createReadStream"]);
    readStream.push(createReadStream[key]());
  }
  const objectName = fileNames.map(
    (item) => `${folderName}/${userId}-${Date.now()}-${item}`
  );
  // console.log(objectName[0]);
  // console.log(readStream[0]);

  for (var key in file) {
    const upload = await new AWS.S3()
      .upload({
        Bucket: "cashtoon-uploader",
        Key: objectName[key],
        ACL: "public-read",
        Body: readStream[key],
      })
      .promise();
    locations.push(upload.Location);
    // Locations.push(file[key]["Location"]);
    // console.log(upload);
  }
  return locations;
};
