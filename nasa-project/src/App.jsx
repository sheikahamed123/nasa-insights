// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApodComponent from './ApodComponent';
import NeoWsFeedComponent from './NeoWsFeedComponent';
import DonkiComponent from './DonkiComponent';
import ImageryComponent from './ImageryComponent';
import EonetEvents from './EonetEvents';

import './styles.css';
import ExoplanetArchiveComponent from './ExoPlanetArchiveComponent';
import WeatherComponent from './WeatherComponent';


function App() {
  const linkStyle = {
    textDecoration: 'none',
    color: '#edf6f9',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    backgroundColor: '#12232e',
  };

  // Set default latitude, longitude, and date

  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  const lat = 1.5;
  const lon = 100.75;
  const date = '2014-02-01';
  const dim = 0.025;
  const apiKey = 'MtWaOycqs15NdLDT1lqQLVkEHd92poWbaqIJSPja';

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
                NeoWs
              </Link>
            </li>
            <li>
              <Link to="/donki" style={linkStyle}>
                DONKI
              </Link>
            </li>
            <li>
              <Link to="/imagery" style={linkStyle}>
                EARTH
              </Link>
            </li>
            <li>
              <Link to="/eonet" style={linkStyle}>
              EONET
              </Link>
            </li>
            <li>
              <Link to="/exoplanet" style={linkStyle}>
              EXO PLANET
              </Link>
             
            </li>
            <li>
              <Link to="/weather" style={linkStyle}>
          MARS WEATHER
              </Link>
             
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apod" element={<ApodComponent />} />
            <Route path="/neows-feed" element={<NeoWsFeedComponent />} />
            <Route path="/donki" element={<DonkiComponent service="CME" startDate={sevenDaysAgo.toISOString()} endDate={currentDate.toISOString()} />} />
            <Route path="/imagery" element={  <ImageryComponent apiKey={apiKey} />} />
            <Route path="/eonet" element={  <EonetEvents />} />
            <Route path="/exoplanet" element={  <ExoplanetArchiveComponent />} />
            <Route path="/weather" element={ <WeatherComponent apiKey={apiKey} />} />
          
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">Welcome to NASA Space Insights</h1>
    <h2 className="home-subtitle">Our Services</h2>
    <p className="home-text">APOD - Astronomy Picture of the Day</p>
    <p className="home-text">
      NeoWs - Near Earth Object Web Service is a RESTful web service for near-earth asteroid information.
    </p>
    <p className="home-text"> Space Weather Database Of Notifications, Knowledge, Information-DONKI</p>
    <p className='home-text'> Earth Image From Satellite With Your Own Latitude and Longitude</p>
    <p className="home-text">Earth Observatory Natural Event Tracker - EONET</p>
    <p className='home-text'>Exo planet Archive using Kepler</p>
    <p className='home-text'>Mars Weather Information from NASA</p>
  </div>
);

export default App;
