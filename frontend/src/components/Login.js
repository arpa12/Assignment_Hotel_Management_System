import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../api";
import "../assets/css/login.css"; // Importing CSS for styling

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await API.post("/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);

            if (response.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Google Login Success (Only for Users)
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await API.get("/auth/google/callback", {
                headers: { Authorization: `Bearer ${credentialResponse.credential}` }
            });

            if (response.data.user.role !== "user") {
                setError("Google login is only allowed for users.");
                return;
            }

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);

            navigate("/dashboard");
        } catch (error) {
            console.error("Google login failed!", error);
            setError("Google login failed. Please try again.");
        }
    };

    // ❌ Google Login Failure
    const handleGoogleFailure = (error) => {
        console.error("Google Login Failed:", error);
        setError("Google login failed. Please try again.");
    };

    return (
        <div className="container">
            {/* right Side - Login Form */}
            <div className="left">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </form>

                {/* Google Login */}
                <div className="google-login">
                    <p>OR</p>
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
                </div>
            </div>

            {/* Right Side - Welcome Message */}
            <div className="right">
                <h2>Welcome Back!</h2>
                <p>Login to access your dashboard and manage your account.</p>
            </div>
        </div>
    );
}

export default Login;
