import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function ThirdPage() {
  const { id } = useParams();
  const location = useLocation();
  const [travelPlace, setTravelPlace] = useState(location.state?.place || {});
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api2/travelplace/${id}`);
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
      const response = await axios.get(`http://localhost:8070/api555/newtrips/${encodeURIComponent(place)}`);
      console.log(response.data); // Debugging line
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trip data:', error.message);
      setError('Failed to fetch trip data. Please try again later.');
    }
  };

  return (
    <div className="third-page">
      <div className="third-page-content" style={{ marginLeft: '20px' }}>
        <h1><strong>Follow Your Trip Advisories for {travelPlace.locationName}</strong></h1>
        <br /><br /><br />

        {error && <p>{error}</p>}

        {trips.map((trip, index) => (
          <div key={index}>
            <Container>
              <h3><strong>Before You Go:</strong></h3>
              <p>{trip.beforeYouGo}</p><br/>

              <h3><strong>Packing Essentials:</strong></h3>
              <p>{trip.packingEssentials}</p><br />

              <h3><strong>During Your Visit:</strong></h3>
              <p>{trip.duringYourVisit}</p><br />

              <h3><strong>After Your Visit:</strong></h3>
              <p>{trip.afterYourVisit}</p><br />
            </Container>
          </div>
        ))}

        <p>By following these travel tips and advisories, you can make the most of your visit to any place.</p>
      </div>
      <Footer />
    </div>
  );
}

export default ThirdPage;
