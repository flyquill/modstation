import React, { useState } from "react";
import axios from "axios";
import TurnstileWidget from "../utils/TurnstileWidget";

const ContactUs = () => {
    const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [turnstileToken, setTurnstileToken] = useState(""); // ✅ store token
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!turnstileToken) {
            alert("⚠️ Please verify you are human before submitting.");
            setIsSubmitting(false);
            return;
        }

        const formPayload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formPayload.append(key, value);
        });

        // ✅ Append Turnstile token
        formPayload.append("cf-turnstile-response", turnstileToken);

        try {
            const response = await axios.post(
                `${databaseApiUrl}contact_us.php`,
                formPayload,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const data = response.data;
            console.log("Server response:", data);

            if (data.status_id === "1") {
                alert("✅ Success! Your message has been sent. We appreciate you reaching out and will respond as soon as we can.");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTurnstileToken("");
                window.location.href = "/";
            } else {
                alert("❌ Failed: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <p className="text-light text-center">You can contact us directly on <a className="text-decoration-none" href="mailto:support@gtamodstation.com">support@gtamodstation.com</a></p>
                    <div className="card shadow" style={{ backgroundColor: "#131111" }}>
                        <div className="card-body p-4">
                            <h2 className="text-center text-danger mb-4">Contact Us</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-light">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-light">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-light">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-light">Message</label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="form-control"
                                    ></textarea>
                                </div>

                                {/* ✅ Cloudflare Turnstile */}
                                <TurnstileWidget onVerify={setTurnstileToken} />

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-danger"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
