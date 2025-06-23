import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CartItems.css";


const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "SAVE10") {
      setDiscount(0.1); // 10% discount
      setPromoError("");
    } else {
      setDiscount(0);
      setPromoError("Invalid promo code");
    }
  };

  const subtotal = getTotalCartAmount();
  const discountAmount = subtotal * discount;
  const shippingFee = subtotal > 0 ? 4.99 : 0;
  const total = subtotal - discountAmount + shippingFee;

  return (
    <div className="cartitems">
      <h2>Your Shopping Cart</h2>

      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div className="cartitems-format" key={product.id}>
              <img
                src={product.image}
                alt=""
                className="carticon-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <p>{cartItems[product.id]}</p>
              <p>${(product.new_price * cartItems[product.id]).toFixed(2)}</p>

              
                <div className="cartitems-remove-icon" onClick={() => removeFromCart(product.id)}>×</div>


                
            </div>
          );
        }
        return null;
      })}


      <div className="cartitems-summary">
        <div className="summary-box">
          <h3>Order Summary</h3>

          <div className="summary-line">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="summary-line">
              <span>Discount:</span>
              <span>- ${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-line">
            <span>Shipping Fee:</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>

          <div className="summary-line total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Promo Box (Right-Aligned) */}
          <div className="promo-box-wrapper">
            <div className="promo-code-box">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>
            {promoError && <p className="promo-error">{promoError}</p>}
          </div>

          {subtotal > 0 && (
            <button className="checkout-btn">Proceed to Checkout</button>
          )}
          {subtotal === 0 && (
            <p className="empty-cart-msg">
              Your cart is empty. Add some items to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
