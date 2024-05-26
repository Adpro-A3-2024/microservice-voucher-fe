'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const UseVoucher = () => {
  const [userId, setUserId] = useState('');
  const [voucherId, setVoucherId] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/vouchers/use', { userId, voucherId, cartTotal }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = response.data;
      if (data.success) {
        toast.success('Voucher used successfully!');
      } else {
        toast.error(data.message || 'Error using voucher.');
      }
      
      router.push('/');
    } catch (error) {
      toast.error('Error using voucher.');
      console.error('Error using voucher:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Use Voucher</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="userId">
          User ID
        </label>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="voucherId">
          Voucher ID
        </label>
        <input
          placeholder="Voucher ID"
          value={voucherId}
          onChange={(e) => setVoucherId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="cartTotal">
          Cart Total
        </label>
        <input
          placeholder="Cart Total"
          type="number"
          value={cartTotal}
          onChange={(e) => setCartTotal(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Use Voucher
      </button>
    </form>
  );
};

export default UseVoucher;