const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config();

const allowedOrigins = [
    'http://localhost:5173',
    'https://game-tracker-frontend.netlify.app'
];
  
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Game Tracker and Wishlist creator')
});

connectDB();

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));