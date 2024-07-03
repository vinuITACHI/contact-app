import React, { useState } from 'react';

const SearchContacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/contact/search?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Failed to search contacts');
      }
    } catch (error) {
      console.error('Error searching contacts:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-lg bg-gray-200 mb-2"
          placeholder="Search by ID, Name, Email, or Phone"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map(contact => (
            <div key={contact._id} className="bg-gray-200 p-4 mb-4 rounded-lg">
              <p><strong>ID:</strong> {contact.id}</p>
              <p><strong>First Name:</strong> {contact.FirstName}</p>
              <p><strong>Last Name:</strong> {contact.LastName}</p>
              <p><strong>Email:</strong> {contact.Email}</p>
              <p><strong>Phone:</strong> {contact.Phone}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchContacts;
