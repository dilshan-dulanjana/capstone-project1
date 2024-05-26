import React, { useEffect } from 'react';
import "./Navigate.css";
import img1 from '../assets/img2.jpg';
import img2 from '../assets/img3.jpeg';
import img3 from '../assets/img4.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Navigate() {
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

  return (
    <div>
      <div className="topnav w-auto" id="myTopnav" style={{ margin: 0 }} >
        <a href="#home" className="active">Home</a>
        <a href="#news" className='xx'>Contact us</a>
        <a href="#contact" className='xx'>Tourisum News</a>
        <a href="#about" className='xx'>Video Streaming</a>
        <a href="#about" className='xx'>About us</a>
        <a href="#about" className='xx'>Upcoming Events</a>
        <a href="#about" className='xx'>Tourisum Hotline</a>
        <a href="#about" className='xx'>Sign up</a>
        <a href="#about" className='xx'>Sign IN</a>
        {/* Use an arrow function or pass myFunction as a reference */}
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
            <div className="col-md-6">
              <form className="input-group">
                <input type="text" className="form-control" style={{ maxWidth: '500px' }} placeholder="Search Travel Place" aria-label="search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <br /> <br />
    </div>
  );
}
