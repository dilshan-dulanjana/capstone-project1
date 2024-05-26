import React, { useState } from 'react';
import './SignIn.css';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import signupimg from '../assets/signup.webp';
import Footer from './Footer';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|lk)$/i;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(emailRegex.test(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || !isValid) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/signin', {
        email,
        password
      });

      if (response.data.message === "success") {
        alert('Login successfully!');
        if (response.data.category === 'Traveler') {
          navigate('/traveler');
        } else if (response.data.category === 'AccommodationOwner') {
          navigate('/accommodation-owner-home');
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.');
    }

    setValidated(true);
  };

  const myFunction = () => {
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
            <a href="javascript:void(0);" className="icon" onClick={myFunction}>
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </Row>
        <div style={{ backgroundImage: `url(${signupimg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '100vh' }}>
          <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Col md={6} lg={4}>
              <div className="signup-container p-4 rounded">
                <div className="signup-form">
                  <h2 className="text-center">Sign In</h2>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="validationCustomEmail">
                      <Form.Label>Email address</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={handleEmailChange}
                          required
                          isInvalid={validated && !isValid}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="validationCustomPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                      Sign In
                    </Button>
                  </Form>
                  <div className="social-media-buttons mt-4">
                    <Button variant="outline-primary" className="d-flex align-items-center justify-content-center w-100 mb-2">
                      <FaGoogle className="mr-2" /> Sign in with Google
                    </Button>
                    <Button variant="outline-primary" className="d-flex align-items-center justify-content-center w-100">
                      <FaFacebook className="mr-2" /> Sign in with Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default SignIn;
