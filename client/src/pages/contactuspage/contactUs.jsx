import React from "react";
import "./contactUs.css";
import picture from "../../assets/pic21.jpg";
import picture2 from "../../assets/phone-call.png";
import picture3 from "../../assets/maps-and-flags.png";
import picture4 from "../../assets/email.png";
import picture5 from "../../assets/old-typical-phone.png";
import picture6 from "../../assets/printer.png";
import { Container, Row, Col } from "react-bootstrap";
import Footer from '../../components/footer/Footer'

export default function ContactUs() {
  return (
    <Container fluid className="contact-us-container" style={{padding:'0'}}>
      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="background-image text-center">
            <img
              src={picture}
              alt="contact us"
              className="img-fluid contact-image"
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h1 className="header">Contact Us</h1>
        </Col>
        <Col xs={12} className="sub-heading">
          Please submit your <b>complaints and suggestions</b>
        </Col>
      </Row>
      <Row className="mt-4">
        <Row>
          <Col className="r1c1">
            <p className="dial">
              <img src={picture2} className="call" /> DIAL 1912{" "}
            </p>
            <p>
              Dial 1912 from any phone within Sri Lanka to access tourism
              related information, or to speak with a representative. Services,
              Complaints, the Information Help Desk, Customer Care Assistant and
              other relevant organisations can all be contacted through this
              centralized network.
            </p>
          </Col>
          <Col className="r1c2">
            <p className="head-office"><u> SLTDA Head Office</u> </p>
            <img src={picture3} alt="picture" className="contact-icon" />
            <b> Address</b>
            <span className="location">No. 80, Galle road, Colombo 03</span>
            <br />
            <img src={picture5} alt="picture" className="contact-icon" />
            <b> Telephone</b>
            <span className="telephone">+94 112426800 / +94 112426900 </span>
            <br />
            <img src={picture6} alt="picture" className="contact-icon" />
            <b> Fax</b>
            <span className="fax">+94 112 444165 / 2426984</span>
            <br />
            <img src={picture4} alt="picture" className="contact-icon" />
            <b> Email</b>
            <span className="email">info@srilanka.travel</span>
          </Col>
        </Row>
        <Row>
          <Col className="r2c1">
            <p className="SLTPB"><u>Sri Lanka Tourism Promotion Bureau</u></p>
            <img src={picture5} alt="picture" className="contact-icon" />
            <b> Telephone</b>
            <span className="telephone">+94 11242 1052 </span>
            <br />
            <img src={picture6} alt="picture" className="contact-icon" />
            <b> Fax</b>
            <span className="fax">+94 11 238 22 09</span>
            <br />
          </Col>
          <Col className="r2c2">
            <p className="SLTP"><u>Sri Lanka tourism Police</u></p>
            <img src={picture3} alt="picture" className="contact-icon" />
            <b> Address</b>
            <span className="location">No. 80, Galle road, Colombo 03</span>
            <br />
            <img src={picture5} alt="picture" className="contact-icon" />
            <b> Telephone</b>
            <span className="telephone">+94 11242 1052 </span>
            <br />
            <img src={picture6} alt="picture" className="contact-icon" />
            <b> Fax</b>
            <span className="fax">+94 11 238 22 09</span>
            <br />
            <img src={picture4} alt="picture" className="contact-icon" />
            <b> Email</b>
            <span className="email">dptd@srilanka.travel</span>
          </Col>
        </Row>
      </Row>
      <Footer/>
    </Container>
  );
}
