"use client"; 


import { useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20" />
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Total: ${getTotal()}</h2>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
