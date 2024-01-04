// DonkiComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CmeDetailsComponent from './cmeDetailsComponent'; // Import the CmeDetailsComponent

function DonkiComponent({ service, startDate, endDate }) {
  const [donkiData, setDonkiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/DONKI/${service}?startDate=${startDate}&endDate=${endDate}&api_key=MtWaOycqs15NdLDT1lqQLVkEHd92poWbaqIJSPja`
        );
        setDonkiData(response.data);
      } catch (error) {
        console.error(`Error fetching ${service} data`, error);
      }
    };

    fetchData();
  }, [service, startDate, endDate]);

  return (
    <div>
      <h2>{service} Data</h2>
      {donkiData && donkiData.length > 0 ? (
        <div>
          {/* Render CME details when CME data is available */}
          {donkiData.map((cme, index) => (
            <CmeDetailsComponent key={index} cmeData={cme} />
          ))}
        </div>
      ) : (
        <p>No {service} data available</p>
      )}
    </div>
  );
}

export default DonkiComponent;
