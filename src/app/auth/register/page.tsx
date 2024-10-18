'use client'; // Marking this component as a Client Component

import React from 'react';

import ContactOptions from '../components/ContactOptions';
import { useRouter } from 'next/navigation';

function RegisterPage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.replace('/auth/login');
  };
  return (
    <div className="font-custom px-5">
      <div className="flex item-center">
        <div className="bg-orange-600 w-2 h-14"></div>
        <h1 className="uppercase text-lg font-bold ml-2 text-orange-600">
          Create a new <br />
          account
        </h1>
      </div>

      <form>
        <div className="grid gap-6 md:grid-cols-2 mt-6"></div>
        <div className="mb-6">
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300  text-black text-sm rounded-lg focus:border-orange-500 block w-full p-2.5"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="number"
            id="mobile_number"
            className="bg-gray-50 border border-gray-300  text-black text-sm rounded-lg focus:border-orange-500 block w-full p-2.5"
            placeholder="Enter Mobile Number"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-orange-600 hover:bg-orange-500 items-center focus:ring-0 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-3 uppercase text-center"
        >
          Submit
        </button>
      </form>

      <div className="w-full flex justify-center items-center text-center mt-2">
        <ContactOptions />
      </div>

      <button onClick={handleNavigate} className="w-full">
        <div className="w-full flex justify-center items-center text-center mt-2">
          <div className="bg-green-500 w-1/2 text-center p-1 items-center rounded-sm text-white  mt-2">
            Already Registered ? Login
          </div>
        </div>
      </button>
    </div>
  );
}

export default RegisterPage;
