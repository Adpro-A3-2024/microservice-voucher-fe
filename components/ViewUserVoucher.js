'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

const ViewUserVouchers = () => {
  const [userId, setUserId] = useState('');
  const [vouchers, setVouchers] = useState([]);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(`https://microservice-voucher-hamcgyi6oq-et.a.run.app/api/vouchers/user/${userId}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      setVouchers(response.data);
    } catch (error) {
      toast.error('Error fetching vouchers.');
      console.error('Error fetching vouchers:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Your Vouchers</h2>
      <Link href="/" className="text-blue-500 hover:underline">Back to Home</Link>
      <div className="mt-4 mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="userId">
          User ID
        </label>
        <input
          placeholder="User ID"
          value={userId}
          onChange={handleUserIdChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={fetchVouchers} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Fetch Vouchers
      </button>
      <ul className="mt-4">
        {vouchers.map((voucher) => (
          <li key={voucher.voucherId} className="border-b border-gray-200 py-2">
            {voucher.voucherName} - {voucher.voucherAmount}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUserVouchers;

