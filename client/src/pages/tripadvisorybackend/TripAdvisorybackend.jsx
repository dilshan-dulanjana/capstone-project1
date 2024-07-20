import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function TripAdvisoryBackend() {
  const [formData, setFormData] = useState({
    travelplacename: "",
    beforeYouGo: "",
    packingEssentials: "",
    duringYourVisit: "",
    afterYourVisit: "",
    travelPlaceId: "",
    tripId: null // Add tripId to handle updates
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8070/api/trips/search?query=${formData.travelplacename}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setSearchResults(res.data);
        } else {
          setSearchResults([]);
          console.error('API response is not an array:', res.data);
        }
      })
      .catch(err => {
        console.error('Error during search:', err);
        setSearchResults([]); // Reset search results on error
      });
  };

  const handleSelect = (result) => {
    setFormData({
      travelplacename: result.travelplacename,
      beforeYouGo: result.beforeYouGo || "",
      packingEssentials: result.packingEssentials || "",
      duringYourVisit: result.duringYourVisit || "",
      afterYourVisit: result.afterYourVisit || "",
      travelPlaceId: result.travelPlace,
      tripId: result._id // Set tripId if trip exists
    });
  };

  const resetForm = () => {
    setFormData({
      travelplacename: "",
      beforeYouGo: "",
      packingEssentials: "",
      duringYourVisit: "",
      afterYourVisit: "",
      travelPlaceId: "",
      tripId: null // Reset tripId on clear
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { travelplacename, beforeYouGo, packingEssentials, duringYourVisit, afterYourVisit, travelPlaceId, tripId } = formData;

    if (!beforeYouGo || !packingEssentials || !duringYourVisit || !afterYourVisit) {
      alert("All fields are required!");
      return;
    }

    const tripData = { 
      beforeYouGo, 
      packingEssentials, 
      duringYourVisit, 
      afterYourVisit, 
      travelplacename, 
      travelPlace: travelPlaceId 
    };

    console.log('Submitting trip data:', tripData);

    if (!tripId) {
      // Only allow adding a new trip if no tripId exists
      axios.post('http://localhost:8070/api/trips', tripData)
        .then(res => {
          console.log(res.data);
          alert("Trip added successfully!");
          resetForm();
        })
        .catch(err => {
          console.error('Error during submission:', err.response ? err.response.data : err.message);
          alert(`Error: ${err.response ? err.response.data.error : err.message}`);
        });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { travelplacename, beforeYouGo, packingEssentials, duringYourVisit, afterYourVisit, travelPlaceId, tripId } = formData;

    if (!beforeYouGo || !packingEssentials || !duringYourVisit || !afterYourVisit) {
      alert("All fields are required!");
      return;
    }

    const tripData = { 
      beforeYouGo, 
      packingEssentials, 
      duringYourVisit, 
      afterYourVisit, 
      travelplacename, 
      travelPlace: travelPlaceId 
    };

    console.log('Updating trip data:', tripData);

    if (tripId) {
      axios.put(`http://localhost:8070/api/trips/${tripId}`, tripData)
        .then(res => {
          console.log(res.data);
          alert("Trip updated successfully!");
          resetForm();
        })
        .catch(err => {
          console.error('Error during update:', err.response ? err.response.data : err.message);
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { tripId } = formData;

    if (!tripId) {
      alert("No trip selected to delete!");
      return;
    }

    axios.delete(`http://localhost:8070/api/trips/${tripId}`)
      .then(res => {
        console.log(res.data);
        alert("Trip deleted successfully!");
        resetForm();
      })
      .catch(err => {
        console.error('Error during deletion:', err.response ? err.response.data : err.message);
      });
  };

  return (
    <Container className="mt-4">
      <h5>Welcome Minindu..</h5>
      <Form className="input-group" onSubmit={handleSearch}>
        <Form.Control
          type="text"
          className="form-control"
          style={{ maxWidth: "500px" }}
          placeholder="Search Travel Place"
          aria-label="search"
          name="travelplacename"
          value={formData.travelplacename}
          onChange={handleChange}
        />
        <Button className="btn btn-outline-success" type="submit">
          Search
        </Button>
      </Form>
      <div>
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map(result => (
              <li key={result._id} onClick={() => handleSelect(result)}>
                {result.travelplacename} - {result.travelPlace}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Row className="mb-3">
        <Col>
          <h5>Travel Place Name:</h5>
          <Form.Control 
            type="text"
            placeholder="Enter travel place name"
            name="travelplacename"
            value={formData.travelplacename}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>Before You Go:</h5>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Add details..." 
            name="beforeYouGo"
            value={formData.beforeYouGo}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>Packing Essentials:</h5>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Add details..." 
            name="packingEssentials"
            value={formData.packingEssentials}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>During Your Visit:</h5>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Add details..." 
            name="duringYourVisit"
            value={formData.duringYourVisit}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>After Your Visit:</h5>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Add details..." 
            name="afterYourVisit"
            value={formData.afterYourVisit}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Button variant="success" onClick={handleSubmit} disabled={formData.tripId !== null} style={{marginRight:'10px'}}>
        Submit
      </Button>
      <Button variant="warning" onClick={handleUpdate} disabled={formData.tripId === null} style={{marginRight:'10px'}}>
        Update
      </Button>
      <Button variant="danger" onClick={handleDelete} disabled={formData.tripId === null}>
        Delete
      </Button>
    </Container>
  );
}

export default TripAdvisoryBackend;
