import React from 'react';
import './Tdstyle.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMenorah, faComment, faDatabase, faChartBar, faCog, faSignOutAlt, faUserCog } from '@fortawesome/free-solid-svg-icons'; // Import the required Font Awesome icons

function TravelPlaceAdmin() {
  return (
    <div className="container d-flex">
      <nav>
        <ul>
          <li>
            <a href="#" className="logo">
              <img src="./pic/logo.jpg" alt="Logo" />
              <span className="nav-item">Admin</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faMenorah} />
              <span className="nav-item">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faComment} />
              <span className="nav-item">Message</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faDatabase} />
              <span className="nav-item">Report</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faChartBar} />
              <span className="nav-item">Attendance</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faCog} />
              <span className="nav-item">Setting</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="nav-item">Log out</span>
            </a>
          </li>
        </ul>
      </nav>

      <section className="main">
        <div className="main-top">
          <h1>Attendance</h1>
          <FontAwesomeIcon icon={faUserCog} />
        </div>
        <div className="users">
          <div className="card">
            <img src="./pic/img1.jpg" alt="User" />
            <h4>Sam David</h4>
            <p>Ui designer</p>
            <div className="per">
              <table>
                <tbody>
                  <tr>
                    <td><span>85%</span></td>
                    <td><span>87%</span></td>
                  </tr>
                  <tr>
                    <td>Month</td>
                    <td>Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button>Profile</button>
          </div>
          {/* Add more user cards here */}
        </div>

        <section className="attendance">
          <div className="attendance-list">
            <h1>Attendance List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Depart</th>
                  <th>Date</th>
                  <th>Join Time</th>
                  <th>Logout Time</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>Sam David</td>
                  <td>Design</td>
                  <td>03-24-22</td>
                  <td>8:00AM</td>
                  <td>3:00PM</td>
                  <td><button>View</button></td>
                </tr>
                <tr className="active">
                  {/* Add more rows here */}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}

export default TravelPlaceAdmin;
