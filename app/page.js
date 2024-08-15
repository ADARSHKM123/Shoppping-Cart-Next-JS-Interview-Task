"use client"; // Add this line at the top

import './styles/globals.css';
import ProductCard from './components/ProductCard ';
import { useState, useEffect } from 'react';
import Header from './components/Header'; // Import the Header component
import './page.css';
import { useCart } from '../app/context/cartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [itemCount, setItemCount] = useState(0);  // Corrected the initial value to 0
  const { cart, removeFromCart } = useCart();
  

  const Onget = (change) => {
    console.log(change);
  };
 
  useEffect(() => {
    setItemCount(cart.length);
  }, [cart]);  // Updated the dependency array to cart

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Header itemCount={itemCount} /> {/* Use the Header component and pass itemCount as a prop */}
      
      <main className="main-content">
        <aside className="filters">
          <h3>Filters</h3>
          <div className="filter-category">
            <h4>Categories</h4>
            <ul>
              <li><input type="checkbox" /> Wearable Smart Devices</li>
              <li><input type="checkbox" /> Smart Watches</li>
            </ul>
          </div>
          <div className="filter-price">
            <h4>Price</h4>
            <input type="range" min="0" max="20000" />
            <div className="price-inputs">
              <input type="number" placeholder="Min" />
              <input type="number" placeholder="Max" />
            </div>
          </div>
          <div className="filter-brand">
            <h4>Brand</h4>
            <ul>
              <li><input type="checkbox" /> Brand A</li>
              <li><input type="checkbox" /> Brand B</li>
            </ul>
          </div>
          <div className="filter-ratings">
            <h4>Customer Ratings</h4>
            <ul>
              <li><input type="checkbox" /> 4★ & above</li>
              <li><input type="checkbox" /> 3★ & above</li>
            </ul>
          </div>
        </aside>
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} Onchange={Onget} />
          ))}
        </div>
      </main>
    </div>
  );
}
