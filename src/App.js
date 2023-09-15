import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Replace with your Node.js API URL and student token
      const response = await axios.get('http://localhost:3000/courses');
      console.log(response.data); 
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Canvas Courses</h1>
      <button onClick={fetchCourses}>
        Fetch Courses
      </button>

      {loading && <p>Loading...</p>}

      <ul>
        {courses.map((course, index) => (
           <li key={index}>
           {course.name}
           <div dangerouslySetInnerHTML={{ __html: course.syllabus_body || 'No syllabus available' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
