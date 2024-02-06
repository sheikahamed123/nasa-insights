// CmeDetailsComponent.jsx
import React from 'react';

const tableCellStyle = {
  border: '1px solid #ccc',
  padding: '8px',
};

const CmeDetailsComponent = ({ cmeData }) => {
  if (!cmeData) {
    return <div style={{ color: 'red' }}>No CME data available</div>;
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
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td style={tableCellStyle}><strong>Activity ID:</strong></td>
            <td style={tableCellStyle}>{activityID}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}><strong>Start Time:</strong></td>
            <td style={tableCellStyle}>{startTime}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}><strong>Source Location:</strong></td>
            <td style={tableCellStyle}>{sourceLocation}</td>
          </tr>
          <tr>
            <td style={tableCellStyle}><strong>Note:</strong></td>
            <td style={tableCellStyle}>{note}</td>
          </tr>
        </tbody>
      </table>

      <h3>Instruments</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {Array.isArray(instruments) && instruments.length > 0 ? (
            instruments.map((instrument, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{instrument.displayName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={tableCellStyle}>No instrument data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>CME Analyses</h3>
      {cmeAnalyses && Array.isArray(cmeAnalyses) && cmeAnalyses.map((analysis, index) => (
        <div key={index}>
          <h4>Analysis {index + 1}</h4>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              <tr>
                <td style={tableCellStyle}><strong>Time (21.5):</strong></td>
                <td style={tableCellStyle}>{analysis.time21_5 || 'N/A'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>Latitude:</strong></td>
                <td style={tableCellStyle}>{analysis.latitude || 'N/A'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>Longitude:</strong></td>
                <td style={tableCellStyle}>{analysis.longitude || 'N/A'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>Half Angle:</strong></td>
                <td style={tableCellStyle}>{analysis.halfAngle || 'N/A'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>Speed:</strong></td>
                <td style={tableCellStyle}>{analysis.speed || 'N/A'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>Type:</strong></td>
                <td style={tableCellStyle}>{analysis.type || 'N/A'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>Is Most Accurate:</strong></td>
                <td style={tableCellStyle}>{analysis.isMostAccurate ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>Note:</strong></td>
                <td style={tableCellStyle}>{analysis.note || 'N/A'}</td>
              </tr>
              <tr>
                <td style={tableCellStyle}><strong>ENLIL List</strong></td>
                <td style={tableCellStyle}>
                  {analysis.enlilList && Array.isArray(analysis.enlilList) && (
                    <ul style={{ margin: '0', padding: '0', listStyleType: 'none' }}>
                      {analysis.enlilList.map((enlil, enlilIndex) => (
                        <li key={enlilIndex}>
                          <p><strong>Model Completion Time:</strong> {enlil.modelCompletionTime || 'N/A'}</p>
                          <p><strong>AU:</strong> {enlil.au || 'N/A'}</p>
                          {/* Add other details from enlil here */}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CmeDetailsComponent;
