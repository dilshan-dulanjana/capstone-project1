// src/components/admin/Admin.js
import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

import TravelPlacesImg from '../../assets/Images/TravelPlaces.jpg';
import HotelImg from '../../assets/Images/Hotel.jpg';
import NewsImg from '../../assets/Images/news.jpg';
import TourGuideImg from '../../assets/Images/tourguide.jpg';
import TravelAgentImg from '../../assets/Images/travelagent.jpg';
import TravelAdviceImg from '../../assets/Images/traveladvice.jpg';
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/perahara.jpg'
import Footer from '../../components/footer/Footer';
import ProfileNav from '../../components/ProfileNavigate';


const Admin = () => {
  const sections = [
    {
      title: "Travel Places",
      image: TravelPlacesImg,
      actions: [
        { name: "Accept Admin Request", link: "/Acceptadmin" },
        { name: "Check Request", link: "/Acceptravelplace" },
        { name: "Add Travel Place", link: "/addtravelplace" },
        { name: "Update Data and Delete Travel Place", link: "/Deletetravelplace" },
       
      ]
    },
    {
      title: "Hotel & Accommodations",
      image: HotelImg,
      actions: [
        { name: "Check Request", link: "" },
        { name: "Add Hotel", link: "/Addaccomation" },
        { name: "Update Data & Delete Data", link: "/Updateaccomdation" },
        
      ]
    },
    {
      title: "News",
      image: NewsImg,
      actions: [
        { name: "Add News", link: "/add-news" },
        { name: "Update Data", link: "/update-data" },
        { name: "Delete Data", link: "/delete-data" }
      ]
    },
    {
      title: "Tour Guide",
      image: TourGuideImg,
      actions: [
        { name: "Add Tour Guide", link: "/AdminTour" },
        { name: "Update Data", link: "/AdminTourGuide" },
        { name: "Delete Data", link: "/AdminTourGuide" }
      ]
    },
    {
      title: "Travel Advice",
      image: TravelAdviceImg,
      actions: [
        { name: "Update Data", link: "/TripAdvisorybackend" },
        { name: "Delete Data", link: "/TripAdvisorybackend" }
      ]
    },
    {
      title: "Travel Agents",
      image: TravelAgentImg,
      actions: [
        { name: "Add Travel Agent", link: "/Admintravel" },
        { name: "Update Data", link: "/AdmintravelAgent" },
        { name: "Delete Travel Agent", link: "/AdmintravelAgent" }
      ]
    },
    {
      title: "Packing List",
      image: image2,
      actions: [
        { name: "Update Data", link: "/PackingListbackend" },
        { name: "Delete Data", link: "/PackingListbackend" }
      ]
    },
    {
      title: "Upcoming Events",
      image: image3,
      actions: [
        { name: "Update Data", link: "/TripAdvisorybackend" },
        { name: "Delete Data", link: "/TripAdvisorybackend" }
      ]
    }, {
      title: "Budget Planner",
      image: image1,
      actions: [
        { name: "Update Data", link: "/TripAdvisorybackend" },
        { name: "Delete Data", link: "/TripAdvisorybackend" }
      ]
    }

  ];

  return (
    <>
      <ProfileNav />
      <div className="admin-container">
        {sections.map((section, index) => (
          <div className="section" key={index}>
            <img src={section.image} alt={section.title} className="section-image" />
            <div className="section-title">{section.title}</div>
            <div className="section-actions">
              {section.actions.map((action, idx) => (
                <div className="action" key={idx}>
                  <Link to={action.link}>
                    <button>{action.name}</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Admin;
