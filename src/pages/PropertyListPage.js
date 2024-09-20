import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyList from "../components/PropertyList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    price: "",
    type: "",
    searchQuery: "",
  });

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api", {
        params: filters,
      });

      setProperties(response.data);
      console.log(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);
  // filter data for each section
  const filteredProperties = properties.filter((property) => {
    const matchesLocation = filters.location
      ? property.location === filters.location
      : true;
    const matchesPrice = filters.price
      ? property.price <= Number(filters.price)
      : true;
    const matchesType = filters.propertyType
      ? property.propertyType === filters.propertyType
      : true;
    const matchesSearch = filters.searchQuery
      ? property.location
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      : true;

    return matchesSearch && matchesLocation && matchesPrice && matchesType;
  });

  const handleSearch = (query) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: query,
    }));
  };

  const handleLocationChange = (location) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location,
    }));
  };

  const handlePriceChange = (price) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price,
    }));
  };

  const handleTypeChange = (type) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      type,
    }));
  };

  return (
    <div className="container mt-5">
      <h1>Property Listings</h1>
      <SearchBar onSearch={handleSearch} />
      <Filters
        onLocationChange={handleLocationChange}
        onPriceChange={handlePriceChange}
        onTypeChange={handleTypeChange}
      />
      <PropertyList
        properties={filteredProperties}
        fetchProperties={fetchProperties}
      />
    </div>
  );
};

export default PropertyListPage;
