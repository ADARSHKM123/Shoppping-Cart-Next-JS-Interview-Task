"use client"; 

import React, { useState } from 'react';
import { useCart } from '../context/cartContext'; // Adjust the import path as needed
import './page.css'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, applyDiscount, getTotal } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const handleDiscount = () => {
    if (discountCode === 'SAVE10') {
      applyDiscount({ type: 'percentage', value: 10 });
    } else if (discountCode === 'FIXED10') {
      applyDiscount({ type: 'fixed', value: 10 });
    } else {
      applyDiscount(null);
    }
  };

  const handleCheckout = () => {
    setCheckoutMessage('Thank you for your purchase! Your order has been placed.');
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-4 headline_cart">Shopping Cart</h1> */}
      {cart.length === 0 ? (
        <p className='empty_Cart'>Your cart is empty</p>
      ) : (
        <div>
          <div className='wholesome'>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="cart-item">
                    <td className="cart-item-image">
                      <img src={item.image} alt={item.name} className="product-image" />
                    </td>
                    <td className="cart-item-title">
                      <h2 className="text-lg font-semibold title-name">{item.title}</h2>
                    </td>
                    <td className="cart-item-price">
                      <p className="text-gray-700">${item.price.toFixed(2)}</p>
                    </td>
                    <td className="cart-item-quantity">
                      <div className="quantity-controls">
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="quantity-btn">-</button>
                        <span className="quantity-number">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                      </div>
                    </td>
                    <td className="cart-item-remove">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-total mt-4">
              <h2 className="text-xl font-bold">Total: ${getTotal()}</h2>
              
              <div className="discount-section">
              <p className="discount-egs">Eg:<span>SAVE10</span></p>
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="discount-input"
                />
                
                <button onClick={handleDiscount} className="discount-btn">Apply Discount</button>
              </div>
              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout
              </button>
              {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
