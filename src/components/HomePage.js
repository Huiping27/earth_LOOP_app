import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Ensure this file exists in the same directory

const HomePage = () => {
  const [backendMessage, setBackendMessage] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flightEmissions, setFlightEmissions] = useState('');
  const [flights, setFlights] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5007/api/check')
      .then(response => {
        setBackendMessage(response.data.message);
      })
      .catch(error => {
        setBackendMessage('Error connecting to backend');
      });

    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5007/api/flights', { 
        flightNumber, 
        date: flightDate, 
        emissions: parseFloat(flightEmissions) 
      });
      await fetchFlights(); // Refresh data
      setFlightNumber('');
      setFlightDate('');
      setFlightEmissions('');
      setSuccessMessage('Flight added successfully!');
    } catch (error) {
      console.error('Error adding flight:', error);
      setSuccessMessage('Failed to add flight.');
    }
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to Carbon Emission Track!</h1>
        <p>{backendMessage}</p>

        <h2>Add Flight Data</h2>
        <form onSubmit={handleAddFlight}>
          <input
            type="text"
            placeholder="Flight Number"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
          <input
            type="date"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Emissions (kg CO2)"
            value={flightEmissions}
            onChange={(e) => setFlightEmissions(e.target.value)}
            required
          />
          <button type="submit">Add Flight</button>
        </form>

        {successMessage && <p>{successMessage}</p>}

        <h2>Flight Data</h2>
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              Flight Number: {flight.flightNumber}, Date: {new Date(flight.date).toLocaleDateString()}, Emissions: {flight.emissions} kg
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;



