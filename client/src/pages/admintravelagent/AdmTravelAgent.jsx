import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './travelagent.css';
import { Row, Col, Card, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileNav from '../../components/ProfileNavigate';
import Profile from '../../assets/down.jpeg';  // Default profile image


function AdmTravelAgent() {
  const [travelAgents, setTravelAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableTravelAgent, setEditableTravelAgent] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTravelAgents();
  }, []);

  const fetchTravelAgents = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/travelagent');
      if (Array.isArray(response.data)) {
        setTravelAgents(response.data);
      } else {
        setError('Invalid data format');
      }
      setLoading(false);
    } catch (error) {
      setError('Error fetching travel agents');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/travelagent/${id}`);
      setTravelAgents(travelAgents.filter(agent => agent._id !== id));
    } catch (error) {
      console.error('Error deleting travel agent:', error);
      setError('Error deleting travel agent');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8070/api/travelagent/${id}`, formData);
      setTravelAgents(travelAgents.map(agent => agent._id === id ? response.data : agent));
      setEditableTravelAgent(null);
    } catch (error) {
      console.error('Error updating travel agent:', error);
      setError('Error updating travel agent');
    }
  };

  const handleEdit = (travelAgent) => {
    setEditableTravelAgent(travelAgent._id);
    setFormData(travelAgent);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic will filter travel agents based on search term
    const filteredAgents = travelAgents.filter(agent =>
      agent.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTravelAgents(filteredAgents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/api/travelagent', formData);
      setTravelAgents([...travelAgents, response.data]);
      setFormData({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <ProfileNav />
      <div className='travel-agents'>
        <Col>
          <Row>
            <h2 className='agent'><b>Manage Your Travel Agents</b></h2>
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
            <Link to="/RequestTravel">
              <button className='request-button'>Request</button>
            </Link>
            
            {travelAgents.map((travelAgent) => (
              <Col key={travelAgent._id} sm={12} md={12} lg={6} className='mb-4'>
                <Card className='travel-card'>
                  <Row noGutters>
                    <Col md={4}>
                      <Card.Img 
                        variant='top' 
                        src={travelAgent.image || Profile} 
                        alt={travelAgent.companyName} 
                        className='travel-image' 
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        {editableTravelAgent === travelAgent._id ? (
                          <>
                            <FormControl
                              type="text"
                              name="companyName"
                              value={formData.companyName}
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
                              name="web"
                              value={formData.web}
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
                              type="text"
                              name="licenseNo"
                              value={formData.licenseNo}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="validityStatusOfLicense"
                              value={formData.validityStatusOfLicense}
                              onChange={handleInputChange}
                              className="mb-2"
                            />
                            <FormControl
                              type="text"
                              name="district"
                              value={formData.district}
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
                            <Button variant='primary' className='mr-2' onClick={() => handleUpdate(travelAgent._id)}>Update</Button>
                            <Button variant='secondary' onClick={() => setEditableTravelAgent(null)}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Card.Title>{travelAgent.companyName}</Card.Title>
                            <Card.Text>
                              <b>Address:</b> {travelAgent.address}<br/>
                              <b>Website:</b> <a href={travelAgent.web} target="_blank" rel="noopener noreferrer">{travelAgent.web}</a><br/>
                              <b>Registration No:</b> {travelAgent.registrationNo}<br/>
                              <b>License No:</b> {travelAgent.licenseNo}<br/>
                              <b>Validity Status:</b> {travelAgent.validityStatusOfLicense}<br/>
                              <b>District:</b> {travelAgent.district}<br/>
                              <b>Telephone:</b> {travelAgent.telephone}
                            </Card.Text>
                            <Button variant='primary' className='mr-2' onClick={() => handleEdit(travelAgent)}>Edit</Button>
                            <Button variant='danger' onClick={() => handleDelete(travelAgent._id)}>Delete</Button>
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

export default AdmTravelAgent;
