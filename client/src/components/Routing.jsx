import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import SignIN from './SignIN';
import TravelerHome from './TravelerHome';
import AccomodationOwner from './AccomodationOwner';
import Admin from './Admin';
import TravelPlaceAdmin from './TravelPlaceAdmin';



function Routing() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIN/>}/>
          <Route path="/traveler" element={<TravelerHome/>}/>
          <Route path="/Ac" element={<AccomodationOwner/>}/>
          <Route path= "/Admin" element={<Admin/>}/>
          <Route path ="/Tadmin" element ={<TravelPlaceAdmin/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default Routing;
