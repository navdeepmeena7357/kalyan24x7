'use client';
import ProtectedRoute from '@/components/ProctectedRoute';
import LoadingModal from '@/components/LoadingModal';
import React, { useState, useEffect, Suspense } from 'react';
import { BASE_URL } from './services/api';
import { Toaster } from 'react-hot-toast';
import GameCard from '@/components/GameCard';
import Image from 'next/image';
import Drawer from '@/components/Drawer';
import WalletOptions from '@/components/WalletOptions';
import ContactOptions from '@/components/ContactOptions';
import Marquee from '@/components/Marquee';
import { useWallet } from '@/context/WalletContext';
import { useAppData } from '@/context/AppDataContext';
import { FaReceipt } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import { RiBankFill } from 'react-icons/ri';
import { IoChatbubbleEllipsesOutline, IoReload } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { MdWallet } from 'react-icons/md';
import { useUser } from '@/context/UserContext';
import { BiMenuAltLeft } from 'react-icons/bi';

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

const Navbar: React.FC<{ refreshMarketData: () => void }> = ({
  refreshMarketData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const appData = useAppData();
  const { user, fetchAndSetUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const wallet = useWallet();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchAndSetUser();
      setIsLoading(false);
    })();

    (async () => {
      setIsLoading(true);
      refreshMarketData();
      setIsLoading(false);
    })();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await fetchAndSetUser();
      refreshMarketData();
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-white bg-white items-center fixed top-0 left-0 right-0 z-10 p-3">
      <div className="flex justify-between items-center">
        <div className="flex">
          <BiMenuAltLeft
            onClick={toggleDrawer}
            className="h-9 w-9 text-blue-500 shadow-sm shadow-zinc-300 rounded"
          />

          <Image
            className="ml-2"
            src="/images/png/Logo.png"
            width={164}
            height={164}
            alt="Kalyan 24x7 Logo"
          ></Image>

          <Drawer isOpen={isOpen} onClose={toggleDrawer} />
        </div>

        {user?.isVerified ? (
          <div className="text-black flex items-center space-x-1">
            <MdWallet className="w-7 h-7" />
            <h1>{wallet.balance}</h1>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="text-black mt-1">
        {user?.isVerified ? (
          <Marquee
            text={appData.contactDetails?.banner_message.toString() ?? ' '}
          />
        ) : (
          <Marquee text={'We provide fast matka results'} />
        )}

        {user?.isVerified ? (
          <div>
            <WalletOptions />
          </div>
        ) : (
          <div></div>
        )}
        <ContactOptions />

        <div className="flex justify-center">
          <button>
            <div
              onClick={handleRefresh}
              className="text-white flex items-center ml-4 bg-blue-700 w-32 gap-2 text-center justify-center rounded-md p-2"
            >
              <IoReload /> Refresh
            </div>
          </button>
        </div>

        <LoadingModal isOpen={isLoading} />
      </div>
    </nav>
  );
};

const BottomNavBar = () => {
  const router = useRouter();
  const { contactDetails } = useAppData();
  const { user } = useUser();
  const handleWhatsAppClick = () => {
    const rawPhoneNumber = contactDetails?.whatsapp_numebr;
    const phoneNumber = rawPhoneNumber ? rawPhoneNumber.replace(/\D/g, '') : '';
    if (!phoneNumber) {
      alert('Phone number is not available.');
      return;
    }
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    window.location.href = whatsappUrl;
  };

  const handleNavigation = (route: string) => {
    router.push(`features/${route}`);
  };

  return (
    <nav className="bg-white border-t-2 items-center fixed bottom-0 left-0 right-0 p-2">
      <div className="flex bg-white  justify-between items-center">
        {user?.isVerified ? (
          <div
            onClick={() => handleNavigation('bids')}
            className="flex gap-2 flex-col items-center justify-items-center"
          >
            <FaReceipt className="h-5 text-blue-600 w-5" />
            <h1 className="text-sm font-medium">My Bids</h1>
          </div>
        ) : (
          <div></div>
        )}

        {user?.isVerified ? (
          <div
            onClick={() => handleNavigation('game_rate')}
            className="flex gap-2 flex-col items-center justify-items-center"
          >
            <FaRupeeSign className="h-5 w-5 text-blue-600" />
            <h1 className="text-sm font-medium">Game Rate</h1>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex gap-2 rounded-full bg-blue-500 flex-col items-center justify-items-center">
          <IoMdHome className="h-6 w-6 m-3  text-white" />
        </div>

        {user?.isVerified ? (
          <div
            onClick={() => handleNavigation('funds')}
            className="flex gap-2 flex-col items-center justify-items-center"
          >
            <RiBankFill className="h-5 text-blue-600 w-5" />
            <h1 className="text-sm font-medium">Funds</h1>
          </div>
        ) : (
          <div></div>
        )}

        {user?.isVerified ? (
          <div
            onClick={handleWhatsAppClick}
            className="flex gap-2 flex-col items-center justify-items-center"
          >
            <IoChatbubbleEllipsesOutline className="h-5 text-blue-600 w-5" />
            <h1 className="text-sm font-medium">Support</h1>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};

const GameList: React.FC<{ marketData: MarketData[]; isLoading: boolean }> = ({
  marketData,
  isLoading,
}) => {
  const { user } = useUser();
  return (
    <div
      className={`${
        !user?.isVerified ? 'mt-[180px]' : 'mt-[235px]'
      } mb-16 overflow-y-auto h-screen bg-white`}
    >
      <LoadingModal isOpen={isLoading} />
      {marketData.map((market) => (
        <GameCard key={market.id} market={market} />
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refreshBalance } = useWallet();
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  const fetchMarketData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/markets`);
      const data: MarketData[] = await response.json();
      setMarketData(data);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    refreshBalance();
  }, [refreshBalance]);

  return (
    <Suspense>
      <ProtectedRoute>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Navbar refreshMarketData={fetchMarketData} />
        <GameList marketData={marketData} isLoading={isLoading} />
        <BottomNavBar />
      </ProtectedRoute>
    </Suspense>
  );
};

export default Home;
