"use client"; 

import React, { createContext, useReducer, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Define action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const APPLY_DISCOUNT = 'APPLY_DISCOUNT';

// Create a reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    
    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };

    case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case APPLY_DISCOUNT:
      return { ...state, discount: action.payload };

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
  const [state, dispatch] = useReducer(cartReducer, { cart: [], discount: null });

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id: productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  const applyDiscount = (discount) => {
    dispatch({ type: APPLY_DISCOUNT, payload: discount });
  };

  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  const getTotal = () => {
    const subtotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    if (state.discount) {
      if (state.discount.type === 'fixed') {
        return Math.max(0, subtotal - state.discount.value).toFixed(2);
      } else if (state.discount.type === 'percentage') {
        return (subtotal * (1 - state.discount.value / 100)).toFixed(2);
      }
    }
    return subtotal.toFixed(2);
  };

  return (
    <CartContext.Provider value={{ 
        cart: state.cart, 
        cartCount, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        applyDiscount, 
        getTotal 
      }}>
      {children}
    </CartContext.Provider> 
  );
};
