import React, { useState, useEffect, useContext } from "react";
import mensWearData from './mens.json';
import womensWearData from './womens.json';
import newarrivals from './newarrivals.json';
import './Mens.css';
import { CartContext } from '../Cart/CartContext.jsx';
import { useWishlist } from '../Cart/wishlistContext.jsx'; // Import Wishlist context

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <img src={product.imageUrl} className="card-img-top" alt={product.name} height={300} width={300} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Price: ₹{product.price}</p>
        <div className="card-actions">
          <button onClick={() => onAddToCart(product)} className="btn btn-dark">
            <i className="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button onClick={() => onAddToWishlist(product)} className="btn btn-light">
            <i className="fas fa-heart"></i> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryButton = ({ category, isActive, onClick }) => (
  <button
    className={`category-btn ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {category}
  </button>
);

const MensWearPage = ({ category }) => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState(null);
  const [cartMessage, setCartMessage] = useState(""); // State for cart message
  const [wishlistMessage, setWishlistMessage] = useState(""); // State for wishlist message
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useWishlist(); // Use Wishlist context

  useEffect(() => {
    switch (category) {
      case "mens":
        setData(mensWearData.mensWear);
        break;
      case "womens":
        setData(womensWearData.womensWear);
        break;
      case "newArrivals":
        if (newarrivals && newarrivals.newArrivals) {
          setData(newarrivals.newArrivals);
        } else {
          setData([]);
        }
        break;
      default:
        setData([]);
    }
  }, [category]);

  const filteredItems = selectedCategory === 'All'
    ? data.flatMap(cat => cat.items || [])
    : data.filter(cat => cat.category === selectedCategory).flatMap(cat => cat.items || []);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(`${product.name} added to cart`);
    setTimeout(() => {
      setCartMessage("");
    }, 3000);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setWishlistMessage(`${product.name} added to wishlist`);
    setTimeout(() => {
      setWishlistMessage("");
    }, 3000);
  };

  return (
    <div className="container">
      {cartMessage && <div className="floating-message">{cartMessage}</div>}
      {wishlistMessage && <div className="floating-message">{wishlistMessage}</div>}
      
      <div className="category-buttons">
        <CategoryButton category="All" isActive={selectedCategory === 'All'} onClick={() => setSelectedCategory('All')} />
        {data.map(cat => (
          <CategoryButton
            key={cat.id}
            category={cat.category}
            isActive={selectedCategory === cat.category}
            onClick={() => setSelectedCategory(cat.category)}
          />
        ))}
      </div>

      <div className="sort-container">
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="sort-button">
          Sort by Price ({sortOrder === 'asc' ? 'Lowest to Highest' : 'Highest to Lowest'})
        </button>
      </div>

      <div className="products">
        {sortedItems.length === 0 ? (
          <p>No products available in this category</p>
        ) : (
          sortedItems.map(product => (
            <ProductCard
              key={product.name}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MensWearPage;
