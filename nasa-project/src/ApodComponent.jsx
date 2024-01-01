// ApodComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css"

function ApodComponent() {
  const [apodData, setApodData] = useState(null);

  const handleApodClick = async (date) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=MtWaOycqs15NdLDT1lqQLVkEHd92poWbaqIJSPja&date=${date}`
      );
      setApodData(response.data);
    } catch (error) {
      console.error('Error fetching APOD data', error);
    }
  };

  useEffect(() => {
    // Fetch APOD for today when the component mounts
    const today = new Date().toISOString().split('T')[0];
    handleApodClick(today);
  }, []);

  return (
    <div>
      {apodData ? (
        <div>
          <h2>{apodData.title}</h2>
          <p>{apodData.explanation}</p>
          <img src={apodData.url} alt={apodData.title} className="apod-image" />
        </div>
      ) : (
        <p>Loading APOD data...</p>
      )}
    </div>
  );
}

export default ApodComponent;
