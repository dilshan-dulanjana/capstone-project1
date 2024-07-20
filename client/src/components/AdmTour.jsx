/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import './admtour.css';

export default function AdmTour({
  image,
  guideName,
  category,
  languages,
  telephone,
  address,
  registrationNo,
  email,
  validityStatusOfLicense,
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
          <img src={image} alt='guideName' className='image1' />
        </Col>
        <Col className='inputs1'>
          <div className='name1'><b>{guideName}</b></div>
          <br />
          <div className='details1'>
            <b>Category : </b>{category}
            <br />
            <b>Languages :</b>{languages}
            <br />
            <b>Telephone : </b>{telephone}
            <br />
            <b>Address : </b>{address}
            <br />
            <b>Registration No : </b>{registrationNo}
            <br />
            <b>Email : </b><a href={email}>{email}</a>
            <br />
            <b>Validity status of license : </b>{validityStatusOfLicense}
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
