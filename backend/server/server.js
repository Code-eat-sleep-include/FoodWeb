const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../server/User');  

const app = express();
app.use(cors());
app.use(express.json());  

mongoose.connect('mongodb://localhost:27017/recipeApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const trainData = JSON.parse(fs.readFileSync('../data/train.json', 'utf-8'));

app.get('/api/recipes', (req, res) => {
    const query = req.query.q?.toLowerCase();
    if (!query) {
        return res.json(Object.values(trainData));
    }
    const results = Object.values(trainData).filter((recipe) =>
        recipe.title && typeof recipe.title === 'string' &&
        recipe.title.toLowerCase().includes(query)
    );
    if (results.length === 0) {
        return res.status(404).json({ message: 'No matching recipes found' });
    }
    res.json(results);
});

app.get('/api/restaurants', (req, res) => {
    const query = req.query.q?.toLowerCase();
    const cuisine = req.query.cuisine?.toLowerCase();
    const area = req.query.area?.toLowerCase();

    const restaurants = [];

    fs.createReadStream('../data/restaurants.csv')
        .pipe(csv({ separator: '|' }))
        .on('data', (data) => {
            if (data.NAME && data.CUSINE_CATEGORY && data.CITY && data.REGION) {
                const matchesCuisine = !cuisine || data.CUSINE_CATEGORY.toLowerCase().includes(cuisine);
                const matchesArea = !area || data.CITY.toLowerCase().includes(area) || data.REGION.toLowerCase().includes(area);
                const matchesQuery = !query || data.NAME.toLowerCase().includes(query);

                if ((cuisine && area && matchesCuisine && matchesArea) || (!cuisine && matchesQuery)) {
                    restaurants.push(data);
                }
            }
        })
        .on('end', () => {
            if (restaurants.length === 0) {
                return res.status(404).json({ message: 'No matching restaurants found' });
            }
            res.json(restaurants);
        });
});

const SECRET_KEY = 'your_secret_key';

app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, message: 'Sign in successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during sign in' });
    }
});

passport.use(new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: '/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                fullName: profile.displayName,
                email,
                password: 'google-auth'
            });
            await user.save();
        }
        done(null, user);
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin', session: false }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.redirect(`http://localhost:5173/profile?token=${token}`);
    }
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));