import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { MdSave, MdCancel, MdAttachMoney } from 'react-icons/md';
import DataTables from './Datatables';

export default function App2() {
  const [mealData, setMealData] = useState({ names: [], dates: [], meals: [] });
  const [totalData, setTotalData] = useState([]);
  const [bazarData, setBazarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalMealCost, setTotalMealCost] = useState(0);
  const [mealRate, setMealRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [mealRes, totalRes, bazarRes] = await Promise.all([
          axios.get('https://meal-system-server-six.vercel.app/meals'),
          axios.get('https://meal-system-server-six.vercel.app/totals'),
          axios.get('https://meal-system-server-six.vercel.app/bazars')
        ]);

        setMealData(mealRes.data);
        setTotalData(totalRes.data);
        setBazarData(bazarRes.data);

        const totalCost = bazarRes.data.reduce((sum, item) => sum + item.cost, 0);
        setTotalMealCost(totalCost);

        const totalMeals = totalRes.data.reduce((sum, person) => sum + person.totalMeal, 0);

        if (totalMeals > 0) {
          setMealRate(totalCost / totalMeals);
        }
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div className="flex items-center justify-center h-screen text-2xl font-bold text-indigo-600">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-2xl font-bold text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg">
          Meal Management System
        </h1>

        {/* Summary Section */}
        <div className="mb-12 p-6 bg-white bg-opacity-90 rounded-2xl shadow-2xl border-4 border-yellow-300 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center">
            <MdAttachMoney className="text-yellow-500 mr-3 text-4xl" /> Summary
          </h2>
          <p className="text-xl text-gray-700">Total Meal Cost: <span className="font-bold text-green-600">৳{totalMealCost.toFixed(2)}</span></p>
          <p className="text-xl text-gray-700">Meal Rate: <span className="font-bold text-blue-600">৳{mealRate.toFixed(2)} per meal</span></p>
        </div>

        {/* Meal Table */}
        <div className="mb-12 overflow-x-auto bg-white bg-opacity-90 shadow-2xl rounded-2xl p-6 border-4 border-green-300">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center">
            <FaCalendarAlt className="text-green-500 mr-3 text-3xl" /> Meal Table (15th - 30th September 2024)
          </h2>
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 sticky left-0">Date</th>
                {mealData.names.map((name, idx) => (
                  <th className="px-6 py-3" key={idx}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mealData.dates.map((date, dateIndex) => (
                <tr key={dateIndex} className="border-b hover:bg-gray-100 transition-colors duration-200">
                  <td className="border px-6 py-3 sticky left-0 bg-gray-50 font-medium">{date}</td>
                  {mealData.names.map((_, personIndex) => (
                    <td className="border px-6 py-3" key={personIndex}>
                      {mealData.meals[personIndex][dateIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Table */}
        <div className="mb-12 overflow-x-auto bg-white bg-opacity-90 shadow-2xl rounded-2xl p-6 border-4 border-blue-300">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center">
            <MdAttachMoney className="text-blue-500 mr-3 text-3xl" /> Total Table
          </h2>
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Total Meals</th>
                <th className="px-6 py-3">Given Money</th>
                <th className="px-6 py-3">Payable</th>
              </tr>
            </thead>
            <tbody>
              {totalData.map((person, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100 transition-colors duration-200">
                  <td className="border px-6 py-3">{person.name}</td>
                  <td className="border px-6 py-3">{person.totalMeal}</td>
                  <td className="border px-6 py-3">{person.givenMoney}</td>
                  <td className="border px-6 py-3 font-bold text-indigo-700">{person.payable.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bazar Table */}
        <div className="mb-12 overflow-x-auto bg-white bg-opacity-90 shadow-2xl rounded-2xl p-6 border-4 border-red-300">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center">
            <MdAttachMoney className="text-red-500 mr-3 text-3xl" /> Bazar Table
          </h2>
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-red-400 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Cost</th>
                <th className="px-6 py-3">Responsible</th>
              </tr>
            </thead>
            <tbody>
              {bazarData.map((bazar, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100 transition-colors duration-200">
                  <td className="border px-6 py-3">{bazar.date}</td>
                  <td className="border px-6 py-3 text-blue-600 font-medium">৳{bazar.cost}</td>
                  <td className="border px-6 py-3">{bazar.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DataTables Component */}
        <DataTables />
      </div>
    </div>
  );
}