// src/pages/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/UserProfile.css';

function UserProfile() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    yearJoined: '',
    birthdate: '',
    profilePicture: null,
  });

  useEffect(() => {
    // Fetch existing profile data
    axios.get('http://localhost:5000/api/user/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setFormData(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    axios.put('http://localhost:5000/api/user/profile', data, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => alert('Profile updated successfully'))
    .catch(err => alert('Error updating profile'));
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role/Position" required />
          <input type="number" name="yearJoined" value={formData.yearJoined} onChange={handleChange} placeholder="Year Joined" required />
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
          <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" />
          <button type="submit" className="primary-btn">Save Profile</button>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
