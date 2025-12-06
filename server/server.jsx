

// import { BucketManager, ObjectManager } from "@filebase/sdk";

// const express = require("express");
// const mysql = require("mysql2");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const s3_key = '679415713CE7280FA331';
// const s3_secret = 'LQPJN8loEex8Mf6RYLmRcSRAljTKXp2o9Y592n4R';
// const ywebs = 'ywebs';

// const app = express();
// app.use(cors());
// app.use(express.json());

// const bucketManager = new BucketManager(s3_key, s3_secret);
// await bucketManager.create(ywebs);

// const objectManager = new ObjectManager(s3_key, s3_secret, {
//     bucket: ywebs
// });

// app.post("/add", (req, res) => { 
//     const { name, college, year, bio, email, projects } = req.body;

//     const fileContent = Buffer.from(req.body);
//     const uploadedObject = away objectManager.upload()

// })

// const fileContent = Buffer.from('hello, Filebase');
// const uploadedObject =  await objectManager.upload('myfile.txt', fileContent);
// console.log('File uploaded:', uploadedObject.cid);




// server.jsx - Backend with Filebase database
// Import the tools we need
const { BucketManager, ObjectManager } = require("@filebase/sdk");  // Filebase SDK to interact with cloud storage
const express = require("express");  // Web server framework
const cors = require("cors");  // Allows frontend to talk to backend from different URLs

// Your Filebase account credentials (like username and password)
const s3_key = '679415713CE7280FA331';
const s3_secret = 'LQPJN8loEex8Mf6RYLmRcSRAljTKXp2o9Y592n4R';
const bucketName = 'ywebs';  // The "folder" name where we'll store our database file

const { Mutex } = require('async-mutex');
const mutex = new Mutex();

// Create the Express web server
const app = express();
app.use(cors());  // Enable CORS so frontend and backend can communicate
app.use(express.json());  // Allow server to understand JSON data in requests

// This variable will hold our connection to Filebase
let objectManager;

// FUNCTION: Connect to Filebase and set up storage
async function initializeFilebase() {
  // BucketManager helps us create/manage "folders" (buckets) in Filebase
  const bucketManager = new BucketManager(s3_key, s3_secret);
  
  try {
    // Try to create a new bucket (like creating a new folder)
    await bucketManager.create(bucketName);
    console.log('✓ Bucket created or already exists');
  } catch (err) {
    if (err.message.includes("BucketAlreadyOwnedByYou") || err.message.includes("BucketAlreadyExists")) {
      console.log("✓ Bucket already exists, using existing bucket");
    } else {
      throw err; // real error → fail loudly
    }
  }
  
  // ObjectManager helps us read/write files inside the bucket
  objectManager = new ObjectManager(s3_key, s3_secret, {
    bucket: bucketName
  });
  
  console.log('✓ Filebase initialized successfully');
}

// FUNCTION: Read all user registrations from the database file on Filebase
async function getAllRegistrations() {
  try {
    // Get the file named "registrations.json" from Filebase
    const file = await objectManager.get('registrations.json');
    
    // Download the file content
    const content = await file.download();
    
    // Convert the file content (text) into a JavaScript array
    try {
      const data = JSON.parse(content.toString());
      console.log(`✓ Loaded ${data.length} registrations from Filebase`);
      return data;
    } catch (parseErr) {
      console.error("✗ JSON parse error — the file is corrupted:", parseErr);
      
      // DO NOT overwrite the file — keep returning an empty array safely
      return [];
    }
    
  // Return the array of registrations
  } catch (err) {
    
    if (err.message.includes("not found") || err.message.includes("NoSuchKey")) {
      console.log("✓ No registrations.json found — creating a new one");
      await saveRegistrations([]);   // Create an empty array file
      return [];
    }

    // Any other Filebase error
    console.error("✗ Error loading registrations:", err);
    return []; 
  }
}

// FUNCTION: Save all registrations back to Filebase
async function saveRegistrations(registrations) {
  // Convert JavaScript array to JSON text format
  // The "null, 2" makes it pretty/readable with indentation
  const fileContent = Buffer.from(JSON.stringify(registrations, null, 2));
  
  // Upload to Filebase (this overwrites the old file)
  await objectManager.upload('registrations.json', fileContent);
  
  console.log(`✓ Saved ${registrations.length} registrations to Filebase`);
}

// API ENDPOINT: Add a new registration
// When frontend sends POST request to /add with form data
app.post("/add", async (req, res) => { 

  const release = await mutex.acquire();

  try {
    // Extract all the fields from the request body (the form data)
    const { name, college, year, bio, email, project1Name, project1Url, project2Name, project2Url } = req.body;
    
    // VALIDATION: Make sure required fields are filled in
    if (!name || !email) {
      return res.status(400).json({ 
        success: false,
        error: "Name and email are required" 
      });
    }
    
    // Get the current list of all registrations from Filebase
    const registrations = await getAllRegistrations();
    if (!registrations) {
      return res.status(500).json({ success: false, error: "Database is corrupted" });
    }
    
    // VALIDATION: Check if this email is already registered
    if (registrations.some(r => r.email === email)) {
      return res.status(400).json({ 
        success: false,
        error: "Email already registered" 
      });
    }
    
    // Build the projects array (only add projects if they have data)
    const projects = [];
    if (project1Name || project1Url) {
      projects.push({ 
        name: project1Name || '',  // Use empty string if name is missing
        url: project1Url || ''     // Use empty string if URL is missing
      });
    }
    if (project2Name || project2Url) {
      projects.push({ 
        name: project2Name || '', 
        url: project2Url || '' 
      });
    }
    
    // Create a new registration object with all the user's info
    const newRegistration = {
      id: Date.now(),  // Unique ID based on current timestamp (milliseconds)
      name,
      college: college || '',  // Use empty string if not provided
      year: year || '',
      bio: bio || '',
      email,
      projects,
      createdAt: new Date().toISOString()  // Record when this was created
    };
    
    // Add the new registration to our array
    registrations.push(newRegistration);
    
    // Save the updated array back to Filebase
    await saveRegistrations(registrations);
    
    console.log(`✓ Added new registration: ${name} (${email})`);
    
    // Send success response back to the frontend
    res.json({ 
      success: true, 
      message: "Registration added successfully",
      registration: newRegistration
    });
  } catch (error) {
    // If anything goes wrong, log the error and tell the frontend
    console.error('✗ Error adding registration:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to add registration" 
    });
  } finally {
    release();
  }
});

