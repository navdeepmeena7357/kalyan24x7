'use client';
import RoundedInput from '@/components/RoundedInput';
import SafeArea from '@/components/SafeArea';
import TitleBar from '@/components/TitleBar';
import { FaUser } from 'react-icons/fa6';
import React, { useState } from 'react';
import { RiBankFill } from 'react-icons/ri';
import { FaHashtag } from 'react-icons/fa';
import { IoInfinite } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiPaytm } from 'react-icons/si';
import { SiPhonepe } from 'react-icons/si';
import { SiGooglepay } from 'react-icons/si';

type BankDetails = {
  acHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
};

type PaymentApps = {
  paytmNumber?: string;
  phonePeNumber?: string;
  gpayNumber?: string;
};

const BankDetailsPage = () => {
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    acHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [paymentApps, setPaymentApps] = useState<PaymentApps>({
    paytmNumber: '',
    phonePeNumber: '',
    gpayNumber: '',
  });

  const handleBankInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentApps((prevApps) => ({
      ...prevApps,
      [name]: value,
    }));
  };

  const validateRequiredFields = (): boolean => {
    const { acHolderName, bankName, accountNumber, ifscCode } = bankDetails;
    return (
      acHolderName !== '' &&
      bankName !== '' &&
      accountNumber !== '' &&
      validateIfscCode(ifscCode)
    );
  };

  const validateIfscCode = (ifscCode: string): boolean => {
    return ifscCode.length === 11 && /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode);
  };

  const validatePaymentApps = (): boolean => {
    const { paytmNumber, phonePeNumber, gpayNumber } = paymentApps;
    return paytmNumber !== '' || phonePeNumber !== '' || gpayNumber !== '';
  };

  const handleSaveBankDetails = async () => {
    if (!validateRequiredFields()) {
      toast.error('Please fill all required fields correctly.');
      return;
    }

    try {
      //   const response = await fetch(
      //     'https://your-api-endpoint.com/api/bank-details',
      //     {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(bankDetails),
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }

      //   toast.success('Bank details saved successfully!');
      //   setBankDetails({
      //     acHolderName: '',
      //     bankName: '',
      //     accountNumber: '',
      //     ifscCode: '',
      //   });

      console.log(JSON.stringify(bankDetails));
    } catch (error) {
      toast.error('Failed to save bank details. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleSavePaymentApps = async () => {
    if (!validatePaymentApps()) {
      toast.error('Please fill at least one payment app number.');
      return;
    }

    try {
      //   const response = await fetch(
      //     'https://your-api-endpoint.com/api/payment-apps',
      //     {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(paymentApps),
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }

      //   toast.success('Payment app numbers saved successfully!');
      //   setPaymentApps({
      //     paytmNumber: '',
      //     phonePeNumber: '',
      //     gpayNumber: '',
      //   });

      console.log(JSON.stringify(paymentApps));
      console.log(JSON.stringify(paymentApps));
    } catch (error) {
      toast.error('Failed to save bank details. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <TitleBar title="Bank Details" />
      <ToastContainer />
      <SafeArea className={'p-4'}>
        <RoundedInput
          name="acHolderName"
          icon={<FaUser />}
          placeholder="A/c Holder Name"
          value={bankDetails.acHolderName}
          onChange={handleBankInputChange}
        />

        <RoundedInput
          name="bankName"
          icon={<RiBankFill />}
          placeholder="Bank Name"
          value={bankDetails.bankName}
          onChange={handleBankInputChange}
        />

        <RoundedInput
          icon={<FaHashtag />}
          name="accountNumber"
          placeholder="Bank Accoubant Number"
          value={bankDetails.accountNumber}
          onChange={handleBankInputChange}
          type="number"
        />

        <RoundedInput
          name="ifscCode"
          icon={<IoInfinite />}
          placeholder="IFSC Code"
          value={bankDetails.ifscCode}
          onChange={handleBankInputChange}
        />

        <div className="flex mt-2 flex-col items-center">
          <button
            onClick={() => handleSaveBankDetails()}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Save Details
          </button>
        </div>

        <hr className=" h-1 mt-2 bg-black" />

        <RoundedInput
          name="paytmNumber"
          icon={<SiPaytm />}
          placeholder="Paytm Number"
          value={paymentApps.paytmNumber ?? ''}
          onChange={handlePaymentInputChange}
        />

        <RoundedInput
          name="phonePeNumber"
          icon={<SiPhonepe />}
          placeholder="PhonePe Number"
          value={paymentApps.phonePeNumber ?? ''}
          onChange={handlePaymentInputChange}
        />

        <RoundedInput
          name="gpayNumber"
          icon={<SiGooglepay />}
          placeholder="GPay Number"
          value={paymentApps.gpayNumber ?? ''}
          onChange={handlePaymentInputChange}
        />

        <div className="flex mt-2 flex-col items-center">
          <button
            onClick={() => handleSavePaymentApps()}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Save Details
          </button>
        </div>
      </SafeArea>
    </>
  );
};

export default BankDetailsPage;
