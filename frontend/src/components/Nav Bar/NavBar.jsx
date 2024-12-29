import React from 'react';
import './NavBar.css';
import ramenlogo from '../../assets/ramenlogo.webp';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="logo-container">
                <Link to="/">
                    <img src={ramenlogo} alt="Logo" className="logoo" />
                </Link>
                <Link to="/"><h2 className="website-name">Feastopedia</h2></Link>
            </div>
            <div className="others">
                <Link to="/"><h2 className="other-navs">Home</h2></Link>
                <Link to="/restrev"><h2 className="other-navs">Restaurants & reviews</h2></Link>
                <Link to="/signup"><h2 className="other-navs">Sign in/up</h2></Link>
                <Link to="/contact"><h2 className="other-navs">Contact Us</h2></Link>
            </div>
        </div>
    );
};

export default NavBar;