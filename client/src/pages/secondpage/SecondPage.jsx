import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
//import Card from 'react-bootstrap/Card';
import axios from 'axios';

function SecondPage() {
  const { id } = useParams();
  const location = useLocation();
  const [travelPlace, setTravelPlace] = useState(location.state?.place || {});
  const [packinglists, setTrips] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/travelplace/${id}`);
        setTravelPlace(response.data);
      } catch (error) {
        console.error('Error fetching travel place:', error);
      }
    };

    if (!travelPlace.locationName) {
      fetchTravelPlace();
    }
  }, [id, travelPlace.locationName]);

  useEffect(() => {
    if (travelPlace.locationName) {
      fetchTripsByPlace(travelPlace.locationName);
    }
  }, [travelPlace.locationName]);

  const fetchTripsByPlace = async (place) => {
    try {
      const response = await axios.get(`http://localhost:8070/api/newtrips/${(place)}`);
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trip data:', error.message);
      setError('Failed to fetch trip data. Please try again later.');
    }
  };

  return (
    <div className="second-page">
      <div className="second-page-content" style={{ marginLeft: '20px' }}>
        <h1><strong>Follow Your Packinglist for {travelPlace.locationName}</strong></h1>
        <br /><br /><br />

        {error && <p>{error}</p>}

        {packinglists.map((packinglist, index) => (

          <div>
            <h3><strong>Before You Go:</strong></h3>
            <p>{packinglist.clothing}</p><br />

            <h3><strong>Packing Essentials:</strong></h3>
            <p>{packinglist.essentials} </p><br />

            <h3> <strong>During Your Visit:</strong></h3>
            <p>{packinglist.accessories} </p><br />

            <h3><strong>After Your Visit:</strong> </h3>
            <p>{packinglist.miscellaneous}</p><br />

          </div>

        ))}

        <p>By following these travel tips and Packinglists, you can make the most of your visit to any place.</p>
      </div>
      <Footer />
    </div>
  );
}

export default SecondPage;
