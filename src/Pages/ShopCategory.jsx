import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="shop-category">
      <img src={props.Banner} alt="Banner" className="shopcategory-banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1–12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          <select className="sort-dropdown">
         <option>Sort by</option>
        <option>Price Low to High</option>
         <option>Price High to Low</option>
        </select>

        </div>
      </div>

      <div className="shopcategory-products">
        {all_product.map((item, index) => {
          if (item.category === props.category) {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="shopcategory-loadmore">
  <button>Explore More</button>
</div>
    </div>
    
  );
};

export default ShopCategory;
