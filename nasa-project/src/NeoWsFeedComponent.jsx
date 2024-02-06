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

  return (
    <div>
      <h2>
        NeoWs (Near Earth Object Web Service) is a RESTful web service for near earth Asteroid
        information. With NeoWs a user can: search for Asteroids based on their closest approach date
        to Earth, lookup a specific Asteroid with its NASA JPL small body id, as well as browse the
        overall data-set.
      </h2>
      {neoData?.near_earth_objects && (
        <div className="neo-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Estimated Diameter (km)</th>
                <th>Close Approach Date</th>
                <th>Miss Distance (km)</th>
                <th>Relative Velocity (km/h)</th>
                <th>Potentially Hazardous</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(neoData.near_earth_objects).map(([date, neoList]) =>
                neoList.map((neo) => (
                  <tr key={neo.id}>
                    <td>{date}</td>
                    <td>{neo.name}</td>
                    <td>
                      {neo.estimated_diameter?.kilometers
                        ? `${neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}`
                        : 'N/A'}
                    </td>
                    <td>{neo.close_approach_data?.[0]?.close_approach_date_full || 'N/A'}</td>
                    <td>
                      {neo.close_approach_data?.[0]?.miss_distance?.kilometers !== undefined
                        ? neo.close_approach_data[0].miss_distance.kilometers
                        : 'N/A'}
                    </td>
                    <td>
                      {neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour !== undefined
                        ? neo.close_approach_data[0].relative_velocity.kilometers_per_hour
                        : 'N/A'}
                    </td>
                    <td>{neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NeoWsFeedComponent;
