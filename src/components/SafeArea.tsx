import React from 'react';

const SafeArea = ({ children, className }) => {
  return <div className={`mt-14 p-2 ${className}`}>{children}</div>;
};

export default SafeArea;
