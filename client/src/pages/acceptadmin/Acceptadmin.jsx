import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/Footer';
import Header from '../../components/ProfileNavigate';

function Viewtadmin() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8070/api/admins/approve/${id}`);
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error('Error approving admin:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/admins/${id}`);
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const imageStyle = {
    height: '200px',
    objectFit: 'cover'
  };

  return (
    <>
      <Header />
      <br /><br />
      <Container fluid>
        <Row>
          {admins.map((admin, index) => (
            <Col key={index} sm='12' md='4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={admin.imageurl} style={imageStyle} />
                <Card.Body>
                  <Card.Title>Admin Name: {admin.name}</Card.Title>
                  <Card.Text>Admin Email: {admin.email}</Card.Text>
                  <Button variant="primary" onClick={() => handleApprove(admin._id)}>Approve</Button>
                  <Button variant="danger" onClick={() => handleDelete(admin._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Viewtadmin;
