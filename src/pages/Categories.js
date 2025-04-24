import React, { useEffect, useState } from 'react';
import Packages from '../components/Packages';
import { useLocation } from 'react-router-dom';

export default function Categories() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('id');
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (categoryId) {
      const fetchPackage = async () => {
        try {
          setRenderKey(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
          console.error("Error fetching packages:", err);
        }
      };
      fetchPackage();
    }
  }, [categoryId]);  // Dependency array with categoryId

  return (
    <>
      <Packages category={categoryId} key={renderKey} />
    </>
  );
}
