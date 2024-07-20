
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './travel.css';
import FeedbackForm from './FeedbackForm';

export default function Travel({
  image,
  companyName,
  address,
  web,
  registrationNo,
  licenseNo,
  validityStatusOfLicense,
  district,
  telephone
}) {
  return (
    
    <div className='container1'>
      <br/>
      <Row className='background'>
        <Col>
          <img src={image} alt={companyName} className='image' />
        </Col>
        <Col className='inputs'>
          <div className="name"><b>{companyName}</b></div>
          <br/>
          <div className="details">
            <b>Address : </b>{address}
            <br/>
            <b>Web : </b><a href={web}>{web}</a>
            <br/>
            <b>Registration No : </b>{registrationNo}
            <br/>
            <b>License No : </b>{licenseNo}
            <br/>
            <b>Validity status of license : </b>{validityStatusOfLicense}
            <br/>
            <b>District : </b>{district}
            <br/>
            <b>Telephone : </b>{telephone}           
          </div>   
        
        </Col>
        <Col>
        <div>
          <FeedbackForm/>
          </div>
          </Col>
      </Row>
    </div>
  );
}

