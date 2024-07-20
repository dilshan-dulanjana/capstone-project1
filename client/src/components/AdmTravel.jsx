/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './admtravels.css';

export default function AdmTravel({
  image,
  companyName,
  address,
  web,
  registrationNo,
  licenseNo,
  validityStatusOfLicense,
  district,
  telephone,
}) {
  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this?');
    if (isConfirmed) {
      // Perform delete action here
      console.log('Deleted');
    }
  };

  return (
    <div className='container2'>
      <br />
      <Row className='background1'>
        <Col>
          <img src={image} alt={companyName} className='image1' />
        </Col>
        <Col className='inputs1'>
          <div className='name1'><b>{companyName}</b></div>
          <br />
          <div className='details1'>
            <b>Address : </b>{address}
            <br />
            <b>Website : </b><a href={web}>{web}</a>
            <br />
            <b>Registration No : </b>{registrationNo}
            <br />
            <b>License No : </b>{licenseNo}
            <br />
            <b>Validity status of license : </b>{validityStatusOfLicense}
            <br />
            <b>District : </b>{district}
            <br />
            <b>Telephone : </b>{telephone}
          </div>
          <div>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
         
              <Button variant="primary">Edit</Button>
           
          </div>
        </Col>
      </Row>
    </div>
  );
}
