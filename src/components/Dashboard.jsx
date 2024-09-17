import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchDashboardContent = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContent(response.data);
      } catch (err) {
        setContent('Access denied');
      }
    };

    fetchDashboardContent();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>{content}</p>
    </div>
  );
};

export default Dashboard;
