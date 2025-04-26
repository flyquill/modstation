import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../utils/css/package.css';
import Packages from './Packages';
import { addToCartPackage, getCookie } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom'; // also import this if not already

export default function Package() {

  const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [mainPackage, setMainPackage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderKey, setRenderKey] = useState(0);
  const [cartItemIds, setCartItemIds] = useState([]);
  const navigate = useNavigate();

  const id = queryParams.get('id');

  useEffect(() => {
    if (token && id) {
      const fetchPackage = async () => {
        try {
          setLoading(true);
          setRenderKey(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/packages/${id}`);
          const data = await res.json();
          setMainPackage(data.data);
          await fetchCart(); // fetch cart after loading package
        } catch (err) {
          console.error("Error fetching packages:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPackage();
    }
  }, [id, token]);

  const fetchCart = async () => {
    try {
      const basketIdent = getCookie('basket_ident');

      const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/baskets/${basketIdent}`);
      const data = await res.json();

      if (data.data && Array.isArray(data.data.packages)) {
        const ids = data.data.packages.map(item => item.id);
        setCartItemIds(ids);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleAddToCart = () => {
    if (!mainPackage?.id) return;
    if (getCookie('basket_ident') != null) {
      window.location.href = '/auth';
      return;
    };

    addToCartPackage(mainPackage.id);
    setCartItemIds(prev => [...prev, mainPackage.id]); // update local cart state

    window.dispatchEvent(new CustomEvent('show-alert', {
      detail: {
        name: mainPackage.name,
        image: mainPackage.image,
        price: mainPackage.base_price
      }
    }));
  };


  return (
    <>
      {loading ?
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="product-image-container">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="400px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#404142" />
                </svg>
              </div>
              <div className="thumbnail-list">
                <div className="thumbnail-item active">
                  <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#404142"></rect>
                  </svg>
                  <span className="thumbnail-text">Current</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-details">
                <h1 className="product-name placeholder-glow"><span className='placeholder col-7'>Package Name</span></h1>
                <p className="product-price placeholder-glow"><span className='placeholder col-4'>Package Price</span></p>
                <button className="btn btn-secondary mb-2 btn-add-to-cart disabled placeholder" ></button>
                <div className="additional-section">
                  <div className="additional-section-image-container">
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="100px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#404142"></rect>
                    </svg>
                  </div>
                  <div className="additional-section-text">
                    <h2 className="additional-section-title placehlder-glow"><span className='placeholder col-4'>Title</span></h2>
                    <p className="product-price placeholder-glow"><span className='placeholder col-2'></span></p>
                  </div>
                  <div className="ms-auto">
                    <button className="btn btn-secondary btn-sm btn-add-to-cart disabled placeholder">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> :
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="product-image-container">
                <img src={mainPackage.image} className="product-image" alt="" style={{ height: '400px' }} />
              </div>
              <div className="thumbnail-list">
                <div className="thumbnail-item active">
                  <img src={mainPackage.image} alt="" className="thumbnail-image" />
                  <span className="thumbnail-text">Current</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-details">
                <h1 className="product-name">{mainPackage.name}</h1>
                <p className="product-price">Price: ${mainPackage.base_price}</p>
                {cartItemIds.includes(mainPackage.id) ? (
                  <button className="btn btn-primary mb-2 btn-add-to-cart" onClick={() => navigate('/cart')}>
                    View in Cart 🛒
                  </button>
                ) : (
                  <button className="btn btn-primary mb-2 btn-add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
                <div className="additional-section">
                  <div className="additional-section-image-container">
                    <img src="/abc" alt="" className="additional-section-image" />
                  </div>
                  <div className="additional-section-text">
                    <h2 className="additional-section-title">title</h2>
                    <p className="car-description">Price: $123</p>
                  </div>
                  <div className="ms-auto">
                    <button className="btn btn-primary btn-sm btn-add-to-cart">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="container mt-4">
        <h2>Related Products</h2>
      </div>
      <Packages key={renderKey} exceptPackage={id} />
    </>
  )
}
