import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";

const Filters = ({ onLocationChange, onPriceChange, onTypeChange }) => {
  const [locations, setLocations] = useState([]);
  const [prices, setPrices] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api");
        const properties = response.data;
        const uniqueLocations = [
          ...new Set(properties.map((prop) => prop.location)),
        ];
        const uniquePrices = [...new Set(properties.map((prop) => prop.price))];
        const uniquePropertyTypes = [
          ...new Set(properties.map((prop) => prop.propertyType)),
        ];
        setLocations(
          uniqueLocations.map((loc) => ({
            label: loc.toString(),
            value: loc,
          }))
        );
        setPrices(
          uniquePrices.map((price) => ({
            label: price.toString(),
            value: price,
          }))
        );
        setPropertyTypes(
          uniquePropertyTypes.map((pr) => ({
            label: pr.toString(),
            value: pr,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Form className="mb-3">
      <Row>
        <Col md={4}>
          <Form.Group controlId="location">
            <Form.Control
              as="select"
              onChange={(e) => onLocationChange(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.value}>
                  {location.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="price">
            <Form.Control
              as="select"
              onChange={(e) => onPriceChange(e.target.value)}
            >
              <option value="">Select Price</option>
              {prices.map((price) => (
                <option key={price.id} value={price.value}>
                  {price.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="propertyType">
            <Form.Control
              as="select"
              onChange={(e) => onTypeChange(e.target.value)}
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
