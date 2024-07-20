import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PackingListbackend() {
  const [formData, setFormData] = useState({
    travelplacename: "",
    clothing: "",
    essentials: "",
    accessories: "",
    miscellaneous: "",
    travelPlaceId: "",
    tripId: null
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
    axios.get(`http://localhost:8070/api/packinglists/search?query=${formData.travelplacename}`)
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
        setSearchResults([]);
      });
  };

  const handleSelect = (result) => {
    setFormData({
      travelplacename: result.travelplacename,
      clothing: result.clothing || "",
      essentials: result.essentials || "",
      accessories: result.accessories || "",
      miscellaneous: result.miscellaneous || "",
      travelPlaceId: result.travelPlace,
      tripId: result._id
    });
  };

  const resetForm = () => {
    setFormData({
      travelplacename: "",
      clothing: "",
      essentials: "",
      accessories: "",
      miscellaneous: "",
      travelPlaceId: "",
      tripId: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { travelplacename, clothing, essentials, accessories, miscellaneous, travelPlaceId, tripId } = formData;

    if (!clothing || !essentials || !accessories || !miscellaneous) {
      alert("All fields are required!");
      return;
    }

    const tripData = {
      clothing,
      essentials,
      accessories,
      miscellaneous,
      travelplacename,
      travelPlace: travelPlaceId
    };

    if (!tripId) {
      axios.post('http://localhost:8070/api/packinglists', tripData)
        .then(res => {
          alert("PackingList added successfully!");
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
    const { travelplacename, clothing, essentials, accessories, miscellaneous, travelPlaceId, tripId } = formData;

    if (!clothing || !essentials || !accessories || !miscellaneous) {
      alert("All fields are required!");
      return;
    }

    const tripData = {
      clothing,
      essentials,
      accessories,
      miscellaneous,
      travelplacename,
      travelPlace: travelPlaceId
    };

    if (tripId) {
      axios.put(`http://localhost:8070/api/packinglists/${tripId}`, tripData)
        .then(res => {
          alert("PackingList updated successfully!");
          resetForm();
        })
        .catch(err => {
          console.error('Error during update:', err.response ? err.response.data : err.message);
          alert(`Error: ${err.response ? err.response.data.error : err.message}`);
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

    axios.delete(`http://localhost:8070/api/packinglists/${tripId}`)
      .then(res => {
        alert("PackingList  deleted successfully!");
        resetForm();
      })
      .catch(err => {
        console.error('Error during deletion:', err.response ? err.response.data : err.message);
        alert(`Error: ${err.response ? err.response.data.error : err.message}`);
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
          <h5>Clothing:</h5>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add details..."
            name="clothing"
            value={formData.clothing}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>Essentials:</h5>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add details..."
            name="essentials"
            value={formData.essentials}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>Accessories:</h5>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add details..."
            name="accessories"
            value={formData.accessories}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>Miscellaneous and Optional:</h5>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add details..."
            name="miscellaneous"
            value={formData.miscellaneous}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Button variant="success" onClick={handleSubmit} disabled={formData.tripId !== null} style={{ marginRight: '10px' }}>
        Submit
      </Button>
      <Button variant="warning" onClick={handleUpdate} disabled={formData.tripId === null} style={{ marginRight: '10px' }}>
        Update
      </Button>
      <Button variant="danger" onClick={handleDelete} disabled={formData.tripId === null}>
        Delete
      </Button>
    </Container>
  );
}

export default PackingListbackend;
