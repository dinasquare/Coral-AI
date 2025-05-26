import { PutObjectCommandInput, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  try {
    // Create S3 client
    const s3Client = new S3Client({
      region: "ap-south-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    // Generate file key with timestamp to avoid name conflicts
    const file_key =
      "uploads/" + Date.now().toString() + "-" + file.name.replace(/ /g, "-");

    // Convert File object to ArrayBuffer and then to Uint8Array
    const fileBuffer = await file.arrayBuffer();
    const fileContent = new Uint8Array(fileBuffer);

    // Set up S3 upload params
    const params: PutObjectCommandInput = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: fileContent,
      // Body: file, // Use the File object directly
      ContentType: file.type, // Set proper content type
    };

    // Use command pattern instead of older S3 method
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return {
      file_key,
      file_name: file.name,
    };
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
  return url;
}