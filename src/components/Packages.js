import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingPlaceholders from './LoadingPlaceholders';
import { addToCartPackage, getCookie } from '../utils/cartUtils';
import '../utils/css/packages.css';

export default function Packages(props) {
    const alertTimeoutRef = useRef(null);
    const navigate = useNavigate();

    const basketIdent = getCookie('basket_ident');
    const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
    const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;
    const databaseApiKey = process.env.REACT_APP_DATABASE_API_KEY;

    const [packages, setPackages] = useState([]);
    const [customData, setCustomData] = useState({});
    const [cartItemIds, setCartItemIds] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
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

    const fetchCustomData = async (pkgId) => {
        try {
            const response = await fetch(`${databaseApiUrl}get_packages.php?package_id=${pkgId}&api_key=${databaseApiKey}&is_private=NO`);
            const data = await response.json();
            if (!data.error) {
                return data;
            }
        } catch (error) {
            console.error(`Error fetching custom data for package ${pkgId}:`, error);
        }
        return null;
    };

    const fetchPackages = async () => {
        try {
            let filtered;

            if (props.category) {
                const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/categories/${props.category}?includePackages=1`);
                const data = await res.json();

                filtered = props.exceptPackage
                    ? data.data.packages.filter(pkg => pkg.id !== parseInt(props.exceptPackage))
                    : data.data.packages;

            } else {
                const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/packages`);
                const data = await res.json();

                filtered = props.exceptPackage
                    ? data.data.filter(pkg => pkg.id !== parseInt(props.exceptPackage))
                    : data.data;
            }


            // Fetch custom details for all packages in parallel
            const customResults = await Promise.all(filtered.map(pkg => fetchCustomData(pkg.id)));

            const customDataObj = {};
            filtered.forEach((pkg, index) => {
                if (customResults[index]) {
                    customDataObj[pkg.id] = customResults[index];
                }
            });

            setPackages(filtered);
            setCustomData(customDataObj);

        } catch (err) {
            console.error("Error fetching packages:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (pkgId, pkgName, pkgImage, pkgPrice) => {
        if (!getCookie('basketVerified') || !getCookie('basket_ident')) {
            navigate('/auth');
            return;
        }

        if (cartItemIds.includes(pkgId)) {
            navigate('/cart');
        } else {
            addToCartPackage(pkgId);
            setCartItemIds(prev => [...prev, pkgId]);

            window.dispatchEvent(new CustomEvent('show-alert', {
                detail: { name: pkgName, image: pkgImage, price: pkgPrice }
            }));
        }
    };

    useEffect(() => {
        const loadAll = async () => {
            if (basketIdent) {
                await fetchCart();
            }
            await fetchPackages();
        };

        loadAll();

        return () => {
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        };
    }, []);

    return (
        <div className="container mt-4">
            {loading ? (
                <LoadingPlaceholders />
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3" style={{gap: '0px'}}>
                    {packages.map(pkg => {
                        const custom = customData[pkg.id];

                        const title = custom && custom.package_title ? custom.package_title : pkg.name;
                        const images = custom && custom.package_images && custom.package_images.length > 0
                            ? custom.package_images
                            : [pkg.image];

                        const imageUrl = images[0].startsWith('http') ? images[0] : `${databaseApiUrl}uploads/${images[0]}`;

                        const urlId = custom && custom.package_url_id ? custom.package_url_id : pkg.id;
                        const urlCategoryId = custom && custom.package_url_category_id ? custom.package_url_category_id : (pkg.category?.id || '');
                        
                        // Category label for card
                        const categoryLabel = custom && custom.package_category ? custom.package_category : (pkg.category?.name || 'Vehicle Mod');

                        return (
                            <div className="col mb-4" key={pkg.id}>
                                <div className="car-card">
                                    <Link to={`/package?id=${urlId}&categoryId=${urlCategoryId}`} style={{ color: 'white', textDecoration: 'none' }}>
                                        <div className="car-image-container">
                                            <img
                                                src={`${imageUrl}`}
                                                className="car-image"
                                                alt={title}
                                            />
                                            <span className="category-badge">{categoryLabel}</span>
                                            <div className="image-gradient-top"></div>
                                        </div>
                                    </Link>
                                    <div className="car-details">
                                        <h5 className="card-title">{title}</h5>
                                        <div className="card-meta">High-fidelity model • Optimized</div>
                                        <div className="card-actions mt-2">
                                            <p className="price-text">${pkg.total_price}</p>
                                            <div style={{ display: 'flex' }}>
                                                <Link
                                                    to={`/package?id=${urlId}&categoryId=${urlCategoryId}`}
                                                    className="btn-card-view mx-1"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    className="btn-card-buy mx-1"
                                                    onClick={() => handleAddToCart(pkg.id, title, `${imageUrl}`, pkg.total_price)}
                                                >
                                                    {cartItemIds.includes(pkg.id) ? 'View in Cart' : 'Add to Cart'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}