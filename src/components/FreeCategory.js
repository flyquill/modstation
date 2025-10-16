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
      const res = await fetch(`${databaseApiUrl}get_private_packages.php`);
      const data = await res.json();
      // your API returns either an array or a single object?
      setPackages(Array.isArray(data) ? data : [data]);
      console.log(packages);
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

  // Example React function to insert a package
  async function insertPackage() {
    try {
      const response = await fetch(`${databaseApiUrl}new_private_package.php`, {
        method: "GET", // can be GET too, but better to keep POST for inserts
        headers: {
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();

      // Alert the message returned by PHP
      alert(result.message);

    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  async function delete_private_package(id) {
    try {
      const response = await fetch(`${databaseApiUrl}delete_private_package.php?id=${id}.php`, {
        method: "GET", // can be GET too, but better to keep POST for inserts
        headers: {
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();

      // Alert the message returned by PHP
      alert(result.message);

    } catch (error) {
      alert("Error: " + error.message);
    }
  }

console.log(packages[0]?.error)
  return (
    <div className="container mt-4">
      {loading ? (
        <LoadingPlaceholders />
      ) :
        <div>
          <div className='row align-items-end mb-5'>
            <h2 className='col'>Free</h2>
            <div className='col text-end'>
              <button className='btn btn-success' onClick={insertPackage}>Add New</button>
            </div>
          </div>
            {!loading && packages.length > 0 && !packages[0]?.error ?
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
             {packages.map(pkg => (
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
                        alt={pkg.package_name}
                        style={{ minHeight: '259px' }}
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
                    <button
                      type="button"
                      onClick={() => delete_private_package(pkg.id)}
                      className="btn btn-danger btn-sm btn-add-to-cart"
                    >
                      Delete this package
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/packageManagement?id=${pkg.id}&is_private=YES`)
                      }
                      className="btn btn-danger btn-sm btn-add-to-cart"
                    >
                      Manage this package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> : 'Sorry No package found!'}
        </div>
      }
    </div>
  );
}
