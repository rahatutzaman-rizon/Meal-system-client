// DataTables.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const DataTables = () => {
  const [deposits, setDeposits] = useState([]);
  const [bills, setBills] = useState({ currentBill: {}, gasBill: {} });

  useEffect(() => {
    // Fetch deposit data
    axios.get('https://meal-system-server-six.vercel.app/deposit')
      .then(response => setDeposits(response.data))
      .catch(error => console.error('Error fetching deposit data:', error));

    // Fetch bill data
    axios.get('https://meal-system-server-six.vercel.app/bill')
      .then(response => setBills(response.data[0].bills))
      .catch(error => console.error('Error fetching bill data:', error));
  }, []);

  return (
    <div className="p-4 space-y-8">
      {/* Deposit Table */}
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Deposit Data</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deposits.map(deposit => (
              <tr key={deposit._id}>
                <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm font-medium text-gray-900">{deposit.name}</td>
                <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm text-gray-500">{deposit.deposit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bill Table */}
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Bill Data</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Type</th>
              <th className="px-4 py-2 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-2 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-2 md:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm font-medium text-gray-900">Current Bill</td>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm text-gray-500">{bills.currentBill?.amount || 'N/A'}</td>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm text-gray-500">{bills.currentBill?.dueDate || 'N/A'}</td>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm text-gray-500">{bills.currentBill?.pay || 'N/A'}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm font-medium text-gray-900">Gas Bill</td>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm text-gray-500">{bills.gasBill?.amount || 'N/A'}</td>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm text-gray-500">{bills.gasBill?.dueDate || 'N/A'}</td>
              <td className="px-4 py-2 md:px-6 whitespace-nowrap text-sm text-gray-500">{bills.gasBill?.pay || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTables;
