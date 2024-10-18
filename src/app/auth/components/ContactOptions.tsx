import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';

function ContactOptions() {
  return (
    <button>
      <div className="flex justify-items-center mt-4 gap-2 text-center items-center">
        <h1 className="text-sm">Contact us on Whatsapp</h1>
        <div className="flex text-sm items-center justify-items-center space-x-2">
          <BsWhatsapp style={{ color: '#2ecc71', fontSize: '24px' }} />
          <h1>9988776655</h1>
        </div>
      </div>
    </button>
  );
}

export default ContactOptions;
