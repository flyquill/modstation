import React, { useEffect, useState } from 'react'
import { getCookie } from '../utils/cartUtils'
import { removeFromBasket } from '../utils/removeFromBasket';
import { Link } from 'react-router-dom';

export default function Cart() {

    const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
    const basketIdent = getCookie('basket_ident');

    const [cartItems, setCartItems] = useState([]);
    const [checkoutLink, setCheckoutLink] = useState([]);
    const [loading, setLoading] = useState(true);

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
        // Optimistically filter out the package
        const updatedPackages = cartItems.packages.filter(pkg => pkg.id !== pkgId);

        // Recalculate totals
        const newBasePrice = updatedPackages.reduce((sum, pkg) => sum + pkg.in_basket.price, 0);
        const newSalesTax = 0; // Adjust if you have a formula for sales tax
        const newTotalPrice = newBasePrice + newSalesTax;

        // Update state
        setCartItems(prev => ({
            ...prev,
            packages: updatedPackages,
            base_price: newBasePrice,
            sales_tax: newSalesTax,
            total_price: newTotalPrice
        }));

        // Call API to remove from backend
        removeFromBasket(pkgId, basketIdent, token)
            .then(result => {
                if (!result.success) {
                    console.error('Failed to remove from basket:', result.error);
                    // Optionally restore item here
                }
            })
            .catch(err => console.error('Remove error:', err));
    };


    useEffect(() => {
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Fetch data from API
        fetch(`https://headless.tebex.io/api/accounts/${token}/baskets/${basketIdent}`)
            .then(res => res.json())
            .then(data => {
                if (data.data.packages.length > 0) {
                    setCartItems(data.data);       // store data in state
                    setCheckoutLink(data.data.links.checkout);       // store data in state
                }
                setLoading(false);    // turn off loading state
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []); // Empty dependency array = run once on mount

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
                            {/* <!-- Cart Item --> */}
                            {cartItems.packages && cartItems.packages.length > 0 ? (
                                cartItems.packages.map(pkg => (
                                    <div className="row align-items-center" key={pkg.id} style={cartItemStyles}>
                                        <div className="col-md-2">
                                            <Link to={`/package?id=${pkg.id}`}>
                                                <img src={pkg.image} className="img-fluid" alt="Game Image" style={{ borderRadius: '8px', height: '100px' }} />
                                            </Link>
                                        </div>
                                        <div className="col-md-6">
                                            <Link to={`/package?id=${pkg.id}`} style={{textDecoration: 'none', color: '#fff'}}>
                                                <h5>{pkg.name}</h5>
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
                                ))
                            ) : (
                                <div className="row align-items-center" style={cartItemStyles}>
                                    Your Cart is Empty! 😀
                                </div>
                            )}

                        </>)}

                    {/* <!-- Repeat cart item if needed --> */}

                    {/* <!-- Cart Summary --> */}
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
