import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = ({ setActiveCategory }) => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email or Mobile Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const mobileRegex = /^\d{10}$/; // Mobile number must be 10 digits
    if (!emailRegex.test(emailOrMobile) && !mobileRegex.test(emailOrMobile)) {
      newErrors.emailOrMobile = "Enter a valid email or 10-digit mobile number.";
    }

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 chars, 1 upper, 1 lower, 1 digit
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number.";
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        emailOrMobile,
        password,
      });

      if (response.status === 201) {
        setSignupSuccess(true);
        alert("Signup successful! Please login.");
        setActiveCategory("Login"); // Redirect to Login page
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Signup failed. Please try again.";
      setErrors({ apiError: errorMessage });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h3 className="signup-heading">Sign Up</h3>
        <form onSubmit={handleSignup}>
          {/* Email or Mobile */}
          <div className="mb-3">
            <label htmlFor="emailOrMobile" className="form-label signup-label">
              Email or Mobile Number
            </label>
            <input
              type="text"
              className={`form-control signup-input ${errors.emailOrMobile ? "is-invalid" : ""}`}
              id="emailOrMobile"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              placeholder="Enter email or mobile number"
              required
            />
            {errors.emailOrMobile && (
              <div className="invalid-feedback">{errors.emailOrMobile}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label signup-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control signup-input ${errors.password ? "is-invalid" : ""}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label signup-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control signup-input ${errors.confirmPassword ? "is-invalid" : ""}`}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          {/* API Error */}
          {errors.apiError && <p className="text-danger">{errors.apiError}</p>}

          <button type="submit" className="btn btn-dark signup-button">
            Sign Up
          </button>
        </form>
        {signupSuccess && (
          <div className="text-success mt-3">
            Signup successful! Redirecting to login...
          </div>
        )}
        <div className="signup-login-link">
          <small>
            Already have an account?{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => setActiveCategory("Login")}
            >
              Log In
            </button>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
