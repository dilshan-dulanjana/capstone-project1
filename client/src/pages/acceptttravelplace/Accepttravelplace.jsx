import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer/Footer';
import Header from '../../components/ProfileNavigate';

function Viewtravelplace() {
  const [travelPlaces, setTravelPlaces] = useState([]);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    // Fetch all travel places
    axios.get('http://localhost:8070/api/travel-places/all')
      .then(response => {
        setTravelPlaces(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the travel places!', error);
      });
    
    // Fetch all user ratings
    axios.get('http://localhost:8070/api/ratings')
      .then(response => {
        setUserRatings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user ratings!', error);
      });
  }, []);

  const handleApprove = (id) => {
    axios.post(`http://localhost:8070/api/travel-places/approve/${id}`)
      .then(response => {
        console.log('Place approved', response.data);

        // Update travel places list
        setTravelPlaces(travelPlaces.filter(place => place._id !== id));

        // Update user ratings
        const updatedRatings = userRatings.map(rating => {
          if (rating.userid === response.data.user._id) {
            return { ...rating, totalPoints: response.data.user.totalPoints, rank: response.data.rating.rank };
          }
          return rating;
        });

        // If the user does not already have a rating, add a new rating
        if (!userRatings.some(rating => rating.userid === response.data.user._id)) {
          updatedRatings.push(response.data.rating);
        }

        setUserRatings(updatedRatings);
      })
      .catch(error => {
        console.error('There was an error approving the place!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/api/travel-places/delete/${id}`)
      .then(response => {
        console.log('Place request deleted', response.data);
        setTravelPlaces(travelPlaces.filter(place => place._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the place request!', error);
      });
  };

  const imageStyle = {
    width: '350px',
    height: '300px',
    objectFit: 'cover'
  };

  return (
    <>
      <Header />
      <br /><br />
      <Container fluid>
        <Row>
          {travelPlaces.map((place, index) => (
            <Col key={index} sm='12' md='4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={place.imageurl} style={imageStyle} />
                <Card.Body>
                  <Card.Title>Location Name: {place.locationName}</Card.Title>
                  <Card.Text>Province: {place.province}</Card.Text>
                  <Card.Text>District: {place.District}</Card.Text>
                  <Card.Text>Category: {place.category}</Card.Text>
                  <Card.Text>Latitude: {place.latitude}</Card.Text>
                  <Card.Text>Longitude: {place.longitude}</Card.Text>
                  <Card.Text>UserName: {place.userName}</Card.Text>
                  <Button style={{alignContent:"left"}} variant="primary" onClick={() => handleApprove(place._id)}>Approve</Button>
                  <Button style={{alignContent:"right"}} variant="danger" onClick={() => handleDelete(place._id)}>Delete</Button>
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
