// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./requesttour.css";

const RequestTour = () => {
  const initialState = {
    name: "",
    category: "",
    languages: "",
    telephone: "",
    address: "",
    registrationNo: "",
    email: "",
    validityStatus: "",
    selectedImage: null,
  };

  const [formData, setFormData] = useState(initialState);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      selectedImage: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z.]+$/;
    return nameRegex.test(name);
  };

  const validateTelephone = (telephone) => {
    const telephoneRegex = /^[0-9]+$/;
    return telephoneRegex.test(telephone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9]+(?:[-_.][a-z0-9]+)*@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (!formData.name) {
      toast.error("Name is required");
      hasErrors = true;
    } else if (!validateName(formData.name)) {
      toast.error("Name can only contain letters and dots");
      hasErrors = true;
    }

    if (!formData.category) {
      toast.error("Category is required");
      hasErrors = true;
    }

    if (!formData.telephone) {
      toast.error("Telephone is required");
      hasErrors = true;
    } else if (!validateTelephone(formData.telephone)) {
      toast.error("Telephone can only contain numbers");
      hasErrors = true;
    }

    if (!formData.address) {
      toast.error("Address is required");
      hasErrors = true;
    }

    if (!formData.registrationNo) {
      toast.error("Registration No is required");
      hasErrors = true;
    }

    if (!formData.email) {
      toast.error("Email is required");
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      toast.error("Email is not valid");
      hasErrors = true;
    }

    if (!formData.validityStatus) {
      toast.error("Validity status of licence is required");
      hasErrors = true;
    }

    if (!hasErrors) {
      // If no validation errors, proceed with form submission
      console.log(
        "Form submitted with:",
        formData.name,
        formData.category,
        formData.languages,
        formData.telephone,
        formData.address,
        formData.registrationNo,
        formData.email,
        formData.validityStatus
      );
      setFormData(initialState); // Clear form on successful submission
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
  };

  return (
    <div className="request-tour-container">
      <ToastContainer />
      <h2 className='agent'><b>Tour Guide Request Data :-</b></h2>
      <div className="form-container">
        <div className="left-column">
          <div className="image-upload">
            <label htmlFor="image-upload" className="image-upload-label">
              Insert Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload-input"
            />
            {formData.selectedImage && (
              <img
                src={URL.createObjectURL(formData.selectedImage)}
                alt="Selected Image"
                className="selected-image"
              />
            )}
          </div>
        </div>
        <div className="right-column">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="languages">Languages:</label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="telephone">Telephone:</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="registrationNo">Registration No:</label>
              <input
                type="text"
                id="registrationNo"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-row">
              <label htmlFor="validityStatus">
                Validity status of licence:
              </label>
              <input
                type="text"
                id="validityStatus"
                name="validityStatus"
                value={formData.validityStatus}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="button-container">
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestTour;
