import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API, { logoutUser } from "../api";
import "../assets/css/dashboard.css"; // ✅ Import CSS for styling

function Dashboard() {
    const [hotels, setHotels] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ✅ Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 8;

    const navigate = useNavigate();

    useEffect(() => {
        fetchHotels();
        fetchUserData();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await API.get("/hotels");
            setHotels(response.data);
        } catch (error) {
            setError("Error fetching hotels. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Redirecting to login.");
            navigate("/login");
            return;
        }

        try {
            const response = await API.get("/me");
            setUser(response.data);
        } catch (error) {
            console.error("Unauthorized access. Redirecting to login.");
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    // ✅ Pagination logic
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

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="dashboard-container">
            <h2>User Dashboard</h2>

            {/* ✅ Display Logged-in User Info */}
            {user ? (
                <div className="user-info">
                    <p>Welcome, <strong>{user.name}</strong>!</p>
                    <button className="logout-btn" onClick={logoutUser}>Logout</button>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}

            <h3>Available Hotels</h3>
            <ul className="hotel-list">
                {currentHotels.map((hotel) => (
                    <li key={hotel.id} className="hotel-card" onClick={() => navigate(`/property/${hotel.id}`)}>
                        <img src={hotel.image} alt={hotel.name} />
                        <h4>{hotel.name}</h4>
                    </li>
                ))}
            </ul>

            {/* ✅ Pagination Controls */}
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span> Page {currentPage} of {Math.ceil(hotels.length / hotelsPerPage)} </span>
                <button onClick={nextPage} disabled={indexOfLastHotel >= hotels.length}>Next</button>
            </div>
        </div>
    );
}

export default Dashboard;
