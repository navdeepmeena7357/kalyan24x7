const WalletOptions = () => {
  return (
    <div className="flex items-center mt-4 justify-between">
      <button className="bg-orange-600 shadow-sm shadow-gray-400  text-sm font-semibold text-white p-3 min-w-40 rounded-sm">
        Add Money
      </button>
      <button className="bg-orange-600 shadow-sm shadow-gray-400 text-sm font-semibold text-white p-3 min-w-40 rounded-sm">
        Withdrawal
      </button>
    </div>
  );
};

export default WalletOptions;
