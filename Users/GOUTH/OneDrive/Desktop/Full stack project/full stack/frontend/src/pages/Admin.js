import React, { useEffect, useState } from 'react';
import { adminService } from '../services/api';
import '../styles/Admin.css';

const Admin = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await adminService.getPlatformStats();
        const usersData = await adminService.getAllUsers();
        setStats(statsData.stats);
        setUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading admin panel...</div>;

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Instructors</h3>
            <p className="stat-value">{stats.instructors}</p>
          </div>
          <div className="stat-card">
            <h3>Students</h3>
            <p className="stat-value">{stats.students}</p>
          </div>
          <div className="stat-card">
            <h3>Total Courses</h3>
            <p className="stat-value">{stats.totalCourses}</p>
          </div>
          <div className="stat-card">
            <h3>Published Courses</h3>
            <p className="stat-value">{stats.publishedCourses}</p>
          </div>
          <div className="stat-card">
            <h3>Enrollments</h3>
            <p className="stat-value">{stats.totalEnrollments}</p>
          </div>
        </div>
      )}

      <div className="users-section">
        <h2>Users Management</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
