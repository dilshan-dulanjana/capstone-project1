import "./Homebody.css";
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
import Sl from "../assets/sl.webp";
import we from "../assets/we.jpg";
import po from "../assets/po.jpg";
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
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Carousel } from "bootstrap"; // Import Bootstrap Carousel component
function YourComponent() {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExample");
    const carouselInstance = new Carousel(carousel, {
      interval: 2000, // Set the interval to 3 seconds (3000 milliseconds)
      wrap: true, // Allow the carousel to loop continuously
    });
  }, []);

  return null; // Since this is not rendering anything, just returning null
}

function Homebody() {
  const [travelPlaces, setTravelPlaces] = useState([]);

  useEffect(() => {
    const fetchTravelPlaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/travelplaceroutes1"
        );
        setTravelPlaces(response.data.slice(0, 12));
      } catch (error) {
        console.error("Error fetching travel places:", error);
      }
    };

    fetchTravelPlaces();
  }, []);
  // Define array of travel places
  const travelPlace = [
    {
      image: sigiriya,
      title: "Sigiriya Sri Lanka",
      detailsLink: "/Selectetdplace",
    },
    {
      image: yala,
      title: "Yala National Park",
      detailsLink: "/Selectetdplace",
    },
    { image: galle, title: "Galle Fort", detailsLink: "/Selectetdplace" },
    { image: ella, title: "Ella Rock", detailsLink: "/Selectetdplace" },
    { image: kandy, title: "Kandy", detailsLink: "/Selectetdplace" },
    { image: Nuwreliya, title: "Nuwara Eliya", detailsLink: "/Selectetdplace" },
    { image: Mirissa, title: "Mirissa", detailsLink: "/Selectetdplace" },
    { image: polonnaruw, title: "Polonnaruwa", detailsLink: "/Selectetdplace" },
    {
      image: Anuradhapura,
      title: "Anuradhapuraya",
      detailsLink: "/Selectetdplace",
    },
    {
      image: udwalawa,
      title: "Udawalawa National Park",
      detailsLink: "/Selectetdplace",
    },
    {
      image: dabulla,
      title: "Dabulla Cave Temple",
      detailsLink: "/Selectetdplace",
    },
    {
      image: horton,
      title: "Horton Plains National Park",
      detailsLink: "/Selectetdplace",
    },
    // Add more places as needed
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <div>
        <h2 className="text1" data-aos="fade-down">
          Welcome to Sri Lanka
        </h2>
        <br />
        <img
          src={Aubowan}
          className="img-fluid p-5  "
          alt=""
          style={{
            maxWidth: "950px",
            height: "auto",
            display: "inline-block",
            marginRight: "10px",
          }}
          data-aos="fade-right"
        />
        <img
          src={Au}
          className="img-fluid p-150px "
          alt=""
          style={{ maxWidth: "550px", height: "auto", display: "inline-block" }}
          data-aos="fade-left"
        />
        <br />
        <br />
        <p className="text2">
          See what's waiting for you on your next island getaway. Savour the
          unique experiences this island treasure has to offer.
        </p>
      </div>

      <br />
      <br />
      <br />
      <div>
        <div className="row">
          <div className="col-md-6" data-aos="fade-up-right">
            <div className="card" style={{ maxWidth: "40rem" }}>
              <img src={Sl} className="card-img-top img-fluid" alt="" />
              <div className="card-body">
                <p className="text4">
                  The best destinations to travel to in 2024 mentions Sri Lanka
                  as one of the tourist hotspots this year.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6" data-aos="fade-up-left">
            <div className="card" style={{ maxWidth: "40rem" }}>
              <img src={po} className="card-img-top img-fluid" alt="" />
              <div className="card-body">
                <p className="text4">
                  Sri Lanka Tourism | Top 10 Countries To Travel in 2024
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center" data-aos="zoom-in-down">
          <div className="card col-md-12 mx-auto" style={{ maxWidth: "40rem" }}>
            <img src={we} className="card-img-top img-fluid" alt="" />
            <div className="card-body">
              <p className="text4">
                Epic Sri Lanka Holidays | Adventure and Water Sports
              </p>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      {/* Most Famous Travel Places Section */}
      <div className="famousplace">
        <h1 className="text1">Most Famous Travel Places In Sri Lanka</h1>
      </div>

      <br />

      {/* Travel Places Grid */}
      <div style={{ backgroundColor: "black" }}>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            {travelPlaces.map((place) => (
              <div
                key={place._id}
                className="col-md-4 mb-4 d-flex justify-content-center"
                data-aos="zoom-in"
              >
                <div className="card">
                  <Link to={`/SelectedPlace/${place._id}`} state={{ place }}>
                    <img
                      src={place.imageurl}
                      className="card-img-top"
                      alt="..."
                    />
                  </Link>
                  <div className="card-body text-center">
                    <h5 className="card-title">{place.locationName}</h5>

                    <Link to={`/SelectedPlace/${place._id}`} state={{ place }}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-auto">
              <Link
                to="/ShowmorePlaces"
                className="btn btn-outline-light p-5px"
              >
                See More Places {">>>"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="events-container">
        <h2 className="events-title">Upcoming Events & Festivals</h2>
        <div
          id="carouselExample"
          className="carousel slide"
          style={{ width: "500px", height: "500px", margin: "auto" }}
          data-aos="zoom-in-up"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Asalap} className="d-block w-100" alt="..." />
              <h3 className="c-text">Esala Perahera </h3>
            </div>
            <div className="carousel-item">
              <img src={vesak} className="d-block w-100" alt="..." />
              <h3 className="c-text">Vesak Festival </h3>
            </div>
            <div className="carousel-item">
              <img src={Devali} className="d-block w-100" alt="..." />
              <h3 className="c-text">Deepavali Festival </h3>
            </div>
            <div className="carousel-item">
              <img src={Newyear} className="d-block w-100" alt="..." />
              <h3 className="c-text">Sinhala And Tamil New Year </h3>
            </div>
            <div className="carousel-item">
              <img src={Nallur} className="d-block w-100" alt="..." />
              <h3 className="c-text">Nallur Festival In Sri Lanka </h3>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <br />
      <br />
      <div class="d-flex justify-content-center">
        <Link to="/UpcomingEvents">
          <button type="button" class="btn btn-outline-info custom-btn-width">
            See More Events
          </button>
        </Link>
      </div>

      <br />
      <br />

      <div className="famousplace">
        <h1 className="text1">Plane Your Dream Holiday</h1>
      </div>

      <br />
      <br />
      <div className="container">
        <div className="row">
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <Link to="/TravelAgent">
                <img
                  src={travelAgent}
                  className="figure-img img-fluid rounded custom-img"
                  alt="..."
                  style={{ width: "400px", height: "350px" }}
                />
              </Link>
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Find A Travel Agent</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <img
                src={visa}
                className="figure-img img-fluid rounded custom-img"
                alt="..."
                style={{ width: "400px", height: "350px" }}
              />
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Apply Visa Online</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <Link to="https://www.srilankan.com/en_uk/go?gad_source=1&gclid=CjwKCAjwvIWzBhAlEiwAHHWgvbHhc59JnyBjGmy4OIXm7LD_TCOw1NbMYV_M8uu4v9JzFf74coVCRhoC964QAvD_BwE">
                <img
                  src={bookflight}
                  className="figure-img img-fluid rounded custom-img"
                  alt="..."
                  style={{ width: "400px", height: "350px" }}
                />
              </Link>
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Book A Flight</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <Link to="/Accomadationhome">
                <img
                  src={hotel}
                  className="figure-img img-fluid rounded custom-img"
                  alt="..."
                  style={{ width: "400px", height: "350px" }}
                />
              </Link>
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Accommodations</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <Link to="TourGuide1">
                <img
                  src={transpot}
                  className="figure-img img-fluid rounded custom-img"
                  alt="..."
                  style={{ width: "400px", height: "350px" }}
                />
              </Link>
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Tourguide</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <img
                src={camp}
                className="figure-img img-fluid rounded custom-img"
                alt="..."
                style={{ width: "400px", height: "350px" }}
              />
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Camping Sites</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <Link to="https://www.meteo.gov.lk/index.php?lang=en">
                <img
                  src={weather}
                  className="figure-img img-fluid rounded custom-img"
                  alt="..."
                  style={{ width: "400px", height: "350px" }}
                />
              </Link>
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Weather Forecast</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <Link to="https://www.sltda.gov.lk/en/blacklisted-service-providers">
                <img
                  src={blacklist}
                  className="figure-img img-fluid rounded custom-img"
                  alt="..."
                  style={{ width: "400px", height: "350px" }}
                />
              </Link>
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Blacklist Service Providers</h2>
              </figcaption>
            </figure>
          </div>
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 mx-auto"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <figure className="figure custom-figure-padding">
              <img
                src={perahara}
                className="figure-img img-fluid rounded custom-img"
                alt="..."
                style={{ width: "400px", height: "350px" }}
              />
              <figcaption className="figure-caption text-center">
                <h2 className="c-text">Upcoming Events</h2>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}

export default Homebody;
