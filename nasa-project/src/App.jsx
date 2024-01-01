// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApodComponent from './ApodComponent';
import NeoWsFeedComponent from './NeoWsFeedComponent';

import './styles.css';

function App() {
  // Inline style for Link components
  const linkStyle = {
    textDecoration: 'none',
    color: '#edf6f9', // Light Blue-Grey
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    backgroundColor: '#12232e', // Dark Cyan
  };
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="nav-list">
            <li>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/apod" style={linkStyle}>
                APOD
              </Link>
            </li>
            <li>
              <Link to="/neows-feed" style={linkStyle}>
                NeoWs Feed
              </Link>
            </li>
            {/* Add other links as needed */}
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apod" element={<ApodComponent />} />
            <Route path="/neows-feed" element={<NeoWsFeedComponent />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Home component (you can replace this with your actual home content)
const Home = () => (
  <div className="home-container">
  <h1 className="home-title">Welcome to NASA Space Insights</h1>
  <h2 className="home-subtitle">Our Services</h2>
  <p className="home-text">APOD - Astronomy Picture of the Day</p>
  <p className="home-text">
    NeoWs - Near Earth Object Web Service is a RESTful web service for near-earth asteroid information.
  </p>
 
</div>
);

export default App;