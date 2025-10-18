import React, { useState, useEffect } from "react";
import axios from "axios";
import TurnstileWidget from "../utils/TurnstileWidget";

const CarModelRequest = () => {
  const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    model_name: "",
    model_category: "",
    model_description: "",
    additional_details: "",
    reference_files: [],
  });

  const [turnstileToken, setTurnstileToken] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const MAX_FILES = 3;
  const MAX_FILE_SIZE_MB = 40;
  const COOKIE_NAME = "last_request_time";

  const setCookie = (name, value, hours) => {
    const d = new Date();
    d.setTime(d.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const lastRequest = getCookie(COOKIE_NAME);
    if (lastRequest) {
      const lastTime = parseInt(lastRequest, 10);
      const now = Date.now();
      const hoursPassed = (now - lastTime) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        setCanSubmit(false);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "reference_files") {
      let selectedFiles = Array.from(files);
      let allFiles = [...formData.reference_files, ...selectedFiles];

      if (allFiles.length > MAX_FILES) {
        alert(`You can only upload up to ${MAX_FILES} files.`);
        allFiles = allFiles.slice(0, MAX_FILES);
      }

      const oversizedFiles = allFiles.filter((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        alert(`Each file must be less than ${MAX_FILE_SIZE_MB}MB. Please reselect files.`);
        e.target.value = "";
        return;
      }

      setFormData({ ...formData, [name]: allFiles });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    setIsSubmitted(true);

    if (!turnstileToken) {
      alert("⚠️ Please verify you are human before submitting.");
      setIsSubmitted(false);
      return;
    }

    if (formData.reference_files.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files.`);
      setIsSubmitted(false);
      return;
    }

    for (let file of formData.reference_files) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File "${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB limit. Please remove it.`);
        setIsSubmitted(false);
        return;
      }
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "reference_files" && value.length > 0) {
        value.forEach((file) => formPayload.append(`${key}[]`, file));
      } else if (value) {
        formPayload.append(key, value);
      }
    });

    formPayload.append("cf-turnstile-response", turnstileToken);

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const response = await axios.post(`${databaseApiUrl}gta_model_request.php`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      const data = response.data;
      if (data.status_id === "1") {
        setFormData({
          customer_name: "",
          customer_email: "",
          model_name: "",
          model_category: "",
          model_description: "",
          additional_details: "",
          reference_files: [],
        });
        document.getElementById("reference_files").value = "";
        setShowPopup(true);

        setCookie(COOKIE_NAME, Date.now(), 24);
        setCanSubmit(false);
      } else {
        alert("Failed to submit: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="custom-page">
      <div className="custom-bg-layers">
        <div className="bg-pulse-layer"></div>
        <div className="bg-spin-layer blue"></div>
        <div className="bg-spin-layer red reverse"></div>
      </div>

      {showPopup && (
        <div
          style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0, 0, 0, 0.85)", zIndex: 1050 }}
        >
          <div
            style={{ background: "linear-gradient(145deg, #1a1a1a, #000000)", color: "#ff3333", padding: "30px", borderRadius: "12px", boxShadow: "0 0 20px rgba(255, 0, 0, 0.7)", textAlign: "center", maxWidth: "420px", fontFamily: "'Orbitron', sans-serif" }}
          >
            <h5 style={{ marginBottom: "15px", fontSize: "22px", textTransform: "uppercase" }}>Request Submitted</h5>
            <p style={{ color: "#ddd", fontSize: "16px", lineHeight: "1.5" }}>
              We will be in touch with you within <strong style={{ color: "#ff3333" }}>12 hours</strong> through your email.
            </p>
            <button
              onClick={() => { setShowPopup(false); window.location.href = "/"; }}
              style={{ marginTop: "20px", background: "#ff0000", color: "#fff", border: "none", padding: "10px 25px", fontSize: "16px", borderRadius: "8px", cursor: "pointer", boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)", transition: "all 0.2s ease-in-out" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#cc0000")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#ff0000")}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {canSubmit ? (
        <div className="custom-card">
          <h1 className="gradient-text text-center">Request Your Custom Build</h1>
          <p className="subtext text-center mb-4">Fill the requirements below to request your own model creation.</p>

          <form onSubmit={handleSubmit}>
            <div className="row g-4 align-items-start">
              <div className="col-12 col-sm-6 col-md-6">
                <label className="form-label">Your Name</label>
                <input type="text" name="customer_name" required value={formData.customer_name} onChange={handleChange} placeholder="Enter your name" className={`form-control custom-input ${formData.customer_name ? 'has-value' : ''}`} />
              </div>
              <div className="col-12 col-sm-6 col-md-6">
                <label className="form-label">Email</label>
                <input type="email" name="customer_email" required value={formData.customer_email} onChange={handleChange} placeholder="example@email.com" className={`form-control custom-input ${formData.customer_email ? 'has-value' : ''}`} />
              </div>
            </div>

            <div className="row g-4 mt-2 align-items-start">
              <div className="col-12 col-sm-6 col-md-6">
                <label className="form-label">Model Name</label>
                <input type="text" name="model_name" required value={formData.model_name} onChange={handleChange} placeholder="Model name" className={`form-control custom-input ${formData.model_name ? 'has-value' : ''}`} />
              </div>
              <div className="col-12 col-sm-6 col-md-6">
                <label className="form-label">Model Category</label>
                <select name="model_category" required value={formData.model_category} onChange={handleChange} className={`form-select custom-select ${formData.model_category ? 'has-value' : ''}`}>
                  <option value="">Select Category</option>
                  <option value="emergency">Emergency</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="utility">Utility</option>
                  <option value="military">Military</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Model Description</label>
              <textarea name="model_description" rows="4" required value={formData.model_description} onChange={handleChange} placeholder="Describe your model..." className={`form-control custom-textarea ${formData.model_description ? 'has-value' : ''}`}></textarea>
            </div>

            <div className="mt-3">
              <label className="form-label">Attach Reference Files</label>
              <input type="file" name="reference_files" id="reference_files" multiple onChange={handleChange} className="file-input" />
              <p className="custom-help-text">Upload up to {MAX_FILES} files ({MAX_FILE_SIZE_MB}MB each). For larger, upload to Google Drive and share the link below.</p>
              {formData.reference_files.length > 0 && (
                <ul className="list-group mt-2">
                  {formData.reference_files.map((file, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => {
                        const updatedFiles = formData.reference_files.filter((_, i) => i !== idx);
                        setFormData({ ...formData, reference_files: updatedFiles });
                      }}>
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-3">
              <label className="form-label">Additional Details</label>
              <textarea name="additional_details" rows="3" value={formData.additional_details} onChange={handleChange} placeholder="Any extra notes or links..." className={`form-control custom-textarea ${formData.additional_details ? 'has-value' : ''}`}></textarea>
            </div>

            {isUploading && (
              <div className="mb-3">
                <label className="form-label">Uploading...</label>
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${uploadProgress}%`, backgroundColor: "#ff0000" }}>
                    {uploadProgress}%
                  </div>
                </div>
              </div>
            )}

            <TurnstileWidget onVerify={setTurnstileToken} />

            <div className="mt-3">
              <button type="submit" disabled={isUploading || isSubmitted} className="gradient-btn w-100">
                {isUploading ? "Uploading..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center text-light bg-transparent" style={{ padding: "30px", borderRadius: "12px" }}>
          <h3 className="mb-5" style={{ color: "#ff3333" }}>Request Already Submitted</h3>
          <p>
            You have already submitted a request. Please check your email or wait <strong>24 hours</strong> before submitting another request.
          </p>
          <p>
            For urgent inquiries, contact us via live chat support or email at <strong><a className="text-decoration-none" href="mailto:support@gtamodstation.com">support@gtamodstation.com</a></strong>.
          </p>
        </div>
      )}
    </div>
  );
};
export default CarModelRequest;