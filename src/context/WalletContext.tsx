// WalletContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BASE_URL } from '@/app/services/api';
import jwt from 'jsonwebtoken';

interface WalletData {
  balance: number;
  refreshBalance: () => void;
}

const WalletContext = createContext<WalletData | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>();

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');
      const decodedToken: any = jwt.decode(token);
      const userId = decodedToken.sub;

      console.log(userId);

      const response = await fetch(`${BASE_URL}/user_points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) throw new Error('Failed to fetch balance');
      const data = await response.json();
      console.log('balacnce ' + data.balance);
      setBalance(data.balance);
    } catch (error) {
      console.error(error);
      setBalance(0);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const refreshBalance = () => {
    fetchBalance();
  };

  return (
    <WalletContext.Provider value={{ balance, refreshBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
