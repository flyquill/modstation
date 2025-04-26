import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Addons from '../components/Addons';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://program-risks.gl.at.ply.gg:3727/fiveM/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setMessage(`Welcome ${data.user.username}`);
        setLoggedInUser(data.user);
        // ⚠️ Storing only the username, avoid storing API key here
        localStorage.setItem('loggedInUser', JSON.stringify({ username: data.user.username }));
      } else {
        setMessage(data.message || 'Invalid login');
      }
    } catch (err) {
      setMessage('Login failed. Check network or server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setMessage('Logged out successfully');
  };

  if (loggedInUser) {
    return (
      <>
        <div className="container mt-5">
          <h4>Hello {loggedInUser.username}</h4>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
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
          <input type="text" name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
