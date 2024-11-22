import img1 from './img2.jpg';
import Hero1 from './Hero1';
function Hero() {
    return (
        <>
            <div className="container my-5">
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Discover Your Perfect Look </h1>
                        <p className="lead">Explore our wide range of stylish clothes for men and women, perfect for every occasion. Whether you’re looking for something traditional or modern, we’ve got you covered. Shop now and give your wardrobe a fresh upgrade with our unique styles!</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <button type="button" className="btn btn-dark btn-lg px-4 me-md-2 fw-bold">Order Now</button>
                           </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img className="rounded-lg-3" src={img1} alt="" width="400" />
                    </div>
                </div>
            </div>
            <Hero1 />
        </>
    );
}

export default Hero;
