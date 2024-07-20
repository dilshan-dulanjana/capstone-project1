import React from "react";
import vesakfestival from "../../assets/vesakfestival.png";
import vesak1 from "../../assets/vesak1.webp"
import vesak2 from "../../assets/vesak2.webp"
import vesak3 from "../../assets/vesak3.webp"
import vesak4 from "../../assets/vesak4.webp"
import vesak5 from "../../assets/vesak5.webp"
import vesak6 from "../../assets/vesak6.webp"

import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function VesakFestival() {
  return (
    <div>
      <div className="background-image text-center">
        <img
          src={vesakfestival}
          alt="picture"
          className="img-fluid admin-image"
        />
      </div>
      <h1 style={{ textAlign: "center" }}> Vesak Festival</h1>
      <div style={{ padding: "50px" }}>
        <p>
          Vesak day is one of the biggest days of the year and is celebrated by
          Buddhists all over the world. Buddhists commemorate the important
          events that took place in the life of Lord Buddha on this day. First
          comes the birth of Siddhartha Gautama in Lumbini in Nepal which took
          place under the arbor of Sat trees where queen Mahamaya gave birth to
          him. The second event was Siddharta Gautam’s supreme attainment as the
          Buddha, the Enlightened One. The third event was Lord Buddha’s
          Parinibbana over 2500 years ago at Kusinagar.
        </p>

        <p>
          Apart from Sri Lanka, many Asian countries including India, Japan,
          Singapore and Taiwan celebrate Vesak. Many religious activities are
          organized during this period in Sri Lanka such as Sil campaigns, Bodhi
          Poojas, Dansalas (Freely giving foods, coffee, tea from people), Vesak
          devotional songs (Bakthi Gee), pandols (thoran) and lanterns.
        </p>
        <p>
          Many temples get filled with devotees and pilgrims all over the
          country to mark this great event. In temples Buddhists worship, offer
          flowers, light lamps and burn incense. These traditional observances,
          in essence, have their value in satisfying the religious and emotional
          needs of the people.
        </p>
        <p>
          Buddhists generally wear a white dress and go to the temple and
          participate in the traditional ceremonies. Many of them spend the
          whole day in the temple and reaffirm their determination to follow the
          teachings of Buddha.
        </p>
        <p>
          On this holy day the ‘Dana’ (alms giving) plays an important role.
          This is a sign of sharing joy and peace with people. During the Vesak
          Festival week, the selling of alcohol and flesh is usually prohibited,
          with abattoirs also being closed.
        </p>
        <p>
          Other than the exclusive religious aspects of the festival, the
          Buddhists of Sri Lanka, decorate their houses and public places and
          arrange for various cultural events.
        </p>
        <strong>Birth of Siddharta Gautam</strong>
        <p>
          The Siddharth or lord Buddha, the divine creature inquired about five
          affairs before expiring for the final birth. The inquiries are the:
          right time, right area, right continent, right caste and right mother.
        </p>
        <p>
          Then, as any Buddhists know, the fully mindful divine being entered
          the womb of Queen Mahamaya. A prince was born on a Vesak Poya day to
          the Queen and King Suddhodana and was named Siddhartha, one who has
          found meaning of existence. The Queen passed away seven days after the
          prince’s birth.
        </p>
        <strong>Attainment as Lord Buddha</strong>
        <p>
          Gautama Buddha was trained in various mental skills under many
          teachers, only to get disillusioned that they do not have the truth he
          looked for. The right way to achieve the truth dawned on him one day.
          He directed his mind in the path of meditation. Moments later he
          reached enlightenment and conquered the world of sorrows on Vesak Poya
          day.
        </p>
        <strong>Lord Buddha’s Parinibbana</strong>
        <p>
          80-year old Gotama Buddha then announced His passing away,
          Parinibbana, would take place on the third watch of the night at Sal
          grove of Malla royal family, and it happened to be a Vesak Poya day.
        </p>
        <strong>Vesak Pandols (Thorana)</strong>
        <p>
          Veasak lanterns called Vesak koodu are lit in most of the homes in Sri
          Lanka on Vesak poya day. The lighting signifies an offering to the
          memory of the Buddha who delivered the message of Dhamma. In ancient
          times, people used their clay oil lamps for illumination. When candles
          became popular, colourful lanterns were made in different shapes and
          colours were used. Many associations arrange competitions on Vesak
          lanterns with the creators of the most beautiful lanterns being
          awarded valuable prizes.
        </p>
      </div>
      <Row>
        <Col>
          <Card style={{ width: "18rem", marginLeft:'100px'}}>
            <Card.Img variant="top" src={vesak1} style={{}} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft:'100px' }}>
            <Card.Img variant="top" src={vesak2} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft:'100px' }}>
            <Card.Img variant="top" src={vesak3} />
          </Card>
        </Col>
      </Row>
<br/><br/><br/>
      <Row>
        <Col>
          <Card style={{ width: "18rem", marginLeft:'100px'}}>
            <Card.Img variant="top" src={vesak4} style={{}} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft:'100px' }}>
            <Card.Img variant="top" src={vesak5} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft:'100px' }}>
            <Card.Img variant="top" src={vesak6} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VesakFestival;
