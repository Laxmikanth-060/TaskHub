import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate=useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        // Reset error message
        setErrorMessage("");

        // Validation
        if (!email || !password) {
            setErrorMessage("Both fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
})
    .then(async (res) => {
        if (!res.ok) {
            const errorMessage = await res.text(); // Extract the error message from the response
            throw new Error(errorMessage);
        }
        return res.text(); // Handle successful response
    })
    .then((message) => {
        alert(message);
        navigate("/");
    })
    .catch((err) => {
        console.error(err.message); // Display the error message
        setErrorMessage(err.message); // Update UI with the error message
    });

        

        // Successful login simulation
        // alert("Login successful!");
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="login-container">
            <div className="form-header">
                <h1>Welcome Back</h1>
                <p>Log in to access your account.</p>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="login-btn">
                    Log In
                </button>
                <small>Forgot your password? <a href="#">Reset here</a></small>
            </form>
        </div>
    );
};

export default Login;
