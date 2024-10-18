import React from 'react';
import Image from 'next/image';
const NoResults: React.FC = () => {
  return (
    <div className="mt-4 flex flex-col text-center justify-center items-center">
      <div className="bg-gray-200 rounded-full w-[150px]">
        <Image
          className="p-6"
          src="/images/svg/no-results.svg"
          alt="no results found icon"
          height={164}
          width={164}
        />
      </div>
      <p className="mt-2">No Results Found</p>
    </div>
  );
};

export default NoResults;
