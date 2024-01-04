// CmeDetailsComponent.jsx
import React from 'react';

function CmeDetailsComponent({ cmeData }) {
  if (!cmeData) {
    return <div>No CME data available</div>;
  }

  const {
    activityID,
    startTime,
    sourceLocation,
    note,
    instruments,
    cmeAnalyses,
  } = cmeData;

  return (
    <div>
      <h2>CME Details</h2>
      <p><strong>Activity ID:</strong> {activityID}</p>
      <p><strong>Start Time:</strong> {startTime}</p>
      <p><strong>Source Location:</strong> {sourceLocation}</p>
      <p><strong>Note:</strong> {note}</p>

      <h3>Instruments</h3>
      <ul>
  {Array.isArray(instruments) && instruments.length > 0 ? (
    instruments.map((instrument, index) => (
      <li key={index}>{instrument.displayName}</li>
    ))
  ) : (
    <li>No instrument data available</li>
  )}
</ul>

      <h3>CME Analyses</h3>
      {cmeAnalyses && Array.isArray(cmeAnalyses) && cmeAnalyses.map((analysis, index) => (
  <div key={index}>
    <h4>Analysis {index + 1}</h4>
    <p><strong>Time (21.5):</strong> {analysis.time21_5 || 'N/A'}</p>
    <p><strong>Latitude:</strong> {analysis.latitude || 'N/A'}</p>
    <p><strong>Longitude:</strong> {analysis.longitude || 'N/A'}</p>
    <p><strong>Half Angle:</strong> {analysis.halfAngle || 'N/A'}</p>
    <p><strong>Speed:</strong> {analysis.speed || 'N/A'}</p>
    <p><strong>Type:</strong> {analysis.type || 'N/A'}</p>
    <p><strong>Is Most Accurate:</strong> {analysis.isMostAccurate ? 'Yes' : 'No'}</p>
    <p><strong>Note:</strong> {analysis.note || 'N/A'}</p>

    <h5>ENLIL List</h5>
    {analysis.enlilList && Array.isArray(analysis.enlilList) && (
      <ul>
        {analysis.enlilList.map((enlil, enlilIndex) => (
          <li key={enlilIndex}>
            <p><strong>Model Completion Time:</strong> {enlil.modelCompletionTime || 'N/A'}</p>
            <p><strong>AU:</strong> {enlil.au || 'N/A'}</p>
            {/* Add other details from enlil here */}
          </li>
        ))}
      </ul>
    )}
  </div>
))}

    </div>
  );
}

export default CmeDetailsComponent;
