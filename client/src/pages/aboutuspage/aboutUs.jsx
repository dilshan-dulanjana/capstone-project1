import React from "react";
import picture from "../../assets/pic16.jpg";
import picture1 from "../../assets/pic15.jpg";
import { Container, Row, Col } from 'react-bootstrap';
import "./aboutus.css";
import Footer from '../../components/footer/Footer'


export default function AboutUs() {
  return (
    <Container fluid className="about-us-container" style={{margin:'0',padding:'0'}}>
      <Row>
        <Col xs={12}>
          <div className="background-image text-center">
            <img src={picture} alt="about us" className="img-fluid about-image" />
          </div>
        </Col>
      </Row>
      <Row className="my-1" >
        <Col md={{ span: 8, offset: 2 }} className="text-center">
          <h1 className="header">About Us</h1>
        </Col>
      </Row>
      <Row >
        <Col md={{ span: 8, offset: 2 }}>
          <p>
            Welcome to Travel Agency, your ultimate online guide to exploring the
            enchanting island of Sri Lanka. Our mission is to help travelers from
            around the world discover the hidden gems and renowned attractions of
            this tropical paradise, ensuring you experience the best that Sri
            Lanka has to offer.
          </p>
          <p>
            Whether you're seeking pristine beaches, lush rainforests, historic
            sites, or vibrant cities, our comprehensive platform provides detailed
            information on the most beautiful destinations across the island. From
            the iconic Sigiriya Rock Fortress to the serene beaches of Mirissa,
            our guides are curated to suit every traveler's interest and
            preference.
          </p>
          <p>
            But that's not all we also understand the importance of comfortable
            and convenient accommodation during your travels. Our website features
            an extensive directory of hotels, ranging from luxurious resorts to
            budget-friendly options, all located near the top attractions. Each
            listing includes detailed descriptions, amenities, and reviews to help
            you make the best choice for your stay.
          </p>
          <div className="text-center my-4">
            <img src={picture1} alt="image" className="img-fluid sigiriya" />
          </div>
          
          <div className="span">
          <h5 className="my-4">Why Choose Us?</h5>
          <ul className="list-unstyled">
            <li className="my-3">
              <b>Expert Recommendations:</b> Our team of local experts and seasoned
              travelers share their insights and tips to ensure you have an
              unforgettable experience.
            </li>
            <li className="my-3">
              <b>User-Friendly Interface:</b> Navigate our easy-to-use website to
              find all the information you need quickly and efficiently.
            </li>
            <li className="my-3">
              <b>Comprehensive Travel Guides:</b> Explore detailed guides on
              destinations, activities, culture, cuisine, and more.
            </li>
            <li className="my-3">
              <b>Hotel Directory:</b> Find the perfect place to stay with our
              extensive listings of nearby hotels.
            </li>
            <li className="my-3">
              <b>Personalized Experience:</b> Tailor your trip with our
              customizable itineraries and recommendations based on your interests.
            </li>
          </ul>
          </div>
          <p>
            At Travel Agency, we are passionate about showcasing the beauty and
            diversity of Sri Lanka. Our goal is to provide you with all the tools
            and information you need for a hassle-free and memorable journey.
            Thank you for choosing us as your travel companion, and we look
            forward to helping you explore the wonders of Sri Lanka.
          </p>
        </Col>
      </Row>
      <Footer/>
    </Container>
  );
  
}
