import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Voucher Management System</h1>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Operations</h2>
        <ul className="mb-8">
          <li className="mb-2">
            <Link href="/create" className="text-blue-500 hover:underline">Create Voucher</Link>
          </li>
          <li className="mb-2">
            <Link href="/update" className="text-blue-500 hover:underline">Update Voucher</Link>
          </li>
          <li className="mb-2">
            <Link href="/delete" className="text-blue-500 hover:underline">Delete Voucher</Link>
          </li>
          <li className="mb-2">
            <Link href="/attach" className="text-blue-500 hover:underline">Attach Voucher to User</Link>
          </li>
          <li className="mb-2">
            <Link href="/view-all" className="text-blue-500 hover:underline">View All Vouchers</Link>
          </li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">User Operations</h2>
        <ul>
          <li className="mb-2">
            <Link href="/use" className="text-blue-500 hover:underline">Use Voucher</Link>
          </li>
          <li className="mb-2">
            <Link href="/uservoucher" className="text-blue-500 hover:underline">View Your Vouchers</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;


