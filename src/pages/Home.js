import React from 'react'
import bannerImage from '../images/home.jpg'
import discordLogo from '../images/discord.png';
import youtubeLogo from '../images/youtube.png';
import patreonLogo from '../images/patreon.png';
import instagramLogo from '../images/instagram.png';
import Packages from '../components/Packages'
import { useLocation, useSearchParams } from 'react-router-dom';
import { setCookie } from '../utils/cartUtils';
import { Link } from 'react-router-dom';


export default function Home() {

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("txn-id");

  if (orderId) {
    document.cookie = "basket_ident=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "basketVerified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const basketVerified = queryParams.get('basketVerified');

  if (basketVerified) {
    setCookie('basketVerified', true);
  }

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="hero"
        aria-label="Cinematic showcase banner"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-content">
          <div className="container">
            <p className="hero-kicker eyebrow">GTA MOD STATION</p>
            <h1>Cinematic, Optimized, and FiveM Ready Vehicles</h1>
            <p className="muted">Premium emergency, utility, and military vehicle mods for immersive FiveM gameplay. Built for performance, realism, and control.</p>
            <div className="actions">
              <button className="cta" onClick={() => {
                const el = document.getElementById('categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>Browse Categories</button>
              <a className="cta cta--ghost" href="https://discord.gg/bWCT4nTAJT" target="_blank" rel="noopener noreferrer">Discord</a>
            </div>
          </div>
        </div>

        {/* 💡 START: Social Icons added here */}
        <div className="social-icons">
          <a href="https://www.instagram.com/gtamodstation/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/@GTAModStation" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
          <a className="social-icon-img" href="https://www.patreon.com/cw/gtamodstation" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src={patreonLogo} alt="" />
          </a>
          <a href="https://discord.com/invite/bWCT4nTAJT" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <i className="fab fa-discord"></i>
          </a>
        </div>
        {/* 💡 END: Social Icons added here */}
      </section>

      {/* Featured Products Section */}
      <section id="featured" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 id="featured-title">Signature Vehicle Mods</h2>
              <p>Lore-Friendly, Working dials, Optimized models, Optimized textures, Authentic liveries. Ready for your next patrol, pursuit, race, or ride.</p>
            </div>
            <div className="row">
              <span className="pill mb-1">Lore-Friendly</span>
              <span className="pill mb-1">Optimized</span>
              <span className="pill mb-1">FiveM-Ready</span>
            </div>
          </div>
          <Packages exceptPackage={false} category={3109091} />
          <div className='text-center'>
            <Link className="btn btn-outline-secondary" to="/category?id=2961935">
              <span>View More...</span>
            </Link>
        </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2 id="categories-title">Browse by Category</h2>
              <p>Choose Your Ride. Command Every Horizon.</p>
            </div>
          </div>

          <div className="categories">
            <Link className="cat" to="/free_packages" aria-label="Free category">
              <span>Free</span>
            </Link>
            <Link className="cat" to="/category?id=2961935" aria-label="Paid category">
              <span>Paid</span>
            </Link>
            <a className="cat" href="https://www.patreon.com/c/gtamodstation/shop" target="_blank" rel="noopener noreferrer" aria-label="Patreon">
              <span>Patreon</span>
            </a>
            <Link className="cat" to="/custom" aria-label="Request build category">
              <span>Request Build</span>
            </Link>
            <Link className="cat" to="/contact" aria-label="Contact category">
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Orders Highlight */}
      <section id="custom" aria-labelledby="custom-title">
        <div className="container highlight">
          <div>
            <p className="eyebrow">Custom Orders</p>
            <h2 id="custom-title">Built to Your Spec</h2>
            <p className="muted">Need a department‑accurate fleet or a cinematic hero vehicle? We craft bespoke models, handling lines, ELS setups, and liveries tuned for your FiveM server.</p>
            <div className="row" style={{marginTop: 'var(--space-3)', gap: '0'}}>
              <ul className='mx-3 mb-0'>
              <li><span className="pill w-100 my-1">3D Conversions</span></li>
              <li><span className="pill w-100 my-1">Emergency lightning</span></li>
              <li><span className="pill w-100 my-1">Modifications</span></li>
              <li><span className="pill w-100 my-1">LOD Optimization</span></li>
              <li><span className="pill w-100 my-1">Livery & Template</span></li>
              <li><span className="pill w-100 my-1">Handling & Physics</span></li>
              </ul>
            </div>
          </div>
          <div className="row mt-0" style={{gap: 0}}>
            <Link className="cta mb-2" to="/custom">Request Build</Link>
            <a className="cta cta--ghost" href="https://discord.com/invite/bWCT4nTAJT" target="_blank" rel="noopener noreferrer">Make a ticket on discord</a>
          </div>
        </div>
      </section>
    </>
  )
}
