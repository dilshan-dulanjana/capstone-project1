import React from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Footer from '../../components/footer/Footer';
import Header from '../../components/NavigationBar';
import dimage1 from "../../assets/hotel1.jpg";
import dimage2 from "../../assets/hotel2.jpg";
import dimage3 from "../../assets/hotel3.jpg";
import dimage4 from "../../assets/hotel4.jpg";
import dimage5 from "../../assets/hotel5.jpg";
import dimage6 from "../../assets/hotel6.jpg";

import Hills from "../../assets/hotel7.jpg";

const categories = [
  { name: 'Luxury Hotels and Resorts', image: dimage1, key: 'Luxury Hotels and Resorts' },
  { name: 'Boutique Hotels', image: dimage2, key: 'Boutique Hotels' },
  { name: 'Guesthouses', image: dimage3, key: 'Guesthouses' },
  { name: 'Villas', image: dimage4, key: 'Villas' },
  { name: 'Beach Resorts', image: dimage5, key: 'Beach Resorts' },
  { name: 'Camping and Glamping', image: dimage6, key: 'Camping and Glamping' },
  { name: 'Ayurvedic and Wellness Resorts', image: Hills, key: 'Ayurvedic and Wellness Resorts' },
 
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
    navigate(`/Viewaccomdation/${categoryKey}`);
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
