'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CreateVoucher = () => {
  const [voucher, setVoucher] = useState({
    voucherName: '',
    voucherAmount: 0,
    termsCondition: '',
    quota: 0,
    requiredSpending: 0,
    startDate: '',
    endDate: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/vouchers', voucher, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      toast.success('Voucher created successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Error creating voucher.');
      console.error('Error creating voucher:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Create Voucher</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="voucherName">
          Voucher Name
        </label>
        <input
          name="voucherName"
          placeholder="Voucher Name"
          value={voucher.voucherName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="voucherAmount">
          Voucher Amount
        </label>
        <input
          name="voucherAmount"
          placeholder="Voucher Amount"
          type="number"
          value={voucher.voucherAmount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="termsCondition">
          Terms Condition
        </label>
        <input
          name="termsCondition"
          placeholder="Terms Condition"
          value={voucher.termsCondition}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="quota">
          Quota
        </label>
        <input
          name="quota"
          placeholder="Quota"
          type="number"
          value={voucher.quota}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="requiredSpending">
          Required Spending
        </label>
        <input
          name="requiredSpending"
          placeholder="Required Spending"
          type="number"
          value={voucher.requiredSpending}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="startDate">
          Start Date
        </label>
        <input
          name="startDate"
          placeholder="Start Date"
          type="date"
          value={voucher.startDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="endDate">
          End Date
        </label>
        <input
          name="endDate"
          placeholder="End Date"
          type="date"
          value={voucher.endDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Create Voucher
      </button>
    </form>
  );
};

export default CreateVoucher;


