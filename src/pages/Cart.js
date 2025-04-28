import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/cartUtils'
import { removeFromBasket } from '../utils/removeFromBasket';
import { Link } from 'react-router-dom';

export default function Cart() {

    const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
    const basketIdent = getCookie('basket_ident');
    const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;
    const databaseApiKey = process.env.REACT_APP_DATABASE_API_KEY;

    const [cartItems, setCartItems] = useState([]);
    const [checkoutLink, setCheckoutLink] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customData, setCustomData] = useState({});

    const cartItemStyles = {
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
        marginBottom: '20px',
        padding: '20px'
    }

    const checkoutBtnStyles = {
        backgroundColor: '#red',
        color: '#fff',
        border: 'none'
    }

    const procedToCheckout = () => {
        window.open(checkoutLink, '_blank')
    }

    const handleRemove = (pkgId) => {
        const updatedPackages = cartItems.packages.filter(pkg => pkg.id !== pkgId);
        const newBasePrice = updatedPackages.reduce((sum, pkg) => sum + pkg.in_basket.price, 0);
        const newSalesTax = 0;
        const newTotalPrice = newBasePrice + newSalesTax;

        setCartItems(prev => ({
            ...prev,
            packages: updatedPackages,
            base_price: newBasePrice,
            sales_tax: newSalesTax,
            total_price: newTotalPrice
        }));

        removeFromBasket(pkgId, basketIdent, token)
            .then(result => {
                if (!result.success) {
                    console.error('Failed to remove from basket:', result.error);
                }
            })
            .catch(err => console.error('Remove error:', err));
    };

    const fetchCustomData = async (pkgId) => {
        try {
            const response = await fetch(`${databaseApiUrl}get_packages.php?package_id=${pkgId}&api_key=${databaseApiKey}`);
            const data = await response.json();
            if (!data.error) {
                return data;
            }
        } catch (error) {
            console.error(`Error fetching custom data for package ${pkgId}:`, error);
        }
        return null;
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const loadCart = async () => {
            try {
                const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/baskets/${basketIdent}`);
                const data = await res.json();
                if (data.data.packages.length > 0) {
                    setCartItems(data.data);
                    setCheckoutLink(data.data.links.checkout);

                    // Fetch custom data for all packages in cart
                    const customResults = await Promise.all(
                        data.data.packages.map(pkg => fetchCustomData(pkg.id))
                    );

                    const customDataObj = {};
                    data.data.packages.forEach((pkg, index) => {
                        if (customResults[index]) {
                            customDataObj[pkg.id] = customResults[index];
                        }
                    });

                    setCustomData(customDataObj);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCart();

    }, []);

    return (
        <>
            <div>
                <div className="container py-5">
                    <h2 className="mb-4" style={{ color: '#0ff' }}>Your Cart</h2>
                    {loading ? (
                        <>
                            {Array.from({ length: 2 }).map((_, index) => (
                                <div className="row align-items-center" style={cartItemStyles} key={index}>
                                    <div className="col-md-2">
                                        <svg className="bd-placeholder-img card-img-top" width="100%" height="100px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice">
                                            <title>Placeholder</title>
                                            <rect width="100%" height="100%" fill="#404142"></rect>
                                        </svg>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className='placeholder-glow'><span className='placeholder col-6'></span></h5>
                                        <p className='placeholder-glow'><span className='placeholder col-2'></span></p>
                                    </div>
                                    <div className="col-md-2 text-start placeholder-glow">
                                        <p style={{ color: '#00ff00' }}><span className='placeholder col-12'>a</span></p>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        <div className="cart-item row align-items-center">
                                            <button className="btn btn-danger btn-sm remove-btn disabled placeholder"></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {cartItems.packages && cartItems.packages.length > 0 ? (
                                cartItems.packages.map(pkg => {
                                    const custom = customData[pkg.id];

                                    const title = custom && custom.package_title ? custom.package_title : pkg.name;
                                    const images = custom && custom.package_images && custom.package_images.length > 0
                                        ? custom.package_images
                                        : [pkg.image];

                                    const imageUrl = images[0].startsWith('http') ? images[0] : `${databaseApiUrl}uploads/${images[0]}`;

                                    return (
                                        <div className="row align-items-center" key={pkg.id} style={cartItemStyles}>
                                            <div className="col-md-2">
                                                <Link to={`/package?id=${pkg.id}`}>
                                                    <img src={imageUrl} className="img-fluid" alt={title} style={{ borderRadius: '8px', height: '100px', objectFit: 'cover' }} />
                                                </Link>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to={`/package?id=${pkg.id}`} style={{ textDecoration: 'none', color: '#fff' }}>
                                                    <h5>{title}</h5>
                                                </Link>
                                            </div>
                                            <div className="col-md-2 text-start">
                                                <p style={{ color: '#00ff00' }}>Price: ${pkg.in_basket.price}</p>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <div className="cart-item row align-items-center">
                                                    <button className="btn btn-danger btn-sm remove-btn" onClick={() => handleRemove(pkg.id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="row align-items-center" style={cartItemStyles}>
                                    Your Cart is Empty! 😀
                                </div>
                            )}
                        </>
                    )}

                    <div className="row mt-4">
                        <div className="col-md-6 offset-md-6">
                            <div className="p-3 border rounded-3" style={{ backgroundColor: '#1e1e1e' }}>
                                <h5 className="neon-accent">Cart Summary</h5>
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${cartItems.base_price ? cartItems.base_price.toLocaleString() : 0}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Sales Tax</span>
                                    <span>${cartItems.sales_tax ? cartItems.sales_tax.toLocaleString() : 0}</span>
                                </div>
                                <hr style={{ borderColor: '#444' }} />
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total</span>
                                    <span>${cartItems.total_price ? cartItems.total_price.toLocaleString() : 0}</span>
                                </div>
                                <button className={`btn btn-danger w-100 mt-3 ${cartItems.packages && cartItems.packages.length > 0 ? '' : 'disabled'}`} style={checkoutBtnStyles} onClick={procedToCheckout}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
