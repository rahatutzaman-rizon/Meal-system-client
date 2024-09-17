import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchAdminDashboardContent = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContent(response.data);
      } catch (err) {
        setContent('Access denied');
      }
    };

    fetchAdminDashboardContent();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>{content}</p>
    </div>
  );
};

export default AdminDashboard;
