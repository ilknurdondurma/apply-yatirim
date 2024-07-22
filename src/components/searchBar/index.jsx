import React, { useState } from 'react';

const SearchBar = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className=" w-4/5 my-4 self-center ">
      <input
        type="text"
        placeholder={placeholder || "Sayfada Ara..."}
        value={searchTerm}
        onChange={handleSearchChange}
        className="text-black p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default SearchBar;
