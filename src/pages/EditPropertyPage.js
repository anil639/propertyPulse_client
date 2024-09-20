import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditPropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    propertyType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/${id}`);
      setProperty(data);
    };
    fetchProperty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/${id}`, property);
      alert("Property updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Update Property Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Property Name</Form.Label>
          <Form.Control
            type="text"
            value={property.name}
            onChange={(e) => setProperty({ ...property, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formLocation" style={{ marginTop: "25px" }}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={property.location}
            onChange={(e) =>
              setProperty({ ...property, location: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formPrice" style={{ marginTop: "25px" }}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={property.price}
            onChange={(e) =>
              setProperty({ ...property, price: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formDescription" style={{ marginTop: "25px" }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={property.description}
            onChange={(e) =>
              setProperty({ ...property, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formPropertyType" style={{ marginTop: "25px" }}>
          <Form.Label>Property Type</Form.Label>
          <Form.Control
            as="select"
            value={property.propertyType}
            onChange={(e) =>
              setProperty({ ...property, propertyType: e.target.value })
            }
          >
            <option value="">Select Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </Form.Control>
        </Form.Group>
        <Button style={{ marginTop: "25px" }} variant="primary" type="submit">
          Update Property
        </Button>
      </Form>
    </Container>
  );
};

export default EditPropertyPage;
