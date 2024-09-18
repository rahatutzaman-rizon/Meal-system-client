// src/components/NormalUserUI.js
import  { useEffect, useState } from 'react';
import axios from 'axios';

function NormalUserUI() {
  const [mealData, setMealData] = useState([]);
  const [dates, setDates] = useState([]);
  const [persons, setPersons] = useState([]);
  const [totalMealCounts, setTotalMealCounts] = useState({});
  const [totalCosts, setTotalCosts] = useState({});
  const [totalPayments, setTotalPayments] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/meals');
        const { mealData, totalMealCounts, totalCosts, totalPayments, dates, persons } = response.data;
        setMealData(mealData);
        setTotalMealCounts(totalMealCounts);
        setTotalCosts(totalCosts);
        setTotalPayments(totalPayments);
        setDates(dates);
        setPersons(persons);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Meal Schedule</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Date</th>
              {persons.map((person) => (
                <th key={person} className="p-4">{person}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-4">{date}</td>
                {persons.map((person, i) => (
                  <td key={i} className="p-4 text-center">
                    {mealData.filter(m => m.date === date && m.person === person).map(m => m.mealCount) || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Calculations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {persons.map((person) => (
          <div key={person} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">{person}</h3>
            <p>Total Meals: {totalMealCounts[person]}</p>
            <p>Total Cost: ${totalCosts[person]?.toFixed(2)}</p>
            <p>Total Paid: ${totalPayments[person]?.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NormalUserUI;
