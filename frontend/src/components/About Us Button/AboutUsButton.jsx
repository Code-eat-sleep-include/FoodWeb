import React from "react";
import { Link } from 'react-router-dom';
import './AboutUsButton.css';

const AboutUsButton = () => {
    return (
        <Link to="/aboutus" className="about-us-button">
            <span className="arrow">→</span>
            <span className="text">About Us</span>
        </Link>
    );
};

export default AboutUsButton;
