import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-container">
            <div className="contact-card">
                <h1>Contact Us</h1>
                <p>Got a question? Fill out the form below for feedback, partnerships with restaurants, and support!</p>
                
                <form className="contact-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input className="input_text" type="text" placeholder="John Doe" required />
                    </div>
                    
                    <div className="form-group">
                        <label>Email</label>
                        <input className="input_text" type="email" placeholder="johndoe@example.com" required />
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea className="input_text" placeholder="Your message..." required></textarea>
                    </div>

                    <button className="contactbutton" type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
