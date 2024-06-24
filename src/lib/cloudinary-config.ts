const cloud = require('cloudinary').v2;

// Configure your cloud name, API key and API secret:

const cloudinaryConfig = cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

exports.cloudinaryConfig = cloudinaryConfig;
