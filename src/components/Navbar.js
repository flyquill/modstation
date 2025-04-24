import React from 'react';
import mainImage from '../images/home.jpg';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const categories = [
    { id: 2909711, name: 'Free' },
    { id: 2937606, name: 'Paid' }
  ];

  const isActive = (id) => location.search === `?=${id}`;

  return (
    <>
      <Link
        className="btn btn-outline-light position-fixed top-0 end-0 m-3 z-1030"
        id="cartToggleBtn"
        style={{ zIndex: 999 }}
        to="/cart"
      >
        <i className="bi bi-cart"></i> Cart
        <span
          id="cartCount"
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        ></span>
      </Link>

      <div className="position-relative">
        {/* Social Media Buttons */}
        <div className="position-absolute bottom-0 start-0 m-3 d-flex gap-2" style={{ zIndex: 10 }}>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-danger btn-sm">
            <i className="bi bi-youtube"></i>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <i className="bi bi-discord"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <i className="bi bi-facebook"></i>
          </a>
        </div>

        {/* Main Image */}
        <img src={mainImage} className="full-width-image mb-0" alt="Full Width" style={{marginLeft: '-1px'}}/>
      </div>


      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="your-logo.png" alt="Logo" />
          </Link>

          <div className="navbar-center">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                </li>

                {categories.map(category => (
                  <li className="nav-item" key={category.id}>
                    <Link
                      className={`nav-link ${isActive(category.id) ? 'active' : ''}`}
                      to={`/category?id=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}

                <li className="nav-item">
                  <Link className="nav-link" to="/category?=fivem">FiveM</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category?=custom">Custom</Link>
                </li>
              </ul>
            </div>
          </div>

          <div id="search-container">
            <i className="fas fa-search text-white search-icon" id="search-icon"></i>
            <input className="form-control" type="text" id="search-box" placeholder="Search..." />
          </div>
        </div>
      </nav>
    </>
  );
}
