import React, { useEffect, useState, useRef } from 'react'
import '../utils/css/package.css';
import Packages from './Packages';
import { useNavigate, useLocation } from 'react-router-dom'; // also import this if not already
import ProductDescription from './ProductDescription';
import { Helmet } from 'react-helmet-async';
import "../utils/css/ImageFullscreen.css";

export default function PrivateProduct() {

  const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentImage, setcurrentImage] = useState('');
  const [mainPackage, setMainPackage] = useState([]);
  const [customData, setCustomData] = useState({});
  const [loading, setLoading] = useState(true);
  const [addonLoading, setAddonLoading] = useState(true);
  const [renderKey, setRenderKey] = useState(0);
  const [attachedAddonPackages, setAttachedAddonPackages] = useState([]);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const navigate = useNavigate();

  const id = queryParams.get('id');
  const categoryId = queryParams.get('categoryId');

  useEffect(() => {
    if (token && id) {
      const fetchPackage = async () => {
        try {
          setLoading(true);
          setAddonLoading(true);
          setRenderKey(prev => prev + 1);
          window.scrollTo({ top: 300, behavior: 'smooth' });

          // Fetch custom details for all packages in parallel
          const customApiData = await fetchCustomData(id);

          console.log(customApiData);
          if (customApiData) {
            setCustomData(customApiData);
            if (customApiData.package_images[0]) {
              setcurrentImage(`${databaseApiUrl}uploads/${customApiData.package_images[0]}`);
            }


            const match = customApiData?.video_url.match(/embed\/([^?]+)/);
            console.log(customApiData);
            if (match && match[1]) {
              setVideoId(match[1]);
            }
          } else {
            setCustomData(null);
          }

          setLoading(false);

        } catch (err) {
          console.error("Error fetching packages:", err);
        }
      };

      fetchPackage();
    }
  }, [id, token]);

  const databaseApiKey = process.env.REACT_APP_DATABASE_API_KEY;
  const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;

  const fetchCustomData = async (pkgId) => {
    try {
      const response = await fetch(`${databaseApiUrl}get_packages.php?package_id=${pkgId}&is_private=YES&api_key=${databaseApiKey}`);
      const data = await response.json();
      if (!data.error) {
        return data;
      }
    } catch (error) {
      console.error(`Error fetching custom data for package ${pkgId}:`, error);
    }
    return null;
  };

  return (
    <>
      {/* React Helmet (SEO way) */}
      <Helmet>
        <meta
          name="description"
          content={customData && customData.package_title ? customData.package_title : mainPackage.name}
          data-react-helmet="true"
        />
      </Helmet>

      {loading ?
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="product-image-container">
                <svg className="bd-placeholder-img card-img-top product-image" width="100%" height="400px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#404142" />
                </svg>
              </div>
              <div className="thumbnail-list">
                <div className="thumbnail-item">
                  <svg className="bd-placeholder-img card-img-top" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#404142"></rect>
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-details">
                <h1 className="product-name placeholder-glow"><span className='placeholder col-7'>Package Name</span></h1>
                <p className="product-price placeholder-glow"><span className='placeholder col-4'>Package Price</span></p>
                <button className="btn btn-secondary mb-2 btn-add-to-cart disabled placeholder" ></button>
                <hr />
                <>
                  <h4 className='placeholder-glow'><span className='placeholder col-7'>Include Packages</span></h4>
                  <div
                    className="addon-container"
                    style={{
                      maxHeight: '250px', // Always limit the height of the container
                      overflowY: 'auto', // Always add scrolling
                    }}
                  >
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div className="additional-section" style={{ height: '85px' }} key={index}>
                        <div className="additional-section-image-container">
                          <svg className="bd-placeholder-img card-img-top" width="100%" height="100px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#404142" style={{ height: '75px' }}></rect>
                          </svg>
                        </div>
                        <div className="additional-section-text">
                          <h2 className="additional-section-title placehlder-glow"><span className='placeholder col-4'>Title</span></h2>
                          <p className="product-price placeholder-glow"><span className='placeholder col-2'></span></p>
                        </div>
                        <div className="ms-auto" style={{ marginRight: '1rem' }}>
                          <button className="btn btn-secondary btn-sm btn-add-to-cart disabled placeholder">Add to Cart</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              </div>
            </div>
          </div>
        </div> :
        <>
          {/* Fullscreen Modal */}
          {isImageFullScreen && (
            <div className="fullscreen-overlay" onClick={() => setIsImageFullScreen(false)}>
              <span className="close-btn">&times;</span>
              <img src={currentImage} alt="Full Product" className="fullscreen-image" />
            </div>
          )}

          {/* Fullscreen Modal */}
          {isVideoFullScreen && (
            <div className="fullscreen-overlay" onClick={() => setIsVideoFullScreen(false)}>
              <span className="close-btn">&times;</span>
              <iframe className="fullscreen-image" style={{ width: '80%', height: '100%' }} src={customData.video_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          )}

          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="product-image-container">
                  <img
                    src={currentImage}
                    className="product-image"
                    alt=""
                    style={{ height: 'auto', maxHeight: '400px' }}
                    onClick={() => setIsImageFullScreen(true)}
                  />
                </div>
                <div className="thumbnail-list">
                  {/* <div className="thumbnail-item active">
                  <img src={currentImage} alt="" className="thumbnail-image" />
                  <span className="thumbnail-text">Current</span>
                </div> */}
                  {customData && customData.package_images ? customData.package_images.map((img, index) => {
                    return (
                      <button style={{ padding: '0', border: '0' }} onClick={() => setcurrentImage(`${databaseApiUrl}uploads/${img}`)} className="thumbnail-item" key={index}>
                        <img src={`${databaseApiUrl}uploads/${img}`} alt="" className="thumbnail-image" />
                      </button>
                    );
                  }) :
                    <button className="thumbnail-item" style={{ padding: '0', border: '0' }}>
                      <img src={currentImage} alt="" className="thumbnail-image" />
                    </button>}

                  {customData && customData.video_url ? (
                    <button
                      className="thumbnail-item"
                      style={{ padding: '0', border: '0', position: 'relative' }}
                      onClick={() => setIsVideoFullScreen(true)}
                    >
                      {/* Image */}
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt=""
                        className="thumbnail-image"
                      />

                      {/* YouTube Icon Overlay */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'white',
                          height: '15px',
                          width: '15px'
                        }}>

                      </span>
                      <i
                        className="bi bi-youtube"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '3rem',
                          color: 'red',
                        }}
                      />
                    </button>
                  ) : ''}

                </div>
              </div>
              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-name">{customData && customData.package_title ? customData.package_title : mainPackage.name}</h1>
                  <hr />
                    <button className="btn btn-primary mb-2 btn-add-to-cart" onClick={() => window.location.href = `${customData.google_drive_link}`}>
                      Download Now
                    </button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      <br /> 
      <div className="container mt-4">
        <h2>More Packages</h2>
      </div>
      <Packages key={renderKey} exceptPackage={id} category={categoryId} />
    </>
  )
}
