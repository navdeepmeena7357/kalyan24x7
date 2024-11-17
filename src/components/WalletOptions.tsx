import { useRouter } from 'next/navigation';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const WalletOptions = () => {
  const router = useRouter();

  return (
    <div className="flex items-center mt-4 justify-between">
      <button
        onClick={() => router.push('/features/funds/add_fund')}
        className="bg-blue-600 text-center shadow-sm uppercase shadow-gray-400  text-sm font-semibold text-white p-2.5 min-w-40 rounded-md"
      >
        <h1 className="flex items-center justify-center gap-2">
          <FaPlusCircle /> DEposit
        </h1>
      </button>
      <button
        onClick={() => router.push('/features/funds/withdraw_fund')}
        className="bg-blue-600 uppercase shadow-sm shadow-gray-400 text-sm font-semibold text-white p-2.5 min-w-40 rounded-md"
      >
        <h1 className="flex items-center justify-center gap-2">
          <FaMinusCircle /> Withdraw
        </h1>
      </button>
    </div>
  );
};

export default WalletOptions;
