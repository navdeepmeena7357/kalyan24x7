import React from 'react';

interface RoundedInputProps {
  icon: React.ReactNode;
  placeholder: string;
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const RoundedInput: React.FC<RoundedInputProps> = ({
  icon,
  placeholder,
  name,
  value,
  onChange,
  type = 'text',
}) => {
  return (
    <div className="flex mt-2 items-center border bg-white border-gray-300 rounded-md p-2 focus-within:border-blue-500">
      <div className="h-10 w-10 text-white p-1 mr-2 bg-blue-500 rounded-md flex items-center justify-center">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent placeholder-gray-400"
      />
    </div>
  );
};

export default RoundedInput;
