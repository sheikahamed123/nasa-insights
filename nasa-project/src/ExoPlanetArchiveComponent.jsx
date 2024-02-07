import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css"

function ExoPlanetArchiveComponent() {
    const [planetaryCandidates, setPlanetaryCandidates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&where=koi_prad<2 and koi_teq>180 and koi_teq<303 and koi_disposition like \'CANDIDATE\'');
                
                // Parse CSV data into array of objects
                const data = response.data.split('\n').slice(1).map(line => {
                    const columns = line.split(',');
                    return {
                        kepid: columns[0],
                        kepoi_name: columns[1],
                        kepler_name: columns[2],
                        koi_disposition: columns[3],
                        koi_pdisposition: columns[4],
                        koi_score: columns[5],
                        koi_fpflag_nt: columns[6],
                        koi_fpflag_ss: columns[7],
                        koi_fpflag_co: columns[8],
                        koi_fpflag_ec: columns[9],
                        koi_period: columns[10],
                        koi_period_err1: columns[11],
                        koi_period_err2: columns[12],
                        koi_time0bk: columns[13],
                        koi_time0bk_err1: columns[14],
                        koi_time0bk_err2: columns[15],
                        koi_impact: columns[16],
                        koi_impact_err1: columns[17],
                        koi_impact_err2: columns[18],
                        koi_duration: columns[19],
                        koi_duration_err1: columns[20],
                        koi_duration_err2: columns[21],
                        koi_depth: columns[22],
                        koi_depth_err1: columns[23],
                        koi_depth_err2: columns[24],
                        koi_prad: columns[25],
                        koi_prad_err1: columns[26],
                        koi_prad_err2: columns[27],
                        koi_teq: columns[28],
                        koi_teq_err1: columns[29],
                        koi_teq_err2: columns[30],
                        koi_insol: columns[31],
                        koi_insol_err1: columns[32],
                        koi_insol_err2: columns[33],
                        koi_model_snr: columns[34],
                        koi_tce_plnt_num: columns[35],
                        koi_tce_delivname: columns[36],
                        koi_steff: columns[37],
                        koi_steff_err1: columns[38],
                        koi_steff_err2: columns[39],
                        koi_slogg: columns[40],
                        koi_slogg_err1: columns[41],
                        koi_slogg_err2: columns[42],
                        koi_srad: columns[43],
                        koi_srad_err1: columns[44],
                        koi_srad_err2: columns[45],
                        ra_str: columns[46],
                        dec_str: columns[47],
                        koi_kepmag: columns[48],
                        koi_kepmag_err: columns[49]
                    };
                });
    
                console.log(data); // Check if data is parsed correctly
    
                setPlanetaryCandidates(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <div>
            <h2>All planetary candidates smaller than 2Re with equilibrium temperatures between 180-303K</h2>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="planetary-table"> {/* Add className for styling */}
                    <thead>
                        <tr>
                            <th>Kepler Name</th>
                            <th>Disposition</th>
                            <th>Period</th>
                            <th>Depth</th>
                            <th>Radius</th>
                            <th>Temperature (K)</th>
                            <th>Stellar Temperature (K)</th>
                            <th>Stellar Radius</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planetaryCandidates.map(candidate => (
                            <tr key={candidate.kepid}>
                                <td>{candidate.kepoi_name}</td>
                                <td>{candidate.koi_disposition}</td>
                                <td>{candidate.koi_period}</td>
                                <td>{candidate.koi_depth}</td>
                                <td>{candidate.koi_prad}</td>
                                <td>{candidate.koi_teq}</td>
                                <td>{candidate.koi_steff}</td>
                                <td>{candidate.koi_srad}</td>
                                <td>{candidate.koi_score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ExoPlanetArchiveComponent;
