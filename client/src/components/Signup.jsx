import React, { useState } from 'react';
import './Signup.css';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import signupimg from '../assets/signup.webp';
import Footer from './Footer';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(null);
  const [category, setCategory] = useState('');

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|lk)$/i;
  const nameRegex = /^[a-zA-Z\s'-]+$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(emailRegex.test(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const handleNameChange = (event) => {
    const inputName = event.target.value;
    setName(inputName);
    setNameValid(nameRegex.test(inputName));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false || !isValid || !passwordMatch || !nameValid) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    try {
      const response = await axios.post('http://localhost:8081/signup', {
        name,
        email,
        password,
        category
      });

      if (response.status === 200) {
        alert('User registered successfully!');
        navigate('/signin');
      } else {
        alert('Error signing up. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Email already in use or Error. Please try again.');
    }
  };

  const toggleNav = () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  return (
    <>
      <Container fluid style={{ maxWidth: "100%" }}>
        <Row>
          <div className="topnav" id="myTopnav">
            <a href="#home" className="active">Home</a>
            <a href="#news" className='xx'>Contact us</a>
            <a href="#contact" className='xx'>Tourism News</a>
            <a href="#about" className='xx'>Video Streaming</a>
            <a href="#about" className='xx'>About us</a>
            <a href="#about" className='xx'>Upcoming Events</a>
            <a href="#about" className='xx'>Tourism Hotline</a>
            <a href="#hi" className='xx'>Select Language</a>
            <a href="javascript:void(0);" className="icon" onClick={toggleNav}>
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </Row>
        <div style={{ backgroundImage: `url(${signupimg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', alignItems: 'center', padding: '10px' }}>
          <Row style={{ width: '100%' }}>
            <Col xs={12} md={4} sm={12} style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
              {/* Background image is already set in the parent div, no need to set it here */}
            </Col>
            <Col xs={12} md={8} sm={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Form onSubmit={handleSubmit} noValidate validated={validated} style={{ padding: "50px", backgroundColor: "#FFFFFF", borderRadius: "20px", boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="validationCustom01" style={{ width: "100%" }}>
                      <Form.Label>Name :</Form.Label>
                      <Form.Control
                        name="name"
                        required
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={handleNameChange}
                        isInvalid={validated && !nameValid}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="validationCustom02" style={{ width: "100%" }}>
                      <Form.Label>Category :</Form.Label>
                      <Form.Select required value={category} onChange={handleCategoryChange} name="category">
                        
                        <option value="">...</option>
                        <option value="Traveler">Traveler</option>
                        <option value="AccommodationOwner">Accommodation Owner</option>
                        <option value="Driver">Driver</option>
                        <option value="TravelAgent">Travel Agent</option>
                        <option value="Admin">Non-customer</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please choose a category.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="validationCustomUsername" style={{ width: '100%' }}>
                      <Form.Label>Email :</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                          name="email"
                          type="text"
                          placeholder="Email"
                          aria-describedby="inputGroupPrepend"
                          required
                          value={email}
                          onChange={handleEmailChange}
                          isInvalid={validated && !isValid}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a valid email.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="validationCustom03" style={{ width: "100%" }}>
                      <Form.Label>Password :</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Enter Your Password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="validationCustom04" style={{ width: "100%" }}>
                      <Form.Label>Confirm Password :</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        isInvalid={validated && !passwordMatch}
                      />
                      <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="dark" style={{ width: "100%" }}>SIGN UP</Button>
                <Button variant="danger" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                  <FaGoogle style={{ marginRight: "8px" }} />
                  Sign up With Google
                </Button>
                <Button variant="primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
                  <FaFacebook style={{ marginRight: "8px" }} />
                  Sign up With Facebook
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Signup;
