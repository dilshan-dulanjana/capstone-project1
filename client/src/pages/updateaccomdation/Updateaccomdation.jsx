import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
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

const categories = [
    "Luxury Hotels and Resorts",
    "Budget Accommodation",
    "Boutique Hotels",
    "Guest Houses",
    "Hostels",
    "Apartments",
    "Villas"
];

function AddTravelPlace() {
    const [useLiveLocation, setUseLiveLocation] = useState(false);
    const [location, setLocation] = useState({ latitude: '', longitude: '' });
    const [selectedProvince, setSelectedProvince] = useState('');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [travelPlace, setTravelPlace] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken = decodeToken(token);
                const userEmail = decodedToken.email;
                setUserName(decodedToken.name);
                setUserId(decodedToken.userId);

                axios.get(`http://localhost:8070/api/users/email/${userEmail}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        setUserName(response.data.name);
                        setUserId(response.data.userId);
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                        handleUnauthorized();
                    });
            } catch (error) {
                console.error('Invalid token:', error);
                handleUnauthorized();
            }
        } else {
            handleUnauthorized();
        }
    }, [navigate]);

    const handleUnauthorized = () => {
        Cookies.remove('token');
        navigate('/signin');
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
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

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value.length > 0) {
            axios.get(`http://localhost:8070/api/accommodation/search?name=${event.target.value}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
                .then(response => {
                    setSuggestions(response.data);
                })
                .catch(error => {
                    console.error('Error fetching suggestions:', error.response?.data || error.message);
                });
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (accommodation) => {
        axios.get(`http://localhost:8070/api/accommodation/${accommodation._id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
            .then(response => {
                setTravelPlace(response.data);
                setIsEditing(true);
                setSelectedProvince(response.data.province);
                setLocation({
                    latitude: response.data.latitude,
                    longitude: response.data.longitude
                });
                setPreview(response.data.imageurl);
                setSuggestions([]);
                setSearchQuery(accommodation.locationName);
            })
            .catch(error => {
                console.error('Error fetching accommodation details:', error.response?.data || error.message);
            });
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

    const handleDelete = () => {
        axios.delete(`http://localhost:8070/api/accommodation/delete/${travelPlace._id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
            .then(response => {
                console.log('Accommodation request deleted', response.data);
                setTravelPlace(null);
                setIsEditing(false);
                setSearchQuery('');
                alert('Accommodation deleted successfully');
            })
            .catch(error => {
                console.error('There was an error deleting the accommodation request!', error.response?.data || error.message);
                alert('Error deleting accommodation: ' + (error.response?.data.message || error.message));
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const values = Object.fromEntries(data.entries());
        values.latitude = useLiveLocation ? location.latitude : values.latitude;
        values.longitude = useLiveLocation ? location.longitude : values.longitude;
        values.userName = userName;
        values.userId = userId;

        const url = isEditing
            ? `http://localhost:8070/api/accommodation/update/${travelPlace._id}`
            : 'http://localhost:8070/api/accommodation/create';

        const method = isEditing ? 'put' : 'post';

        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'Travel places'); // replace with your Cloudinary upload preset

            try {
                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dxe12sxtl/image/upload`, formData);
                values.imageurl = cloudinaryResponse.data.secure_url;
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                alert('Error uploading image: ' + error.message);
                return;
            }
        } else {
            values.imageurl = travelPlace?.imageurl || '';
        }

        axios({
            method,
            url,
            data: values,
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
            .then(response => {
                console.log('Response:', response.data);
                alert('Accommodation saved successfully');
                if (isEditing) {
                    setIsEditing(false);
                    setTravelPlace(null);
                    setSearchQuery('');
                }
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
                            <div className="signup-form p-4 rounded">
                                <div className="form-header mb-4">
                                    <h2>{isEditing ? 'Edit' : 'Add'} Accommodation</h2>
                                    <h5>Welcome! <i className="fa fa-user-plus"></i> {userName}</h5>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Search Accommodation</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter accommodation name"
                                            value={searchQuery}
                                            onChange={handleSearchQueryChange}
                                        />
                                        {suggestions.length > 0 && (
                                            <ListGroup>
                                                {suggestions.map(accommodation => (
                                                    <ListGroup.Item
                                                        key={accommodation._id}
                                                        onClick={() => handleSelectSuggestion(accommodation)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {accommodation.locationName}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="locationName"
                                            placeholder="Enter location name"
                                            value={travelPlace?.locationName || ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace, locationName: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select" name="category" value={travelPlace?.category || ''} onChange={(e) => setTravelPlace({ ...travelPlace, category: e.target.value })} required>
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Province</Form.Label>
                                        <Form.Control as="select" name="province" value={selectedProvince} onChange={handleProvinceChange} required>
                                            <option value="">Select Province</option>
                                            {Object.keys(provinces).map(province => (
                                                <option key={province} value={province}>
                                                    {province}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>District</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="District"
                                            value={travelPlace?.District || ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace, District: e.target.value })}
                                            required
                                            disabled={!selectedProvince}
                                        >
                                            <option value="">Select District</option>
                                            {selectedProvince && provinces[selectedProvince].map(district => (
                                                <option key={district} value={district}>
                                                    {district}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Latitude</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="latitude"
                                            placeholder="Enter latitude"
                                            value={travelPlace?.latitude || location.latitude}
                                            onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Longitude</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="longitude"
                                            placeholder="Enter longitude"
                                            value={travelPlace?.longitude || location.longitude}
                                            onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Availablerooms :</Form.Label>
                                        <Form.Control
                                           type="Number"
                                            name="availablerooms"
                                            rows={3}
                                            placeholder="Enter availablerooms"
                                            value={travelPlace?.availablerooms|| ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace, availablerooms: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email address :</Form.Label>
                                        <Form.Control
                                           type="email"
                                            name="emailaddress"
                                            rows={3}
                                            placeholder="Enter Email address"
                                            value={travelPlace?.emailaddress|| ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace, emailaddress: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label> Address :</Form.Label>
                                        <Form.Control
                                           type="text"
                                            name="address"
                                            rows={3}
                                            placeholder="Enter  Address"
                                            value={travelPlace?.address|| ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace, address: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>  Telephone Number :</Form.Label>
                                        <Form.Control
                                           type="text"
                                            name=" telephoneNumber"
                                            rows={3}
                                            placeholder="Enter   Telephone Number"
                                            value={travelPlace?. telephoneNumber|| ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace,  telephoneNumber: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>  Booking url :</Form.Label>
                                        <Form.Control
                                           type="url"
                                            name="bookingurl"
                                            rows={3}
                                            placeholder="https://example.com"
                                            value={travelPlace?. bookingurl|| ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace,  bookingurl: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="description"
                                            rows={3}
                                            placeholder="Enter description"
                                            value={travelPlace?.description || ''}
                                            onChange={(e) => setTravelPlace({ ...travelPlace, description: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                                        {preview && <Image src={preview} alt="Preview" fluid />}
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        {isEditing ? 'Update' : 'Add'}
                                    </Button>
                                    {isEditing && (
                                        <Button variant="danger" onClick={handleDelete} className="ml-3">
                                            Delete
                                        </Button>
                                    )}
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
