import './hero.css';
import Join from './Join';
import Latest from './Latest';
import FAQ from './FAQs';
import Footer from './Footer';
import img1 from './img4.jpg';

function Hero1() {
    return (
        <>
        <div className="container py-5">
        <h1 style={{ textAlign: 'center' }}>Discover Your Perfect Outfit in Minutes</h1>
          <header className="text-center mb-5" >
            <p className="lead">Our user-friendly website makes shopping a breeze. Browse through our extensive collection, select your favorites, and enjoy a seamless checkout experience.</p>
          </header>
          
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src='https://plus.unsplash.com/premium_photo-1674719144843-690e33f9b2f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGJ1bmNoJTIwb2YlMjBjbG90aHN8ZW58MHx8MHx8fDA%3D' className="card-img-top" alt="Easy Browsing for All Your Clothing Needs" />
                <div className="card-body">
                  <h2 className="card-title">Easy Browsing for All Your Clothing Needs</h2>
                  <p className="card-text">Navigate effortlessly through our categories to find exactly what you're looking for.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src="https://plus.unsplash.com/premium_photo-1673356302067-aac3b545a362?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGJ1bmNoJTIwb2YlMjBjbG90aHN8ZW58MHx8MHx8fDA%3D" className="card-img-top" alt="Select Your Favorites with Just a Click" />
                <div className="card-body">
                  <h2 className="card-title">Select Your Favorites with Just a Click</h2>
                  <p className="card-text">Add items to your cart or wishlist with ease.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={img1} className="card-img-top" alt="Secure Checkout for a Hassle-Free Experience" />
                <div className="card-body">
                  <h2 className="card-title">Secure Checkout for a Hassle-Free Experience</h2>
                  <p className="card-text">Complete your purchase with our secure payment options.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button className="btn btn-light px-4">Buy</button>
            <a href="#" className="link-dark mx-3">Learn More</a>
          </div>
        </div>
        <div className="container px-4 py-5">
          <h2 className="pb-2 border-bottom">What Sets Us Apart</h2>
          <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
            <div className="col d-flex flex-column align-items-start gap-2">
              <h2 className="fw-bold text-body-emphasis">Explore Our Premium Features</h2>
              <p className="text-body-secondary">
                Sri Vitteshlwara Textiles brings you a host of premium features designed to enhance your shopping experience. Our user-friendly wishlist and cart functionality allow you to easily save and revisit your favorite items. With our commitment to safe and reliable delivery, we ensure that your orders arrive in pristine condition. From elegant men’s and women’s wear to vibrant festive and seasonal collections, we offer a diverse range of clothing to suit every occasion. Whether it’s a casual look or something for a special event, our high-quality textiles are sure to meet your needs.
              </p>
              <a href="#" className="btn btn-outline-dark btn-md"> Learn More</a>
            </div>
            <div className="col">
              <div className="row row-cols-1 row-cols-sm-2 g-4">
                <div className="col d-flex flex-column gap-2">
                  <h4 className="fw-semibold mb-0 text-body-emphasis">High-Quality Fabrics for Every Occasion</h4>
                  <p className="text-body-secondary">Premium fabrics for casual, festive, and special occasions.</p>
                </div>
                <div className="col d-flex flex-column gap-2">
                  <h4 className="fw-semibold mb-0 text-body-emphasis">Safe and Reliable Delivery</h4>
                  <p className="text-body-secondary">Safe, timely delivery ensuring perfect condition, every time.</p>
                </div>
                <div className="col d-flex flex-column gap-2">
                  <div className="feature-icon-small d-inline-flex bg-gradient fs-4 rounded-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                      <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                    </svg>
                  </div>
                  <h4 className="fw-semibold mb-0 text-body-emphasis">Wishlist</h4>
                  <p className="text-body-secondary">Save and revisit your favorite items effortlessly.</p>
                </div>
                <div className="col d-flex flex-column gap-2">
                  <div className="feature-icon-small d-inline-flex bg-gradient fs-4 rounded-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                  </div>
                  <h4 className="fw-semibold mb-0 text-body-emphasis">Easy Cart</h4>
                  <p className="text-body-secondary">Easily manage and streamline your shopping experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Join />
        <Latest />
        <FAQ />
        <Footer />
        </>
    );
}

export default Hero1;
