// Importing necessary libraries and hooks
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// Importing the context
import { Context } from "../../main";

// Application component
const Application = () => {
  // State variables for the form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  // Getting the user and authorization status from the context
  const { isAuthorized, user } = useContext(Context);

  // Hook to navigate to different routes
  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  // Getting the job id from the URL parameters
  const { id } = useParams();

  // Function to handle form submission
  const handleApplication = async (e) => {
    e.preventDefault();

    // Creating a FormData object to hold the form values
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      // Making a POST request to the server with the form data
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Resetting the form fields after successful submission
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");

      // Displaying a success toast message
      toast.success(data.message);

      // Navigating to the jobs page
      navigateTo("/job/getall");
    } catch (error) {
      // Displaying an error toast message if the request fails
      toast.error(error.response.data.message);
    }
  };

  // Redirecting unauthorized users or employers to the home page
  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  // CSS styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  const labelStyle = {
    textAlign: "start",
    display: "block",
    fontSize: "20px",
  };

  const fileInputStyle = {
    width: "100%",
  };

  const buttonStyle = {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  };

  // Rendering the application form
  return (
    <section className="application">
      <div className="container" style={containerStyle}>
        <h3>Application Form</h3>
        {/* Form Section */}
        <form onSubmit={handleApplication} style={formStyle}>
          {/* Personal Information Section */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />

          {/* Cover Letter Section */}
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            style={inputStyle}
          />

          {/* Resume Section */}
          <div>
            <label style={labelStyle}>Select Resume</label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={fileInputStyle}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={buttonStyle}>
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

// Exporting the Application component
export default Application;
