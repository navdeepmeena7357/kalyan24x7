import React from 'react';
import { showErrorToast } from '@/utils/toast';
import { useUser } from '@/context/UserContext';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FaKey, FaShareAlt, FaSignOutAlt } from 'react-icons/fa';
import { MdWallet } from 'react-icons/md';
import { IoMdClipboard, IoMdHome } from 'react-icons/io';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { LuIndianRupee } from 'react-icons/lu';
import { BiChart, BiInfoCircle } from 'react-icons/bi';
import { useAppData } from '@/context/AppDataContext';
import { useAuth } from '@/context/AuthContext';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const { user, logoutUser } = useUser();
  const router = useRouter();
  const { logout } = useAuth();
  const appData = useAppData();

  const shareApplication = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I found trusted app Kalyan 777',
          text: 'I found this great matka app that you should try out.',
          url: appData.contactDetails?.app_link,
        });
        console.log('Share successful!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert(
        'Download app from this link : ' + appData.contactDetails?.app_link
      );
    }
  };

  const handleLogout = async () => {
    try {
      logout();
      logoutUser();
      router.replace('/auth/login');
    } catch (err) {
      showErrorToast((err as Error).message);
    } finally {
    }
  };

  return (
    <div
      className={`fixed inset-0 z-20 transition-opacity duration-300 ${
        isOpen ? 'bg-black bg-opacity-50' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-64 h-full absolute left-0 shadow-lg transition-transform duration-300 ${
          isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex ml-4 items-center gap-1 mt-2">
          <FaUserCircle className="w-12 h-12 text-orange-600" />
          <div>
            <h1 className="pl-4 pr-4 mt-2 text-lg text-black font-bold">
              {user?.name}
            </h1>
            <h1 className="pl-4 pr-4 text-md text-orange-600 font-bold">
              {user?.username}
            </h1>
          </div>
        </div>

        <div className="w-full bg-white h-full text-black">
          <ul className="space-y-4 text-gray-600">
            <li className="border-b p-6 border-gray-300 pb-2 flex items-center space-x-3">
              <IoMdHome className="text-gray-700 h-6 w-6" />
              <a
                href="#"
                className="text-[16px] font-semibold hover:text-orange-600"
              >
                Home
              </a>
            </li>

            {user?.isVerified ? (
              <li className="border-b pl-6 pr-6 border-gray-300 pb-2 flex items-center space-x-3">
                <IoMdClipboard className="text-gray-700 h-6 w-6" />
                <a
                  href={'/features/bids'}
                  className="text-[16px] font-semibold hover:text-orange-600"
                >
                  My Bids
                </a>
              </li>
            ) : (
              <div></div>
            )}

            {user?.isVerified ? (
              <li className="border-b border-gray-300 pb-2  pl-6 pr-6 flex items-center space-x-3">
                <MdWallet className="text-gray-700 h-6 w-6" />
                <a
                  href={'/features/funds'}
                  className="text-[16px] font-semibold hover:text-orange-600"
                >
                  Funds
                </a>
              </li>
            ) : (
              <div></div>
            )}

            {user?.isVerified ? (
              <li className="border-b border-gray-300 pb-2  pl-6 pr-6 flex items-center space-x-3">
                <LuIndianRupee className="text-gray-500 h-6 w-6" />
                <a
                  href={'/features/game_rate'}
                  className="text-[16px] font-semibold hover:text-orange-600"
                >
                  Game Rate
                </a>
              </li>
            ) : (
              <div></div>
            )}

            <li className="border-b border-gray-300 pb-2  pl-6 pr-6 flex items-center space-x-3">
              <BiChart className="text-gray-500 h-6 w-6" />
              <a
                href={'/features/chart'}
                className="text-[16px] font-semibold hover:text-orange-600"
              >
                Charts
              </a>
            </li>

            <li className="border-b border-gray-300 pb-2  pl-6 pr-6 flex items-center space-x-3">
              <FaClockRotateLeft className="text-gray-500 h-5 w-5" />
              <a
                href={'/features/time-table'}
                className="text-[16px] font-semibold hover:text-orange-600"
              >
                Time Table
              </a>
            </li>

            {user?.isVerified ? (
              <li className="border-b border-gray-300 pb-2  pl-6 pr-6 flex items-center space-x-3">
                <BiInfoCircle className="text-gray-500 h-6 w-6" />
                <a
                  href={'/features/rules'}
                  className="text-[16px] font-semibold hover:text-orange-600"
                >
                  Notice Board/Rules
                </a>
              </li>
            ) : (
              <div></div>
            )}

            <li className="border-b border-gray-300 pb-2  pl-6 pr-6 flex items-center space-x-3">
              <FaKey className="text-gray-500 h-5 w-5" />
              <a
                href={'/features/password'}
                className="text-[16px] font-semibold hover:text-orange-600"
              >
                Change Password
              </a>
            </li>
            <li
              className="border-b border-gray-300 pb-2 pl-6 pr-6 flex items-center space-x-3"
              onClick={() => shareApplication()}
            >
              <FaShareAlt className="text-gray-500 h-5 w-5" />
              <a
                href="#"
                className="text-[16px] font-semibold hover:text-orange-600"
              >
                Share App
              </a>
            </li>
            <div className="text-center bg-red-50 p-2 items-center justify-items-center">
              <li
                onClick={handleLogout}
                className=" border-gray-300 flex items-center space-x-3 cursor-pointer"
              >
                <FaSignOutAlt className="text-orange-500 h-6 w-6" />
                <a
                  href="#"
                  className="text-[16px] font-semibold hover:text-orange-600"
                >
                  Logout
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
