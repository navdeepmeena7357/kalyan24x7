'use client';
import Card from '@/components/Card';
import ContactOptions from '@/components/ContactOptions';
import TitleBar from '@/components/TitleBar';
import { useUser } from '@/context/UserContext';
import { useWallet } from '@/context/WalletContext';
import { BiRupee } from 'react-icons/bi';
import { MdAccountBalanceWallet } from 'react-icons/md';

const AddFundPage = () => {
  const user = useUser();
  const points = useWallet();
  return (
    <>
      <TitleBar title="Add Fund" />
      <div className="mt-[60px]">
        <Card>
          <div className="max-w-sm mx-auto mt-10 bg-white rounded-lg overflow-hidden card-shadow">
            <div className="">
              <div className="flex justify-between items-center">
                <div className="p-5"></div>
              </div>
              <div className="bg-black p-2">
                <div className="flex flex-col items-center justify-between text-white  font-semibold">
                  <p className="font-medium">{user.user?.name ?? '...'}</p>
                  <p>{user.user?.username ?? '...'}</p>
                </div>
              </div>
              <div className="text-start flex gap-2 m-2">
                <MdAccountBalanceWallet className="text-orange-500 h-12 w-12" />
                <div>
                  <h1 className="text-orange-500 font-semibold text-xl flex items-center">
                    <BiRupee className="h-6 w-6" /> {points.balance ?? '...'}
                  </h1>
                  <h1 className="text-sm text-gray-500">Current Balance</h1>
                </div>
              </div>
              <div className="p-3"></div>
            </div>
          </div>
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
            <button className="bg-orange-500 text-white font-medium py-2 px-4 rounded shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50">
              Add Cash
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddFundPage;
