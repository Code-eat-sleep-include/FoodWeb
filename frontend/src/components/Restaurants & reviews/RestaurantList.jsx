import React, { useState } from 'react';
import './Restaurants.css';
import searchIcon from '../../assets/search-icon.png';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRestaurants = async () => {
        if (!query) return;
        setLoading(true);
        setError('');

        const queryParts = query.trim().split(' ');

        let cuisine = '';
        let area = '';

        if (queryParts.length >= 2) {
            cuisine = queryParts[0];
            area = queryParts.slice(1).join(' ');
        } else {
            cuisine = queryParts[0];
        }

        let url = `http://localhost:5000/api/restaurants?`;
        if (cuisine) url += `cuisine=${encodeURIComponent(cuisine)}&`;
        if (area) url += `area=${encodeURIComponent(area)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('No matching restaurants found.');
            const data = await response.json();
            setRestaurants(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRestaurants();
    };

    return (
        <div className="restaurant-page">
            <h1>Search Restaurants</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search by dish, restaurant, or area"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="flashcards-container-restrev">
                {restaurants.map((restaurant, index) => (
                    <div key={index} className="flashcard-restrev">
                        <div className="flashcard-content-restrev">
                            <h2>{restaurant.NAME}</h2>
                            <p>{restaurant.CITY} - {restaurant.REGION}</p>
                            <p>{restaurant.CUSINE_CATEGORY}</p>
                            <p>⭐ {restaurant.RATING} ({restaurant.VOTES} votes)</p>
                            <a href={restaurant.URL} target="_blank" rel="noopener noreferrer">View More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;