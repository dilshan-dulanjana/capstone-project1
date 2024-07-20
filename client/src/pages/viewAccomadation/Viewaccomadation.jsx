import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/Footer';
import Header from '../../components/NavigationBar';

function ViewAccommodation() {
  const { category } = useParams();
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    if (category) {
      console.log(category);
      axios.get(`http://localhost:8070/api/accommodations?category=${encodeURIComponent(category)}`)
        .then(response => {
          setAccommodations(response.data);
        })
        .catch(error => {
          console.error('Error fetching accommodations:', error);
        });
    }
  }, [category]);

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          {accommodations.map((accommodation, index) => (
            <Col key={index} sm="12" md="3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={accommodation.imageurl} />
                <Card.Body>
                  <Card.Title>Location Name: {accommodation.locationName}</Card.Title>
                  <Card.Text>Province: {accommodation.province}</Card.Text>
                  <Card.Text>District: {accommodation.District}</Card.Text>
                  <Card.Text>Category: {accommodation.category}</Card.Text>
                  <Card.Text>Latitude: {accommodation.latitude}</Card.Text>
                  <Card.Text>Longitude: {accommodation.longitude}</Card.Text>
                  <Link to={`/Seectedaccomadation/${accommodation._id}`} state={{ accommodation }}>
                    <Button variant="primary">View Details</Button>
                  </Link>
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

export default ViewAccommodation;
