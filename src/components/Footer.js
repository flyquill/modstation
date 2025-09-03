import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
    return (
        <>

            <section className="faq-section" id='faq' style={{ backgroundColor: '#0B0909', color: '#fff', padding: '60px 0' }}>
                <div className="container">
                    <h2 className="text-center mb-4">
                        <span className="line" style={{ color: 'red' }}><strong>──</strong></span>{' '}
                        Frequently Asked Questions{' '}
                        <span className="line" style={{ color: 'red' }}><strong>──</strong></span>
                    </h2>

                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        {/* FAQ Item 1 */}
                        <div className="accordion-item" style={{ backgroundColor: '#0B0909', color: '#fff', border: '1px solid #333', borderRadius: '10px', marginBottom: '15px' }}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                    style={{ backgroundColor: '#0B0909', color: '#fff', borderRadius: '10px' }}
                                >
                                    Are your mods lore-friendly?
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    Yes, our mods are designed to be lore-friendly.
                                </div>
                            </div>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="accordion-item" style={{ backgroundColor: '#0B0909', color: '#fff', border: '1px solid #333', borderRadius: '10px', marginBottom: '15px' }}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseTwo"
                                    style={{ backgroundColor: '#0B0909', color: '#fff', borderRadius: '10px' }}
                                >
                                    Will your models have a substantial effect on my server?
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    No. Our mods are optimized for use in FiveM servers.
                                </div>
                            </div>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="accordion-item" style={{ backgroundColor: '#0B0909', color: '#fff', border: '1px solid #333', borderRadius: '10px', marginBottom: '15px' }}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseThree"
                                    style={{ backgroundColor: '#0B0909', color: '#fff', borderRadius: '10px' }}
                                >
                                    I would like my own custom model to be made how do I do that?
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    You can request your own custom model <Link to="/custom">here</Link>.
                                </div>
                            </div>
                        </div>



                        {/* FAQ Item 4 */}
                        <div className="accordion-item" style={{ backgroundColor: '#0B0909', color: '#fff', border: '1px solid #333', borderRadius: '10px', marginBottom: '15px' }}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseFour"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseFour"
                                    style={{ backgroundColor: '#0B0909', color: '#fff', borderRadius: '10px' }}
                                >
                                    What variety of models do you make?
                                </button>
                            </h2>
                            <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    We create a wide range of vehicles, including cars, flying cars, emergency vehicles, boats, and planes etc.
                                </div>
                            </div>
                        </div>

                        {/* FAQ Item 5 */}
                        <div className="accordion-item" style={{ backgroundColor: '#0B0909', color: '#fff', border: '1px solid #333', borderRadius: '10px', marginBottom: '15px' }}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseFive"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseFive"
                                    style={{ backgroundColor: '#0B0909', color: '#fff', borderRadius: '10px' }}
                                >
                                    I need support.
                                </button>
                            </h2>
                            <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    You can contact us on our discord or support@modstation.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <footer className="footer py-4" style={{ backgroundColor: '#0B0909', color: '#fff' }}>
                {/* <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                    <p className="mb-2 mb-md-0">We accept the following payment methods:</p>
                    <div className="payment-icons d-flex align-items-center gap-3">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
                        <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" />
                        <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" />
                    </div>
                </div>

                <hr className="border-secondary" /> */}

                <div className="container-fluid d-flex flex-wrap justify-content-center gap-4 py-2">
                    <Link to="/privacy" className="footer-link text-light text-decoration-none">Privacy Policy</Link>
                    <Link to="/terms" className="footer-link text-light text-decoration-none">Terms & Conditions</Link>
                    <Link to="/about" className="footer-link text-light text-decoration-none">About Us</Link>
                    <Link to="/contact" className="footer-link text-light text-decoration-none">Contact Us</Link>
                </div>

                <hr className="border-secondary" />

                <div className="text-center mt-3" style={{ fontSize: '0.9rem', color: '#aaa' }}>
                    &copy; All rights Reserved 2025 <span style={{ color: 'lime' }}> <a href="http://gtamodstation.com" style={{color: 'lime', textDecoration: 'none'}} >gtamodstation.com</a></span>
                </div>
            </footer>


        </>
    )
}
