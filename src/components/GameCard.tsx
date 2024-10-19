import React from 'react';
import { convertTo12HourFormat } from '@/utils/time';
import { getLastDigitOfSum } from '@/utils/basic';
import { showErrorToast } from '@/utils/toast';
import { FaPlay } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface MarketProps {
  market: {
    id: number;
    market_id: number;
    market_name: string;
    open_pana: string;
    close_pana: string;
    market_open_time: string;
    market_close_time: string;
    is_active: number;
    open_market_status: number;
    close_market_status: number;
  };
}

const showMarketClosed = () => {
  showErrorToast('Market is Closed for Today');
};

const GameCard: React.FC<MarketProps> = ({ market }) => {
  const router = useRouter();

  const handleMarketClick = () => {
    const queryParams = new URLSearchParams({
      id: market.id.toString(),
      market_id: market.market_id.toString(),
      name: market.market_name,
      is_active: market.is_active.toString(),
      open_status: market.open_market_status.toString(),
      close_status: market.close_market_status.toString(),
    });
    router.push(`/game?${queryParams.toString()}`);
  };

  const isMarketOpen = market.open_market_status === 1;
  const isMarketClose = market.close_market_status === 1;

  let marketStatusMessage;
  let statusClass;
  let buttonClass;

  if (!isMarketOpen && !isMarketClose) {
    statusClass = 'text-red-600';
    buttonClass = 'bg-red-500';
    marketStatusMessage = 'Market Closed';
  } else if (isMarketOpen && isMarketClose) {
    marketStatusMessage = 'Market is Running';
    buttonClass = 'bg-green-500';
    statusClass = 'text-green-600';
  } else if (!isMarketOpen && isMarketClose) {
    marketStatusMessage = 'Running for Close';
    buttonClass = 'bg-green-500';
    statusClass = 'text-green-600';
  } else {
    statusClass = 'text-red-600';
    marketStatusMessage = 'Market is Closed';
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div
        key={market.id}
        className="bg-white shadow-md shadow-gray-500 rounded-md flex p-3 m-1 justify-between"
        onClick={
          (isMarketOpen && isMarketClose) || isMarketClose
            ? () => handleMarketClick()
            : () => showMarketClosed()
        }
      >
        <div>
          <h2 className="text-[17px] font-semibold">{market.market_name}</h2>
          <div className="flex font-bold">
            <p className="text-orange-500">{market.open_pana}</p>
            <p className="text-orange-500">
              - {getLastDigitOfSum(market.open_pana)}
            </p>
            <p className="text-orange-500">
              {getLastDigitOfSum(market.close_pana)} -
            </p>
            <p className="text-orange-500">{market.close_pana}</p>
          </div>

          <div className="flex gap-2 text-xs">
            <div className="flex flex-col">
              <h1>Open Bids</h1>
              <p className="text-gray-700">
                {convertTo12HourFormat(market.market_open_time)}
              </p>
            </div>

            <div className="flex flex-col">
              <h1>Close Bids</h1>
              <p className="text-gray-700">
                {convertTo12HourFormat(market.market_close_time)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className={`text-[13px] font-medium ${statusClass}`}>
            {marketStatusMessage}
          </h1>
          <div
            className={`flex items-center mt-2 justify-center h-12 w-12 ${buttonClass} rounded-full shadow-md`}
          >
            <p>
              {market.is_active ? (
                <FaPlay className="text-white text-xl" />
              ) : (
                <CgClose className="text-white text-xl" />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
