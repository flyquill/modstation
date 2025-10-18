import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingPlaceholders from './LoadingPlaceholders';
import Addons from '../components/Addons';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${databaseApiUrl}get_private_packages.php?user=true`);
      const data = await res.json();
      // your API returns either an array or a single object?
      setPackages(Array.isArray(data) ? data : [data]);
      console.log(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchPackages();
  }, []);

  return (
    <div className="container mt-4">
      {loading ? (
        <LoadingPlaceholders />
      ) :
        <div>
          <div className='row align-items-end mb-5'>
            <h2 className='col'>Free</h2>
          </div>
          {!loading && packages.length > 0 && !packages[0]?.error ?
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {packages.map(pkg => (
                pkg.image_url ? 
                <div className="col" key={pkg.id}>
                    <div className="car-card" style={{ backgroundColor: '#0B0909' }}>
                    <Link
                        to={`/free?id=${pkg.id}`}
                        style={{ color: 'white', textDecoration: 'none' }}
                    >
                        <div className="car-image-container">
                        <img
                            src={`${databaseApiUrl}uploads/${pkg.image_url}` || '/placeholder.png'}
                            className="car-image"
                            alt={pkg.package_title}
                            style={{ minHeight: '259px' }}
                            loading="lazy"
                            decoding="async"
                        />
                        </div>
                    </Link>
                    <div className="car-details">
                        <h5 className="card-title">{pkg.package_title}</h5>
                        {/* <p
                        className="car-description"
                        style={{ color: 'white', fontWeight: 'bold' }}
                        >
                        {pkg.package_description}
                        </p> */}
                    </div>
                    </div>
                </div> : ''
            ))}
          </div> : <div className='text-center'>Sorry no package found</div>}
        </div>
      }
    </div>
  );
}
