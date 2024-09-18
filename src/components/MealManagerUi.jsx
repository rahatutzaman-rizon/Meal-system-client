// src/components/MealManagerUI.js
import React, { useState } from 'react';
import axios from 'axios';

function MealManagerUI() {
  const [formData, setFormData] = useState({
    date: '',
    person: 'Rizon',
    mealCount: 0,
    totalCost: 0,
    amountPaid: 0,
  });

  const persons = ['Rizon', 'Aziz', 'Masud', 'Moin', 'Roni', 'Imran', 'Tushar'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/meals', formData);
      alert('Meal entry added successfully');
      setFormData({ date: '', person: 'Rizon', mealCount: 0, totalCost: 0, amountPaid: 0 });
    } catch (err) {
      console.error('Error adding meal entry', err);
      alert('Failed to add meal entry');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Meal Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Person:</label>
          <select
            value={formData.person}
            onChange={(e) => setFormData({ ...formData, person: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            {persons.map((person) => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Meal Count:</label>
          <input
            type="number"
            value={formData.mealCount}
            onChange={(e) => setFormData({ ...formData, mealCount: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Total Cost:</label>
          <input
            type="number"
            value={formData.totalCost}
            onChange={(e) => setFormData({ ...formData, totalCost: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Amount Paid:</label>
          <input
            type="number"
            value={formData.amountPaid}
            onChange={(e) => setFormData({ ...formData, amountPaid: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Meal Entry
        </button>
      </form>
    </div>
  );
}

export default MealManagerUI;
