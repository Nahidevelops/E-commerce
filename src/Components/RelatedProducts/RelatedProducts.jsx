import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data';
import Item from '../Items/Item'; 
const RelatedProducts = () => {
  return (
    <div className="relatedproducts">
      <h2>Related Products</h2>
      <hr/>
      <div className="relatedproducts-item">
        {data_product.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
