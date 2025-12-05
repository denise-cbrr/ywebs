
// import React, { useState } from 'react';
// import axios from 'axios';
// import "./register.css";

// function register() {

//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [year, setYear] = useState('');
//     const [college, setCollege] = useState('');
//     const [bio, setBio] = useState('');
//     const [project1, setProject1] = useState('');
//     const [project2, setProject2] = useState('');


//     function handleSubmit(event) {
//         event.preventDefault();

//         axios.post("http://localhost:8080/login", {
//             email: email,
//             password: password
//         })
//         .then(res => {
//             console.log(res.data);

//             if (res.data.role === "developer") {
//                 alert("Developer register successful");
//             } else {
//                 alert("Client register successful");
//             }
//         })
//         .catch(err => {
//             alert("Register failed");
//         });
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name</label>
//                     <input 
//                         type="name" 
//                         onChange={e => setName(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input 
//                         type="email"
//                         onChange={e => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Year</label>
//                     <input 
//                         type="year"
//                         onChange={e => setYear(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>College</label>
//                     <input 
//                         type="college"
//                         onChange={e => setCollege(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Bio</label>
//                     <input 
//                         type="bio"
//                         onChange={e => setBio(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Project 1</label>
//                     <input 
//                         type="project1"
//                         onChange={e => setProject1(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Project 2</label>
//                     <input 
//                         type="project2"
//                         onChange={e => setProject2(e.target.value)}
//                     />
//                 </div>

//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// }
// export default register;

// Import React's useState hook to manage component state (data that can change)
import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Registration</h1>
          
          <div className="space-y-4">
            {/* NAME INPUT - Required field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"  // This matches the key in formData
                value={formData.name}  // Display current value from state
                onChange={handleChange}  // Call handleChange when user types
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* EMAIL INPUT - Required field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"  // Browser validates it's a proper email format
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* COLLEGE INPUT - Optional field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* YEAR INPUT - Optional field, free text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., Sophomore, 2nd year, etc."  // Gray text shown when empty
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BIO INPUT - Optional field, multi-line text area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"  // Show 4 rows of text
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PROJECT 1 SECTION */}
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Project 1</h2>
              <div className="space-y-3">
                {/* Project 1 Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="project1Name"
                    value={formData.project1Name}
                    onChange={handleChange}
                    placeholder="e.g., My Portfolio Website"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Project 1 URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project URL
                  </label>
                  <input
                    type="url"  // Browser validates it's a proper URL format
                    name="project1Url"
                    value={formData.project1Url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* PROJECT 2 SECTION */}
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Project 2</h2>
              <div className="space-y-3">
                {/* Project 2 Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="project2Name"
                    value={formData.project2Name}
                    onChange={handleChange}
                    placeholder="e.g., Mobile App"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Project 2 URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project URL
                  </label>
                  <input
                    type="url"
                    name="project2Url"
                    value={formData.project2Url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}  // Call handleSubmit when clicked
              disabled={loading || !formData.name || !formData.email}  // Disable if loading or required fields empty
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
            >
              {/* Show different text based on loading state */}
              {loading ? 'Submitting...' : 'Register'}
            </button>

            {/* SUCCESS/ERROR MESSAGE - Only shown if message exists */}
            {message && (
              <div className={`p-4 rounded-lg ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}