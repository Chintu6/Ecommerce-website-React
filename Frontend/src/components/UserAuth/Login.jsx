import React, { useState } from "react";
import "./Login.css";

function Login({ setIsLoggedIn, setUserName, setActiveCategory }) {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Track errors

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrMobile, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();

      // Extract username and capitalize
      const name = emailOrMobile.split("@")[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      setUserName(capitalizedName);

      // Save login status and user details in localStorage
      localStorage.setItem("user", JSON.stringify({ emailOrMobile, name: capitalizedName }));

      setIsLoggedIn(true);
      setActiveCategory("home");
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-heading">Log In</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="emailOrMobile" className="form-label login-label">
              Email or Mobile
            </label>
            <input
              type="text"
              id="emailOrMobile"
              className="form-control"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              placeholder="Enter email or mobile number"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-dark w-100">
            Log In
          </button>
        </form>
        <p className="signup-link">
          Not registered?{" "}
          <span className="text-primary" onClick={() => setActiveCategory("Signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
