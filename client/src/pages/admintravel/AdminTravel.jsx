import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./admintravel.css";
import ProfileNavigate from '../../components/ProfileNavigate';
import axios from 'axios';

const AdminTravel = () => {
  const initialState = {
    companyName: "",
    address: "",
    web: "",
    registrationNo: "",
    licenseNo: "",
    validityStatusOfLicense: "",
    district: "",
    telephone: "",
    selectedImage: null,
  };

  const [formData, setFormData] = useState(initialState);

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
    "All Island"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      selectedImage: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "companyName") {
      // Validate company name to allow only letters and spaces
      const validCompanyName = /^[A-Za-z\s]*$/;
      if (validCompanyName.test(value) || value === "") {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateTelephone = (telephone) => {
    const telephoneRegex = /^[0-9]{10}$/;
    return telephoneRegex.test(telephone);
  };

  const validateDistrict = (district) => {
    const inputDistricts = district.toLowerCase().split(',').map(d => d.trim());
    const validDistricts = districts.map(d => d.toLowerCase());
    if (inputDistricts.includes("all island") && inputDistricts.length > 1) return false;
    return inputDistricts.every(d => validDistricts.includes(d));
  };

  const validateWeb = (web) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(web);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (!formData.companyName) {
      toast.error("Company Name is required");
      hasErrors = true;
    } else if (!/^[A-Za-z\s]+$/.test(formData.companyName)) {
      toast.error("Company Name must only contain letters and spaces");
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

    if (!formData.licenseNo) {
      toast.error("License No is required");
      hasErrors = true;
    }

    if (!formData.validityStatusOfLicense) {
      toast.error("Validity Status of License is required");
      hasErrors = true;
    }

    if (!formData.district) {
      toast.error("District is required");
      hasErrors = true;
    } else if (!validateDistrict(formData.district)) {
      toast.error("Invalid district selection");
      hasErrors = true;
    }

    if (!formData.telephone) {
      toast.error("Telephone is required");
      hasErrors = true;
    } else if (!validateTelephone(formData.telephone)) {
      toast.error("Telephone must be exactly 10 digits");
      hasErrors = true;
    }

    if (formData.web && !validateWeb(formData.web)) {
      toast.error("Invalid web URL");
      hasErrors = true;
    }

    if (!hasErrors) {
      // If no validation errors, proceed with form submission
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      try {
        const response = await axios.post('http://localhost:8070/api/travelagent', data);
        toast.success("Form submitted successfully!");
        setFormData(initialState); // Clear form on successful submission
      } catch (error) {
        toast.error("Error submitting form");
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
  };

  return (
    <>
      <ProfileNavigate />
      <div className="admin-tour-container">
        <ToastContainer />
        <h2 className='agent'><b>Tour Guide Insert Data :-</b></h2>
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
                <label htmlFor="companyName">Company Name:</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
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
                <label htmlFor="web">Web:</label>
                <input
                  type="text"
                  id="web"
                  name="web"
                  value={formData.web}
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
                <label htmlFor="licenseNo">License No:</label>
                <input
                  type="text"
                  id="licenseNo"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label htmlFor="validityStatusOfLicense">Validity Status of License:</label>
                <input
                  type="text"
                  id="validityStatusOfLicense"
                  name="validityStatusOfLicense"
                  value={formData.validityStatusOfLicense}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label htmlFor="district">District:</label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
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
                  maxLength="10"
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
    </>
  );
};

export default AdminTravel;
