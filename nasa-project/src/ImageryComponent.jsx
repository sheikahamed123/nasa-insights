import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageryComponent({ apiKey }) {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [dim] = useState(0.025); // Default value for dim
  const [imageryData, setImageryData] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Fetch user's geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
        // Handle error fetching location
      }
    );
  }, []);

  useEffect(() => {
    if (lat !== null && lon !== null) {
      // Fetch imagery data once lat and lon are available
      fetchImageryData();
    }
  }, [lat, lon]);

  const fetchImageryData = async () => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
      
      const response = await axios.get(
        `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=2018-01-01&&dim=${dim}&api_key=${apiKey} `
      );
      setImageryData(response.data);
    } catch (error) {
      console.error('Error fetching imagery data:', error);
      setImageError(true);
    }
  };

  return (
    <div>
      <h2>Earth view From Space</h2>
      {imageryData && !imageError && (
        <div>
        <p>Longitude {lon}</p>
        <p>Latitude {lat}</p>
          <img className='imagery-image'
            src={imageryData.url}
            alt="Imagery"
            
            onError={() => setImageError(true)}
          />
        </div>
      )}
      {imageError && <p>Error loading image</p>}
    </div>
  );
}

export default ImageryComponent;