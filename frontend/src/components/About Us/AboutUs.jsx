import React from 'react'
import './AboutUs.css'
import aboutImage from '../../assets/aboutusimage.avif';

const AboutUs = () => {
    return (
        <div className="about-container">
            <div className="about-image">
                <img src={aboutImage} alt="Our Story" />
            </div>
            <div className="about-text">
                <h1>About Feastopedia</h1>
                <p>
                    Welcome to Feastopedia! We bring the best of both worlds – discover hidden culinary gems in your neighborhood or cook your favorite dishes at home with our curated recipes.
                </p>
                <p>
                    Our platform bridges the gap between restaurant exploration and home-cooked meals. Dive into a vibrant community of food lovers who share reviews, recipes, and unforgettable dining experiences. We'd love to hear from you, and to know more about us, visit our social media.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
