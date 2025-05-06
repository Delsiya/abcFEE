import React, { useState } from 'react';

function RegisterDonar() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    homeAddress: '',
    latitude: '',
    longitude: '',
    medicalCondition: '',
    lastMedicalDetails: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:8081/api/bookings/create';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Booking submission failed');
      }

      const data = await response.json();
      console.log('Booking successful:', data);

      setSuccessMessage('Booking successful!');
      setErrorMessage('');

      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        bloodGroup: '',
        homeAddress: '',
        latitude: '',
        longitude: '',
        medicalCondition: '',
        lastMedicalDetails: '',
      });
    } catch (error) {
      setErrorMessage('Error submitting booking: ' + error.message);
      setSuccessMessage('');
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <section id="booking-form">
      <div className="container">
        <h2>Booking Form</h2>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Blood Group:
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            />
          </label>
          <label>
            Home Address:
            <textarea
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </label>
          <label>
            Latitude:
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </label>
          <label>
            Medical Condition:
            <textarea
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </label>
          <label>
            Last Medical Details:
            <textarea
              name="lastMedicalDetails"
              value={formData.lastMedicalDetails}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default RegisterDonar;
