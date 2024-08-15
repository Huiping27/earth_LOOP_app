import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Adjust the path as necessary

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes here if you expand your app */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;




