"use client"; 

import React, { createContext, useReducer, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Define action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Create a reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    
    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.payload.id);

    case UPDATE_QUANTITY:
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
};

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id: productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider> 
  );
};