// API ENDPOINT: Get all registrations
// When frontend sends GET request to /registrations
app.get("/registrations", async (req, res) => {
  try {
    // Fetch all registrations from Filebase
    const registrations = await getAllRegistrations();
    
    // Send them back to the frontend
    res.json({ 
      success: true, 
      registrations,
      count: registrations.length  // Also send the total count
    });
  } catch (error) {
    console.error('✗ Error getting registrations:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to get registrations" 
    });
  }
});

// API ENDPOINT: Get a single registration by ID
// When frontend sends GET request to /registration/12345
app.get("/registration/:id", async (req, res) => {
  try {
    // Get all registrations
    const registrations = await getAllRegistrations();
    
    // Find the one with matching ID (convert req.params.id from string to number)
    const registration = registrations.find(r => r.id === parseInt(req.params.id));
    
    // If not found, tell the frontend
    if (!registration) {
      return res.status(404).json({ 
        success: false,
        error: "Registration not found" 
      });
    }
    
    // Send the found registration back
    res.json({ 
      success: true, 
      registration 
    });
  } catch (error) {
    console.error('✗ Error getting registration:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to get registration" 
    });
  }
});

// API ENDPOINT: Update an existing registration
// When frontend sends PUT request to /update/12345
app.put("/update/:id", async (req, res) => {

  const release = mutex.acquire();
  try {
    // Get all registrations
    const registrations = await getAllRegistrations();
    
    // Find the index (position in array) of the registration to update
    const index = registrations.findIndex(r => r.id === parseInt(req.params.id));
    
    // If not found, tell the frontend
    if (index === -1) {
      return res.status(404).json({ 
        success: false,
        error: "Registration not found" 
      });
    }
    
    // Separate project fields from other fields
    const { project1Name, project1Url, project2Name, project2Url, ...otherFields } = req.body;
    
    // Rebuild projects array if any project fields were provided
    let projects = registrations[index].projects;  // Keep old projects by default
    if (project1Name !== undefined || project1Url !== undefined || 
        project2Name !== undefined || project2Url !== undefined) {
      projects = [];  // Clear and rebuild
      if (project1Name || project1Url) {
        projects.push({ name: project1Name || '', url: project1Url || '' });
      }
      if (project2Name || project2Url) {
        projects.push({ name: project2Name || '', url: project2Url || '' });
      }
    }
    
    // Update the registration (keeping old values, overwriting with new ones)
    registrations[index] = {
      ...registrations[index],  // Spread operator: keep all old values
      ...otherFields,           // Overwrite with any new values provided
      projects,                 // Update projects
      id: registrations[index].id,  // Never change the ID
      updatedAt: new Date().toISOString()  // Record when it was updated
    };
    
    // Save the updated array back to Filebase
    await saveRegistrations(registrations);
    
    console.log(`✓ Updated registration: ${registrations[index].name}`);
    
    // Send success response
    res.json({ 
      success: true, 
      message: "Registration updated successfully",
      registration: registrations[index]
    });
  } catch (error) {
    console.error('✗ Error updating registration:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to update registration" 
    });
  } finally {
    release();
  }
});

// API ENDPOINT: Delete a registration
// When frontend sends DELETE request to /delete/12345
app.delete("/delete/:id", async (req, res) => {

  const release = mutex.acquire();
  try {
    // Get all registrations
    const registrations = await getAllRegistrations();
    
    // Find the registration to delete
    const registration = registrations.find(r => r.id === parseInt(req.params.id));
    
    // If not found, tell the frontend
    if (!registration) {
      return res.status(404).json({ 
        success: false,
        error: "Registration not found" 
      });
    }
    
    // Create a new array without this registration (filter keeps everything except this ID)
    const filtered = registrations.filter(r => r.id !== parseInt(req.params.id));
    
    // Save the filtered array back to Filebase
    await saveRegistrations(filtered);
    
    console.log(`✓ Deleted registration: ${registration.name}`);
    
    // Send success response
    res.json({ 
      success: true, 
      message: "Registration deleted successfully"
    });
  } catch (error) {
    console.error('✗ Error deleting registration:', error);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete registration" 
    });
  } finally {
    release();
  }
});

// Start the server
const PORT = 3000;  // The port number the server will listen on

console.log('\n🚀 Starting server...\n');

// First initialize Filebase, then start the server
initializeFilebase().then(() => {
  // Once Filebase is ready, start listening for requests
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Filebase bucket: ${bucketName}`);
    console.log(`✓ Ready to accept registrations!\n`);
  });
}).catch(error => {
  // If Filebase connection fails, show error and exit
  console.error('✗ Failed to initialize Filebase:', error);
  process.exit(1);  // Exit with error code
});