import React from 'react';
import './HomePage.css';
import SearchBar from '../SearchBar'
import SocialMenu from '../Social Menu/SocialMenu';
import AboutUsButton from '../About Us Button/AboutUsButton';
import Flashcards from '../Flashcards/Flashcards';

const HomePage = () => {
    return (
        <div className="backGround">
            <h1>Welcome to Feastopedia!</h1>
            <p>Find ingredients to any of your favorite dishes' recipe!</p>
            <AboutUsButton/>
            <SearchBar/>
            <SocialMenu/>
            <Flashcards/>
        </div>
    );
};
export default HomePage;