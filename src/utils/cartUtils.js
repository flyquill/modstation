
const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;

// Utility: Get cookie by name
export function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
  
  // Utility: Set cookie
  export function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }
  
  export async function addToCartPackage(packageId) {

    const basketIdent = await createBasketIfNotExists();
  
    const response = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "package_id": packageId,
        "quantity": 1
      })
    });
  
    const data = await response.json();
    // console.log(data);
  }
  
  export async function createBasketIfNotExists() {
    const cookieName = "basket_ident";
    let basketIdent = getCookie(cookieName);
  
    if (!basketIdent) {
      try {
        const response = await fetch(`https://headless.tebex.io/api/accounts/${token}/baskets`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            complete_url: "http://localhost:3000/",
            cancel_url: "http://localhost:3000/",
            custom: {
              foo: "bar"
            },
            complete_auto_redirect: true,
            player: {
              type: "fivem"
            }
          })
        });
  
        const data = await response.json();
  
        if (data?.data?.ident) {
          basketIdent = data.data.ident;
          setCookie(cookieName, basketIdent);
  
          const authResponse = await fetch(`https://headless.tebex.io/api/accounts/${token}/baskets/${basketIdent}/auth?returnUrl=http://localhost:3000`);
          const authData = await authResponse.json();

          if (Array.isArray(authData) && authData[0]?.url) {
            window.location.replace(authData[0].url);
          }          
  
        } else {
          console.error("Basket creation failed:", data);
        }
  
      } catch (error) {
        console.error("Error creating basket:", error);
      }
    }
  
    return basketIdent;
  }