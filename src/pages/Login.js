import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import { useNavigate } from "react-router-dom";
import TurnstileWidget from "../utils/TurnstileWidget";

export default function Login() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      setMessage("⚠️ Please complete the CAPTCHA");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("password", formData.password);
      payload.append("cf-turnstile-response", turnstileToken);

      const response = await fetch(`${databaseApiUrl}login.php`, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (data.status === "success") {
        setMessage(`✅ Welcome ${data.user.username}`);
        setLoggedInUser(data.user);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            username: data.user.username,
            token: data.token,
            expires_at: data.expires_at,
          })
        );
      } else {
        setMessage(data.message || "Invalid login");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setMessage("Logged out successfully");
  };

  if (loggedInUser) {
    return (
      <>
        <div className="container mt-5">
          <h4>Hello {loggedInUser.username}</h4>
          <button onClick={handleLogout} className="btn btn-danger mx-2">
            Logout
          </button>
          <button
            onClick={() => {
              navigate("/custom_requests");
            }}
            className="btn btn-success mx-2"
          >
            View Custom Requests
          </button>
          <button
            onClick={() => {
              navigate("/editMenu");
            }}
            className="btn btn-primary mx-2"
          >
            Edit Menus
          </button>
        </div>
        <Categories />
      </>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Login</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <TurnstileWidget onVerify={setTurnstileToken} />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
