import React from 'react'

export default function Footer() {
    return (
        <>
            <hr />
            <section className="py-5" style={{ backgroundColor: '#0B0909', color: '#fff' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mb-4">
                            <h2 className="text-light">Who We Are</h2>
                            <p className="lead text-light">Meet our talented and dedicated team.</p>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
                        {/* Team Member 1 */}
                        <div className="col">
                            <div className="card shadow-lg border-0 rounded text-center h-100" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                                <div
                                    className="img-wrapper rounded-circle mx-auto"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        overflow: 'hidden',
                                        marginTop: '-75px',
                                        border: '5px solid #0B0909',
                                        backgroundColor: '#0B0909'
                                    }}
                                >
                                    <img src="assets/images/clients/c1.png" alt="John Doe" className="card-img-top rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="card-body pt-5 py-3">
                                    <h6 className="card-title mb-1">John Doe</h6>
                                    <p className="small mb-1">Chief Executive Officer</p>
                                    <p className="card-text small">John's vision drives our innovation.</p>
                                    <ul className="list-inline social-icons mb-0">
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-linkedin"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="col">
                            <div className="card shadow-lg border-0 rounded text-center h-100" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                                <div
                                    className="img-wrapper rounded-circle mx-auto"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        overflow: 'hidden',
                                        marginTop: '-75px',
                                        border: '5px solid #0B0909',
                                        backgroundColor: '#0B0909'
                                    }}
                                >
                                    <img src="assets/images/clients/c2.png" alt="Jane Smith" className="card-img-top rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="card-body pt-5 py-3">
                                    <h6 className="card-title mb-1">Jane Smith</h6>
                                    <p className="small mb-1">Head of Marketing</p>
                                    <p className="card-text small">Jane builds strong brand identities.</p>
                                    <ul className="list-inline social-icons mb-0">
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="col">
                            <div className="card shadow-lg border-0 rounded text-center h-100" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                                <div
                                    className="img-wrapper rounded-circle mx-auto"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        overflow: 'hidden',
                                        marginTop: '-75px',
                                        border: '5px solid #0B0909',
                                        backgroundColor: '#0B0909'
                                    }}
                                >
                                    <img src="assets/images/clients/c3.png" alt="David Lee" className="card-img-top rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="card-body pt-5 py-3">
                                    <h6 className="card-title mb-1">David Lee</h6>
                                    <p className="small mb-1">Lead Developer</p>
                                    <p className="card-text small">David excels in building scalable web applications.</p>
                                    <ul className="list-inline social-icons mb-0">
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-github"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section className="faq-section" id='faq' style={{ backgroundColor: '#0B0909', color: '#fff', padding: '60px 0' }}>
                <div className="container">
                    <h2 className="text-center mb-4">
                        <span className="line" style={{ color: 'red' }}><strong>──</strong></span>{' '}
                        Frequently Asked Questions{' '}
                        <span className="line" style={{ color: 'red' }}><strong>──</strong></span>
                    </h2>
                    <hr className="border-light" />

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
                                    What payment methods do you accept?
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    We accept Visa, MasterCard, PayPal, and American Express. All transactions are secured and encrypted.
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
                                    How can I track my order?
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    After placing an order, you’ll receive a tracking link via email. You can use it anytime to see your package status.
                                </div>
                            </div>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="accordion-item" style={{ backgroundColor: '#0B0909', color: '#fff', border: '1px solid #333', borderRadius: '10px' }}>
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
                                    Do you offer refunds or exchanges?
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    Yes! We offer refunds and exchanges within 30 days of delivery. Please check our refund policy for more details.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <footer className="footer py-4" style={{ backgroundColor: '#0B0909', color: '#fff' }}>
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                    <p className="mb-2 mb-md-0">We accept the following payment methods:</p>
                    <div className="payment-icons d-flex align-items-center gap-3">
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
                        <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" />
                        <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" />
                    </div>
                </div>

                <hr className="border-secondary" />

                <div className="container-fluid d-flex flex-wrap justify-content-center gap-4 py-2">
                    <a href="#" className="footer-link text-light text-decoration-none">Privacy Policy</a>
                    <a href="#" className="footer-link text-light text-decoration-none">Terms of Service</a>
                    <a href="#" className="footer-link text-light text-decoration-none">About Us</a>
                    <a href="#" className="footer-link text-light text-decoration-none">Contact Us</a>
                </div>

                <hr className="border-secondary" />

                <div className="text-center mt-3" style={{ fontSize: '0.9rem', color: '#aaa' }}>
                    &copy; All rights Reserved 2025 <span style={{ color: 'lime' }}>modstation.com</span>
                </div>
            </footer>


        </>
    )
}
