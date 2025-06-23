import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product", file); // 🔥 Yahi naam backend me bhi hai

    try {
      const res = await axios.post("http://localhost:4000/upload", formData);
      console.log(res.data);
      alert("Uploaded! Image URL: " + res.data.image_url);
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
