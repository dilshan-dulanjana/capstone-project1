import React from "react";
import picture7 from "../../assets/pic19.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./newsAdmin.css";

export default function NewsAdmin() {
  return (
    <Container fluid className="admin-container" style={{padding:'0'}}>
      <Row>
        <Col xs={12}>
          <div className="background-image text-center">
            <img
              src={picture7}
              alt="picture"
              className="img-fluid admin-image"
            />
          </div>
        </Col>
      </Row>

      <Row className="heading mt-3">
        <Col>
          <h2>Edit News</h2>
        </Col>
      </Row>
      <Row className="subhead mb-3">
        <Col>
          <p>Please fill in the following fields:</p>
        </Col>
      </Row>

      <Form className="form" style={{padding:'100px'}}>
        <Form.Group className="mb-3" controlId="formNewsTitle">
          <Form.Label>News Title <b className="star">*</b></Form.Label>
          <Form.Control type="text" placeholder="Title of article" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formShortMessage">
          <Form.Label>Short Message <b className="star">*</b></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Summary or the beginning of the article. It will appear only on the article list panel."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFullMessage">
          <Form.Label>Full Message <b className="star">*</b></Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Entire article that will appear on the current window."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author <b className="star">*</b></Form.Label>
          <Form.Control type="text" placeholder="Author's Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image <b className="star">*</b></Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Row>
          <Col className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="secondary" type="button">
              Back
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
