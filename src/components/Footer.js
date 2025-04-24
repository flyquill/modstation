import React from 'react'

export default function Footer() {
    return (
        <>
            <section className="py-5 bg-dark text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mb-4">
                            <h2>Who We Are</h2>
                            <p className="lead">Meet our talented and dedicated team.</p>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-5">
                        <div className="col">
                            <div className="card shadow-lg border-0 rounded bg-darker text-center h-100">
                                <div className="img-wrapper rounded-circle mx-auto" style={{width: '150px', height: '150px', overflow: 'hidden', marginTop: '-75px', border: '5px solid var(--bs-darker)'}}>
                                    <img src="assets/images/clients/c1.png" className="card-img-top rounded-circle" alt="Person 1" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                </div>
                                <div className="card-body pt-5 py-3">
                                    <h6 className="card-title mb-1 text-light">John Doe</h6>
                                    <p className="small mb-1 text-light">Chief Executive Officer</p>
                                    <p className="card-text small text-light">John's vision drives our innovation.</p>
                                    <ul className="list-inline social-icons mb-0">
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-linkedin"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-twitter"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card shadow-lg border-0 rounded bg-darker text-center h-100">
                                <div className="img-wrapper rounded-circle mx-auto" style={{width: '150px', height: '150px', overflow: 'hidden', marginTop: '-75px', border: '5px solid var(--bs-darker)'}}>
                                    <img src="assets/images/clients/c2.png" className="card-img-top rounded-circle" alt="Person 2" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                </div>
                                <div className="card-body pt-5 py-3">
                                    <h6 className="card-title mb-1 text-light">Jane Smith</h6>
                                    <p className="small mb-1 text-light">Head of Marketing</p>
                                    <p className="card-text small text-light">Jane builds strong brand identities.</p>
                                    <ul className="list-inline social-icons mb-0">
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card shadow-lg border-0 rounded bg-darker text-center h-100">
                                <div className="img-wrapper rounded-circle mx-auto" style={{width: '150px', height: '150px', overflow: 'hidden', marginTop: '-75px', border: '5px solid var(--bs-darker)'}}>
                                    <img src="assets/images/clients/c3.png" className="card-img-top rounded-circle" alt="Person 3" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                </div>
                                <div className="card-body pt-5 py-3">
                                    <h6 className="card-title mb-1 text-light">David Lee</h6>
                                    <p className="small mb-1 text-light">Lead Developer</p>
                                    <p className="card-text small text-light">David excels in building scalable web applications.</p>
                                    <ul className="list-inline social-icons mb-0">
                                        <li className="list-inline-item"><a href="#" className="text-light"><i className="bi bi-github"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-section">
                <div className="container">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="faq-question">What is your return policy?</div>
                            <div className="faq-answer">
                                We offer a 30-day return policy. Please see our full return policy for details.
                            </div>
                            <div className="faq-question">Do you offer financing?</div>
                            <div className="faq-answer">
                                Yes, we offer financing options through our partners. Contact us for more information.
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="faq-question">What is your return policy?</div>
                            <div className="faq-answer">
                                We offer a 30-day return policy. Please see our full return policy for details.
                            </div>
                            <div className="faq-question">Do you offer financing?</div>
                            <div className="faq-answer">
                                Yes, we offer financing options through our partners. Contact us for more information.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container-fluid footer-content">
                    <a href="#" className="footer-link">Privacy Policy</a>
                    <a href="#" className="footer-link">Terms of Service</a>
                    <a href="#" className="footer-link">Contact Us</a>
                    <span className="footer-text">&copy; 2025 Car Models E-commerce. All rights reserved.</span>
                </div>
            </footer>
        </>
    )
}
