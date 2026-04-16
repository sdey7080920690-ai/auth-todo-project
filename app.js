const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Auth API' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;