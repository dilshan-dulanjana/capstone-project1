import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Col, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../components/NavigationBar';
import Footer from '../../components/footer/Footer';
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
    const [accommodation, setAccommodation] = useState(location.state?.accommodation || {});
    const [relatedAccommodations, setRelatedAccommodations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [showMap, setShowMap] = useState(false); // State to toggle map display
    const mapRef = useRef(null); // Ref to keep track of the map instance

    useEffect(() => {
        const fetchAccommodation = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/accommodation/${id}`);
                setAccommodation(response.data);
            } catch (error) {
                console.error('Error fetching accommodation:', error);
            }
        };

        if (!accommodation.locationName) {
            fetchAccommodation();
        }
    }, [id, accommodation.locationName]);

    useEffect(() => {
        const fetchRelatedAccommodations = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/accommodation/province/${accommodation.province}`);
                setRelatedAccommodations(response.data);
            } catch (error) {
                console.error('Error fetching related accommodations:', error);
            }
        };

        if (accommodation.province) {
            fetchRelatedAccommodations();
        }
    }, [accommodation.province]);

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
        if (userLocation && accommodation.latitude && accommodation.longitude && showMap && mapRef.current === null) {
            const map = L.map('map').setView(userLocation, 12);
            mapRef.current = map; // Store map instance in ref

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.Routing.control({
                waypoints: [
                    L.latLng(userLocation[0], userLocation[1]),
                    L.latLng(accommodation.latitude, accommodation.longitude)
                ],
                routeWhileDragging: true
            }).addTo(map);
        }
    }, [userLocation, accommodation.latitude, accommodation.longitude, showMap]);

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    return (
        <>
            <Header />
            <div>
                <br /><br />
                <h2 style={{ textAlign: 'center' }}>{accommodation.locationName}</h2>
                <br /><br />
                <Row>
                    <Col md="6" sm="12">
                        <img
                            src={accommodation.imageurl}
                            alt="Accommodation"
                            className="img-fluid w-100 admin-image"
                        />
                    </Col>
                    <Col md="6" sm="12">
                        <h3 style={{ textAlign: 'center' }}>Description</h3>
                        <p>{accommodation.description}</p>
                    </Col>
                </Row>

                <Row>
                    <Col md="6" sm="12">
                        <div style={{ textAlign: 'left' }}>
                            <h3>Telephone Number: {accommodation.telephoneNumber}</h3>
                            <h3>Rooms In Hotels: {accommodation.availablerooms}</h3>
                            <h3>Address: {accommodation.address}</h3>
                            <h3>Email : {accommodation.emailaddress}</h3>
                        </div>
                    </Col>
                </Row>

                <div style={{ background: 'black' }}>
                    <br />
                    <h2 style={{ color: 'yellow', display: 'flex', justifyContent: 'center' }}>
                        Other Accommodations In This Area
                    </h2>
                    <Row>
                        {relatedAccommodations.map((place, index) => (
                            <Col key={index} sm='12' md='3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }}>
                                <Card style={{ maxWidth: '18rem', height: '40rem' }}>
                                    <Card.Img variant="top" src={place.imageurl} />
                                    <Card.Body>
                                        <Card.Title>Location Name: {place.locationName}</Card.Title>
                                        <Card.Text>Province: {place.province}</Card.Text>
                                        <Card.Text>Category: {place.category}</Card.Text>
                                        <Card.Text>Telephone Number: {place.telephoneNumber}</Card.Text>
                                        <Link to={`/Seectedaccomadation/${place._id}`} state={{ accommodation }}>
                                            <Button  onClick={() => window.location.href = `/Seectedaccomadation/${place._id}`} variant="primary">View Details</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                    <Button onClick={() => window.location.href = accommodation.bookingurl} style={{ color: 'black', padding: '10px' }} variant="warning">
                        Book Now
                    </Button>
                </div>
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
