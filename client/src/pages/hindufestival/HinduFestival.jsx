import React from "react";
import hindufestival from "../../assets/hindufestival.webp";
import hindu1 from "../../assets/hindu1.webp";
import hindu2 from "../../assets/hindu2.webp";
import hindu3 from "../../assets/hindu3.webp";
import hindu4 from "../../assets/hindu4.webp";
import hindu5 from "../../assets/hindu5.webp";
import hindu6 from "../../assets/hindu6.webp";

import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function HinduFestival() {
  return (
    <div>
      <div className="background-image text-center">
        <img
          src={hindufestival}
          alt="picture"
          className="img-fluid admin-image"
        />
      </div>
      <h1 style={{ textAlign: "center" }}> Hindu Festival</h1>
      <div style={{ padding: "50px" }}>
        <p>
          Hinduism is one of the most diverse religions in the world and is
          associated with a multitude of myths and deities. This belief in more
          than one god brings with it a plethora of festivals. Here, Culture
          Trip takes a look at Hindu festivals.
        </p>
        <strong>Diwali</strong>
        <p>
          The festival of lights – Diwali or Deepavali – is the most popular
          festival on the Indian subcontinent. The underlying essence of Diwali
          revolves around light superseding darkness, or the triumph of goodness
          over evil. Glimmering diyas (lamps) adorn every nook and cranny of
          every residence in the evening, and there are also fireworks and a
          delicious traditional banquet.
        </p>
        <strong>Holi</strong>
        <p>
          Holi is a festival of colour and a harbinger of spring in India. The
          onset of Holi is marked by the burning of an effigy of Holika – an
          evil entity from Hindu mythology – to signify the triumph of good over
          evil. The night of revelry around the bonfire goes on until the embers
          die. The following morning kicks off with people smearing coloured
          powder on each other, more carousal and occasionally the consumption
          of bhang, an intoxicating edible cannabis preparation.
        </p>
        <strong>Onam</strong>
        <p>
          Onam is the official state festival of Kerala, and is celebrated with
          the utmost fervour and festivities that include traditional sports
          like boat races and tug of war. The legend behind the celebration of
          Onam concerns the homecoming of a demigod called Mahabali, and is
          similar to the legend of Holika and the Holi festival. In both cases,
          the triumph of hope over despair is celebrated, although Mahabali is
          regarded with the utmost respect and Holika is not. Onam is growing
          beyond religious frontiers and establishing itself as a religiously
          diverse festival in Kerala.
        </p>
        <strong>Maha Shiva Night</strong>
        <p>
          Shiva is the foremost deity in the Hindu pantheon and regarded as the
          destroyer. Maha Shivaratri, or ‘the great night of Shiva’,
          commemorates the supremacy of Shiva. People refrain from sleeping and
          instead pray to the great lord. Most dedicated disciples of Lord Shiva
          celebrate Maha Shivaratri by fasting and chanting the hymns to
          Tandava, a dance performed by Lord Shiva.
        </p>
        <strong>Holi</strong>
        <p>
          Conforming to the Hindu calendar, Ugadi is New Year’s Day for Hindus.
          The festival of Ugadi is celebrated predominantly in the South Indian
          states of Karnataka, Andhra Pradesh, Tamil Nadu and Telangana.
          Premises are decorated with mango leaves, flowers and other
          embellishments; floral patterns are drawn on the floor, and savoury
          snacks are prepared in a bid to welcome the new year on a high note.
          Additionally, the consumption of bevu bella – a blend of neem (bevu)
          and jaggery (bella) – is obligatory. Neem is bitter in taste and
          jaggery is sweet; together, they signify the acceptance of life’s
          bitterness and happiness in equal parts.
        </p>
        <strong>Ugadi</strong>
        <p>
          Conforming to the Hindu calendar, Ugadi is New Year’s Day for Hindus.
          The festival of Ugadi is celebrated predominantly in the South Indian
          states of Karnataka, Andhra Pradesh, Tamil Nadu and Telangana.
          Premises are decorated with mango leaves, flowers and other
          embellishments; floral patterns are drawn on the floor, and savoury
          snacks are prepared in a bid to welcome the new year on a high note.
          Additionally, the consumption of bevu bella – a blend of neem (bevu)
          and jaggery (bella) – is obligatory. Neem is bitter in taste and
          jaggery is sweet; together, they signify the acceptance of life’s
          bitterness and happiness in equal parts.
        </p>
        <strong>Ugadi</strong>
        <p>
          Then, as any Buddhists know, the fully mindful divine being entered
          the womb of Queen Mahamaya. A prince was born on a Vesak Poya day to
          the Queen and King Suddhodana and was named Siddhartha, one who has
          found meaning of existence. The Queen passed away seven days after the
          prince’s birth.
        </p>
        <strong> Ganesh Chaturthi</strong>
        <p>
          Ganesh Chaturthi’s status as one of the most popular festivals in the
          country is partly due to its eccentricity, something the festival
          shares with its corresponding deity, Lord Ganesh. Ganesh is the son of
          Lord Shiva, the destroyer. Yet Ganesh is at odds with his father in
          his convictions and appearance. His face resembles that of an
          elephant, while his witty and playful temperament inspires devotion
          from people of all age groups. Ganesh Chaturthi commemorates the birth
          of Ganesh with the formal offering of prayers to a clay idol of the
          deity. The idol is later immersed in a body of water amid further
          festivities.
        </p>
        <strong>Navratri – Dussehra – Durga Puja</strong>
        <p>
          Akin to the recurring theme in Hindu mythology of the victory of good
          over evil, the legend behind the Navratri festival has to do with Lord
          Rama’s triumph over Ravana, a demonic entity. An alternative legend
          revolves around the victories of the goddess Durga against the
          diabolical forces that once walked the face of the Earth. Navratri,
          meaning nine nights, is a time to honour the deities and plead for
          their blessings and goodwill. The invigorating festival centres around
          the goddess Durga in East India, and goes by the name of Durga Puja.
          The world-famous Dussehra of Mysore also falls on the final day of
          Navratri, and the festival as a whole essentially serves as the
          precursor to the coming Diwali.
        </p>
        <strong>Rama Navami</strong>
        <p>
          The epic poem of the Ramayana has vast religious significance in
          Hinduism. Its protagonist, Lord Rama, with his divine prowess and
          benevolence, slays immoral beings, conquers the realm and establishes
          order. The day marking the birth of Lord Rama is celebrated as Rama
          Navami, and the observances include charity, recitals and prayers.
        </p>
      </div>
      <Row>
        <Col>
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={hindu1} style={{}} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={hindu2} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={hindu3} />
          </Card>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <Row>
        <Col>
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={hindu4} style={{}} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={hindu5} />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem", marginLeft: "100px" }}>
            <Card.Img variant="top" src={hindu6} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HinduFestival;
