'use client';
import Card from '@/components/Card';
import ContactOptions from '@/components/ContactOptions';
import TitleBar from '@/components/TitleBar';
import UserCard from '@/components/UserWalletCard';
import { useUser } from '@/context/UserContext';
import { useWallet } from '@/context/WalletContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { createOrder } from '@/app/services/api';
import { usePayment } from '@/context/PaymentContext';
import { generateTxnId } from '@/utils/basic';
import LoadingModal from '@/components/LoadingModal';

const AddFundPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { paymentDetails } = usePayment();
  const points = useWallet();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = (url: string) => {
    setModalUrl(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAmount('');
    router.replace('/');
  };

  const handleCreateOrder = async () => {
    if (!amount || parseFloat(amount) < (paymentDetails?.min_amount || 0)) {
      setError(
        `Please enter an amount of at least ${paymentDetails?.min_amount}.`
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await createOrder({
        key: 'dba30cca-0adb-42f4-b968-e22f07029964',
        client_txn_id: generateTxnId(),
        amount: amount,
        p_info: 'Add Fund',
        customer_name: user?.name || 'CustName',
        customer_email:
          user?.username + '@kalyan777.com' || 'Email of customer',
        customer_mobile: user?.username || 'Mobile of customer',
        redirect_url: `${window.location.origin}/features/funds/order_complete`,
        udf1: user?.id.toString(),
        udf2: '0',
        udf3: '0',
      });

      if (!response.status) {
        console.log('Something went wrong', response);
        return;
      }
      handleOpenModal(response.data.payment_url);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingModal isOpen={loading} />
      <TitleBar title="Add Fund" />
      <div className="mt-[60px]">
        <Card>
          <UserCard user={user!} balance={points.balance} />
          <hr className="h-1 mt-2 bg-black" />
          <div className="flex flex-col items-center mt-2">
            <h1 className="font-semibold">For Fund Queries Contact Us</h1>
            <ContactOptions />
          </div>
          <hr className="h-1 mt-2 bg-black" />
          <div className="flex mt-2 items-center border-2 border-gray-300 rounded-full p-2 focus-within:border-orange-500">
            <BiRupee className="h-10 w-10 text-white p-1 mr-2 bg-orange-500 rounded-full" />
            <input
              type="number"
              placeholder={`Enter Amount (Min: ${paymentDetails?.min_amount ?? '...'})`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 outline-none bg-transparent placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col items-center mt-2">
            <button
              onClick={handleCreateOrder}
              disabled={loading}
              className="bg-orange-500 text-white font-medium py-2 px-4 rounded shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            >
              {loading ? 'Please Wait...' : 'Add Cash'}
            </button>
          </div>
        </Card>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
          <div className="bg-whiteð rounded shadow-lg w-full max-w-lg flex flex-col justify-items-center">
            <iframe
              src={modalUrl}
              style={{ width: '100%', height: '600px', border: 'none' }}
              title="Payment"
            />
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-orange-500 text-white text-center font-medium py-2 px-4 rounded shadow-md hover:bg-orange-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}
    </>
  );
};

export default AddFundPage;
