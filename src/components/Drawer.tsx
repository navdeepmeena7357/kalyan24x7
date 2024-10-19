// components/Drawer.tsx
import React from 'react';
import { showErrorToast } from '@/utils/toast';
// import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { FaUserCircle } from 'react-icons/fa';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  // const router = useRouter();

  const handleLogout = async () => {
    //  setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const authToken = localStorage.getItem('token');

      if (authToken !== null) {
        localStorage.removeItem('token');
      }

      showErrorToast('Token is missing');
    } catch (err) {
      showErrorToast((err as Error).message);
    } finally {
      // setIsLoading(false);
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
              {user.user?.name}
            </h1>
            <h1 className="pl-4 pr-4 text-md text-orange-600 font-bold">
              {user.user?.username}
            </h1>
          </div>
        </div>

        <ul className="p-4 text-black">
          <li className="py-2">
            <a href="#">Option 1</a>
          </li>
          <li className="py-2">
            <a href="#">Option 2</a>
          </li>
          <li className="py-2">
            <a href="#">Option 3</a>
          </li>
          <li onClick={handleLogout} className="py-2">
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
