import React, { useState } from 'react';
import './tailwind.css';
import SearchContacts from './SearchContacts';

const OutlookClone = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: ''
  });
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [editContactId, setEditContactId] = useState(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: parseInt(formData.id, 10)
        }),
      });
      if (response.ok) {
        setMessage('Contact saved successfully');
        setFormData({
          id: '',
          FirstName: '',
          LastName: '',
          Email: '',
          Phone: ''
        });
        fetchContacts(); // Fetch the updated list of contacts after saving
      } else {
        const errorData = await response.json();
        setMessage(`Failed to save contact: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error: Failed to save contact');
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:4000/contact');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const toggleContacts = async () => {
    if (!showContacts) {
      await fetchContacts();
    }
    setShowContacts(!showContacts);
    setShowSearch(false); // Hide search results when showing all contacts
  };

  const handleEdit = (contact) => {
    if (editContactId === contact._id) {
      setEditContactId(null);
    } else {
      setFormData({
        id: contact.id,
        FirstName: contact.FirstName,
        LastName: contact.LastName,
        Email: contact.Email,
        Phone: contact.Phone
      });
      setEditContactId(contact._id);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/contact/${editContactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Contact updated successfully');
        setEditContactId(null);
        fetchContacts(); // Fetch the updated list of contacts after saving
      } else {
        const errorData = await response.json();
        setMessage(`Failed to update contact: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error: Failed to update contact');
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await fetch(`http://localhost:4000/contact/${contactId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Contact deleted successfully');
        fetchContacts(); // Fetch the updated list of contacts after deletion
      } else {
        const errorData = await response.json();
        setMessage(`Failed to delete contact: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error: Failed to delete contact');
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setShowContacts(false); // Hide all contacts when showing search results
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-200 p-4">
        <button
          onClick={togglePopup}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-700"
        >
          New Contact
        </button>
        <button
          onClick={toggleContacts}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg mb-4 hover:bg-green-700"
        >
          All Contacts
        </button>
        <button
          onClick={handleSearchToggle}
          className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg mb-4 hover:bg-purple-700"
        >
          Search Contacts
        </button>
      </div>
      <div className="w-4/5 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Contacts</h2>
        </div>
        {showContacts && (
          <div className="contacts-list">
            {contacts.length > 0 ? (
              contacts.map(contact => (
                <div key={contact._id} className="bg-gray-200 p-4 mb-4 rounded-lg">
                  {editContactId === contact._id ? (
                    <form className="space-y-4" onSubmit={handleEditSubmit}>
                      <input
                        name="id"
                        placeholder="ID"
                        value={formData.id}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        name="FirstName"
                        placeholder="First name"
                        value={formData.FirstName}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        name="LastName"
                        placeholder="Last name"
                        value={formData.LastName}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        name="Email"
                        placeholder="Email address"
                        value={formData.Email}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        name="Phone"
                        placeholder="Phone number"
                        value={formData.Phone}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditContactId(null)}
                          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p><strong>ID:</strong> {contact.id}</p>
                      <p><strong>First Name:</strong> {contact.FirstName}</p>
                      <p><strong>Last Name:</strong> {contact.LastName}</p>
                      <p><strong>Email:</strong> {contact.Email}</p>
                      <p><strong>Phone:</strong> {contact.Phone}</p>
                      <div className="flex space-x-4 mt-4">
                        <button
                          onClick={() => handleEdit(contact)}
                          className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No contacts available</p>
            )}
          </div>
        )}
        {showSearch && <SearchContacts />}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl mb-4">Add New Contact</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="id"
                placeholder="ID"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="FirstName"
                placeholder="First name"
                value={formData.FirstName}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="LastName"
                placeholder="Last name"
                value={formData.LastName}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="Email"
                placeholder="Email address"
                value={formData.Email}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="Phone"
                placeholder="Phone number"
                value={formData.Phone}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={togglePopup}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
            {message && <p className="mt-4">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutlookClone;
