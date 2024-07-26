import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const theme=useSelector((state)=>state.theme.theme)

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="w-full my-4 self-center">
      <input
        type="text"
        placeholder={placeholder || "Sayfada Ara..."}
        value={searchTerm}
        onChange={handleSearchChange}
        className="text-black p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        style={theme}
      />
    </div>
  );
}

export default SearchBar;
