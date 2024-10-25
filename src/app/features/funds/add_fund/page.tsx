'use client';
import AlertModal from '@/components/AlertModal';
import Card from '@/components/Card';
import ContactOptions from '@/components/ContactOptions';
import TitleBar from '@/components/TitleBar';
import UserCard from '@/components/UserWalletCard';
import { useUser } from '@/context/UserContext';
import { useWallet } from '@/context/WalletContext';
import { useState } from 'react';
import { BiRupee } from 'react-icons/bi';

const AddFundPage = () => {
  const user = useUser();
  const points = useWallet();
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleOpenModal = (message: string) => {
    setAlertMessage(message);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const payeeAddress = 'example@upi'; // Your UPI ID
  const payeeName = 'Your Name';
  const transactionId = 'TID123456789'; // Unique transaction ID
  const amount = '10.00'; // Amount in INR
  const currency = 'INR'; // Currency code

  const openUpiIntent = () => {
    const upiLink = `upi://pay?pa=${payeeAddress}&pn=${payeeName}&tid=${transactionId}&am=${amount}&cu=${currency}`;
    window.open(upiLink, '_blank');
  };

  return (
    <>
      <TitleBar title="Add Fund" />
      <div className="mt-[60px]">
        <Card>
          <UserCard user={user.user!} balance={points.balance} />
          <hr className=" h-1 mt-2 bg-black" />
          <div className="flex flex-col items-center mt-2">
            <h1 className="font-semibold">For Fund Query&apos;s Contact us</h1>
            <ContactOptions />
          </div>
          <hr className=" h-1 mt-2 bg-black" />
          <div className="flex mt-2 items-center border-2 border-gray-300 rounded-full p-2 focus-within:border-orange-500">
            <BiRupee className="h-10 w-10 text-white p-1 mr-2 bg-orange-500 rounded-full" />
            <input
              type="number"
              placeholder="Enter Amount"
              className="flex-1 outline-none bg-transparent placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col items-center mt-2">
            <button
              onClick={openUpiIntent}
              className="bg-orange-500 text-white font-medium py-2 px-4 rounded shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            >
              Add Cash
            </button>
          </div>
        </Card>
      </div>
      {isModalOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default AddFundPage;
