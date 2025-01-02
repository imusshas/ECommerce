import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    // Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
    // File has been uploaded successfully
    // console.log("File is uploaded on cloudinary:", response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    // Remove the locally saved temporary file as the operation got failed
    fs.unlinkSync(localFilePath)
    console.log("File upload error on local server:", error);
    return null;
  }
}

export { uploadOnCloudinary };