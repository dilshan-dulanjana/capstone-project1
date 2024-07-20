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

function Addaccomdation() {
  const [useLiveLocation, setUseLiveLocation] = useState(false);
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [selectedProvince, setSelectedProvince] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Upload image to Cloudinary
    let imageUrl = null;
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'Travel places'); // Replace with your Cloudinary upload preset
      formData.append('api_key', '743471555633272'); // Replace with your Cloudinary API key
  
      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dxe12sxtl/image/upload',
          formData
        );
        imageUrl = res.data.secure_url;
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        alert('Error uploading image. Please try again.');
        return;
      }
    }
  
    // Prepare data for submission
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    values.latitude = useLiveLocation ? location.latitude : values.latitude;
    values.longitude = useLiveLocation ? location.longitude : values.longitude;
    values.userName = userName;
    values.userId = userId;
    values.imageurl = imageUrl; // Add image URL to data
  
    console.log('Submitting values:', values); // Log values before submission
  
    // Submit data to backend
    axios.post('http://localhost:8070/api1/accommodations', values)
      .then(response => {
        console.log('Response:', response.data);
        alert('New Travel Place added successfully');
        // Reset form or navigate to another page
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
                <h2 className="text-center">Add Your Accomadation</h2>
                <div>
                  <h5 style={{ color: 'blue' }}>Your ID is: {userId} &nbsp; Name: {userName}</h5>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="locationName">
                    <Form.Label>Accomadation Name</Form.Label>
                    <Form.Control type="text" onInput={(e) => validateInput(e.target)} name="locationName" required />
                  </Form.Group>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" required>
                      <option value="">Select category...</option>
                      <option value="Luxury Hotels and Resorts">Luxury Hotels and Resorts</option>
                      <option value="Boutique Hotels">Boutique Hotels</option>
                      <option value="Guesthouses">Guesthouses</option>
                      <option value="Villas">Villas</option>
                      <option value="Beach Resorts">Beach Resorts</option>
                      <option value="Camping and Glamping">Camping and Glamping</option>
                      <option value="Hostels and Backpacker Lodges">Hostels and Backpacker Lodges</option>
                      <option value="Ayurvedic and Wellness Resorts">Ayurvedic and Wellness Resorts</option>
                      <option value="Homestays">Homestays</option>
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
                    <Form.Select name="district" required disabled={!selectedProvince}>
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
                        readOnly
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
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" />
                  </Form.Group>
                  <Form.Group controlId="availablerooms">
                    <Form.Label>Available Rooms</Form.Label>
                    <Form.Control type="number" name="availablerooms" />
                  </Form.Group>
                  <Form.Group controlId="emailaddress">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="emailaddress" />
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" />
                  </Form.Group>
                  <Form.Group controlId="telephoneNumber">
                    <Form.Label>Telephone Number</Form.Label>
                    <Form.Control type="text" name="telephoneNumber" />
                  </Form.Group>
                  <Form.Group controlId="bookingurl">
                    <Form.Label>Booking URL</Form.Label>
                    <Form.Control type="url" name="bookingurl" />
                  </Form.Group>
                  <Form.Group controlId="image">
                    <Form.Label>Image Upload</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                    {preview && (
                      <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
                    )}
                  </Form.Group>
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

export default Addaccomdation;
