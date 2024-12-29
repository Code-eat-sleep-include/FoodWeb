import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = () => {
    const [dataset, setDataset] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDish, setselectedDish] = useState('');
    const [filteredIngredients, setfilteredIngredients] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/recipes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                setDataset(data);
            } else {
                console.error("Unexpected data format:", data);
                setDataset([]);
            }
        })
            .catch(error => console.error('Error fetching the dataset: ', error));
    }, []);

    const handleSearch = () => {
        const dish = dataset.find(d => d.title.toLowerCase() === selectedDish.toLowerCase());
        if (dish) {
            setfilteredIngredients(dish.ingredients);
        }
        else {
            alert('Dish not found in the dataset!');
            setfilteredIngredients([]);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12 ms auto">
                    <div className="input-group">
                        <select
                            className="form-select"
                            onChange={e => setselectedDish(e.target.value)}
                            value={selectedDish}
                        >
                            <option value="">Select a Dish...</option>
                                {dataset.map((dish, index) => (
                                    <option key={index} value={dish.title}>
                                        {dish.title}
                                    </option>
                                ))}
                        </select>
                        <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    {filteredIngredients.length > 0 && (
                        <div className="mt-3">
                            <h5>Ingrediants for {selectedDish}: </h5>
                            <ul>
                                {filteredIngredients.map((ingredient, index) => (
                                    <h6 key={index}>{ingredient}</h6>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default SearchBar;