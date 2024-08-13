import './ProductCard.css';
import { useState } from 'react';
import { useCart } from '../context/cartContext';

const ProductCard = ({ product, Onchange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useCart();  // Destructure addToCart from useCart

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddToCart = () => {
    addToCart(product);  // Call addToCart from useCart

    // Call Onchange and pass a custom message or the product to indicate success
    if (Onchange) {
      Onchange({ product, message: 'Product added to cart successfully' });
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <div className="ImagesBox">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover rounded-md"
        />
      </div>
      <div className='product_details'>
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-500 mt-1 pricing">${product.price.toFixed(2)}</p>
        <p className={`description ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {product.description}
        </p>
        <button 
          className="text-blue-500 mt-2"
          onClick={handleToggle}
        >
          {isExpanded ? 'Less' : 'More'}
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full addtocart"
          onClick={handleAddToCart}  // Call handleAddToCart on button click
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
