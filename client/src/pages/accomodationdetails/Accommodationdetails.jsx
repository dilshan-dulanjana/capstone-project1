import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import hotell from '../../assets/hotel1.png'
import hotel2 from '../../assets/hotel2.png'
import hotel3 from '../../assets/hotel3.png'

function Accommodationdetails() {
  return (
    <div>
        <h4><b>Hotels and other Accommodation</b></h4><br/>
      <p>
      You'll be spoilt for choice with the array of Sri Lankan accommodation options. We have star class hotels, home stays, heritage bungalows, boutique hotels to guest houses and rented apartments. You can expect friendly service and the best standards in whichever range you choose. Find out more about the different types of accommodation and facilities they offer.
      </p><br/><br/>
      <Row>
        <Col md='4'> 
        <Card style={{ width: "18rem", marginLeft:'100px'}}>
            <Card.Img variant="top" src={hotell} style={{}} />
          </Card>
        </Col>
        <Col style={{marginLeft:'50px'}}>
        <strong>Araliya Resort and SPA</strong><br/><br/>
        <span>Category : Hotels</span><br/><br/>
        <span>96 Rooms</span><br/><br/>
        <span><b>Audangawa, Kimbiss, Sigiriya</b></span><br/><br/>
        <span>Email: saman@themeresorts.com</span><br/><br/>
        <span>Registration No: SLTDA/SQA/HC/00195</span><br/><br/>
        <span>Licence No: HC/2024/0025</span><br/><br/>
        <span>Validity status of licence: Valid till 31st December 2024</span><br/><br/>
        <span>Tel:0662270870</span><br/><br/>

        </Col>
      </Row><br/><br/>

      <Row>
        <Col md= '4'>
        <Card style={{ width: "18rem", marginLeft:'100px'}}>
            <Card.Img variant="top" src={hotel2} style={{}} />
          </Card>
        </Col>
        <Col style={{marginLeft:'50px'}}>
        <strong>Amaranthe Bay Resorts & Spa</strong><br/><br/>
        <span>Category : Hotels</span><br/><br/>
        <span>26 Rooms</span><br/><br/>
        <span><b>No. 101, Alles Garden Road, Uppuveli, Trincomalee</b></span><br/><br/>
        <span>Email: ga@amaranthebay.com  </span><br/><br/>
        <span>Registration No:  SLTDA/SQA/HC/00201</span><br/><br/>
        <span>Licence No: HC/2024/0061</span><br/><br/>
        <span>Validity status of licence:   Valid till 31st December 2024</span><br/><br/>
        <span>Tel: 652050200</span><br/><br/>

        </Col>
      </Row><br/><br/>

      <Row>
        <Col md='4'>
        <Card style={{ width: "18rem", marginLeft:'100px'}}>
            <Card.Img variant="top" src={hotel3} style={{}} />
          </Card>
        </Col>
        <Col style={{marginLeft:'50px'}}>
        <strong>Amaya Hills</strong><br/><br/>
        <span>Category : Hotels</span><br/><br/>
        <span>100 Rooms</span><br/><br/>
        <span><b>P. O. Box. 16, Heerassagala, Kandy</b></span><br/><br/>
        <span>Email:  gm.hills@amayaresorts.com  </span><br/><br/>
        <span>Registration No:  SLTDA/SQA/HC/0881</span><br/><br/>
        <span>Licence No: HC/2024/0061</span><br/><br/>
        <span>Validity status of licence:   Valid till 31st December 2024</span><br/><br/>
        <span>Tel: 0543270200</span><br/><br/>

        </Col>
      </Row>
    </div>
  )
}

export default Accommodationdetails
