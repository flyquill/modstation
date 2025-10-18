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

  const [turnstileToken, setTurnstileToken] = useState("");
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

    formPayload.append("cf-turnstile-response", turnstileToken);

    try {
      const response = await axios.post(
        `${databaseApiUrl}contact_us.php`,
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = response.data;
      if (data.status_id === "1") {
        alert(
          "✅ Success! Your message has been sent. We appreciate you reaching out and will respond as soon as we can."
        );
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
    <div className="custom-page">
      <div className="custom-bg-layers">
        <div className="bg-pulse-layer"></div>
        <div className="bg-spin-layer blue"></div>
        <div className="bg-spin-layer red reverse"></div>
      </div>

      <div className="custom-card">
        <p className="subtext text-center mb-2">
          You can contact us directly on {" "}
          <a className="text-decoration-none" href="mailto:support@gtamodstation.com">support@gtamodstation.com</a>
        </p>
        <h1 className="gradient-text text-center">Contact Us</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`form-control custom-input ${formData.name ? 'has-value' : ''}`}
            />
          </div>

          <div className="mt-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={`form-control custom-input ${formData.email ? 'has-value' : ''}`}
            />
          </div>

          <div className="mt-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Message subject"
              className={`form-control custom-input ${formData.subject ? 'has-value' : ''}`}
            />
          </div>

          <div className="mt-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className={`form-control custom-textarea ${formData.message ? 'has-value' : ''}`}
            ></textarea>
          </div>

          <TurnstileWidget onVerify={setTurnstileToken} />

          <div className="mt-3">
            <button type="submit" disabled={isSubmitting} className="gradient-btn w-100">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;