
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignIN from './SignIN';
import Signup from './Signup';
import TravelerHome from './TravelerHome';
import ProtectedRoute from './ProtectedRoute';
import Addtravelplace from './Addtravelplace';
import AboutUs from '../pages/aboutuspage/aboutUs'
import AccomodationHome from '../pages/accomodationhomepage/AccomodationBody'
import AgentHomepage from '../pages/agenthomepage/AgentHome'
import Contactus from '../pages/contactuspage/contactUs';
import PlanyourTrip from '../pages/firstpage/FirstPage';
import News from '../pages/newspage/news';
import Secondpage from '../pages/secondpage/SecondPage';
import Fourthpage from '../pages/fourthpage/FourthPage';
import Upcomingevents from '../pages/upcomingevents/UpcomingEvents';
import NewAddTravelplace from './NewAddtravelplace';
import TripAdvisorybackend from '../pages/tripadvisorybackend/TripAdvisorybackend';
import PackingListbackend from '../pages/packinglistbackend/PackingListbackend';
import Admin from '../pages/Admin/Admin';
import AdminTour from '../pages/admintour/AdminTour';
import  AdminTourGuide from '../pages/admintourguide/AdmTourGuide';
import Tourguide from '../pages/Tour Guide Home/Tourguide';
import Admintravel from '../pages/admintravel/AdminTravel';
import AdmintravelAgent from '../pages/admintravelagent/AdmTravelAgent';
import UpdateTravel from '../pages/updatetravel/UpdateTravel';
import Thirdpage from '../pages/thirdpage/ThirdPage';
import ShowmorePlaces from '../pages/showmoreplaces/ShowmorePlaces';
import RequestTravel from '../pages/request travel/RequestTravel';
import RequesTour from '../pages/RequestTour/RequestTour';
import VesakFestival  from '../pages/vesakfestival/VesakFestival';
import Viewtravelplace from '../pages/AllTraelplaces/Viewtravelplace'
import Updatetravelplace from '../pages/update travel place/Updatetravelplace';
import Accepttravelplace from '../pages/acceptttravelplace/Accepttravelplace';
import SelectedPlace from '../pages/selectedplace/SelectedPlace';
import Deletetravelplace from '../pages/delete travel places/Deletetravelplaces';
import Packinlist   from '../pages/packinglistbackend/PackingListbackend';
import Accomadationhome from '../pages/Accomadationcatagery/Accomadationhome';
import Addaccomation from '../pages/Addaccomadation/Addaccomadtion';
import Updateaccomdation from '../pages/updateaccomdation/Updateaccomdation';
import Viewaccomdation from '../pages/viewAccomadation/Viewaccomadation';
import Seectedaccomadation from '../pages/selectedaccomadation/Selectedaccomadation';
import Viewaccomdationbyplace from '../pages/viewaccomadationbyplace/Viewaccomdationbyplace';
import Acceptadmin from '../pages/acceptadmin/Acceptadmin';
import Showpackinglist from '../pages/showpackinglist/Showpackinglist';
import TourGuide from '../pages/tourguide/TourGuide';
import TravelAgent from '../pages/travelagent/TravelAgent';
import HinduFestival from '../pages/hindufestival/HinduFestival';



const Routing = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIN />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/Contactus" element={<Contactus />} />
      <Route path='/Planyourtrip' element={<PlanyourTrip />} />
      <Route path='/FourthPage' element={<Fourthpage />} />
      <Route path='/News' element={<News />} />
      <Route path='/SecondPage' element={<Secondpage />} />
      <Route path='/Upcomingevents' element={<Upcomingevents />} />
      <Route path="NewT" element={<NewAddTravelplace />} />
      <Route path='/Thirdpage/:id' element={<Thirdpage/>}/>
      <Route path='/ShowmorePlaces' element={<ShowmorePlaces/>}/>
      <Route path='/RequestTravel' element ={<RequestTravel/>}/>
       <Route path='/RequesTour' element ={<RequesTour/>}/>
       <Route path='TourGuide1' element ={<TourGuide/>}/>
       <Route path='TravelAgent' element ={<TravelAgent/>}/>
       <Route path='/HinduFestival' element ={<HinduFestival/>}/>
       <Route path ='/VesakFestival' element ={<VesakFestival/>}/>
        <Route path='/Viewtravelplace/:category'element={<Viewtravelplace/>}/>
        <Route path='/Updatetravelplace' element={<Updatetravelplace/>}/>
        
        <Route path='/SelectedPlace/:id' element={<SelectedPlace />} />

        <Route path='/Deletetravelplace' element= {<Deletetravelplace/>}/>

        <Route path='/Packinlist'element ={<Packinlist/>}/>
        <Route path='/Accomadationhome' element={<Accomadationhome/>}/>
        <Route path='/Addaccomation' element ={<Addaccomation/>}/>
        <Route path='/Updateaccomdation' element ={<Updateaccomdation/>}/>
        <Route path='/Viewaccomdation/:category'element={<Viewaccomdation/>}/>
        <Route path='/Seectedaccomadation/:id' element={<Seectedaccomadation/>}/>
        <Route path='/Viewaccomdationbyplace/:province'element={<Viewaccomdationbyplace/>}/>
        <Route path='/Acceptadmin' element ={<Acceptadmin/>}/>
        <Route path='/Showpackinglist/:travelplacename' element={<Showpackinglist/>}/>










  <Route path="/" element={<ProtectedRoute />}>
        <Route path="/traveler" element={<TravelerHome />} />
        <Route path='/addtravelplace' element={<Addtravelplace />} />
        <Route path='/accommodation-owner' element={<AccomodationHome />} />
        <Route path='/travel-agent' element={<AgentHomepage />} />
        <Route path ='/Admin' element={<Admin/>}/>
        <Route path='/AdminTour' element ={<AdminTour/>}/>
        <Route path='/AdminTourGuide' element={<AdminTourGuide/>}/>
        <Route path ='/Tourguide'  element={<Tourguide/>}/>
        <Route path='/Admintravel' element ={<Admintravel/>}/>
        <Route path='/UpdateTravel' element={<UpdateTravel/>}/>
        <Route path='/AdmintravelAgent' element={<AdmintravelAgent/>}/>
        <Route path='/TripAdvisorybackend' element={<TripAdvisorybackend />} />
        <Route path='/PackingListbackend' element={<PackingListbackend />} />
        <Route path='/Deletetravelplace' element= {<Deletetravelplace/>}/>
        <Route path='/Acceptravelplace' element={<Accepttravelplace/>}/>
        <Route path='/Addaccomation' element ={<Addaccomation/>}/>
        

       
        
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  </Router>
);

export default Routing;

