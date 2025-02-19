import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Import Google OAuth Provider
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // ✅ User panel (Read-only)
import Admin from "./components/Admin"; // ✅ Admin panel (Full CRUD)
import PropertyDetails from "./components/PropertyDetails"; // ✅ Import Property Details Page

// Read Google Client ID from .env
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const ProtectedRoute = ({ element, requiredRole }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return userRole === "admin" ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />;
    }

    return element;
};

function App() {
    return (
        <GoogleOAuthProvider clientId={googleClientId}> {/* ✅ Use .env variable */}
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/register" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRole="user" />} />
                    <Route path="/admin" element={<ProtectedRoute element={<Admin />} requiredRole="admin" />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
