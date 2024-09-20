import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    propertyType: "",
    images: [],
  });
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => {
          data.append("images", file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("http://localhost:8000/api/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Property Data Saved successfully.");
      setFormData({
        name: "",
        location: "",
        price: "",
        description: "",
        propertyType: "",
        images: [],
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                value={formData.name}
                placeholder="Enter property name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Control
                type="text"
                value={formData.location}
                placeholder="Enter location"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row style={{ marginTop: "25px" }}>
          <Col md={6}>
            <Form.Group controlId="formPrice">
              <Form.Control
                type="number"
                value={formData.price}
                placeholder="Enter price"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formPropertyType">
              <Form.Control
                as="select"
                value={formData.propertyType}
                onChange={(e) =>
                  setFormData({ ...formData, propertyType: e.target.value })
                }
              >
                <option>Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formDescription" style={{ marginTop: "25px" }}>
          <Form.Control
            as="textarea"
            value={formData.description}
            rows={3}
            placeholder="Enter property description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formImages" style={{ marginTop: "25px" }}>
          <Form.Control
            type="file"
            ref={fileInputRef}
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setFormData({ ...formData, images: files });
            }}
          />
        </Form.Group>

        <Button style={{ marginTop: "25px" }} variant="primary" type="submit">
          Add Property
        </Button>
      </Form>
    </Container>
  );
};

export default AddProperty;
