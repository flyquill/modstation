import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function UploadPackageForm() {
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [googleDriveLink, setGoogleDriveLink] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [images, setImages] = useState([]);        // New images to upload
    const [existingImages, setExistingImages] = useState([]); // Existing images from database
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const databaseApiKey = process.env.REACT_APP_DATABASE_API_KEY;
    const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;

    const packageId = queryParams.get('id');
    const is_private = queryParams.get('is_private') ? 'YES' : 'NO';

    useEffect(() => {
        if (!packageId) return;

        const fetchPackageData = async () => {
            try {

                // const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/packages/${id}`);
                // const data = await res.json();

                const response = await fetch(`${databaseApiUrl}get_packages.php?package_id=${packageId}&is_private=${is_private}&api_key=${databaseApiKey}`);
                const data = await response.json();

                if (!data.error) {
                    setTitle(data.package_title || '');
                    setVideoUrl(data.video_url || '');
                    setGoogleDriveLink(data.google_drive_link || '');
                    setOriginalTitle(title);
                    setExistingImages(data.package_images || []);
                }
            } catch (error) {
                console.error('Error fetching package:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackageData();
    }, [packageId, databaseApiKey, databaseApiUrl]);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...selectedFiles]);
    };

    const handleDeleteImage = async (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) return;

        const imageName = existingImages[index];

        try {
            const response = await fetch(`${databaseApiUrl}delete_image.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    package_id: packageId,
                    api_key: databaseApiKey,
                    image_name: imageName
                }),
            });

            const result = await response.json();
            console.log(result);

            if (result.message) {
                // If deleted successfully, update UI
                const updatedImages = existingImages.filter((_, i) => i !== index);
                setExistingImages(updatedImages);
                alert('Image deleted successfully');
            } else {
                alert(result.error || 'Failed to delete image');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting image');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            alert("Please enter the title.");
            return;
        }

        const formData = new FormData();
        formData.append('package_title', title);
        formData.append('package_id', packageId);
        formData.append('video_url', videoUrl);
        formData.append('is_private', is_private);
        formData.append('google_drive_link', googleDriveLink);
        formData.append('api_key', databaseApiKey);

        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }

        formData.append('existing_images', JSON.stringify(existingImages)); // send updated existing images

        try {
            const response = await fetch(`${databaseApiUrl}upload_package.php`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log(result);

            if (result.message) {
                alert('Package uploaded successfully!');
                setTitle('');
                setVideoUrl('');
                setImages([]);
                setExistingImages([]);
            } else {
                alert('Error uploading package.');
            }
        } catch (error) {
            console.error(error);
            alert('Error uploading package.');
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading package...</div>;
    }

    const canonicalUrl = 'https://gtamodstation.com' + location.pathname + location.search;

    return (
        <>
            <Helmet>
                <title>Package Management | GTA ModStation</title>
                <meta name="description" content="Upload and manage GTA ModStation packages: titles, images, videos, and links for free packages." />
                <link rel="canonical" href={canonicalUrl} />
                <meta name="robots" content="noindex,nofollow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Package Management | GTA ModStation" />
                <meta property="og:description" content="Upload and manage GTA ModStation packages: titles, images, videos, and links for free packages." />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content="https://gtamodstation.com/logo512.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Package Management | GTA ModStation" />
                <meta name="twitter:description" content="Upload and manage GTA ModStation packages: titles, images, videos, and links for free packages." />
                <meta name="twitter:image" content="https://gtamodstation.com/logo512.png" />
            </Helmet>
            <div className="container mt-5" style={{ maxWidth: '600px' }}>
                <h2 className="text-center mb-4">Upload Package</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='package_title'>Package Title:</label>
                        <div className='row row-cols-2'>
                            <div className='col-md-11' style={{paddingRight: '0px'}}>
                                <input
                                    id='package_title'
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    style={{paddingRight: '0px', borderRadius: '0.375rem 0px 0px 0.375rem'}}
                                />
                            </div>
                            <div className='col-md-1' style={{paddingLeft: '0px'}}>
                                <button onClick={()=>{setTitle(originalTitle)}} type='button' className='btn btn-warning' 
                                style={{padding: '6px 9px', borderRadius: '0px 0.375rem 0.375rem 0px'}}>
                                    <i className="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {existingImages.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label">Existing Images:</label>
                            <div className="row">
                                {existingImages.map((img, index) => (
                                    <div className="col-6 col-md-4 mb-3" key={index}>
                                        <div className="card">
                                            <img
                                                src={`${databaseApiUrl}uploads/${img}`}
                                                className="card-img-top"
                                                alt={`${title || 'Package'} image ${index + 1}`}
                                                loading="lazy"
                                                style={{ height: '150px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body text-center p-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteImage(index)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Select New Images:</label>
                        <input
                            type="file"
                            className="form-control"
                            multiple
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Video Url:</label>
                        <input type="text" className="form-control" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Google Drive Link (Only for Free Packages):</label>
                        <input type="text" className="form-control" value={googleDriveLink} onChange={(e) => setGoogleDriveLink(e.target.value)}/>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success">
                            Save Package
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
