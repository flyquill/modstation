import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cartUtils';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function Auth() {
  const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
  const [loading, setLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState('');
  const location = useLocation();
  const canonicalUrl = 'https://gtamodstation.com' + location.pathname;

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
      <Helmet>
        <title>Authorize FiveM | GTA ModStation</title>
        <meta name="description" content="Login via CFX.re to link your FiveM account, verify your basket, and continue checkout on GTA ModStation." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="noindex,nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Authorize FiveM | GTA ModStation" />
        <meta property="og:description" content="Login via CFX.re to link your FiveM account, verify your basket, and continue checkout on GTA ModStation." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://gtamodstation.com/logo512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Authorize FiveM | GTA ModStation" />
        <meta name="twitter:description" content="Login via CFX.re to link your FiveM account, verify your basket, and continue checkout on GTA ModStation." />
        <meta name="twitter:image" content="https://gtamodstation.com/logo512.png" />
      </Helmet>
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
