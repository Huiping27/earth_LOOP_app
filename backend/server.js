require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5009;

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  // No need for useNewUrlParser or useUnifiedTopology options
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
