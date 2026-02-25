import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/api';
import CourseCard from '../components/CourseCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.firstName}!</h1>
        <p>Explore and manage your learning journey</p>
      </div>

      <div className="dashboard-content">
        <h2>Available Courses</h2>
        {courses.length === 0 ? (
          <p className="no-courses">No courses available yet.</p>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onEnroll={() => console.log('Enroll clicked')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
