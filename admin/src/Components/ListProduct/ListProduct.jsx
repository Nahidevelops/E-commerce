import React, { useEffect, useState } from 'react';
import './ListProduct.css';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproduct');
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  const removeProduct = async (id, name) => {
    try {
      const res = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name })
      });

      const result = await res.json();
      if (result.success) {
        alert(`✅ ${name} removed successfully.`);
        fetchInfo(); // refresh the list
      } else {
        alert("❌ Failed to remove product.");
      }
    } catch (err) {
      console.error("❌ Remove error:", err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      
      <div className="listproduct-format-main listproduct-header">
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <div key={index} className="listproduct-format-main">
            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>₹{product.old_price}</p>
            <p>₹{product.new_price}</p>
            <p>{product.category}</p>
            <button
              className="listproduct-remove-btn"
              onClick={() => removeProduct(product.id, product.name)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
