import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function WeatherComponent({ apiKey }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`);
                setData(response.data);
            } catch (error) {
                setError('Error fetching weather data');
            }
        };

        fetchData();
    }, [apiKey]);

    const renderData = () => {
        if (!data) {
            return <div>Loading...</div>;
        }

        return (
            <div className="grid-container">
                <img className="mars-image"src="https://api.nasa.gov/assets/img/general/insight_photo.png"></img>
               
                <div className="validity-checks">
                    <h3>Validity Checks</h3>
                    <ul>
                        {Object.keys(data.validity_checks).map((key, index) => (
                            <li key={index}>
                                <strong>{key}:</strong> {JSON.stringify(data.validity_checks[key])}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h2>MARS WEATHER DATA</h2>
            <p>
                NASA’s InSight Mars lander takes continuous weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth
                plain near Mars’ equator.
                <br />
                AT - Atmospheric temperature [Degree celsius]
                <br />
                PRE - Atmospheric Pressure [Pascals]
                <br />
                HWS - Horizontal wind speed [Meters per second]
                <br />
                WD - Wind direction
            </p>
            {error && <p>{error}</p>}
            {renderData()}
        </div>
    );
}

export default WeatherComponent;
