"use client"; // Add this line at the top

import './styles/globals.css';
import ProductCard from './components/ProductCard ';
import { useState, useEffect } from 'react';
import { IoMdCart } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Image from 'next/image';  // Import the Image component
import logo from './img/logo.png'; // If the logo is in the img folder inside src
import './page.css';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <header className="header">
        <div className="logo">
        <FaCartShopping />
          <h2>Splendo</h2>
        </div>
        
        <div className="search-bar">  
          <input type="text" placeholder="Search for products, brands and more" />
          <button><FaSearch /></button>
        </div>
        
        <div className="inner-layer">
          <button className="login-button">Login</button>
          <button className="become-seller-button">Become a Seller</button>
          <button className="more-button">More</button>
          <div className="cart">
            <IoMdCart size={20} />
            <span>Cart</span>
          </div>
        </div>
      </header>
      
      <main>
        {/* <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1> */}
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
