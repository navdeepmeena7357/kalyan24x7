'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useUser } from '@/context/UserContext';
import { useWallet } from '@/context/WalletContext';
import { getMarketInfo, Market, postBids } from '@/app/services/api';
import { Toaster } from 'react-hot-toast';
import DropdownSelect from '@/components/SessionDropdown';
import { showSuccessToast, showErrorToast } from '@/utils/toast';
import { FaArrowUpLong } from 'react-icons/fa6';
import { doublePanaDigits } from '@/utils/numbers';
import { MdDelete } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';

interface Bid {
  market_session: string;
  bet_digit: string;
  bet_amount: number;
  bet_type: string;
  user_id: number;
  market_id: number;
}

const SinglePanelBulkPage = () => {
  const user = useUser();
  const { balance, refreshBalance } = useWallet();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [market, setMarket] = useState<Market | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [amount, setAmount] = useState('');
  const [session, setSession] = useState<string>('');

  const openOptions = [
    {
      value: 'open',
      label: `OPEN`,
      disabled: market?.open_market_status !== 1,
    },
    {
      value: 'close',
      label: `CLOSE`,
      disabled: false,
    },
  ];

  const closeOptions = [
    {
      value: 'close',
      label: `CLOSE`,
      disabled: false,
    },
  ];

  const options = market?.open_market_status === 1 ? openOptions : closeOptions;

  const totalAmount = bids.reduce((acc, bid) => acc + bid.bet_amount, 0);
  const totalCount = bids.length;

  const handleSelectChange = (value: string) => {
    setSession(value);
    const updatedBids = bids.map((bid) => ({
      ...bid,
      market_session: value,
    }));

    setBids(updatedBids);
  };

  const handleNumberClick = (digit: string) => {
    if (Number(amount) > 0 && Number(amount) >= 10) {
      const selectedPanaDigits = doublePanaDigits[digit];
      if (selectedPanaDigits) {
        const newBids = selectedPanaDigits.map((pana) => ({
          market_session: session,
          bet_digit: pana,
          bet_amount: Number(amount),
          bet_type: 'double_panel',
          user_id: Number(user.user?.id),
          market_id: Number(market?.market_id),
        }));
        setBids((prevBids) => [...prevBids, ...newBids]);
      }
    } else {
      showErrorToast('Please Enter Points Minimum 10 !');
    }
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await getMarketInfo(Number(id));
        setMarket(data);
        if (data.open_market_status == 1) {
          setSession('open');
        } else {
          setSession('close');
        }
      } catch (err) {
        throw err;
      }
    };
    fetchMarketData();
  }, []);

  const handleSubmitBids = async () => {
    if (bids.length === 0) {
      showErrorToast('Please Add Bids to Submit');
      return;
    }

    if (balance < totalAmount) {
      showErrorToast('Not Enough Wallet Balance');
      return;
    }

    const formattedBids = bids.map((bid) => ({
      market_session: bid.market_session,
      bet_digit: bid.bet_digit,
      bet_amount: bid.bet_amount,
      bet_type: 'double_panel',
      user_id: Number(user.user?.id),
      market_id: Number(market?.market_id),
    }));

    try {
      const response = await postBids(formattedBids);

      if (response.success) {
        showSuccessToast(response.error_msg);
        setBids([]);
        setAmount('');
        refreshBalance();
      } else {
        console.error(response.error_msg);
        showErrorToast(response.error_msg);
      }
    } catch (error) {
      showSuccessToast('Something went wrong !');
      throw error;
    }
  };

  return (
    <>
      <div className="mt-12 p-4">
        <Toaster position="bottom-center" reverseOrder={false} />

        <div className="flex justify-between items-center">
          <h1>Select Session</h1>
          <DropdownSelect
            options={options}
            defaultOption={session}
            onChange={handleSelectChange}
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <h1>Enter Points : </h1>
          <div className=" justify-between flex items-center p-1">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              maxLength={4}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => {
                if (['e', '.', '-', '+'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="shadow-sm shadow-gray-400 p-2 rounded-lg max-w-[150px] text-center border-none focus:ring-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-5 mt-3 gap-2 justify-items-center">
          {Array.from({ length: 10 }, (_, digit) => {
            return (
              <div
                key={digit}
                className="relative bg-orange-500 pt-2 pb-2 pl-6 pr-6 rounded-md text-white font-semibold text-center items-center"
                onClick={() => handleNumberClick(digit.toString())}
              >
                {digit}
              </div>
            );
          })}
        </div>

        <div className="shadow-md rounded-md mt-2 overflow-y-auto mb-14">
          <table className="min-w-full bg-orange-500  table-auto text-center">
            <thead>
              <tr className="border-b  text-white text-sm">
                <th className="p-2 font-normal">Pana</th>
                <th className="p-2 font-normal">Point</th>
                <th className="p-2 font-normal">Session</th>
                <th className="p-2 font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {bids.map((bid, index) => (
                <tr key={index} className="text-sm">
                  <td className="p-2 text-black">{bid.bet_digit}</td>
                  <td className="p-2">{bid.bet_amount}</td>
                  <td className="p-2 uppercase">{bid.market_session}</td>
                  <td className="p-2">
                    <button className="text-red-500">
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-md p-2 pl-4 pr-4">
          <div className="flex justify-between items-center">
            <div className="p-1 items-center text-sm space-y-1">
              <p>Total Bids: {totalCount}</p>
              <p>Total Amount: {totalAmount}</p>
            </div>
            <button
              onClick={handleSubmitBids}
              className="p-3 font-medium bg-orange-500 text-white flex items-center gap-2 text-[14px] rounded"
            >
              <FaArrowUpLong />
              Submit Bids
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const Page = () => {
  return (
    <Suspense>
      <SinglePanelBulkPage />
    </Suspense>
  );
};

export default Page;
