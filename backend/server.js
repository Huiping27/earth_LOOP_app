Server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/flightco2tracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  carbonFootprint: [{
    date: Date,
    emission: Number
  }]
});

const User = mongoose.model('User', userSchema);

// Define Flight schema
const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  date: { type: Date, required: true },
  emissions: { type: Number, required: true }
});

const Flight = mongoose.model('Flight', flightSchema);

// POST route to add carbon footprint
// POST route to add carbon footprint (with user identification via token/session)
app.post('/api/carbon-footprint', async (req, res) => {
  try {
    const { category, emission } = req.body;
    const user = req.user; // Assume `req.user` is set by an authentication middleware

    if (user) {
      user.carbonFootprint.push({ date: new Date(), emission, category });
      await user.save();
      res.send(user);
    } else {
      res.status(400).send('User not found');
    }
  } catch (error) {
    console.error('Error in /api/carbon-footprint:', error.message || error);
    res.status(500).send('Internal Server Error');
  }
});

// GET route to fetch carbon footprint by category (using a default user)
app.get('/api/carbon-footprint', async (req, res) => {
  try {
    const { category } = req.query;

    // Using a default email for demonstration
    const defaultEmail = 'defaultuser@example.com';

    const user = await User.findOne({ email: defaultEmail });
    if (user) {
      const footprints = category
        ? user.carbonFootprint.filter(fp => fp.category === category)
        : user.carbonFootprint;
      res.send(footprints);
    } else {
      res.status(400).send('User not found');
    }
  } catch (error) {
    console.error('Error in /api/carbon-footprint:', error.message || error);
    res.status(500).send('Internal Server Error');
  }
});



// GET route to check server status
app.get('/api/check', (req, res) => {
  res.json({ message: 'Data received from backend' });
});

// POST route to add a flight
app.post('/api/flights', async (req, res) => {
  try {
    const { flightNumber, date, emissions } = req.body;
    const flight = new Flight({ flightNumber, date, emissions });
    await flight.save();
    res.status(201).send(flight);
  } catch (error) {
    console.error('Error in /api/flights:', error.message || error);
    res.status(500).send('Internal Server Error');
  }
});

// GET route to fetch all flights
app.get('/api/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.send(flights);
  } catch (error) {
    console.error('Error in /api/flights:', error.message || error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 5007;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


