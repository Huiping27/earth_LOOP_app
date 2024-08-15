const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  carbonFootprint: [{
    date: { type: Date, default: Date.now },
    emission: Number
  }]
});

// Create User model
const User = mongoose.model('User', userSchema);

// Define Flight schema
const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  date: { type: Date, required: true },
  emissions: { type: Number, required: true }
});

// Create Flight model
const Flight = mongoose.model('Flight', flightSchema);

// Routes
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

app.get('/api/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.send(flights);
  } catch (error) {
    console.error('Error in /api/flights:', error.message || error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/carbon-footprint', async (req, res) => {
  try {
    const { email, emission } = req.body;
    if (!email || !emission) {
      return res.status(400).send('Email and emission are required.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Add the new emission record to the user's carbonFootprint array
    user.carbonFootprint.push({ emission });
    await user.save();

    res.status(201).send('Emission added successfully');
  } catch (error) {
    console.error('Error in /api/carbon-footprint:', error.message || error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/carbon-footprint/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.send(user.carbonFootprint);
  } catch (error) {
    console.error('Error in /api/carbon-footprint/:email:', error.message || error);
    res.status(500).send('Internal Server Error');
  }
});

const port = process.env.PORT || 5007;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
