

import React, { useEffect, useState } from 'react';
import "./Navigate.css";
import img1 from '../assets/img2.jpg';
import img2 from '../assets/img3.jpeg';
import img3 from '../assets/img4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Dropdown, Alert, Button, Form, ListGroup } from 'react-bootstrap';
import profile from '../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function ProfileNavigate() {
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const userProfileImage = profile;

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = decodeToken(token);
      console.log('Decoded Token:', decodedToken); // To verify token decoding
      const userEmail = decodedToken.email;

      // Fetch user data from the database using the email
      axios.get(`http://localhost:8070/api/users/email/${userEmail}`)
        .then(response => {
          console.log('User Data:', response.data); // To verify the API response
          setUserName(response.data.name);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          if (error.response && error.response.status === 401) {
            handleLogout();
          }
        });
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      axios.get(`http://localhost:8070/api/travelplaces23/search?locationName=${query}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
        .then(response => {
          setSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (location) => {
    console.log('Selected Accommodation:', location);
    setSearchQuery(location.locationName);
    setSuggestions([]);
    navigate(`/SelectedPlace/${location._id}`, { state: { place: location } });
  };

  const handleSearch = () => {
    axios.get(`http://localhost:8070/api/travelplaces23/search?locationName=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
      .then(response => {
        if (response.data.length > 0) {
          const travelPlace = response.data[0]; // Assuming the first result is the correct one
          navigate(`/SelectedPlace/${travelPlace._id}`, { state: { place: travelPlace } });
        } else {
          console.error('No travel place found with the given name');
        }
      })
      .catch(error => {
        console.error('Error fetching travel place:', error);
      });
  };

  const myFunction = () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 3000
    });
  }, []);

  const handleProfileClick = () => {
    setShow(true);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/signin');
  };

  return (
    <div>
      <div className="topnav w-auto" id="myTopnav" style={{ margin: 0 }} >
        <a href="#home" className="active">Home</a>
        <a href="/Contactus" className='xx'>Contact us</a>
        <a href="/News" className='xx'>Tourisum News</a>
        <a href="#about" className='xx'>Video Streaming</a>
        <a href="/aboutus" className='xx'>About us</a>
        <a href="/UpcomingEvents" className='xx'>Upcoming Events</a>
        <a href="/Planyourtrip" className='xx'>Plan Your Trip</a>
        <a href="./signup" className='xx'>Sign up</a>
        <a href="./signIN" className='xx'>Sign IN</a>
        <a href="javascript:void(0);" className="icon" onClick={() => myFunction()}>
          <i className="fa fa-bars"></i>
        </a>
      </div>


      <br />
      <div className="bg-black d-flex justify-content-center align-items-center" style={{ height: 'auto' }} data-aos="zoom-in-down">
        <div id="carouselExampleIndicators" className="carousel slide w-100" data-ride="carousel" data-interval="2000">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={img1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img3} alt="Third slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div className="bg-black d-flex justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 d-flex align-items-center">
              <Form.Group className="mb-3 flex-grow-1">
                <Form.Label>Search Location</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="text"
                    placeholder="Search by location name"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    className="mr-2 flex-grow-1"
                  />
                  <Button onClick={handleSearch} className="ml-2">Search</Button>
                </div>
                {suggestions.length > 0 && (
                  <ListGroup>
                    {suggestions.map((location) => (
                      <ListGroup.Item
                        key={location._id}
                        action
                        onClick={() => handleSelectSuggestion(location)}
                      >
                        {location.locationName}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <br />

    </div>
  );
}
