import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingPlaceholders from './LoadingPlaceholders';

export default function Addons(props) {
    const alertTimeoutRef = useRef(null);

    const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
    const databaseApiKey = process.env.REACT_APP_DATABASE_API_KEY;
    const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [attachedPackages, setAttachedPackages] = useState([]);

    const fetchPackages = async () => {
        try {
            const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/categories/${props.category}?includePackages=1`);
            const data = await res.json();

            setPackages(data.data.packages);
        } catch (err) {
            console.error("Error fetching packages:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttachedPackages = async () => {
        try {
            const res = await fetch(`${databaseApiUrl}getAddons.php?mainPackageId=${props.mainPackageId}&apiKey=${databaseApiKey}`);
            const result = await res.json();

            if (result.status === 'success' && Array.isArray(result.data)) {
                const attachedIds = result.data.map(item => item.addon_package_id); // 🛠️ get addon_package_id
                setAttachedPackages(attachedIds); // ✅ save in state
            } else {
                console.error("Unexpected response structure:", result);
            }
        } catch (err) {
            console.error("Error fetching attached packages:", err);
        }
    };

    const handleAttachOrDetach = async (currentPackage) => {
        const isAttached = attachedPackages.includes(currentPackage);

        const targetAction = isAttached ? 'delete' : 'insert'; // 🚀 if attached, delete. Otherwise insert.

        try {
            const res = await fetch(`${databaseApiUrl}/addons.php?mainPackageId=${props.mainPackageId}&AddonPackageId=${currentPackage}&apiKey=${databaseApiKey}&target=${targetAction}`);
            const data = await res.json();

            if (data.status === 'success') {
                if (isAttached) {
                    // ✅ Successfully detached
                    setAttachedPackages(prev => prev.filter(id => id !== currentPackage));
                    // console.log('Detached');
                } else {
                    // ✅ Successfully attached
                    setAttachedPackages(prev => [...prev, currentPackage]);
                    // console.log('Attached');
                }
            } else {
                console.error(data);
            }
        } catch (err) {
            console.error("Error attaching/detaching package:", err);
        }
    };

    useEffect(() => {
        const loadAll = async () => {
            await fetchPackages();
            await fetchAttachedPackages();
        };

        loadAll();

        return () => {
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        };
    }, []);

    return (
        <div className="container mt-4 bg-dark">
            {loading ? (
                <LoadingPlaceholders />
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {packages.map(pkg => (
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

                                    <button
                                        className={`btn btn-sm btn-add-to-cart ${attachedPackages.includes(pkg.id) ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => handleAttachOrDetach(pkg.id)}
                                    >
                                        {attachedPackages.includes(pkg.id) ? 'Detach' : 'Attach'}
                                    </button>

                                    {attachedPackages.includes(pkg.id) && (
                                        <div style={{ marginTop: '6px' }}>
                                            <a href={`/package?id=${pkg.id}`} target="_blank" className="text-info small" style={{ textDecoration: 'underline' }}>
                                                View Attached Package
                                            </a>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

