import React, { useEffect, useState } from 'react';
import './tourguides.css';
import { Row, Col, Card, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../components/ProfileNavigate.jsx';
import axios from 'axios';
import Feedback from '../../components/FeedbackForm.jsx';

import Profile from '../../assets/OIP.jpeg';

function AdmTourGuide() {
  const [tourGuides, setTourGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableTourGuide, setEditableTourGuide] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    languages: '',
    telephone: '',
    address: '',
    registrationNo: '',
    email: '',
    validityStatus: '',
  });

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/tourguides');
        setTourGuides(response.data);
      } catch (error) {
        console.error('Error fetching tour guides:', error);
      }
    };

    fetchTourGuides();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/tourguides/${id}`);
      setTourGuides(tourGuides.filter((tourGuide) => tourGuide._id !== id));
    } catch (error) {
      console.error('Error deleting tour guide:', error);
    }
  };

  const handleEdit = (tourGuide) => {
    setEditableTourGuide(tourGuide._id);
    setFormData({
      name: tourGuide.name,
      category: tourGuide.category,
      languages: tourGuide.languages,
      telephone: tourGuide.telephone,
      address: tourGuide.address,
      registrationNo: tourGuide.registrationNo,
      email: tourGuide.email,
      validityStatus: tourGuide.validityStatus,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8070/api/tourguides/${id}`, formData);
      setTourGuides(tourGuides.map((guide) => (guide._id === id ? { ...guide, ...formData } : guide)));
      setEditableTourGuide(null);
    } catch (error) {
      console.error('Error updating tour guide:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const fetchSearchedTourGuides = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/tourguides/search?name=${searchTerm}`);
        setTourGuides(response.data);
      } catch (error) {
        console.error('Error searching tour guides:', error);
      }
    };

    fetchSearchedTourGuides();
  };

  return (
    <>
      <Header />
      <div className='tour-guides'>
        <Col>
          <Row>
            <h2 className='agent1'><b> Tour Guides</b></h2>
            <Form inline onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search by name"
                className="mb-4 mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="primary">Search</Button>
            </Form>
            <Link to="/RequesTour">
              <button className='request-button'>Request</button>
            </Link>
            {tourGuides.map((tourGuide) => (
              <Col key={tourGuide._id} sm={12} md={12} lg={6} className='mb-4'>
                <Card className='tour-card'>
                  <Row noGutters>
                    <Col md={4}>
                      <Card.Img 
                        variant='top' 
                        src={tourGuide.selectedImage ? tourGuide.selectedImage : Profile} 
                        alt={tourGuide.name} 
                        className='tour-image' 
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        {editableTourGuide === tourGuide._id ? (
                          <>
                            <FormControl
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="languages"
                              value={formData.languages}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="telephone"
                              value={formData.telephone}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="registrationNo"
                              value={formData.registrationNo}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="validityStatus"
                              value={formData.validityStatus}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <Button variant='primary' className='mr-2' onClick={() => handleUpdate(tourGuide._id)}>Update</Button>
                            <Button variant='secondary' onClick={() => setEditableTourGuide(null)}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Card.Title>{tourGuide.name}</Card.Title>
                            <Card.Text>
                              <b>Category:</b> {tourGuide.category}<br/>
                              <b>Languages:</b> {tourGuide.languages}<br/>
                              <b>Telephone:</b> {tourGuide.telephone}<br/>
                              <b>Address:</b> {tourGuide.address}<br/>
                              <b>Registration No:</b> {tourGuide.registrationNo}<br/>
                              <b>Email:</b> {tourGuide.email}<br/>
                              <b>Validity Status:</b> {tourGuide.validityStatus}
                              <br/>
                              <Feedback/>
                            </Card.Text>
                          
                          </>
                        )}
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </div>
    </>
  );
}

export default AdmTourGuide;
