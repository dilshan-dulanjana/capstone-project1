import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import './footer.css';

//Guys Footer ekata Image download wenne react walin.E nisa me code tika oyalage
//vs code eke terminal ekak(powershell eke) type karala install karaganna.
//npm install react-icons
//npm install react-bootstrap bootstrap react-icons
//Naththam errors pani...

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Tell us for more informations:</p>
            <p>Tourism Hotline : 1912</p>
            <p>Tel : 076 942 0372</p>
            <p>Email : <a href="mailto:DilshanDulanjana@gmail.com" className="text-white">DilshanDulanjana@gmail.com</a></p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Home</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Contact Us</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Tourism News</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Video Streaming</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Tourism Hotline</a></li>
              <li><a href="#" className="text-white" style={{ textDecoration: 'none' }}>Select Language</a></li>
            </ul>

          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="d-flex">
              <a href="#" className="text-white me-3"><FaFacebook size={30} /></a>
              <a href="#" className="text-white me-3"><FaInstagram size={30} /></a>
              <a href="#" className="text-white me-3"><FaTwitter size={30} /></a>
              <a href="#" className="text-white"><FaYoutube size={30} /></a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <h5>Newsletter Subscription</h5>
            <p>Subscribe to our newsletter to get the latest updates and offers</p>
            <a href="#" className="btn btn-primary">Subscribe Now</a>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#" className="text-white">Terms of Service</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
