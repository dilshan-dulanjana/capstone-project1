import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { useNavigate, Link } from 'react-router-dom';
import signupimg from '../../assets/signup.webp';
import './SignIn.css';

const provinces = {
  "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
  "Eastern Province": ["Ampara", "Batticaloa", "Trincomalee"],
  "Northern Province": ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu"],
  "North Western Province": ["Kurunegala", "Puttalam"],
  "North Central Province": ["Anuradhapura", "Polonnaruwa"],
  "Southern Province": ["Galle", "Matara", "Hambantota"],
  "Uva Province": ["Badulla", "Monaragala"],
  "Western Province": ["Colombo", "Gampaha", "Kalutara"],
  "Sabaragamuwa Province": ["Kegalle", "Ratnapura"]
};

function validateInput(input) {
  // Remove any digit from the input value
  input.value = input.value.replace(/\d/g, '');
}

function AddTravelPlace() {
  const [useLiveLocation, setUseLiveLocation] = useState(false);
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [selectedProvince, setSelectedProvince] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        const userEmail = decodedToken.email;
        setUserName(decodedToken.name);
        setUserId(decodedToken.userId);

        axios.get(`http://localhost:8070/api/users/email/${userEmail}`)
          .then(response => {
            setUserName(response.data.name);
            setUserId(response.data.UserID);
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
            if (error.response && error.response.status === 401) {
              Cookies.remove('token');
              navigate('/signin');
            }
          });
      } catch (error) {
        console.error('Invalid token:', error);
        Cookies.remove('token');
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleProvinceChange = (event) => {
    const selected = event.target.value;
    setSelectedProvince(selected);
  };

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    values.latitude = useLiveLocation ? location.latitude : values.latitude;
    values.longitude = useLiveLocation ? location.longitude : values.longitude;
    values.userName = userName;
    values.userId = userId;

    console.log('Submitting values:', values); // Log values before submission

    axios.post('http://localhost:8070/api/travel-places/add-travel-place', values, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
      .then(response => {
        console.log('Response:', response.data);
        alert('New Travel Place added successfully');
        navigate('/traveler');
      })
      .catch(error => {
        console.error('Error submitting form:', error.response?.data || error.message);
        alert('Error submitting form: ' + (error.response?.data.message || error.message));
      });
  };

  return (
    <Container fluid style={{ maxWidth: "100%" }}>
      <div style={{ backgroundImage: `url(${signupimg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100%' }}>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col md={8} lg={6} sm={12}>
            <div className="signup-container p-4 rounded">
              <div className="signup-form">
                <h2 className="text-center">Add Travel Place</h2>
                <div>
                  <h5 style={{ color: 'blue' }}>Your ID is: {userId} &nbsp; Name: {userName}</h5>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="locationName">
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control type="text" onInput={(e) => validateInput(e.target)} name="locationName" required />
                  </Form.Group>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" required>
                      <option value="">Select category...</option>
                      <option value="Historical Sites">Historical Sites</option>
                      <option value="Beaches">Beaches</option>
                      <option value="Mountains and Hill Country">Mountains and Hill Country</option>
                      <option value="National Parks and Wildlife">National Parks and Wildlife</option>
                      <option value="Waterfalls">Waterfalls</option>
                      <option value="Cultural and Religious Sites">Cultural and Religious Sites</option>
                      <option value="Lakes and Rivers">Lakes and Rivers</option>
                      <option value="Botanical Gardens and Parks">Botanical Gardens and Parks</option>
                      <option value="Islands">Islands</option>
                      <option value="Adventure and Outdoor Activities">Adventure and Outdoor Activities</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="province">
                    <Form.Label>Province</Form.Label>
                    <Form.Select name="province" onChange={handleProvinceChange} required>
                      <option value="">Select province...</option>
                      {Object.keys(provinces).map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="District">
                    <Form.Label>District</Form.Label>
                    <Form.Select name="District" required disabled={!selectedProvince}>
                      <option value="">Select district...</option>
                      {selectedProvince && provinces[selectedProvince].map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <div>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setUseLiveLocation(!useLiveLocation);
                          if (!useLiveLocation) {
                            getLiveLocation();
                          } else {
                            setLocation({ latitude: '', longitude: '' });
                          }
                        }}
                      >
                        {useLiveLocation ? 'Enter Manually' : 'Use Live Location'}
                      </Button>
                    </div>
                  </Form.Group>
                  {useLiveLocation ? (
                    <Form.Group controlId="liveLocation">
                      <Form.Label>Live Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Live Location"
                        value={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
                      
                      />
                    </Form.Group>
                  ) : (
                    <>
                      <Form.Group controlId="latitude">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control type="text" name="latitude" required />
                      </Form.Group>
                      <Form.Group controlId="longitude">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control type="text" name="longitude" required />
                      </Form.Group>
                    </>
                  )}
                  <Form.Group controlId="terms">
                    <Form.Check type="checkbox" name="terms" label="Accept terms and conditions" required />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="mt-3">Submit form</Button>
                  <br />
                  <Link to="/traveler">
                    <Button variant="danger" style={{ padding: "5px", marginTop: "5px" }}>Back</Button>
                  </Link>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default AddTravelPlace;
