import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../images/logo.png';

const MobileNavbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-dark d-block d-md-none"
      id="mobileNavbar"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        border: "none",
        padding: "0.6rem 1rem",
        position: "sticky",
        top: 0,
        zIndex: 2000,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "36px", height: "36px", borderRadius: "6px", marginRight: "10px" }}
          />
          <span
            style={{
              color: "var(--white)",
              fontWeight: "900",
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
            }}
          >
            GTAModStation
          </span>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          style={{ border: "none", outline: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Collapsible Menu */}
      {menuOpen && (
        <div className="mt-3 px-3 pb-3 bg-dark rounded-3">
          <div className="navbar-nav flex-column gap-2">
            <a
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              href="/#hero"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>

            <button
              className="nav-link btn-link"
              onClick={() => {
                setMenuOpen(false);
                if (location.pathname === "/") {
                  const el = document.getElementById("featured");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "/#featured";
                }
              }}
            >
              Featured
            </button>

            <button
              className="nav-link btn-link"
              onClick={() => {
                setMenuOpen(false);
                if (window.location.pathname !== "/") {
                  window.location.href = "/#categories";
                } else {
                  const el = document.getElementById("categories");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Categories
            </button>

            <Link
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <button
              className="nav-link btn-link"
              onClick={() => {
                setMenuOpen(false);
                if (window.location.pathname !== "/") {
                  window.location.href = "/#faq";
                } else {
                  const el = document.getElementById("faq");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              FAQ
            </button>
          </div>

          {/* Action Buttons */}
          <div className="d-flex flex-column gap-2 mt-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                setMenuOpen(false);
                if (window.location.pathname === "/") {
                  window.location.href = "/#custom";
                } else {
                  window.location.href = "/custom";
                }
              }}
              style={{
                backgroundColor: "var(--primary)",
                color: "#031018",
                fontWeight: "700",
                borderRadius: "8px",
              }}
            >
              Request Build
            </button>

            <a
              className="btn btn-outline-light w-100"
              href="https://www.patreon.com/c/gtamodstation/shop"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "var(--silver)",
                fontWeight: "700",
                borderRadius: "8px",
              }}
            >
              Shop
            </a>

            <Link
              to="/cart"
              className="btn btn-outline-light w-100 position-relative"
              onClick={() => setMenuOpen(false)}
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "var(--silver)",
                borderRadius: "8px",
              }}
            >
              <i className="bi bi-cart"></i> Cart
              <span
                id="cartCount"
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              ></span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
