import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './news.css'; // Import the CSS file for custom styling
import Footer from '../../components/footer/Footer'
import NavigationBar from '../../components/NavigationBar';


const placeholderImage = 'https://via.placeholder.com/350x200?text=No+Image'; // Placeholder image URL

export default function News() {
  const [mynews, setMyNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
       'https://newsdata.io/api/1/news?apikey=pub_44938b91fbbbfa077b9d3058bd70986df88ba  '      );
      const sortedArticles = response.data.results.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setMyNews(sortedArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return 'No description available.';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (

    <>
    <NavigationBar/>
    <Container>

      <Row>
        {mynews.map((article, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="news-card">
              <Card.Img
                variant="top"
                src={article.image_url || placeholderImage}
                alt={article.title || 'No Title'}
              />
              <Card.Body>
                <Card.Title>{truncateText(article.title, 50)}</Card.Title>
                <Card.Text>{truncateText(article.description, 100)}</Card.Text>
                <Button
                  variant="primary"
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
     
    </Container>
    <Footer/>
    </>
  );
}
