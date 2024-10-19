'use client';
import DepositHistoryCard from '@/components/DepositHistoryCard';
import SafeArea from '@/components/SafeArea';
import TitleBar from '@/components/TitleBar';
import React, { useState, useEffect } from 'react';
import { showErrorToast, showSuccessToast } from '@/utils/toast';
import LoadingModal from '@/components/LoadingModal';
import { BASE_URL } from '@/app/services/api';
import Card from '@/components/Card';

interface Transaction {
  id: number;
  user_id: string;
  amount: string;
  transaction_id: string;
  payment_app: string;
  updated_at: string;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  data: Transaction[];
}

const AddFundHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let token: string | null = null;

        if (typeof window !== 'undefined') {
          token = localStorage.getItem('token');
        }

        if (!token) {
          showErrorToast('No token found. Please log in again.');
          return;
        }

        const response = await fetch(`${BASE_URL}/add_fund_history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: '153' }),
        });

        const data: ApiResponse = await response.json();

        if (data.success) {
          setTransactions(data.data);
          console.log(data.data);
        } else {
          showErrorToast('Failed to fetch transactions.');
        }
      } catch (err) {
        showSuccessToast('An error occurred while fetching transactions.');
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <LoadingModal isOpen={loading} />
      <TitleBar title="Deposit History" />
      <SafeArea>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            <Card>
              <DepositHistoryCard
                date={transaction.created_at}
                transactionId={transaction.transaction_id}
                amount={parseFloat(transaction.amount)}
                txnType="Credit"
                depositMode={transaction.payment_app}
              />
            </Card>
          </div>
        ))}
      </SafeArea>
    </>
  );
};

export default AddFundHistory;
