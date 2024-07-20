import React from 'react';
import { Col, Row } from 'react-bootstrap';
 import image1 from '../../assets/Asalap.png';
import image2 from '../../assets/vesak.png';
import image3 from '../../assets/Nallur.png';
import Footer from '../../components/footer/Footer';
import NavBar from '../../components/NavigationBar';
import { Link } from 'react-router-dom';
function UpcomingEvents() {
  return (
    <div>
      <NavBar/>
      <Row style={{ }}>
        <Col xs={4}>
          <img src={image1} alt="Event 1" style={{margin:'50px',width:'80%'}} />
        </Col>
        <Col xs={4}>
        <Link to ="/VesakFestival">
          <img src={image2} alt="Event 2" style={{margin:'50px',width:'80%'}}/>
          </Link>
        </Col>
        <Col xs={4}>
        <Link to = "/HinduFestival">
          <img src={image3} alt="Event 3"style={{margin:'50px',width:'80%'}} />
          </Link>
        </Col>
      </Row>
      <Footer/>
    </div>
  );
}

export default UpcomingEvents;
