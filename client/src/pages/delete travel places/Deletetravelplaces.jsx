import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
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
    input.value = input.value.replace(/\d/g, '');
}

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
                        setUserId(response.data.userId);
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

    const handleSearch = () => {
        const normalizedQuery = searchQuery.toLowerCase();

        axios.get(`http://localhost:8070/api/travel-places/search?name=${normalizedQuery}`, {
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
                setPreview(response.data.imageUrl);
            })
            .catch(error => {
                console.error('Error searching travel place:', error.response?.data || error.message);
                alert('Error searching travel place: ' + (error.response?.data.message || error.message));
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
        axios.delete(`http://localhost:8070/api/travel-places/deletes/${travelPlace._id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
            .then(response => {
                console.log('Place request deleted', response.data);
                setTravelPlace(null);
                setIsEditing(false);
                setSearchQuery('');
                alert('Travel place deleted successfully');
            })
            .catch(error => {
                console.error('There was an error deleting the place request!', error.response?.data || error.message);
                alert('Error deleting travel place: ' + (error.response?.data.message || error.message));
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
            ? `http://localhost:8070/api/travel-places/update/${travelPlace._id}`
            : 'http://localhost:8070/api/travel-places/create';

        const method = isEditing ? 'put' : 'post';

        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'Travel places'); // replace with your Cloudinary upload preset

            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dxe12sxtl/image/upload`, formData);
            values.imageUrl = cloudinaryResponse.data.secure_url;
        } else {
            values.imageUrl = travelPlace?.imageUrl || '';
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
                alert('Travel Place saved successfully');
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
                            <div className="signup-form">
                                <h2 className="text-center">{isEditing ? 'Update Travel Place' : 'Add Travel Place'}</h2>
                                <div>
                                    <h5 style={{ color: 'blue' }}>Your ID is: {userId} &nbsp; Name: {userName}</h5>
                                </div>
                                <Form.Group controlId="search">
                                    <Form.Label>Search Travel Place by Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter location name"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button variant="primary" onClick={handleSearch} className="mt-2">Search</Button>
                                </Form.Group>
                                <Form onSubmit={handleSubmit} className="mt-4">
                                    <Form.Group controlId="locationName">
                                        <Form.Label>Location Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onInput={(e) => validateInput(e.target)}
                                            name="locationName"
                                            defaultValue={travelPlace?.locationName || ''}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select name="category" defaultValue={travelPlace?.category || ''} required>
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
                                        <Form.Select name="province" onChange={handleProvinceChange} defaultValue={travelPlace?.province || ''} required>
                                            <option value="">Select province...</option>
                                            {Object.keys(provinces).map(province => (
                                                <option key={province} value={province}>{province}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="District">
                                        <Form.Label>District</Form.Label>
                                        <Form.Select name="District" defaultValue={travelPlace?.District || ''} required disabled={!selectedProvince}>
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
                                                {useLiveLocation ? 'Use Manual Location' : 'Use Live Location'}
                                            </Button>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="latitude">
                                        <Form.Label>Latitude</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="latitude"
                                            value={useLiveLocation ? location.latitude : travelPlace?.latitude || ''}
                                            disabled={useLiveLocation}
                                            required={!useLiveLocation}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="longitude">
                                        <Form.Label>Longitude</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="longitude"
                                            value={useLiveLocation ? location.longitude : travelPlace?.longitude || ''}
                                            disabled={useLiveLocation}
                                            required={!useLiveLocation}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="image">
                                        <Form.Label>Image Upload</Form.Label>
                                        <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                                        {preview && (
                                            <Image src={preview||travelPlace?.imageUrl} alt="Preview" width="100%" />
                                        )}
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" name="description" rows={3} defaultValue={travelPlace?.description || ''} required />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">{isEditing ? 'Update Travel Place' : 'Add Travel Place'}</Button>
                                    {isEditing && (
                                        <Button variant="danger" onClick={handleDelete} className="mt-3 ml-3">Delete</Button>
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
