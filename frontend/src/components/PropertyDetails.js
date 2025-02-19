import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "../assets/css/propertyDetails.css"; // Importing the new CSS

function PropertyDetails() {
    const { id } = useParams(); // Get the property ID from URL
    const navigate = useNavigate(); // Navigation for back button
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPropertyDetails();
    }, []);

    const fetchPropertyDetails = async () => {
        try {
            const response = await API.get(`/hotels/${id}`); // Fetch property details
            setProperty(response.data);
            setLoading(false);
        } catch (error) {
            setError("Property not found.");
            setLoading(false);
        }
    };

    // Social Media Share Function
    const shareProperty = (platform) => {
        const propertyUrl = `${window.location.origin}/property/${id}`;
        const propertyName = encodeURIComponent(property?.name);

        let shareLink = "";

        switch (platform) {
            case "facebook":
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${propertyUrl}`;
                break;
            case "twitter":
                shareLink = `https://twitter.com/intent/tweet?url=${propertyUrl}&text=Check out this property: ${propertyName}`;
                break;
            case "whatsapp":
                shareLink = `https://api.whatsapp.com/send?text=Check out this property: ${propertyName} - ${propertyUrl}`;
                break;
            case "linkedin":
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${propertyUrl}`;
                break;
            default:
                return;
        }

        window.open(shareLink, "_blank");
    };

    if (loading) return <p>Loading property details...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="property-details-container">
            <h2 className="property-title">{property.name}</h2>
            <img src={property.image} alt={property.name} className="property-image" />

            {/* Property Information - Redesigned */}
            <div className="property-info">
   

                <div className="info-card">
                    <div>
                        <p className="info-title">Address</p>
                        <p className="info-detail">{property.address}</p>
                    </div>
                </div>

                <div className="info-card">
                    <div>
                        <p className="info-title">Cost per Night</p>
                        <p className="info-detail">${property.cost_per_night}</p>
                    </div>
                </div>

                <div className="info-card">
                    <div>
                        <p className="info-title">Available Rooms</p>
                        <p className="info-detail">{property.available_rooms}</p>
                    </div>
                </div>

                <div className="info-card">
                    <div>
                        <p className="info-title">Rating</p>
                        <p className="info-detail">{property.average_rating}</p>
                    </div>
                </div>
            </div>

            {/* Social Media Sharing Buttons */}
            <div className="share-buttons">
                <p><strong>Share this property on:</strong></p>
                <button onClick={() => shareProperty("facebook")} className="social-btn facebook">Facebook</button>
                <button onClick={() => shareProperty("twitter")} className="social-btn twitter">Twitter</button>
                <button onClick={() => shareProperty("whatsapp")} className="social-btn whatsapp">WhatsApp</button>
                <button onClick={() => shareProperty("linkedin")} className="social-btn linkedin">LinkedIn</button>
            </div>

            {/* Back to previous page */}
            <button onClick={() => navigate(-1)} className="back-btn">
                ← Back
            </button>
        </div>
    );
}

export default PropertyDetails;
