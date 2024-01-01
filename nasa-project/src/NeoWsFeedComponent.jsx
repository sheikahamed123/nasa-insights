// NeoWsFeedComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function NeoWsFeedComponent() {
  const [neoData, setNeoData] = useState(null);

  const handleNeoFeedClick = async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=MtWaOycqs15NdLDT1lqQLVkEHd92poWbaqIJSPja`
      );
      setNeoData(response.data);
    } catch (error) {
      console.error('Error fetching Neo Feed data', error);
    }
  };

  useEffect(() => {
    // Fetch Neo Feed for the next 7 days when the component mounts
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekFormatted = nextWeek.toISOString().split('T')[0];
    handleNeoFeedClick(today, nextWeekFormatted);
  }, []);

  const renderNeoData = () => {
    return (
      <div>
        <h2>NeoWs (Near Earth Object Web Service) is a RESTful web service for near earth Asteroid information. With NeoWs a user can: search for Asteroids based on their closest approach date to Earth, lookup a specific Asteroid with its NASA JPL small body id, as well as browse the overall data-set.</h2>
        {neoData?.near_earth_objects && (
          <div className="neo-container">
            {Object.entries(neoData.near_earth_objects).map(([date, neoList]) => (
              <div key={date} className="neo-date">
                <h3>{date}</h3>
                {neoList.map((neo) => (
                  <div key={neo.id} className="neo-item">
                    <h4>{neo.name}</h4>
                    <p>
                      <strong>Estimated Diameter:</strong>{' '}
                      {neo.estimated_diameter?.kilometers
                        ? `${neo.estimated_diameter.kilometers.estimated_diameter_min} - ${neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km`
                        : 'N/A'}
                    </p>
                    <p>
                      <strong>Close Approach Date:</strong>{' '}
                      {neo.close_approach_data?.[0]?.close_approach_date_full || 'N/A'}
                    </p>
                    <p>
                      <strong>Miss Distance:</strong>{' '}
                      {neo.close_approach_data?.[0]?.miss_distance?.kilometers !== undefined
                        ? neo.close_approach_data[0].miss_distance.kilometers
                        : 'N/A'} km
                    </p>
                    <p>
                      <strong>Relative Velocity:</strong>{' '}
                      {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour !== undefined
                        ? neo.close_approach_data[0].relative_velocity.kilometers_per_hour
                        : 'N/A'} km/h
                    </p>
                    <p>
                      <strong>Potentially Hazardous:</strong>{' '}
                      {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return <div>{neoData ? renderNeoData() : <p>Loading NeoWs Feed data...</p>}</div>;
}

export default NeoWsFeedComponent;
