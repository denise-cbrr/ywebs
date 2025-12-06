// Import React's useState hook to manage component state (data that can change)
import { useState } from 'react';
import './register.css';

export default function Register() {
  // STATE: Store all form field values in one object
  // This keeps track of what the user types in each input field
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    year: '',
    bio: '',
    email: '',
    project1Name: '',
    project1Url: '',
    project2Name: '',
    project2Url: ''
  });

  // STATE: Store success/error messages to show the user
  const [message, setMessage] = useState('');

  // STATE: Track if we're currently submitting (to disable button and show loading text)
  const [loading, setLoading] = useState(false);

  // FUNCTION: Handle when user types in any input field
  const handleChange = (e) => {
    setFormData({
      ...formData,  // Keep all existing values
      [e.target.name]: e.target.value  // Update only the field that changed
      // e.target.name gets the "name" attribute of the input (like "email", "bio")
      // e.target.value gets what the user typed
    });
  };

  // FUNCTION: Handle form submission
  const handleSubmit = async () => {
    setLoading(true);  // Show loading state (button shows "Submitting...")
    setMessage('');    // Clear any previous messages

    // Prepare data to send to backend
    // Backend expects project1Name/project1Url, not a projects array
    const dataToSend = {
      name: formData.name,
      college: formData.college,
      year: formData.year,
      bio: formData.bio,
      email: formData.email,
      project1Name: formData.project1Name,
      project1Url: formData.project1Url,
      project2Name: formData.project2Name,
      project2Url: formData.project2Url
    };

    try {
      // Send POST request to backend with the form data
      const response = await fetch('http://localhost:3000/add', {
        method: 'POST',  // POST = sending data to create something new
        headers: {
          'Content-Type': 'application/json'  // Tell backend we're sending JSON
        },
        body: JSON.stringify(dataToSend)  // Convert JavaScript object to JSON text
      });

      // Get the response from the backend
      const data = await response.json();

      // Check if registration was successful
      if (data.success) {
        // Show success message
        setMessage('Registration successful!');

        // Clear the form (reset all fields to empty strings)
        setFormData({
          name: '',
          college: '',
          year: '',
          bio: '',
          email: '',
          project1Name: '',
          project1Url: '',
          project2Name: '',
          project2Url: ''
        });
      } else {
        // Show error message from backend
        setMessage('Error: ' + (data.error || 'Registration failed'));
      }
    } catch (error) {
      // If request fails completely (server not running, network error, etc.)
      setMessage('Error: Could not connect to server');
      console.error('Error:', error);
    } finally {
      // Always run this at the end, whether success or error
      setLoading(false);  // Stop showing loading state
    }
  };

  // RENDER: The JSX (HTML-like code) that displays the form
  return (
    <div id="registration" className="registration">
      <div className="registration-box">

        {/* Page Title */}
        <h1 className="reg-title">Want to join our team?</h1>

        <div className="form-cont">
          {/* NAME INPUT - Required field */}
          <div className='req-field'>
            <label className="field-title">
              Name*:
            </label>
            <input
              type="text"
              name="name"  // This matches the key in formData
              value={formData.name}  // Display current value from state
              onChange={handleChange}  // Call handleChange when user types
              className="input-normal"
              placeholder='First Last'
            />
          </div>

          {/* EMAIL INPUT - Required field */}
          <div className='req-field'>
            <label className="field-title">
              Email*:
            </label>
            <input
              type="email"  // Browser validates it's a proper email format
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="first.last@yale.edu"
              className="input-normal"
            />
          </div>

          {/* COLLEGE INPUT - Optional field */}
          <div className='req-field'>
            <label className="field-title">
              College:
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="input-normal"
              placeholder="What's the best residential college?"
            />
          </div>

          {/* YEAR INPUT - Optional field, free text */}
          <div className='req-field'>
            <label className="field-title">
              Class:
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g. 2028, 2029, etc."  // Gray text shown when empty
              className="input-normal"
            />
          </div>

          {/* BIO INPUT - Optional field, multi-line text area */}
          <div className='req-field'>
            <label className="field-title">
              Bio:
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"  // Show 4 rows of text
              className="input-resize"
              placeholder='Tell us about yourself!'
            />
          </div>

          {/* PROJECT 1 SECTION */}
          <div className="proj-container">
            <h2 className="proj-title">Project 1</h2>
            {/* Project 1 Name */}
            <div className='req-field'>
              <label className="field-title">
                Title:
              </label>
              <input
                type="text"
                name="project1Name"
                value={formData.project1Name}
                onChange={handleChange}
                placeholder="e.g. My Portfolio Website"
                className="input-normal"
              />
            </div>

            {/* Project 1 URL */}
            <div className='req-field'>
              <label className="field-title">
                URL:
              </label>
              <input
                type="url"  // Browser validates it's a proper URL format
                name="project1Url"
                value={formData.project1Url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="input-normal"
              />
            </div>
          </div>

          {/* PROJECT 2 SECTION */}
          <div className="proj-container">
            <h2 className="proj-title">Project 2</h2>
            {/* Project 2 Name */}
            <div className='req-field'>
              <label className="field-title">
                Title:
              </label>
              <input
                type="text"
                name="project2Name"
                value={formData.project2Name}
                onChange={handleChange}
                placeholder="e.g. Mobile App"
                className="input-normal"
              />
            </div>

            {/* Project 2 URL */}
            <div className='req-field'>
              <label className="field-title">
                URL:
              </label>
              <input
                type="url"
                name="project2Url"
                value={formData.project2Url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="input-normal"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
        </div>

        <div className="submit-cont">
            <button
              onClick={handleSubmit}  // Call handleSubmit when clicked
              disabled={loading || !formData.name || !formData.email}  // Disable if loading or required fields empty
              className="reg-btn"
            >
              {/* Show different text based on loading state */}
              {loading ? 'Submitting...' : "I'm ready to build!"}
            </button>
          </div>

          {/* SUCCESS/ERROR MESSAGE - Only shown if message exists */}
          {message && (
            <div className={`message-box ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
      </div>

    </div>

  );
}