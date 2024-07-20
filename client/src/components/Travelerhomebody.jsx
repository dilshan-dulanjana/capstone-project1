import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS for animations
import sigiriya from "../assets/sigiriya.jpg";
import yala from "../assets/Yal.jpg";
import galle from "../assets/galle.jpeg";
import ella from "../assets/ella.webp";
import kandy from "../assets/Kandy.webp";
import Nuwreliya from "../assets/Nuwraeliy.jpg";
import Mirissa from "../assets/mirissa1.jpg";
import polonnaruw from "../assets/polonnaruwa.jpg";
import Anuradhapura from "../assets/Anuradhapura.jpg";
import udwalawa from "../assets/udawalawa.webp";
import dabulla from "../assets/dabulla.webp";
import horton from "../assets/97.jpg";
import Aubowan from "../assets/Ayubowan.svg";
import Au from "../assets/YU.webp";
import profile from "../assets/profile.png";
import Asalap from "../assets/Asalap.png";
import vesak from "../assets/vesak.png";
import Devali from "../assets/Devali.png";
import Newyear from "../assets/Newyear.png";
import Nallur from "../assets/Nallur.png";
import travelAgent from "../assets/Travel-Agent.webp";
import visa from "../assets/Applyvisa.jpg";
import bookflight from "../assets/bookflight.jpg";
import hotel from "../assets/hotel.jpg";
import transpot from "../assets/02.jpg";
import camp from "../assets/camp.jpg";
import weather from "../assets/wether.jpeg";
import blacklist from "../assets/blacklist.png";
import perahara from "../assets/perahara.jpg";
import Travelhomeimg from "../assets/trh.webp"; // Import all assets from a single index file

import './Homebody.css';
import './Table.css';

function Travelerhomebody() {
    const [travelers, setTravelers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        axios.get('http://localhost:8070/api/ratings') // Update the endpoint to fetch rating data
            .then(response => setTravelers(response.data))
            .catch(error => console.error('Error fetching travelers:', error));
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS for animations
    }, []);

    const totalPages = Math.ceil(travelers.length / itemsPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = travelers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <div>
                <h2 className="text1" data-aos="fade-down">Welcome to Sri Lanka</h2>
                <br />
                <Row>
                    <Col md={6} xs={12} sm={12}>
                        <img src={Aubowan} className="img-fluid" alt="" style={{ maxWidth: '550px', height: 'auto', margin: '5px', padding: "10px" }} data-aos="fade-right" />
                    </Col>
                    <Col md={6} xs={12} sm={12}>
                        <img src={Au} className="img-fluid" alt="" style={{ maxWidth: '550px', height: 'auto' }} data-aos="fade-left" />
                    </Col>
                </Row>
                <br /><br />
                <p className="text2">See what's waiting for you on your next island getaway. Savour the unique experiences this island treasure has to offer.</p>
            </div>

            <br />
            <Row className="d-flex justify-content-center align-items-center min-vh-50">
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={Travelhomeimg} />
                        <Card.Body>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Card.Title>Come along and share the adventure with us!</Card.Title>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', fontSize: "18px" }}>
                                <Card.Text>
                                    Join us now and you can earn money. Let's start our Adventure Travel
                                </Card.Text>
                            </div>
                            <Link to="/addtravelplace">
                                <Button variant="primary" style={{ width: "100%", padding: "10px" }}>Upload Your Travel Place</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <br />

            <div className="container bg-">
                <div className="flex-container justify-content-center">
                    <h1 className="txt">Our Top Rated Travelers</h1>
                </div>
                <br />
                <Table responsive className="custom-table bg-black">
                    <thead style={{ backgroundColor: "blue" }}>
                        <tr>
                            <th>ID</th>
                            <th>Profile Photo</th>
                            <th>Name</th>
                            <th>Points</th>
                            <th>Ranks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((traveler, index) => (
                            <tr key={index}>
                                <td>{traveler.userId}</td>
                                <td><img src={profile} alt="" className="profile-img" /></td>
                                <td>{traveler.name}</td>
                                <td>{traveler.totalPoints}</td>
                                <td>{traveler.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between mt-3">
                    <Button 
                        variant="primary" 
                        onClick={() => handlePageChange('prev')} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button 
                        variant="primary" 
                        onClick={() => handlePageChange('next')} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <div className="famousplace">
                <h1 className="text1">Most Famous Travel Places In Sri Lanka</h1>
            </div>

            <br />
            <div className="bg-black">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {[sigiriya, yala, galle, ella, kandy, Nuwreliya, Mirissa, polonnaruw, Anuradhapura, udwalawa, dabulla, horton].map((place, index) => (
                            <div className="col-md-4 mb-4 d-flex justify-content-center" data-aos="zoom-in" key={index}>
                                <div className="card">
                                    <img src={place} className="card-img-top" alt="..." />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{place.split('/').pop().split('.')[0].replace(/_/g, ' ')}</h5>
                                        <button type="button" className="btn btn-outline-warning">See Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row justify-content-center mt-4">
                        <div className="col-auto">
                            <Link to="/ShowmorePlaces" className="btn btn-outline-light p-5px">See More Places {">>>"}</Link>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

            <br /><br /><br />
            <div className="events-container">
                <h2 className="events-title">Upcoming Events & Festivals</h2>
                <div id="carouselExample" className="carousel slide" style={{ width: "500px", height: "500px", margin: "auto" }} data-aos="zoom-in-up">
                    <div className="carousel-inner">
                        {[Asalap, vesak, Devali, Newyear, Nallur].map((event, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <img src={event} className="d-block w-100" alt="..." />
                                <h3 className="c-text">{event.split('/').pop().split('.')[0].replace(/_/g, ' ')}</h3>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <br /><br />
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-info custom-btn-width">See More Events</button>
            </div>

            <br /><br />
            <div className="famousplace">
                <h1 className="text1">Plan Your Dream Holiday</h1>
            </div>
            <br /><br />
            <div className="container">
                <div className="row">
                    {[travelAgent, visa, bookflight, hotel, transpot, camp, weather, blacklist, perahara].map((service, index) => (
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto" data-aos="fade-down" key={index} data-aos-easing="linear" data-aos-duration="1500">
                            <figure className="figure custom-figure-padding">
                                <img src={service} className="figure-img img-fluid rounded custom-img" alt="..." />
                                <figcaption className="figure-caption text-center"><h2 className="c-text">{service.split('/').pop().split('.')[0].replace(/_/g, ' ')}</h2></figcaption>
                            </figure>
                        </div>
                    ))}
                </div>
            </div>

            <br /><br /><br />
            <div className="p-5 bg-primary text-white text-center">
                <p>&copy; All rights reserved.</p>
            </div>
        </div>
    );
}

export default Travelerhomebody;
