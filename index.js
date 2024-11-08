
const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const waitlistRoutes = require('./routes/waitlistRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 

const PORT = process.env.PORT || 5000;

const sequelize = new Sequelize('waitlist_app', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    "port": 8889
  });
  sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use ('/api/waitlists',waitlistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
// app.get('/', "Welcome to My App");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
