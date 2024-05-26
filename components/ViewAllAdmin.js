'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

const ViewAllVouchers = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('https://microservice-voucher-hamcgyi6oq-et.a.run.app/api/vouchers', {
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

    fetchVouchers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">All Vouchers</h2>
      <Link href="/" className="text-blue-500 hover:underline">Back to Home</Link>
      <ul className="mt-4">
      <table class="table-auto">
          <tr>
            <th>Voucher ID</th>
            <th>VoucherName</th>
            <th>Voucher Amount</th>
            <th>AttachedUser</th>
            <th>Quota</th>
            <th>Number Used</th>
            <th>Required Spend</th>
          </tr>
        {vouchers.map((voucher) => (          
          <tr>
            <td>{voucher.voucherId}</td>
            <td>{voucher.voucherName}</td>
            <td>{voucher.voucherAmount}%</td>
            <td>{voucher.attachedUser}</td>
            <td>{voucher.quota}</td>
            <td>{voucher.used}</td>
            <td>{voucher.requiredSpending}</td>
          </tr>
        
        ))}
        </table>
      </ul>
    </div>
  );
};

export default ViewAllVouchers;



