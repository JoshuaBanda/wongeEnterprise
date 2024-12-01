import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinning'
import { color } from 'framer-motion';

const UploadItems = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [items, setItems] = useState([]);
  const [typeOfProduct, setTypeOfProduct] = useState('');
  const [price, setPrice] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleFileChange = (event) => setFile(event.target.files[0]);
  const handleTypeChange = (event) => setTypeOfProduct(event.target.value);
  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) setPrice(value);
  };
  const handleWhatsappMessageChange = (event) => setWhatsappMessage(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage('');

    if (!file) return setSubmitError('Please upload a photo.');
    if (!price || Number(price) <= 0) return setSubmitError('Please enter a valid price.');
    if (!['Avon product', 'Jewelry'].includes(typeOfProduct)) {
      return setSubmitError('Please select a valid product type (Avon product or Jewelry).');
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('type', typeOfProduct);
    formData.append('price', price);
    formData.append('whatsappMessage', whatsappMessage);

    try {
      await axios.post('https://wongebackend.onrender.com/shops/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Item uploaded successfully!');
      resetForm();
    } catch (error) {
      setSubmitError('Failed to upload item. Please try again.');
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setFile(null);
    setTypeOfProduct('');
    setPrice('');
    setWhatsappMessage('');
  };



  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Upload New Item</h2>
        {successMessage && <p style={successStyle}>{successMessage}</p>}
        {submitError && <p style={errorStyle}>Error: {submitError}</p>}
        <div style={formGroupStyle}>
          <label htmlFor="name" style={labelStyle}>Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="description" style={labelStyle}>Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="photo" style={labelStyle}>Upload Photo:</label>
          <input type="file" id="photo" onChange={handleFileChange} style={fileInputStyle} required />
          {uploading && <div style={statusStyle}>Uploading...
          <Spinner/></div>}
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="price" style={labelStyle}>Price:</label>
          <input type="text" id="price" value={price} onChange={handlePriceChange} placeholder="Enter price" style={inputStyle} required />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="whatsappMessage" style={labelStyle}>Whatsapp Message:</label>
          <input type="text" id="whatsappMessage" value={whatsappMessage} onChange={handleWhatsappMessageChange} placeholder="Enter Whatsapp message" style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="type" style={labelStyle}>Type:</label>
          <select id="type" name="type" value={typeOfProduct} onChange={handleTypeChange}         style={{
          width: '100%', // Full width
          padding: '10px', // Padding inside
          border: '1px solid #ccc', // Border
          borderRadius: '4px', // Rounded corners
          fontSize: '16px', // Font size
          backgroundColor: '#fff', // Background color
          appearance: 'none', // Remove default arrow
        }} required>
            <option value="">Select a product type</option>
            <option value="Avon">Lotion</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Perfume">Perfume</option>
          </select>
        </div>
        <button type="submit" disabled={uploading} style={submitButtonStyle}>
          {uploading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '5px',
  marginTop: "80px",
  color:'#666'
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.4)',
};

const headingStyle = {
  textAlign: 'center',
  color: 'rgba(0,0,139)',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  backgroundColor:'white',
};

const fileInputStyle = {
  padding: '10px',
};

const submitButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
  fontSize: '16px',
  marginTop: '10px',
  transition: 'background-color 0.3s',
};

const statusStyle = {
  color: 'blue',
};

const errorStyle = {
  color: 'red',
};

const successStyle = {
  color: 'green',
};

export default UploadItems;
