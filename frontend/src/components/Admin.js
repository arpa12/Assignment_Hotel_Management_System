import React, { useState, useEffect } from "react";
import API, { logoutUser } from "../api";
import "../assets/css/admin.css";

function AdminHotels() {
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 8;

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [costPerNight, setCostPerNight] = useState("");
    const [availableRooms, setAvailableRooms] = useState("");
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [user, setUser] = useState(null);
    const [totalHotels, setTotalHotels] = useState(0);

    useEffect(() => {
        fetchHotels();
        fetchUserData();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await API.get("/hotels");
            setHotels(response.data);
            setTotalHotels(response.data.length);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await API.get("/me");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("cost_per_night", costPerNight);
        formData.append("available_rooms", availableRooms);
        if (image) formData.append("image", image);

        try {
            if (editingId) {
                await API.post(`/hotels/${editingId}?_method=PUT`, formData);
                setSuccessMessage("✅ Hotel updated successfully!");
            } else {
                await API.post("/hotels", formData);
                setSuccessMessage("🎉 Hotel created successfully!");
            }

            setTimeout(() => setSuccessMessage(""), 3000);
            setName(""); setAddress(""); setCostPerNight("");
            setAvailableRooms(""); setImage(null); setEditingId(null);
            fetchHotels();
        } catch (error) {
            console.error("Upload Error:", error.response?.data);
        }
    };

    const handleEdit = (hotel) => {
        setName(hotel.name);
        setAddress(hotel.address);
        setCostPerNight(hotel.cost_per_night);
        setAvailableRooms(hotel.available_rooms);
        setEditingId(hotel.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this hotel?")) {
            try {
                await API.delete(`/hotels/${id}`);
                setSuccessMessage("❌ Hotel deleted successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
                fetchHotels();
            } catch (error) {
                console.error("Delete Error:", error.response?.data);
            }
        }
    };

    // Pagination logic
    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

    const nextPage = () => {
        if (indexOfLastHotel < hotels.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="admin-panel">
            <h2 className="admin-title">Admin Panel - Manage Hotels</h2>

            {user && (
                <div className="admin-user">
                    <p>Welcome, <strong>{user.name}</strong>!</p>
                    <button className="logout-btn" onClick={logoutUser}>Logout</button>
                </div>
            )}

            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="hotel-form">
                <strong>You can easily create a hotel using the form, and update or delete a hotel with just one click.</strong>
            </div>

            {/* Total Hotel Count */}
            <div className="hotel-count">
                <h3>Total Hotels: {totalHotels}</h3>
            </div>

            <form className="hotel-form" onSubmit={handleSubmit}>
                <input className="hotel-input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="hotel-input" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <input className="hotel-input" type="number" placeholder="Cost per Night" value={costPerNight} onChange={(e) => setCostPerNight(e.target.value)} required />
                <input className="hotel-input" type="number" placeholder="Available Rooms" value={availableRooms} onChange={(e) => setAvailableRooms(e.target.value)} required />
                <input className="hotel-file" type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button className="submit-btn" type="submit">{editingId ? "Update" : "Create"}</button>
            </form>

            <table className="hotel-list-table">
                <thead>
                    <tr>
                        <th>Image</th><th>Name</th><th>Address</th><th>Price</th><th>Rooms</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentHotels.map(hotel => (
                        <tr key={hotel.id}>
                            <td><img src={hotel.image} alt={hotel.name} /></td>
                            <td>{hotel.name}</td>
                            <td>{hotel.address}</td>
                            <td>${hotel.cost_per_night}</td>
                            <td>{hotel.available_rooms}</td>
                            <td className="action-buttons">
                                <button className="edit-btn" onClick={() => handleEdit(hotel)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(hotel.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button className="pagination-btn" onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="pagination-text">
                    Page {currentPage} of {Math.ceil(hotels.length / hotelsPerPage)}
                </span>
                <button className="pagination-btn" onClick={nextPage} disabled={indexOfLastHotel >= hotels.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default AdminHotels;
