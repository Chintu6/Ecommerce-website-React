import React from "react";
import { useWishlist } from "./wishlistContext.jsx";
import "./wish.css"; // Assuming you have custom styling for wishlist

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Function to redirect user to the shop page
  const redirectToShop = () => {
    window.location.href = "/shop"; // Redirecting to the shop page
  };

  return (
    <div className="container">
      {wishlist.length === 0 ? (
        <div className="empty-wishlist-message">
          <h5>Your wishlist is empty.</h5>
          <p>Explore our collections now and add your favorite items to your wishlist!</p>
          <button onClick={redirectToShop} className="btn btn-dark shop-now-btn">
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="card" style={{ width: "18rem", margin: "10px" }}>
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.name}
                  height={200}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: ₹{item.price}</p>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="btn btn-danger"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
