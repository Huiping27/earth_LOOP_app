import axios from 'axios';

const API_URL = 'http://localhost:5007/api'; // Ensure this matches your backend port

// Check backend connection
export const checkBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}/check`);
    return response.data;
  } catch (error) {
    console.error('Error checking backend:', error);
    throw error;
  }
};

// Add carbon footprint
export const addCarbonFootprint = async (email, emission) => {
  try {
    const response = await axios.post(`${API_URL}/carbon-footprint`, { email, emission });
    return response.data;
  } catch (error) {
    console.error('Error adding carbon footprint:', error);
    throw error;
  }
};

// Get carbon footprint
export const getCarbonFootprint = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/carbon-footprint/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error getting carbon footprint:', error);
    throw error;
  }
};

// Add flight
export const addFlight = async (flightNumber, date, emissions) => {
  try {
    const response = await axios.post(`${API_URL}/flights`, { flightNumber, date, emissions });
    return response.data;
  } catch (error) {
    console.error('Error adding flight:', error);
    throw error;
  }
};

// Get all flights
export const getFlights = async () => {
  try {
    const response = await axios.get(`${API_URL}/flights`);
    return response.data;
  } catch (error) {
    console.error('Error getting flights:', error);
    throw error;
  }
};
