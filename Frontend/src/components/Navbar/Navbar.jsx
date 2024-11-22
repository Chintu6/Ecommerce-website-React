import React, { useState } from 'react';
import './Navbar.css';
import logo from './logo.png';

function Navbar({ setActiveCategory, isLoggedIn, setIsLoggedIn, userName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Log out the user
    setActiveCategory("home"); // Redirect to home
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <img src={logo} alt="Logo" height={100} width={100} />
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" onClick={() => setActiveCategory("home")} className="nav-link px-2 link-dark">Home</a></li>
          
          <li
            className="nav-link px-2 link-dark position-relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Shop
            {isDropdownOpen && (
              <ul className="dropdown-menu show position-absolute">
                <li><a href="#" onClick={() => setActiveCategory("mens")} className="dropdown-item">Mens</a></li>
                <li><a href="#" onClick={() => setActiveCategory("womens")} className="dropdown-item">Womens</a></li>
                <li><a href="#" onClick={() => setActiveCategory("newArrivals")} className="dropdown-item">New Arrivals</a></li>

              </ul>
            )}
          </li>

          <li><a href="#" onClick={() => setActiveCategory("collections")} className="nav-link px-2 link-dark">Collections</a></li>

          {/* Conditionally render About and Contact Us links based on login state */}
          {!isLoggedIn && (
            <>
              <li><a href="#" onClick={() => setActiveCategory("about")} className="nav-link px-2 link-dark">About</a></li>
              <li><a href="#" onClick={() => setActiveCategory("contact")} className="nav-link px-2 link-dark">Contact Us</a></li>
            </>
          )}

          {/* Display Account and Wishlist links after login */}
          {isLoggedIn && (
            <>
              
              
              <li><a href="#" onClick={() => setActiveCategory("cart")} className="nav-link px-2 link-dark">Cart</a></li>

              <li><a href="#" onClick={() => setActiveCategory("wishlist")} className="nav-link px-2 link-dark">Wishlist</a></li>
              <li><a href="#" onClick={() => setActiveCategory("orders")} className="nav-link px-2 link-dark">Your Orders</a></li>
              <li><a href="#" onClick={() => setActiveCategory("account")} className="nav-link px-2 link-dark">Account</a></li>
            </>
          )}
        </ul>

        <div className="col-md-3 text-end">
          {isLoggedIn ? (
            <>
              <span className="me-3">{userName}</span>
              <button type="button" onClick={handleLogout} className="btn btn-outline-dark">Logout</button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setActiveCategory("Login")} className="btn btn-outline-dark me-2">Login</button>
              <button type="button" onClick={() => setActiveCategory("Signup")} className="btn btn-dark signup">Sign-up</button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
