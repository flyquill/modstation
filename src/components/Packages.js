import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingPlaceholders from './LoadingPlaceholders';
import { addToCartPackage, getCookie } from '../utils/cartUtils';

export default function Packages(props) {
    const alertTimeoutRef = useRef(null);
    const navigate = useNavigate();

    const basketIdent = getCookie('basket_ident');
    const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
    
    const [packages, setPackages] = useState([]);
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

    const fetchPackages = async () => {
        try {

            let filtered;

            if (props.category) {
                const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/categories/${props.category}?includePackages=1`);
                const data = await res.json();

                // Filter the package if exceptPackage is provided
                filtered = props.exceptPackage
                    ? data.data.packages.filter(pkg => pkg.id !== parseInt(props.exceptPackage))
                    : data.data.packages;

            } else {
                const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/packages`);
                const data = await res.json();

                // Filter the package if exceptPackage is provided
                filtered = props.exceptPackage
                    ? data.data.filter(pkg => pkg.id !== parseInt(props.exceptPackage))
                    : data.data;
            }

            setPackages(filtered);
        } catch (err) {
            console.error("Error fetching packages:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (pkgId, pkgName, pkgImage, pkgPrice) => {

        if(!getCookie('basketVerified') || !getCookie('basket_ident')){
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
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {packages.map(pkg => (
                        <div className="col" key={pkg.id}>
                            <div className="car-card">
                                <Link to={`/package?id=${pkg.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                    <div className="car-image-container">
                                        <img src={pkg.image} className="car-image" alt={pkg.name} style={{ minHeight: '140px' }} />
                                    </div>
                                </Link>
                                <div className="car-details">
                                    <h5 className="card-title">{pkg.name}</h5>
                                    <p className="car-description" style={{ color: '#00ff00', fontWeight: 'bold' }}>
                                        Price: ${pkg.total_price}
                                    </p>
                                    <button
                                        className="btn btn-primary btn-sm btn-add-to-cart"
                                        onClick={() => handleAddToCart(pkg.id, pkg.name, pkg.image, pkg.total_price)}
                                    >
                                        {cartItemIds.includes(pkg.id) ? 'View in Cart 🛒' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

