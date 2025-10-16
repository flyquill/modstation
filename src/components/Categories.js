import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingPlaceholders from './LoadingPlaceholders';
import Addons from '../components/Addons';

export default function Categories(props) {
    const alertTimeoutRef = useRef(null);

    const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [mainPackageId, setmainPackageId] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/categories?includePackages=1`);
            const data = await res.json();

            setCategories(data.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLinkAddon = async (packageId, packageName) => {
        setmainPackageId(packageId);
        setModalTitle(packageName);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const loadAll = async () => {
            await fetchCategories();
        };

        loadAll();

        return () => {
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        };
    }, []);

    return (
        <div className="container mt-4">
            {loading ? (
                <LoadingPlaceholders />
            ) : (
                categories.map(category => (
                    <div key={category.id}>
                        <h2>{category.name}</h2>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4">
                            {category.packages.map(pkg => (
                                <div className="col" key={pkg.id}>
                                    <div className="car-card" style={{ backgroundColor: '#0B0909' }}>
                                        <Link to={`/package?id=${pkg.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                            <div className="car-image-container">
                                                <img src={pkg.image} className="car-image" alt={pkg.name} style={{ minHeight: '259px' }} />
                                            </div>
                                        </Link>
                                        <div className="car-details">
                                            <h5 className="card-title">{pkg.name}</h5>
                                            <p className="car-description" style={{ color: 'white', fontWeight: 'bold' }}>
                                                Price: ${pkg.total_price}
                                            </p>
                                            <button type="button" onClick={() => { handleLinkAddon(pkg.id, pkg.name) }} className="btn btn-danger btn-sm btn-add-to-cart" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Link Addons
                                            </button>
                                            <button type="button" onClick={ () => {navigate(`/packageManagement?id=${pkg.id}`)} } className="btn btn-danger btn-sm btn-add-to-cart">
                                                Manage this package
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Addons Modal */}
                            <div className="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content bg-dark text-light">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Attach Addons to {modalTitle}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            {/* <Addons category={2953503} mainPackageId={mainPackageId} /> */}
                                            <Addons category={2909711} mainPackageId={mainPackageId} />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

