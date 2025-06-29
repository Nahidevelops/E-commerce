import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.jpg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    new_price: '',
    old_price: '',
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async () => {
    if (!formData.name || !formData.category || !formData.new_price || !formData.old_price || !image) {
      alert("⚠️ Please fill all fields and select an image.");
      return;
    }

    try {
      // ✅ 1. Upload image
      const imgForm = new FormData();
      imgForm.append('image', image); // ✔️ MUST match `upload.single("image")` in backend

      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: imgForm,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        alert("❌ Image upload failed.");
        console.error("Upload Error:", uploadData.message);
        return;
      }

      const imageUrl = uploadData.image_url;

      // ✅ 2. Submit product data
      const productResponse = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          image: imageUrl,
          category: formData.category,
          new_price: Number(formData.new_price),
          old_price: Number(formData.old_price),
        }),
      });

      const productResult = await productResponse.json();

      if (productResult.success) {
        alert("✅ Product added successfully!");
        setFormData({ name: '', category: '', new_price: '', old_price: '' });
        setImage(null);
        setPreview(null);
      } else {
        alert("❌ Failed to save product.");
        console.error("Save Error:", productResult.message);
      }

    } catch (err) {
      console.error("❌ Unexpected Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-form">
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={formData.name}
            onChange={handleInput}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>New Price</p>
          <input
            type="number"
            name="new_price"
            placeholder="₹ 0.00"
            value={formData.new_price}
            onChange={handleInput}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input
            type="number"
            name="old_price"
            placeholder="₹ 0.00"
            value={formData.old_price}
            onChange={handleInput}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Category</p>
          <select
            name="category"
            value={formData.category}
            onChange={handleInput}
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
      </div>

      <div className="addproduct-upload">
        <label htmlFor="file-input">
          <img
            src={preview || upload_area}
            alt="upload preview"
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          type="file"
          id="file-input"
          hidden
          accept="image/*"
          onChange={imageHandler}
        />

        <button className="addproduct-btn" onClick={submitHandler}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
