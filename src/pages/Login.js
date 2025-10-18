import React, { useState, useEffect } from "react";
import Categories from "../components/Categories";
import FreeCategory from '../components/FreeCategory';
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TurnstileWidget from "../utils/TurnstileWidget";

export default function Login() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const canonicalUrl = 'https://gtamodstation.com' + location.pathname;

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
        <Helmet>
          <title>Account | GTA ModStation</title>
          <meta name="description" content="Access your GTA ModStation account to manage custom requests, packages, and purchases." />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="robots" content="noindex,nofollow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Account | GTA ModStation" />
          <meta property="og:description" content="Access your GTA ModStation account to manage custom requests, packages, and purchases." />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content="https://gtamodstation.com/logo512.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Account | GTA ModStation" />
          <meta name="twitter:description" content="Access your GTA ModStation account to manage custom requests, packages, and purchases." />
          <meta name="twitter:image" content="https://gtamodstation.com/logo512.png" />
        </Helmet>
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
        <FreeCategory/>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Login | GTA ModStation</title>
        <meta name="description" content="Securely sign in to GTA ModStation to manage purchases, custom requests, and mods for your GTA FiveM servers." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="noindex,nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Login | GTA ModStation" />
        <meta property="og:description" content="Securely sign in to GTA ModStation to manage purchases, custom requests, and mods for your GTA FiveM servers." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://gtamodstation.com/logo512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login | GTA ModStation" />
        <meta name="twitter:description" content="Securely sign in to GTA ModStation to manage purchases, custom requests, and mods for your GTA FiveM servers." />
        <meta name="twitter:image" content="https://gtamodstation.com/logo512.png" />
      </Helmet>
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
    </>
  );
}
