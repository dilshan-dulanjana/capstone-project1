import React, { useEffect, useState } from 'react';
import "./Navigate.css";
import img1 from '../assets/img2.jpg';
import img2 from '../assets/img3.jpeg';
import img3 from '../assets/img4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Dropdown } from 'react-bootstrap';
import profile from "../assets/profile.png";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export default function ProfileNavigate() {
    const [userName, setUserName] = useState('Dilshan Dulanjana'); // Replace with actual user name source
    const userProfileImage = profile; // Replace with actual image source
    const [show, setShow] = useState(false);

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 3000
        });
    }, []);

    const handleProfileClick = () => {
        setShow(true);
    };

    return (
        <div>
            <div className="topnav w-auto" id="myTopnav" style={{ margin: 0 }}>
                <a href="#home" className="active">Home</a>
                <a href="#news" className='xx'>Contact us</a>
                <a href="#contact" className='xx'>Tourism News</a>
                <a href="#about" className='xx'>Video Streaming</a>
                <a href="#about" className='xx'>About us</a>
                <a href="#about" className='xx'>Upcoming Events</a>
                <a href="#about" className='xx'>Tourism Hotline</a>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={handleProfileClick} style={{ display: 'flex', alignItems: 'center', marginTop:"5px"}}>
                        <img
                            src={userProfileImage}
                            alt="User Profile"
                            style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '8px' }}
                        />
                        {userName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>
                    <i className="fa fa-bars"></i>
                </a>
            </div>

            {show && (
                <Alert show={show} variant="success" style={{ position: 'absolute', top: '10%', left: '70%', transform: 'translate(-50%, 0)', zIndex: 1000 }}>
                    <div className="d-flex align-items-center">
                        <img
                            src={userProfileImage}
                            alt="User Profile"
                            style={{ borderRadius: '50%', width: '60px', height: '60px', marginRight: '8px' }}
                        />
                        <Alert.Heading>Welcome, {userName}!</Alert.Heading>
                    </div>
                    <p>
                        Thank you for visiting. You are now logged in.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button variant="outline-danger"style={{ marginRight: "10%" }}>Log Out</Button>{' '}
                        <Button variant="outline-primary" style={{ marginRight: "10%" }}>View Profile</Button>{' '}
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            Close
                        </Button>

                    </div>
                </Alert>
            )}


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
                        <div className="col-md-6">
                            <form className="input-group">
                                <input type="text" className="form-control" style={{ maxWidth: '500px' }} placeholder="Search Travel Place" aria-label="search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <br /><br />
        </div>
    );
}
