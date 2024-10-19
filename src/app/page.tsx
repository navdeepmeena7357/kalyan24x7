'use client';
import ProtectedRoute from '@/components/ProctectedRoute';
import LoadingModal from '@/components/LoadingModal';
import React, { useState, useEffect, Suspense } from 'react';
import { BASE_URL } from './services/api';
import { Toaster } from 'react-hot-toast';
import GameCard from '@/components/GameCard';
import Image from 'next/image';
import Drawer from '@/components/Drawer';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import WalletOptions from '@/components/WalletOptions';
import ContactOptions from '@/components/ContactOptions';
import Marquee from '@/components/Marquee';
import { useWallet } from '@/context/WalletContext';
import { useAppData } from '@/context/AppDataContext';
import { FaReceipt } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { MdWallet } from 'react-icons/md';

export interface MarketData {
  id: number;
  market_id: number;
  market_name: string;
  open_pana: string;
  close_pana: string;
  open_market_status: number;
  close_market_status: number;
  market_status: number;
  market_open_time: string;
  market_close_time: string;
  is_active: number;
  saturday_status: number;
  sunday_status: number;
}

const Navbar = () => {
  const appData = useAppData();
  const [isOpen, setIsOpen] = useState(false);
  const wallet = useWallet();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-white bg-white items-center fixed top-0 left-0 right-0 z-10 p-3">
      <div className="flex justify-between items-center">
        <div className="flex">
          <HiOutlineMenuAlt1
            onClick={toggleDrawer}
            className="h-9 w-9 text-orange-500 shadow-sm shadow-zinc-300 rounded"
          />

          <Image
            className="ml-2"
            src="/images/png/Logo.png"
            width={154}
            height={154}
            alt="Kalyan 777 Logo"
          ></Image>
          <Drawer isOpen={isOpen} onClose={toggleDrawer} />
        </div>

        <div className="text-black flex items-center space-x-1">
          <MdWallet className="w-7 h-7" />
          <h1>{wallet.balance}</h1>
        </div>
      </div>
      <div className="text-black mt-1">
        <Marquee
          text={appData.contactDetails?.banner_message.toString() ?? ' '}
        />
        <WalletOptions />
        <ContactOptions />
      </div>
    </nav>
  );
};

const BottomNavBar = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(`features/${route}`);
  };

  return (
    <nav className="bg-white border-t-2 items-center fixed bottom-0 left-0 right-0 p-2">
      <div className="flex bg-white  justify-between items-center">
        <div
          onClick={() => handleNavigation('bids')}
          className="flex gap-2 flex-col items-center justify-items-center"
        >
          <FaReceipt className="h-5 w-5" />
          <h1 className="text-sm font-medium">My Bids</h1>
        </div>

        <div
          onClick={() => handleNavigation('game_rate')}
          className="flex gap-2 flex-col items-center justify-items-center"
        >
          <FaRupeeSign className="h-5 w-5" />
          <h1 className="text-sm font-medium">Game Rate</h1>
        </div>

        <div className="flex gap-2 rounded-full bg-orange-500 flex-col items-center justify-items-center">
          <IoMdHome className="h-6 w-6 m-3 text-white" />
        </div>

        <div
          onClick={() => handleNavigation('funds')}
          className="flex gap-2 flex-col items-center justify-items-center"
        >
          <RiBankFill className="h-5 w-5" />
          <h1 className="text-sm font-medium">Funds</h1>
        </div>

        <div className="flex gap-2 flex-col items-center justify-items-center">
          <IoChatbubbleEllipsesOutline className="h-5 w-5" />
          <h1 className="text-sm font-medium">Support</h1>
        </div>
      </div>
    </nav>
  );
};

const GameList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchMarketData = async () => {
      const response = await fetch(`${BASE_URL}/markets`); // Adjust the URL to your API endpoint
      const data: MarketData[] = await response.json();
      console.log(data);
      setMarketData(data);
      setIsLoading(false);
    };

    fetchMarketData();
  }, []);

  return (
    <div className="mt-48 mb-16 overflow-y-auto h-screen bg-white">
      <LoadingModal isOpen={isLoading} />
      {marketData.map((market) => (
        <GameCard key={market.id} market={market} />
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  const { refreshBalance } = useWallet();
  useEffect(() => {
    refreshBalance(); // Refresh balance when the page is focused
  });
  return (
    <Suspense>
      <ProtectedRoute>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Navbar />
        <GameList />
        <BottomNavBar />
      </ProtectedRoute>
    </Suspense>
  );
};

export default Home;
