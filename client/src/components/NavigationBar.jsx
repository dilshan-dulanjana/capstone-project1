import React, { useEffect } from 'react';
import "./Navigate.css";
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
        <a href="/" className="active">Home</a>
        <a href="/Contactus" className='xx'>Contact us</a>
        <a href="/News" className='xx'>Tourisum News</a>
        <a href="#about" className='xx'>Video Streaming</a>
        <a href="/aboutus" className='xx'>About us</a>
        <a href="/UpcomingEvents" className='xx'>Upcoming Events</a>
        <a href="/Planyourtrip" className='xx'>Plan Your Trip</a>
        <a href="./signup" className='xx'>Sign up</a> 
        <a href="./signIN" className='xx'>Sign IN</a>
        {/* Use an arrow function or pass myFunction as a reference */}
        <a href="javascript:void(0);" className="icon" onClick={() => myFunction()}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
   
    </div>
  );
}
