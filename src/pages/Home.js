import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Your CSS file for styling

const HomePage = () => {
  // State variables
  const [backendMessage, setBackendMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [emission, setEmission] = useState('');
  const [carbonFootprints, setCarbonFootprints] = useState([]);
  const [flights, setFlights] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null);

  // State variables for flight data
  const [flightNumber, setFlightNumber] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flightEmissions, setFlightEmissions] = useState('');

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5007/api/register', { name, email, password });
      setSuccessMessage('Registration successful!');
    } catch (error) {
      console.error('Error registering:', error);
      setSuccessMessage('Failed to register.');
    }
  };

  // Login user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5007/api/login', { email, password });
      setUser(response.data);
      setSuccessMessage('Login successful!');
      fetchCarbonFootprints(); // Fetch user data after login
    } catch (error) {
      console.error('Error logging in:', error);
      setSuccessMessage('Failed to log in.');
    }
  };

  // Add carbon footprint
  const handleAddEmission = async (e) => {
    e.preventDefault();
    try {
      // Send emission data without email if backend no longer requires it
      await axios.post('http://localhost:5007/api/carbon-footprint', { category, emission: parseFloat(emission) });
      fetchCarbonFootprints(); // Refresh data
      setCategory('');
      setEmission('');
      setSuccessMessage('Your CO2 emission has been added successfully!');
    } catch (error) {
      console.error('Error adding emission:', error);
      setSuccessMessage('Failed to add CO2 emission.');
    }
  };

  // Add flight data
  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5007/api/flights', { flightNumber, date: flightDate, emissions: parseFloat(flightEmissions) });
      fetchFlights(); // Refresh data
      setFlightNumber('');
      setFlightDate('');
      setFlightEmissions('');
      setSuccessMessage('Flight data has been added successfully!');
    } catch (error) {
      console.error('Error adding flight data:', error);
      setSuccessMessage('Failed to add flight data.');
    }
  };

  // Fetch carbon footprints
  const fetchCarbonFootprints = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/carbon-footprint');
      setCarbonFootprints(response.data);
    } catch (error) {
      console.error('Error fetching carbon footprints:', error);
    }
  };

  // Fetch flights
  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  // Fetch backend message
  useEffect(() => {
    axios.get('http://localhost:5007/api/check')
      .then(response => {
        setBackendMessage(response.data.message);
      })
      .catch(error => {
        setBackendMessage('Error connecting to backend');
      });

    fetchFlights(); // Fetch flights on initial render
  }, []);

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to Carbon Emission Track!</h1>
        <p>{backendMessage}</p>

        {/* Register Form */}
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>

        {/* Login Form */}
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>

        {successMessage && <p>{successMessage}</p>}

        {/* Add Carbon Footprint Form */}
        {user && (
          <>
            <h2>Add CO2 Emission</h2>
            <form onSubmit={handleAddEmission}>
              <input type="text" placeholder="Emission category (e.g., Flight, Food)" value={category} onChange={(e) => setCategory(e.target.value)} required />
              <input type="number" placeholder="Enter CO2 emission" value={emission} onChange={(e) => setEmission(e.target.value)} required />
              <button type="submit">Add CO2 Emission</button>
            </form>
          </>
        )}

        {/* Display Carbon Footprints */}
        <h2>Your CO2 Emissions</h2>
        <ul>
          {carbonFootprints.map((footprint, index) => (
            <li key={index}>
              Date: {new Date(footprint.date).toLocaleDateString()}, Category: {footprint.category}, Emission: {footprint.emission} kg
            </li>
          ))}
        </ul>

        {/* Add Flight Form */}
        <h2>Add Flight Data</h2>
        <form onSubmit={handleAddFlight}>
          <input type="text" placeholder="Flight Number" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} required />
          <input type="date" value={flightDate} onChange={(e) => setFlightDate(e.target.value)} required />
          <input type="number" placeholder="Emissions" value={flightEmissions} onChange={(e) => setFlightEmissions(e.target.value)} required />
          <button type="submit">Add Flight</button>
        </form>

        {/* Display Flights */}
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


