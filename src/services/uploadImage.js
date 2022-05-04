// upload image to cloudinary
import axios from "axios";

export const uploadImage = async (files) => {
  const uploadders = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wsqrjnat");
    formData.append("cloud_name", "dzwzvvsd0");
    formData.append("api_key", "849689814161316");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    const res = await axios.post("https://api.cloudinary.com/v1_1/dzrz6n0r/image/upload", formData);
    return res.data.url;
  });

  const urls = await Promise.all(uploadders);

  return urls;
};
