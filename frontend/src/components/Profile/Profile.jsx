import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');  
        navigate('/signup');  
    };

    return (
        <div className="profile-container">
            <h1>Welcome to Your Profile</h1>
            <p>You are successfully logged in!</p>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Profile;