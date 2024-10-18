'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getMarketInfo, Market } from '@/app/services/api';
import DropdownSelect from '@/components/SessionDropdown';
import { MdDelete } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { useUser } from '@/context/UserContext';
import { postBids } from '@/app/services/api';
import { useWallet } from '@/context/WalletContext';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import { Toaster } from 'react-hot-toast';
import { jodiDigits } from '@/utils/numbers';
import { FaArrowUpLong } from 'react-icons/fa6';

const JodiPage = () => {
  const searchParams = useSearchParams();
  const user = useUser();

  const { balance, refreshBalance } = useWallet();

  let id = searchParams.get('id');

  interface Bid {
    market_session: string;
    bet_digit: string;
    bet_amount: number;
    bet_type: string;
    user_id: number;
    market_id: number;
  }

  const [market, setMarket] = useState<Market | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [digit, setDigit] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [amount, setAmount] = useState('');
  const [session, setSession] = useState<string>('');

  const options = [
    {
      value: 'null',
      label: `JODI`,
      disabled: market?.open_market_status !== 1,
    },
  ];

  const handleAddBid = () => {
    if (session && digit && amount) {
      const newBid = {
        market_session: 'null',
        bet_digit: digit,
        bet_amount: Number(amount),
        bet_type: 'double',
        user_id: Number(user.user?.id),
        market_id: Number(market?.market_id),
      };
      setBids((prevBids) => [...prevBids, newBid]);
      console.log(JSON.stringify(bids));
      setDigit('');
      setAmount('');
    } else {
      showErrorToast('Please Enter Digit or Amount');
    }
  };

  const handleDeleteBid = (index: number) => {
    const updatedBids = bids.filter((_, i) => i !== index);
    setBids(updatedBids);
  };

  const handleSelectChange = (value: string) => {
    setSession(value);
    const updatedBids = bids.map((bid) => ({
      ...bid,
      market_session: value,
    }));

    setBids(updatedBids);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDigit(value);

    if (value.length < 2) {
      if (value.length > 0) {
        const filtered = jodiDigits.filter((suggestion) =>
          suggestion.startsWith(value)
        );
        setFilteredSuggestions(filtered.slice(0, 10));
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (value: string) => {
    setDigit(value);
    setShowSuggestions(false);
  };

  const totalAmount = bids.reduce((acc, bid) => acc + bid.bet_amount, 0);
  const totalCount = bids.length;

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await getMarketInfo(Number(id));
        setMarket(data);
        if (data.open_market_status === 1) {
          setSession('open');
        } else {
          setSession('close');
        }
      } catch (err) {}
    };
    fetchMarketData();
  }, [Number(id)]);

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
      market_session: 'null',
      bet_digit: bid.bet_digit,
      bet_amount: bid.bet_amount,
      bet_type: 'double',
      user_id: Number(user.user?.id),
      market_id: Number(market?.market_id),
    }));

    try {
      const response = await postBids(formattedBids);
      if (response.success) {
        showSuccessToast(response.error_msg);
        setBids([]);
      } else {
        console.error(response.error_msg);
        showErrorToast(response.error_msg);
      }
      refreshBalance();
    } catch (error) {
      console.error(error);
      showSuccessToast('Something went wrong !' + error);
    }
  };

  return (
    <div className="mt-12 p-4">
      <Toaster position="bottom-center" reverseOrder={false} />

      {market && (
        <>
          <div className="flex justify-between items-center">
            <h1>Select Session</h1>
            <DropdownSelect
              options={options}
              defaultOption={session}
              onChange={handleSelectChange}
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <h1>Enter Jodi Digit</h1>

            <div className="justify-between relative flex flex-col items-center p-1">
              <input
                type="number"
                maxLength={2}
                value={digit}
                onChange={handleChange}
                placeholder="Jodi"
                className="rounded-lg p-2 shadow-lg focus:ring-transparent focus:outline-none text-center max-w-[150px]"
              />
              {showSuggestions && (
                <ul className="absolute w-full bg-white border rounded-md shadow-lg mt-10 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="cursor-pointer p-2  hover:bg-gray-200"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <h1>Enter Points</h1>
            <div className="justify-between flex items-center p-1">
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
                className="rounded-md p-2 max-w-[150px] shadow-lg text-center border-none focus:ring-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end items-center pt-4 text-end">
            <button
              onClick={handleAddBid}
              className="bg-orange-500 min-w-[154px] p-2 text-sm text-white rounded flex items-center justify-center gap-2"
            >
              <FaPlus />
              Add Bid
            </button>
          </div>

          <div className="shadow-md rounded-md mt-2 overflow-y-auto mb-14">
            <table className="min-w-full bg-orange-500  table-auto text-center">
              <thead>
                <tr className="border-b text-white text-sm">
                  <th className="p-2 font-normal">Jodi</th>
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
                    <td className="p-2 uppercase">JODI</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteBid(index)}
                        className="text-red-500"
                      >
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
        </>
      )}
    </div>
  );
};

export default JodiPage;
