'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const DeleteVoucher = () => {
  const [voucherId, setVoucherId] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8080/api/vouchers/${voucherId}`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      toast.success('Voucher deleted successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Error deleting voucher.');
      console.error('Error deleting voucher:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Delete Voucher</h2>
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
      <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-700">
        Delete Voucher
      </button>
    </form>
  );
};

export default DeleteVoucher;
