import React from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Footer from '../../components/footer/Footer';
import Header from '../../components/NavigationBar';
import dimage1 from "../../assets/dimage1.png";
import dimage2 from "../../assets/dimage2.png";
import dimage3 from "../../assets/dimage3.png";
import dimage4 from "../../assets/dimage4.png";
import dimage5 from "../../assets/dimage5.png";
import dimage6 from "../../assets/dimage6.png";
import waterfall from "../../assets/waterfall.jpg";
import garden from "../../assets/garden.jpg";
import Hills from "../../assets/Hills.png";

const categories = [
  { name: 'Beaches', image: dimage1, key: 'Beaches' },
  { name: 'Cultural and Religious Sites', image: dimage2, key: 'Cultural and Religious Sites' },
  { name: 'Historical Sites', image: dimage3, key: 'Historical Sites' },
  { name: 'National Parks and Wildlife', image: dimage4, key: 'National Parks and Wildlife' },
  { name: 'Hill Country and Scenic Landscapes', image: dimage5, key: 'HillCountry' },
  { name: 'Adventure and Outdoor Activities', image: dimage6, key: 'Adventure and Outdoor Activities' },
  { name: 'Mountains and Hill Country', image: Hills, key: 'Mountains and Hill Country' },
  { name: 'Botanical Gardens and Parks', image: garden, key: 'Botanical Gardens and Parks' },
  { name: 'Waterfalls', image: waterfall, key: 'Waterfalls' }
];

function ShowmorePlaces() {
  const navigate = useNavigate();

  const imageStyle = {
    width: '350px',
    height: '300px',
    objectFit: 'cover',
    cursor: 'pointer'
  };

  const handleCategoryClick = (categoryKey) => {
    navigate(`/viewtravelplace/${categoryKey}`);
  };

  return (
    <>
      <Header />
      <br /><br />
      <Container fluid>
        <Row>
          {categories.map((category, index) => (
            <Col 
              key={index} 
              sm='12' 
              md='4' 
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingBottom: '20px' }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="img-fluid admin-image"
                style={imageStyle}
                onClick={() => handleCategoryClick(category.key)}
              />
              <span style={{ marginTop: '10px', textAlign: 'center' }}><b>{category.name}</b></span>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ShowmorePlaces;
