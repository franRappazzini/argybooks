import * as dotenv from "dotenv";

import AWS from "aws-sdk";
import { Router } from "express";
import fs from "fs";

dotenv.config();
const { AWS_KEY, AWS_SECRET_KEY, BUCKET_NAME } = process.env;

const config = {
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
};
AWS.config.update(config);
const s3 = new AWS.S3();

const aws = Router();

aws.post("/upload", async (req, res) => {
  const file: any = req.files?.file;

  try {
    const putObject = {
      Bucket: BUCKET_NAME || "",
      Key: file.name,
      Body: file.data,
    };

    s3.putObject(putObject, (err, data) => {
      if (err) throw err;
    });

    res.status(201).json({ message: "Book uploaded successfully!" });
  } catch (err) {
    res.status(400).json({ response: err });
  }
});

aws.get("/download", async (req, res) => {
  const { name }: any = req.query;

  try {
    const bucketAndKey = {
      Bucket: BUCKET_NAME || "",
      Key: `${name}.pdf`,
    };

    s3.getObject(bucketAndKey, async (err, data: any) => {
      if (err) throw err;
      res.json({ data: await data.Body });
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

export default aws;
