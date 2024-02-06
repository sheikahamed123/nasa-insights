// EonetEvents.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import CSS file

const EonetEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          'https://eonet.gsfc.nasa.gov/api/v2.1/events'
        );
        setEvents(response.data.events);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Error fetching events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="heading"> Earth Observatory Natural Event Tracker - EONET</h2>
      <p> By using NASA EONET users can browse the entire globe daily and look for natural events as they occur. Storms are regularly spotted in the tropics, dust storms over deserts, forest fires in the summers. These events are occurring constantly and NASA NRT imagery can represent them all using a variety of different data parameters. However, the user’s experience is tailored, and therefore restricted, by the client application. What if there was an API that provided a curated list of natural events and provided a way to link those events to event-related NRT image layers? Enter EONET.</p>
      <table className="event-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Categories</th>
            <th>Sources</th>
            <th>Geometries</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.description || 'No description available'}</td>
              <td>
                {event.categories.map((category) => category.title).join(', ')}
              </td>
              <td>
                {event.sources.map((source) => (
                  <a key={source.id} href={source.url}>
                    {source.id}
                  </a>
                ))}
              </td>
              <td>
                <ul>
                  {event.geometries.map((geometry, index) => (
                    <li key={index}>
                      <strong>Date:</strong> {new Date(geometry.date).toLocaleString()}
                      <br />
                      <strong>Coordinates:</strong> {geometry.coordinates.join(', ')}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EonetEvents;
