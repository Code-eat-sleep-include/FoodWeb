import React from 'react';
import './Flashcards.css';
import paneer from '../../assets/paneer.webp';
import dosa from '../../assets/dosa.webp';
import biryani from '../../assets/biryani.webp';
import chole from '../../assets/chole.webp';
import poha from '../../assets/poha.webp';
import rajma from '../../assets/rajma.webp';
import dhokla from '../../assets/dhokla.webp';
import idli from '../../assets/idli.webp';
import alooParatha from '../../assets/alooParatha.webp';
import pavBhaji from '../../assets/pavBhaji.webp';
import palakPaneer from '../../assets/palakPaneer.webp';
import dalMakhani from '../../assets/dalMakhani.webp';

const cuisines = [
    { name: "Paneer Tikka", img: paneer, desc: "Grilled paneer cubes with spices." },
    { name: "Masala Dosa", img: dosa, desc: "Thin, crispy dosa stuffed with spiced potato." },
    { name: "Veg Biryani", img: biryani, desc: "Fragrant rice cooked with vegetables and spices." },
    { name: "Chole Bhature", img: chole, desc: "Spicy chickpeas served with deep-fried bread." },
    { name: "Poha", img: poha, desc: "Flattened rice with turmeric and peanuts." },
    { name: "Rajma", img: rajma, desc: "Red kidney beans in thick gravy." },
    { name: "Dhokla", img: dhokla, desc: "Steamed, spongy gram flour snack." },
    { name: "Idli Sambar", img: idli, desc: "Soft rice cakes with lentil stew." },
    { name: "Aloo Paratha", img: alooParatha, desc: "Flatbread stuffed with spiced potatoes." },
    { name: "Pav Bhaji", img: pavBhaji, desc: "Spicy vegetable curry with soft bread rolls." },
    { name: "Palak Paneer", img: palakPaneer, desc: "Spinach and cottage cheese curry." },
    { name: "Dal Makhani", img: dalMakhani, desc: "Creamy black lentil curry." }
];

const Flashcards = () => {
    return (
        <div className="flashcard-container">
            {cuisines.map((item, index) => (
                <div key={index} className="flashcard">
                    <img src={item.img} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default Flashcards;
