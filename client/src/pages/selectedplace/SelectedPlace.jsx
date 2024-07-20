import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Col, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/NavigationBar';
import Footer from '../../components/footer/Footer';
import Sigiriya from '../../assets/dimage1.png';
import hotels from '../../assets/hotel.jpg';
import trnsport from '../../assets/down.jpeg';
import Tour from '../../assets/OIP.jpeg'
import travelguide from '../../assets/travelguide.webp';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Fix Leaflet marker icon path issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function SelectedPlace() {
  const { id } = useParams();
  const location = useLocation();
  const [travelPlace, setTravelPlace] = useState(location.state?.place || {});
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false); // State to toggle map display

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
    const fetchRelatedPlaces = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api2/related-places/${id}`);
        setRelatedPlaces(response.data);
      } catch (error) {
        console.error('Error fetching related places:', error);
      }
    };

    if (travelPlace.province) {
      fetchRelatedPlaces();
    }
  }, [travelPlace.province, id]);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            console.error("Error getting user's location:", error);
          }
        );
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation && travelPlace.latitude && travelPlace.longitude && showMap) {
      const map = L.map('map').setView(userLocation, 12);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(travelPlace.latitude, travelPlace.longitude)
        ],
        routeWhileDragging: true

      }).addTo(map);
    }
  }, [userLocation, travelPlace.latitude, travelPlace.longitude, showMap]);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <>
      <Header />
      <div>
        <br /><br />
        <h2 style={{ textAlign: 'center' }}>{travelPlace.locationName}</h2>
        <br /><br />
        <Row>
          <Col md="6" sm="12">
            <img
              src={travelPlace. imageurl}
              alt="picture"
              className="img-fluid w-100 admin-image"
            />
          </Col>
          <Col md="6" sm="12">
            <h3 style={{ textAlign: 'center' }}>Description</h3>
            <p>{travelPlace.description}</p>
          </Col>
        </Row>
        <Row style={{ marginTop: '100px' }}>
          <Col md="4" sm="12">
            <div className="d-flex justify-content-center align-items-center">
              <Card
                style={{
                  padding: '30px',
                  width: '18rem',
                  backgroundColor: 'black',
                  color: 'white',
                  marginBottom: '20px',
                }}
              >
                <Card.Img variant="top" src={hotels} alt="Card image" />
                <Card.Body>
                <div className="d-flex justify-content-center">
                    <Link to={{
                      pathname: `/Viewaccomdationbyplace/${travelPlace.province}`,
                      state: { place: travelPlace }
                    }}>
                      <Button variant="primary">Accomadation IN  {travelPlace.locationName}</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md="4" sm="12">
            <div className="d-flex justify-content-center align-items-center">
              <Card
                style={{
                  padding: '30px',
                  width: '18rem',
                  backgroundColor: 'black',
                  color: 'white',
                  marginBottom: '20px',
                }}
              >
                <Card.Img variant="top" src={trnsport} alt="Card image" />
                <Card.Body>
                <Link to ="/TravelAgent">
                  <div className="d-flex justify-content-center">
                    <Button variant="primary">Travel Agent IN {travelPlace.locationName}</Button>
                  </div>
                  </Link>
                  
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md="4" sm="12">
            <div className="d-flex justify-content-center align-items-center">
              <Card
                style={{
                  padding: '30px',
                  width: '18rem',
                  backgroundColor: 'black',
                  color: 'white',
                  marginBottom: '20px',
                }}
              >
                <Card.Img variant="top" src={Tour} alt="Card image" />
                <Card.Body>
                <Link to ="/TourGuide1">
                  <div className="d-flex justify-content-center">
                    <Button variant="primary">TourGuide IN {travelPlace.locationName}</Button>
                  </div>
                  </Link>
                  
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md="4" sm="12">
            <div className="d-flex justify-content-center align-items-center">
              <Card
                style={{
                  padding: '30px',
                  width: '18rem',
                  backgroundColor: 'black',
                  color: 'white',
                  marginBottom: '20px',
                }}
              >
                <Card.Img variant="top" src={travelguide} alt="Card image" />
                <Card.Body>
                  <div className="d-flex justify-content-center">
                    <Link to={{
                      pathname: `/ThirdPage/${id}`,
                      state: { place: travelPlace }
                    }}>
                      <Button variant="primary">Trip Advisory IN {travelPlace.locationName}</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>

              
            </div>
          </Col>

          <Col md="4" sm="12">
            <div className="d-flex justify-content-center align-items-center">
              <Card
                style={{
                  padding: '30px',
                  width: '18rem',
                  backgroundColor: 'black',
                  color: 'white',
                  marginBottom: '20px',
                }}
              >
                <Card.Img variant="top" src={travelguide} alt="Card image" />
                <Card.Body>
                  <div className="d-flex justify-content-center">
                    <Link to={{
                      pathname: `/Showpackinglist/${travelPlace.locationName}`,
                      state: { place: travelPlace }
                    }}>
                      <Button variant="primary">Packing List IN {travelPlace.locationName}</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>

              
            </div>
          </Col>
        </Row>

        <div style={{ background: 'black' }}>
          <br/>
          <h2 style={{ color: 'yellow', display: 'flex', justifyContent: 'center' }}>
            Other Travel Places IN This Area    
          </h2>
          <Row>
            {relatedPlaces.map((place, index) => (
              <Col key={index} sm='12' md='4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }}>
                <Card style={{ maxWidth: '18rem' ,Height:'30rem' }}>
                <Card.Img variant="top" src={place.imageurl}/>
                  <Card.Body>
                    <Card.Title>Location Name: {place.locationName}</Card.Title>
                    <Card.Text>Province: {place.province}</Card.Text>
                    <Card.Text>District: {place.District}</Card.Text>
                    <Card.Text>Category: {place.category}</Card.Text>
                    <Link to={`/SelectedPlace/${place._id}`} state={{ place }}>
                      <Button variant="primary"  onClick={() => window.location.href = `/SelectedPlace/${place._id}`}>View Details</Button>
                    </Link>

                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <br />
66633
        <br /><br />
        {/* Toggle button to show/hide map */}
        <div className="d-flex justify-content-center">
          <Button variant="info" onClick={toggleMap}>
            {showMap ? 'Hide Map Details' : 'Show Map Details'}
          </Button>
        </div>
        <br /><br />
        {/* Map container */}
        {showMap && (
          <div id="map" style={{ height: '400px', width: '100%' }}></div>
        )}
      </div>
      <br /><br />
      <Footer />
    </>
  );
}

export default SelectedPlace;
