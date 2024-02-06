// ImageryDetailsComponent.jsx
import React from 'react';

function ImageryDetailsComponent({ imageryData }) {
  if (!imageryData) {
    return <div>No Imagery data available</div>;
  }

  const { date, url } = imageryData;

  return (
    <div>
      <h2>Imagery Details</h2>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
      <img src={url} alt="Imagery" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}

export default ImageryDetailsComponent;
