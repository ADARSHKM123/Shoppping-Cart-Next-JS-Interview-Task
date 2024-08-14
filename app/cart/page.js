"use client"; 

import { useEffect } from 'react';
import { useCart } from '../context/cartContext'; // Adjust the import path as needed
import './page.css'

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 headline_cart">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
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
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                  </td>
                  <td className="cart-item-price">
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                  </td>
                  <td className="cart-item-quantity">
                    <p>{item.quantity}</p>
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
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
