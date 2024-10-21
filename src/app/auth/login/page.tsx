'use client';
import React, { useState, useEffect } from 'react';
import ContactOptions from '@/components/ContactOptions';
import { useRouter } from 'next/navigation';
import { login } from '@/app/services/auth';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import LoadingModal from '@/components/LoadingModal';
import { useUser } from '@/context/UserContext';
import { FaPhone } from 'react-icons/fa6';
import { FaLock } from 'react-icons/fa6';

function LoginPage() {
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  });

  const handleNavigate = () => {
    router.push('/auth/register');
  };

  const goHome = () => {
    router.push('/');
  };

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { authenticate } = useAuth();

  const validateInputs = (): boolean => {
    if (!mobileNumber) {
      showErrorToast('Mobile number is required.');
      return false;
    }
    if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
      showErrorToast('Mobile number must be 10 digits.');
      return false;
    }
    if (!password) {
      showErrorToast('Password is required.');
      return false;
    }
    if (password.length < 6) {
      showErrorToast('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      const { token, user } = await login(mobileNumber, password);

      const userData = {
        id: user.id,
        name: user.name,
        username: user.username,
        isVerified: user.is_verified,
        isDepositAllowed: user.is_deposit_allowed,
        isWithdrawAllowed: user.is_withdraw_allowed,
        status: user.status,
      };

      setUser(userData);
      authenticate(token);
      showSuccessToast('Login successful!');
      goHome();
    } catch (err) {
      showErrorToast((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-custom px-5">
      <LoadingModal isOpen={isLoading} />
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex item-center">
        <div className="bg-orange-600 w-2 h-14"></div>
        <h1 className="uppercase text-lg font-bold ml-2 text-orange-600">
          login to existing <br />
          account
        </h1>
      </div>
      <div className="mb-6 mt-6 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-orange-500 rounded-full p-2">
          <FaPhone className="text-white" />
        </div>
        <input
          type="number"
          value={mobileNumber}
          maxLength={10}
          className="border-2 border-gray-300 text-black  rounded-full focus:outline-none focus:ring-0 focus:border-orange-500 block w-full pl-12 p-3.5" // Increased left padding to 12
          placeholder="Enter Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-6 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-orange-500 rounded-full p-2">
          <FaLock className="text-white" />
        </div>
        <input
          type="password"
          value={password}
          className="border-2 border-gray-300 text-black  rounded-full focus:outline-none focus:ring-0 focus:border-orange-500 block w-full pl-12 p-3.5" // Increased left padding to 12
          placeholder="•••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="text-end font-custom   text-sm justify-end items-end w-full p-2">
        Forgot Password?
      </button>
      <button
        onClick={handleLogin}
        className="text-white bg-orange-600 hover:bg-orange-500 items-center focus:ring-0 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-3 uppercase text-center"
      >
        Submit
      </button>

      <button onClick={handleNavigate} className="w-full">
        <div className="w-full flex justify-center items-center text-center mt-2">
          <div className="bg-green-500 w-1/2 text-center p-1 items-center rounded-sm text-white  mt-2">
            Create new Account
          </div>
        </div>
      </button>

      <h1 className="text-center mt-8 text-sm font-semibold">
        For any help Contact us !
      </h1>
      <ContactOptions />
    </div>
  );
}

export default LoginPage;
