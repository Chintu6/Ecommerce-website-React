import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import MensWearPage from "./Shop/Products.jsx";
import Hero from "./HeroSection/Hero.jsx";
import Collections from "./Collections/collections.jsx";
import About from "./About/about.jsx";
import Contact from "./Contact/contact.jsx";
import Cart from "./Cart/cart.jsx";
import Orders from "./Cart/orders.jsx";
import CartProvider from "./Cart/CartContext.jsx";
import OrderProvider from "./Cart/OrderContext.jsx";
import Login from "./UserAuth/Login.jsx";
import Signup from "./UserAuth/Signup.jsx";
import Account from "./Account/Account.jsx";
import Wishlist from "./Cart/wish.jsx"; 
import { WishlistProvider } from "./Cart/wishlistContext.jsx"; 
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userEmailOrMobile, setUserEmailOrMobile] = useState(""); // Track logged-in user

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "collections":
        return <Collections />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "mens":
      case "womens":
      case "newArrivals":
        return <MensWearPage category={activeCategory} />;
      case "orders":
        return isLoggedIn ? <Orders /> : <LoginRedirect />;
      case "cart":
        return isLoggedIn ? <Cart emailOrMobile={userEmailOrMobile} /> : <LoginRedirect />;
      case "wishlist": // Added Wishlist case
        return isLoggedIn ? <Wishlist /> : <LoginRedirect />;
      case "Login":
        return (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setUserName={setUserEmailOrMobile}
            setActiveCategory={setActiveCategory}
          />
        );
      case "account":
        return <Account />;
      case "Signup":
        return <Signup setActiveCategory={setActiveCategory} />;
      case "home":
      default:
        return <Hero />;
    }
  };

  const LoginRedirect = () => (
    <div className="text-center mt-5">
      <h4>You must be logged in to access this page.</h4>
      <button
        className="btn btn-primary mt-3"
        onClick={() => setActiveCategory("Login")}
      >
        Login
      </button>
    </div>
  );

  return (
    <WishlistProvider> {/* Wrap the app with WishlistProvider */}
      <OrderProvider>
        <CartProvider>
          <div className="App">
            <Navbar
              setActiveCategory={handleCategorySelect}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userName={userEmailOrMobile}
            />
            {renderContent()}
          </div>
        </CartProvider>
      </OrderProvider>
    </WishlistProvider> 
  );
}

export default App;
