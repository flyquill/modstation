import React, { useState } from 'react';
import mainImage from '../images/home.jpg';
// import mobileBanner from '../images/mobile.jpg';
import logo from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import MobileNavbar from './MobileNavbar'

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
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-dark navbar-expand-lg d-none d-md-block" id='desktopNavbar' style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: '1rem 0',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
        boxShadow: '0 2px 20px rgba(0,0,0,0.0)',
        backdropFilter: 'blur(6px)'
      }}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Brand Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/" style={{ padding: '0', margin: '0' }}>
            <div className="brand-icon" style={{
              width: '40px',
              height: '40px',
              borderRadius: '6px',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span> <img src={logo} alt="" /> </span>
            </div>
            <span style={{ 
              color: 'var(--white)', 
              fontWeight: '900', 
              fontSize: '1.2rem',
              letterSpacing: '0.05em'
            }}>
              GTAModStation
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="navbar-nav d-flex flex-row gap-4">
            <a className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} href="/#hero">Home</a>
            <button
              className={`nav-link btn-link`}
              // style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
              onClick={() => {
                if (location.pathname === '/') {
                  const el = document.getElementById('featured');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#featured';
                }
              }}
            >
              Featured
            </button>
            <button
              className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
              onClick={() => {
                if (window.location.pathname !== "/") {
                  window.location.href = "/#categories";
                } else {
                  const el = document.getElementById("categories");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
            >
              Categories
            </button>
            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            <button
              className="nav-link"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  window.location.href = "/#faq";
                } else {
                  const el = document.getElementById("faq");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
            >
              FAQ
            </button>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-3">
            <button className="btn btn-primary nav-action" 
            onClick={() => {
                if (window.location.pathname === "/") {
                  window.location.href = "/#custom";
                } else {
                  window.location.href = "/custom";
                }
              }} 
            style={{
              backgroundColor: 'var(--primary)',
              color: '#031018',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}>
              Request Build
            </button>
            <a className="btn btn-outline-light nav-action" href="https://www.patreon.com/c/gtamodstation/shop" target="_blank" rel="noopener noreferrer" style={{
              backgroundColor: 'transparent',
              color: 'var(--silver)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}>
              Shop
            </a>
            <Link
              className="btn btn-outline-light position-relative"
              to="/cart"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--silver)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.9rem'
              }}
            >
              <i className="bi bi-cart"></i>
              <span
                id="cartCount"
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.7rem' }}
              ></span>
            </Link>
          </div>
        </div>
      </nav >

      <MobileNavbar />

      {/* Banner handled by Home hero background */}

      
    </>
  );
}
