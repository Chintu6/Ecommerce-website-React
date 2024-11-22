import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <section className="text-center my-5">
        <h1>About Us</h1>
        <p className="lead">
          We are a passionate team dedicated to providing the best solutions for our customers.
        </p>
      </section>

      {/* Mission Section */}
      <section className="row my-5">
        <div className="col-md-6">
          <img
            src="https://img.freepik.com/free-vector/businessmen-working-woman-big-target-with-arrow-goals-objectives-business-grow-plan-goal-setting-concept-white-background_335657-2048.jpg?ga=GA1.1.686112454.1726510756&semt=ais_hybrid"
            alt="Our Mission"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h2>Our Mission</h2>
            <p>
              Our mission is to drive innovation and deliver exceptional products that make a real impact in the world. 
              We aim to empower our users with high-quality solutions that bring value to their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="text-center my-5">
        <h2>Meet Our Team</h2>
        <div className="row">
          <div className="col-md-4 my-3">
            <div className="card">
              <img
                src="https://img.freepik.com/premium-photo/portrait-businessman-smiling-conference-centre_107420-96790.jpg?ga=GA1.1.686112454.1726510756&semt=ais_hybrid"
                className="card-img-top"
                alt="Team Member 1"
              />
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">CEO & Founder</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-3">
            <div className="card">
              <img
                src="https://img.freepik.com/free-photo/portrait-handsome-smiling-businessman-office_1163-5471.jpg?ga=GA1.1.686112454.1726510756&semt=ais_hybrid"
                className="card-img-top"
                alt="Team Member 2"
              />
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">Head of Marketing</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-3">
            <div className="card">
              <img
                src="https://img.freepik.com/free-photo/inspiring-new-boss_1098-93.jpg?ga=GA1.1.686112454.1726510756&semt=ais_hybrid"
                className="card-img-top"
                alt="Team Member 3"
              />
              <div className="card-body">
                <h5 className="card-title">Alex Brown</h5>
                <p className="card-text">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="text-center my-5">
        <h2>Join Us</h2>
        <p className="lead">
          Want to be part of our team? Reach out and learn more about career opportunities with us.
        </p>
        <a href="/contact" className="btn btn-dark">Contact Us</a>
      </section>
    </div>
  );
};

export default About;

// import React from 'react';

// function Login() {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-gradient">
//       <div className="card p-" style={{ maxWidth: '500px', width: '100%' }}>
//         <h2 className="text-center mb-4">Login</h2>
//         <form>
//           <div className="form-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Username"
//             />
//           </div>
//           <div className="form-group mb-3">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//             />
//           </div>
//           <div className="text-right mb-3">
//             <a href="#" className="text-decoration-none">
//               Forgot Password?
//             </a>
//           </div>
//           <button type="button" className="btn btn-dark btn-block mb-3">
//             Login
//           </button>
//           <button type="button" className="btn btn-outline-dark btn-block">
//             <i className="fab fa-google mr-2"></i> Sign in with Google
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
