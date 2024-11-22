import React, { useState, useEffect, useContext } from "react";
import kidsCollectionData from './kids.json';
import homeFurnishingsData from './homefurnishing.json';
import festiveWeddingData from './festive.json';
import officeUniformsData from './office.json';
import seasonalCollectionData from './seasonal.json';
import './collections.css';
import { CartContext } from '../Cart/CartContext.jsx'; // Import CartContext
import { useWishlist } from "../Cart/wishlistContext.jsx"; // Import WishlistContext

const CollectionsPage = () => {
  const { addToCart } = useContext(CartContext); // Access CartContext
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Access WishlistContext
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState(""); // State to track wishlist message
  const [cartMessage, setCartMessage] = useState(""); // State to track cart message

  // Move the "All" category to the beginning
  const categories = [
    { category: 'All', data: [] }, // Show all items first
    { category: 'Kids Collection', data: kidsCollectionData.kidsCollection },
    { category: 'Home Furnishings', data: homeFurnishingsData.homeFurnishings },
    { category: 'Festive & Wedding Collection', data: festiveWeddingData.festiveWedding },
    { category: 'Office & School Uniforms', data: officeUniformsData.officeUniforms },
    { category: 'Seasonal Collection', data: seasonalCollectionData.seasonalCollection },
  ];

  useEffect(() => {
    // Load data for the selected category
    const selectedData = categories.find(cat => cat.category === selectedCategory);
    if (selectedData) {
      setData(selectedData.data || []);
    }
  }, [selectedCategory]);

  // Filter products based on selected category
  const filteredItems = selectedCategory === 'All'
    ? [].concat(...categories.slice(1).map(cat => cat.data)) // Show all items if 'All' is selected
    : data; // Use the data for the selected category

  // Sort the filtered items based on price
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0; // No sorting if sortOrder is null
  });

  // Handle sort option selection
  const handleSortSelect = (order) => {
    setSortOrder(order);
    setShowSortOptions(false); // Close dropdown after selection
  };

  // Handle add/remove from wishlist
  const handleWishlistAction = (product) => {
    const isInWishlist = wishlist.some((wishlistItem) => wishlistItem.id === product.id);

    if (isInWishlist) {
      removeFromWishlist(product.id); // Remove product from wishlist
      setWishlistMessage(`${product.name} removed from wishlist`); // Show floating message
    } else {
      addToWishlist(product); // Add product to wishlist
      setWishlistMessage(`${product.name} added to wishlist`); // Show floating message
    }

    setTimeout(() => setWishlistMessage(""), 3000); // Clear message after 3 seconds
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product); // Add to Cart
    setCartMessage(`${product.name} added to cart`); // Show floating message for cart
    setTimeout(() => setCartMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="container">
      {/* Category buttons */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.category}
            className={`category-btn ${selectedCategory === category.category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.category)}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Sort Button with Dropdown */}
      <div className="sort-container">
        <button onClick={() => setShowSortOptions(!showSortOptions)} className="sort-button">
          Sort by Price
        </button>

        {/* Dropdown for Sort Options */}
        {showSortOptions && (
          <div className="sort-options-dropdown">
            <button onClick={() => handleSortSelect('asc')} className="sort-option">
              Lowest to Highest
            </button>
            <button onClick={() => handleSortSelect('desc')} className="sort-option">
              Highest to Lowest
            </button>
          </div>
        )}
      </div>

      {/* Display sorted and filtered products */}
      <div className="products">
        {sortedItems.map((item) => (
          <div key={item.id} className="card" style={{ width: "18rem", margin: "10px" }}>
            <img
              src={item.imageUrl}
              className="card-img-top"
              alt={item.name}
              height={300}
              width={300}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Price: ₹{item.price}</p>
              <div className="card-actions">
                <button onClick={() => handleAddToCart(item)} className="btn btn-dark">
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button
                  onClick={() => handleWishlistAction(item)}
                  className="btn btn-light"
                >
                  <i className="fas fa-heart"></i> Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Wishlist Message */}
      {wishlistMessage && (
        <div className="floating-message">
          {wishlistMessage}
        </div>
      )}

      {/* Floating Cart Message */}
      {cartMessage && (
        <div className="floating-message">
          {cartMessage}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
