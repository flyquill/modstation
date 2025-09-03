import React from 'react';

export default function Terms() {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="container py-5">
            <div className="row align-items-center text-center">
                <div className="col-md-12">
                    <h2 className="mb-4">Terms & Conditions</h2>
                    <h4 className="text-light">
                        Welcome to GTAModStation. By accessing or using our website and purchasing mods, you agree to these Terms of Service.
                    </h4>

                    <br />
                    <div className="row align-items-center">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <p className="text-light text-start">
                                <h4>Purchases & Payments</h4>
                                All purchases, checkouts, and deliveries are securely processed by Tebex Limited. <br />
                                • We do not process or store your payment details. <br />
                                • For payment processing and refunds, please refer to the <a href="https://checkout.tebex.io/terms" target='_blank'>Tebex Terms</a> and <a href="https://www.tebex.io/terms-creator-agreement/privacy-policy" target='_blank'>Privacy Policy</a>. <br />
                                • All financial transactions and payments on this website are handled by Tebex, our third-party e-commerce and payment provider. By using our website and making a purchase, you agree to the processing of your payment by Tebex and are bound by their terms of service, which you can find here: <a href="https://www.tebex.io/terms-creator-agreement/privacy-policy" target='_blank'>Privacy Policy</a> and <a href="https://checkout.tebex.io/terms" target='_blank'>Tebex Terms</a>.
                            </p>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    <br />
                    <div className="row align-items-center">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <p className="text-light text-start">
                                <h4>Refunds</h4>
                                • Refunds are handled in accordance with Tebex’s refund policy. Please read <a href="https://checkout.tebex.io/terms" target='_blank'>Tebex Terms</a> and <a href="https://www.tebex.io/terms-creator-agreement/privacy-policy" target='_blank'>Privacy Policy</a> for more details.<br />
                            </p>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    <br />
                    <div className="row align-items-center">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <p className="text-light text-start">
                                <h4>Restrictions</h4>
                                • Redistribution, resale, or modification of our assets for resale is not permitted. <br />
                                • Mods are provided “as is” without warranties. <br />
                            </p>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    <br />
                    <div className="row align-items-center">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <p className="text-light text-start">
                                <h4>Liability</h4>
                                We are not responsible for:
                                • Tebex’s processing of payments and delivery. <br />
                                • Any technical issues on third-party platforms. <br />
                            </p>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    <br />
                    <div className="row align-items-center">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <p className="text-light text-start">
                                <h4>Changes to Terms</h4>
                                • We may update these Terms at any time. Continued use of our site after changes means you accept the new Terms. <br />
                            </p>
                        </div>
                        <div className="col-md-3"></div>
                    </div>

                    {/* <button className="btn btn-primary mt-3">Learn More</button> */}
                </div>
            </div>
        </div>
    );
}
