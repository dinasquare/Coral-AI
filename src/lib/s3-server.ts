import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import os from "os";

export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };

      const obj = await s3.getObject(params);
      // Use OS's temp directory
      const tmpDir = 'D:\\tempo';
      // Ensure the directory exists
      fs.mkdirSync(tmpDir, { recursive: true });
      const file_name = path.join(tmpDir, `r${Date.now().toString()}.pdf`);

      if (obj.Body instanceof require("stream").Readable) {
        const file = fs.createWriteStream(file_name);
        file.on("open", function (fd) {
          // @ts-ignore
          obj.Body?.pipe(file).on("finish", () => {
            return resolve(file_name);
          });
        });
      }
    } catch (error) {
      console.error(error);
      reject(error);
      return null;
    }
  });
}