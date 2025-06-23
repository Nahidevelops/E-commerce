import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // Create default cart structure
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < all_product.length; i++) {
      cart[all_product[i].id] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

 const addToCart = (itemId) => {
  console.log("Adding to cart:", itemId); 
  setCartItems((prev) => ({
    ...prev,
    [itemId]: prev[itemId] + 1,
  }));
};


 
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));
  };

  
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = all_product.find((product) => product.id === Number(itemId));
        total += item.new_price * cartItems[itemId];
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
  let totalItemCount = 0;
  for (const itemId in cartItems) {
    totalItemCount += cartItems[itemId];
  }
  return totalItemCount;
};


  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
