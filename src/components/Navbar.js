import React, { useState } from 'react';
import mainImage from '../images/home.jpg';
// import mobileBanner from '../images/mobile.jpg';
import logo from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const categories = [
    { id: 2909711, name: 'Free' },
    { id: 2937606, name: 'Paid' },
    { id: 2937607, name: 'Subscriptions' }
  ];

  const isActive = (id) => location.search === `?=${id}`;
  const loggedInUser = localStorage.getItem('loggedInUser');

  return (
    <>
      <Link
        className="btn btn-outline-light position-fixed top-0 end-0 m-3 z-1030 cart-btn"
        id="cartToggleBtn"
        style={{ zIndex: 999 }}
        to="/cart"
      >
        <i className="bi bi-cart"></i> Cart
        <span
          id="cartCount"
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        ></span>
        {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          0
        </span> */}
      </Link>

      <div className="position-relative">
        {/* Social Media Buttons */}
        <div className="position-absolute bottom-0 start-0 m-3 d-flex gap-2" style={{ zIndex: 10 }}>
          {/* <a className="btn btn-outline-light" href="https://discord.com/" target='_blank'>
            <i className="bi bi-discord"> </i>
            Discord
          </a> */}
          <a className="btn btn-outline-light" href="https://www.patreon.com/c/gtamodstation" target='_blank'>
            <i className="bi bi-"> </i>
            Patreon
          </a>
          <a className="btn btn-outline-light" href="https://www.youtube.com/@GTAModStation" target='_blank'>
            <i className="bi bi-youtube"> </i>
            Youtube
          </a>
          <a className="btn btn-outline-light" href="https://discord.gg/bWCT4nTAJT" target='_blank'>
            <i className="bi bi-discord"> </i>
            Discord
          </a>
        </div>

        {/* Main Image */}
        <img src={mainImage} className="full-width-image mb-0" id="desktopBanner" alt="Full Width" style={{ marginLeft: '-1px' }} />
        <img src={mainImage} className="full-width-image mb-0" id="mobileBanner" alt="Full Width" style={{ marginLeft: '-1px', display: 'none' }} />
      </div>

      <nav className="navbar navbar-dark navbar-expand-lg" id='desktopNavbar' style={{
        backgroundColor: '#0B0909',
        border: '2px solid rgb(255, 0, 0)',
        borderLeft: '0',
        borderRight: '0',
        padding: '0',
        opacity: '0.8',
        zIndex: '1',
        top: '0',
        position: 'sticky'
      }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ padding: '0', margin: '0' }}>
            <img src={logo} style={{ width: '60px', borderRadius: '60px' }} alt="Logo" />
          </Link>

          <div className="navbar-center">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Vehicles</Link>
                </li>

                {/* Showing categories here */}
                {/* {categories.map(category => (
                  <li className="nav-item" key={category.id}>
                    <Link
                      className={`nav-link ${isActive(category.id) ? 'active' : ''}`}
                      to={`/category?id=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))} */}

                {/* <li className="nav-item">
                  <Link className="nav-link" to="/category?=fivem">FiveM</Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/free_packages">Free</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/custom">Develop Own Model</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact Us</Link>
                </li>
                {loggedInUser ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Admin</Link>
                  </li>
                  : ''}
              </ul>
            </div>
          </div>

          <div id="search-container">
            {/* <i className="fas fa-search text-white search-icon" id="search-icon"></i>
            <input className="form-control" type="text" id="search-box" placeholder="Search..." /> */}
          </div>
        </div>
      </nav >

      {/* Mobile navbar */}
      <nav className="navbar navbar-dark navbar-expand-lg" id="mobileNavbar" style={{
        backgroundColor: 'rgba(11, 9, 9, 0.9)',
        borderTop: '2px solid red',
        borderBottom: '2px solid red',
        padding: '0.5rem',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
        display: 'none'
      }}>
        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/" style={{ padding: '0', margin: '0' }}>
            <img src={logo} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} alt="Logo" />
          </Link>

          {/* Navbar toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible links */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarMobile">
            <ul className="navbar-nav ms-auto text-center">

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
                <Link className="nav-link" to="/category?=custom">Develop Own Model</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              {loggedInUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Admin</Link>
                </li>
              )}
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}
