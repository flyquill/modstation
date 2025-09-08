import React, { useEffect, useRef } from "react";

const TurnstileWidget = ({ onVerify }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.turnstile && containerRef.current) {
        window.turnstile.render(containerRef.current, {
          sitekey: "0x4AAAAAABz8ULW5QA-6U0Bw", // ✅ your sitekey
          callback: (token) => {
            console.log("Turnstile token:", token);
            onVerify(token); // ✅ pass token back to parent
          },
        });
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onVerify]);

  return <div ref={containerRef}></div>;
};

export default TurnstileWidget;
