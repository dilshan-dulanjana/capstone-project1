import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import './firstpage.css';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/footer/Footer';

const ImageButton = ({ src, alt, onClick }) => (
    <Button onClick={onClick} className="p-0 border-0" style={{ background: 'none' }}>
        <img src={src} alt={alt} className="img-fluid" />
    </Button>
);

export default function FirstPage() {
    const place = "Sigiriya";
    const navigate = useNavigate();

    const handleClick = (buttonId) => {
        if (buttonId === 1) {
            navigate('/SecondPage');
        } else if (buttonId === 2) {
            navigate('/ThirdPage');
        } else if (buttonId === 3) {
            navigate('/FourthPage');
        } else if (buttonId === 4) {
            window.location.href = 'https://www.msn.com/en-xl/weather/forecast/in-Gangodawila,Western-Province?loc=eyJsIjoiR2FuZ29kYXdpbGEiLCJyIjoiV2VzdGVybiBQcm92aW5jZSIsInIyIjoiQ29sb21ibyBEaXN0cmljdCIsImMiOiJTcmkgTGFua2EiLCJpIjoiTEsiLCJnIjoiZW4teGwiLCJ4IjoiNzkuOTA5NTAwMTIyMDcwMzEiLCJ5IjoiNi44NjQyOTk3NzQxNjk5MjIifQ%3D%3D&weadegreetype=C'; // replace with the desired URL
        }
    };

    return (
        // <Container className="my-4">
      <>

      <NavigationBar/>
        <div className='my-4'>
        <div className="div"><p>To success your trip of {place} follow our features</p></div>
            <Row className="mt-3" >
                <Col xs={6} className="d-flex justify-content-center">
                    <ImageButton 
                        src={image2} 
                        alt="Button 1" 
                        onClick={() => handleClick(1)} 
                    />
                </Col>
                <Col xs={6} className="d-flex justify-content-center">
                    <ImageButton 
                        src={image3} 
                        alt="Button 2" 
                        onClick={() => handleClick(2)} 
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={6} className="d-flex justify-content-center">
                    <ImageButton 
                        src={image1} 
                        alt="Button 3" 
                        onClick={() => handleClick(3)} 
                    />
                </Col>
                <Col xs={6} className="d-flex justify-content-center">
                    <ImageButton 
                        src={image4} 
                        alt="Button 4" 
                        onClick={() => handleClick(4)} 
                    />
                </Col>
            </Row>
            </div>
            <Footer/>
            </>
        
    );
}
