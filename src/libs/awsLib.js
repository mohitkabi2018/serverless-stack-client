import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  console.log("Uploading to S3:", filename);

  // Explicitly set level: "private" instead of using Storage.vault
  const stored = await Storage.put(filename, file, {
    contentType: file.type,
    level: "private",
  });

  console.log("Upload successful:", stored);

  return stored.key; // returns the S3 key
}
