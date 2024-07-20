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

function Viewtravelplace() {
  const { category } = useParams();
  const [travelPlaces, setTravelPlaces] = useState([]);

  useEffect(() => {
    if (category) {
      axios.get(`http://localhost:8070/api/travel-places?category=${category}`)
        .then(response => {
          setTravelPlaces(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the travel places!', error);
        });
    }
  }, [category]);

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          {travelPlaces.map((place, index) => (
            <Col key={index} sm="12" md="3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={place.imageurl} />
                <Card.Body>
                  <Card.Title>Location Name: {place.locationName}</Card.Title>
                  <Card.Text>Province: {place.province}</Card.Text>
                  <Card.Text>District: {place.District}</Card.Text>
                  <Card.Text>Category: {place.category}</Card.Text>
                  <Card.Text>Latitude: {place.latitude}</Card.Text>
                  <Card.Text>Longitude: {place.longitude}</Card.Text>
                  <Link to={`/SelectedPlace/${place._id}`} state={{ place }}>
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

export default Viewtravelplace;
