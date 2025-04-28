import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cartUtils';

export default function Auth() {
  const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
  const [loading, setLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const fetchAuthUrl = async () => {
      const cookieName = "basket_ident";
      let basketIdent = getCookie(cookieName);
      let basketVerified = getCookie('basketVerified');

      if (!basketIdent || !basketVerified) {
        try {
          const response = await fetch(`https://headless.tebex.io/api/accounts/${token}/baskets`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              complete_url: "https://gtamodstation.com/",
              cancel_url: "https://gtamodstation.com/",
              complete_auto_redirect: true,
              player: { type: "fivem" }
            })
          });

          const data = await response.json();

          if (data?.data?.ident) {
            basketIdent = data.data.ident;
            setCookie(cookieName, basketIdent);

            const authResponse = await fetch(`https://headless.tebex.io/api/accounts/${token}/baskets/${basketIdent}/auth?returnUrl=https://gtamodstation.com?basketVerified=true`);
            const authData = await authResponse.json();

            if (Array.isArray(authData) && authData[0]?.url) {
              setAuthUrl(authData[0].url);
              // setAuthUrl('/?basketVerified=true');
            }
          } else {
            console.error("Basket creation failed:", data);
          }
        } catch (error) {
          console.error("Error creating basket:", error);
        }
      }
    };

    fetchAuthUrl();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [token]);

  const handleAuthorize = () => {
    setLoading(true);
    if (authUrl) {
      window.location.href = authUrl;
    } else {
      console.error("Authorization URL not available yet.");
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="my-5">Please login using your CFX.re account so we can identify you in game</h3>
      <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleAuthorize} disabled={loading}>
        {loading && (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        )}
        {loading ? 'Authorizing...' : 'Login with FiveM'}
      </button>
    </div>
  );
}
