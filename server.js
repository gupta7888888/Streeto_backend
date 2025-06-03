const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require('./routes/auth/auth.routes');
app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/user/user.routes');
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => console.log('Server running on 5000'));
