'use client';
import React, { useState, useEffect } from 'react';
import ContactOptions from '@/components/ContactOptions';
import { useRouter } from 'next/navigation';
import { login } from '@/app/services/auth';
import { showErrorToast } from '@/utils/toast';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import LoadingModal from '@/components/LoadingModal';
import { useUser } from '@/context/UserContext';
import { FaPhone } from 'react-icons/fa6';
import { FaLock } from 'react-icons/fa6';
import Image from 'next/image';

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
      const { token, user, isError, message } = await login(
        mobileNumber,
        password
      );

      const userData = {
        id: user.id,
        name: user.name,
        username: user.username,
        isVerified: user.is_verified,
        isDepositAllowed: user.is_deposit_allowed,
        isWithdrawAllowed: user.is_withdraw_allowed,
        status: user.status,
      };

      if (isError) {
        showErrorToast(message);
        return;
      }

      if (user.status === 1) {
        showErrorToast('Account Blocked. Please contact Admin!');
        return;
      }

      setUser(userData);
      authenticate(token);
      goHome();
    } catch (err) {
      showErrorToast((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="font-custom px-5 py-4"
      style={{
        background: 'linear-gradient(to right, #e74c3c 0%, #ecf0f1 100%)',
        minHeight: '100vh',
      }}
    >
      <LoadingModal isOpen={isLoading} />
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="flex items-center justify-center">
        <Image
          className="justify-center"
          src="/images/logo.png"
          width={230}
          height={230}
          alt="Login Image"
        />
      </div>

      <div className="text-white mt-2 font-medium">Welcome to Matka 999</div>

      <div className="mb-4 mt-2 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-full p-2">
          <FaPhone className="text-white" />
        </div>
        <input
          type="number"
          value={mobileNumber}
          maxLength={10}
          className="border-2 border-gray-300 text-black  rounded-full focus:outline-none focus:ring-0 focus:border-white-500 block w-full pl-12 p-3.5"
          placeholder="Enter Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-full p-2">
          <FaLock className="text-white" />
        </div>
        <input
          type="password"
          value={password}
          className="border-2 border-gray-300 text-black  rounded-full focus:outline-none focus:ring-0 focus:border-white-500 block w-full pl-12 p-3.5"
          placeholder="•••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="max-w-56 justify-self-center text-white bg-rose-500 hover:bg-rose-500 font-semibold items-center focus:ring-0 focus:outline-none rounded-lg text-sm w-full px-5 py-3 uppercase text-center"
        >
          Login
        </button>
      </div>

      <h1 className="text-center mt-4 text-sm font-semibold">
        For any help or Forgot Password !
      </h1>
      <ContactOptions />
      <button onClick={handleNavigate} className="w-full">
        <div className="w-full flex justify-center items-center text-center mt-2">
          <div className="bg-green-500 w-1/2 text-center p-2 items-center rounded-md text-white  mt-2">
            Create new Account
          </div>
        </div>
      </button>
    </div>
  );
}

export default LoginPage;
