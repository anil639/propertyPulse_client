import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const PropertyList = ({ properties, fetchProperties }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/${id}`);
      alert("Property deleted successfully!");
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };
  return (
    <Container className="mt-5">
      <Row>
        {properties.map((property) => (
          <Col md={4} key={property._id}>
            <Card className="mb-4">
              <Card.Img
                variant="top"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
                src={
                  property.images.length > 0
                    ? `http://localhost:8000${property.images[0]}`
                    : "/default-image.png"
                }
              />
              {/* {console.log(property.images[0])} */}
              <Card.Body>
                <Card.Title>{property.name}</Card.Title>
                <Card.Text>{property.description}</Card.Text>
                <p>Location: {property.location}</p>
                <p>Price: {property.price}</p>
                <Link to={`/update/${property._id}`}>
                  <Button variant="primary" style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PropertyList;
