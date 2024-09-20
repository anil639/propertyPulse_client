import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search location"
        onChange={(e) => onSearch(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
