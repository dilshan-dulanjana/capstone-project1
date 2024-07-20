import React from "react";
import { Col, Row } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import acco1 from "../../assets/acco1.png";
import acco2 from "../../assets/acco2.png";
import acco3 from "../../assets/acco3.png";

function Accommodationbooking() {
  return (
    <div>
      <h4>Hotels and other Accommodation</h4>
      <br />
      <Row>
        <Col md="4" sm="12">
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={acco1} />
          </Card>
        </Col>
        <Col md="4" sm="12">
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={acco2} />
          </Card>
        </Col>
        <Col md="4" sm="12">
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={acco3} />
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <div style={{ margin: "10px" }}>
        <h6>Sigiriya and Araliya Reasort</h6>
        <br />
        <p>
          Location: Near Sigiriya, Sri Lanka, a short distance from the iconic
          Sigiriya Rock Fortress.
        </p>
        <p>
          Description: Sigiriya Araliya Resort is a luxurious accommodation
          offering a serene and comfortable stay amidst the natural beauty of
          the Cultural Triangle of Sri Lanka.
        </p>
        <p>
          Rooms: Elegantly designed rooms with modern amenities, offering views
          of the lush gardens or the surrounding landscapes.
        </p>
        <p>
          Dining: On-site restaurant serving a variety of local and
          international cuisine. Facilities: Swimming pool, spa, fitness center,
          and well-manicured gardens. Activities: Guided tours to nearby
          attractions such as Sigiriya Rock Fortress, Dambulla Cave Temple, and
          wildlife safaris.
        </p>
        <br />
        <div className="d-flex justify-content-end">
          <Button variant="warning"><b>Book Now</b></Button>
        </div>
      </div>
    </div>
  );
}

export default Accommodationbooking;
