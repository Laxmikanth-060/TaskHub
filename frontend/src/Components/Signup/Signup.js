import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import "./Signup.css";

const Signup = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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
        const { username, email, password, confirmPassword } = formData;

        // Reset error message
        setErrorMessage("");

        // Form validation
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        try{
            fetch('http://localhost:8080/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              })
                .then(response => {
                    response.json();
                    console.log(response);
                })
                .then(() => navigate('/'));
        }catch(err){
            setErrorMessage("Error in signup");
        }
       

        // Successful submission
        alert("Signup successful!");
        // setFormData({
        //     username: "",
        //     email: "",
        //     password: "",
        //     confirmPassword: "",
        // });
    
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="signup-container">
            <div className="form-header">
                <h1>Create Account</h1>
                {/* <p>Join us today! Fill out the form below to get started.</p> */}
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="John Doe"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="signup-btn">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
