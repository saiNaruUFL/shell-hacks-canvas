const express = require('express');
const cors = require('cors');
const axios = require('axios');
const studentToken = '1016~Gkgpf5ZYLq6OW13oDzRVkazWyVCnnzGRDwCWw9ykPYMqkQe0RqkaqWOnzKv4HWCb';
// Initialize Express App
const app = express();

// Middleware for handling CORS issues
app.use(cors());

// API endpoint to fetch courses from Canvas
app.get('/courses', async (req, res) => {
  //const studentToken = req.query.studentToken; // Fetching the student token from query parameters
 
  //res.send("hello")
  
  try {
    console.log("we in here")
    const response = await axios.get('https://canvas.instructure.com/api/v1/courses?include[]=syllabus_body', {
      headers: {
        Authorization: `Bearer ${studentToken}`, // Using the student token to authenticate API request
      },
    });
    return res.json(response.data); // Return fetched courses data
  } catch (error) {
    console.error('Error fetching courses:', error); // Log any errors
    return res.status(500).json({ error: 'An error occurred while fetching courses' }); // Return error message
  }
  
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000'); // Console log to indicate server is running
});
