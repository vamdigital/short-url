const cloudinary = require('cloudinary').v2;
require('./cloudinary-config');
const apiSecret = cloudinary.config().api_secret;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUDNAME}/image/upload`;
const apiKey = cloudinary.config().api_key;

// Server-side function used to sign an upload with a couple of
// example eager transformations included in the request.
const signuploadform = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    apiSecret,
  );

  return { timestamp, signature };
};

const uploadCloudinaryData = async (data: {
  [key: string]: FormDataEntryValue;
}) => {
  const avatarFile = data.avatarUrl as File;
  const cloudFormData = new FormData();
  const cloudData = signuploadform();

  /** signed uplaods */
  cloudFormData.append('file', avatarFile);
  cloudFormData.append('api_key', apiKey);
  cloudFormData.append('timestamp', cloudData.timestamp.toString());
  cloudFormData.append('signature', cloudData.signature);
  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: cloudFormData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return `cloudinary upload failed, ${error}`;
  }
};

/** Unsigned uploads */
// cloudFormData.append('file', data.avatarUrl as File);
// cloudFormData.append('upload_preset', 'hyfzkbjt');
// cloudFormData.append('public_id', process.env.CLOUDINARY_ID as string);
// cloudFormData.append('api_key', process.env.CLOUDINARY_APIKEY as string);
// const response = await fetch(CLOUDINARY_URL, {
//   method: 'POST',
//   body: cloudFormData,
// });

// const result = await response.json();
// console.log({ result });

module.exports = {
  signuploadform,
  uploadCloudinaryData,
};
