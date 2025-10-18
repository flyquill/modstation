import React, { useEffect, useState } from 'react';
import Packages from '../components/Packages';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Categories() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
  const categoryId = queryParams.get('id');
  const [renderKey, setRenderKey] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          setRenderKey(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (token) {
            const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/categories/${categoryId}?includePackages=1`);
            const data = await res.json();
            const name = data?.data?.name || 'FiveM Mods';
            setCategoryName(name);
            const pkgs = Array.isArray(data?.data?.packages) ? data.data.packages : [];
            setCategoryItems(pkgs.map(p => ({
              name: p?.name || 'FiveM Mod',
              url: `https://gtamodstation.com/package?id=${p?.id}${categoryId ? `&categoryId=${categoryId}` : ''}`
            })));
          }
        } catch (err) {
          console.error('Error fetching category details:', err);
        }
      };
      fetchCategory();
    }
  }, [categoryId, token]);  // Dependency array with categoryId

  return (
    <>
      <Helmet>
        <title>{`${categoryName || 'FiveM Mods'} — FiveM Mods | GTAModStation`}</title>
        <meta
          name="description"
          content={`Browse ${categoryName || 'FiveM'} mods for GTA V/FiveM. High-fidelity, optimized models from GTAModStation.`}
        />
        <link rel="canonical" href={`https://gtamodstation.com/category?id=${categoryId || ''}`} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${categoryName || 'FiveM Mods'} — FiveM Mods | GTAModStation`} />
        <meta property="og:description" content={`Browse ${categoryName || 'FiveM'} mods for GTA V/FiveM.`} />
        <meta property="og:url" content={`https://gtamodstation.com/category?id=${categoryId || ''}`} />
        <meta property="og:image" content={`https://gtamodstation.com/logo512.png`} />
        <meta property="og:site_name" content="GTAModStation" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${categoryName || 'FiveM Mods'} — FiveM Mods | GTAModStation`} />
        <meta name="twitter:description" content={`Browse ${categoryName || 'FiveM'} mods for GTA V/FiveM.`} />
        <meta name="twitter:image" content={`https://gtamodstation.com/logo512.png`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": categoryItems.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "url": item.url
            }))
          })}
        </script>
      </Helmet>
      <Packages category={categoryId} key={renderKey} />
    </>
  );
}
