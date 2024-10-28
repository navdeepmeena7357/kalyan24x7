import { FaWhatsapp } from 'react-icons/fa';
import { MdAddCall } from 'react-icons/md';
import { useAppData } from '@/context/AppDataContext';
import { useUser } from '@/context/UserContext';

const ContactOptions = () => {
  const contactDetails = useAppData();
  const user = useUser();

  const handleWhatsAppClick = () => {
    const phoneNumber = contactDetails.contactDetails?.whatsapp_numebr;
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleCallClick = () => {
    const phoneNumber = contactDetails.contactDetails?.phone_number;
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <div className="flex items-center justify-between mt-2">
      <button
        onClick={handleWhatsAppClick}
        className="text-black flex justify-center space-x-2 text-sm items-center p-2 min-w-40 rounded-sm"
      >
        <FaWhatsapp className="text-green-600 w-5 h-5" />
        <h1>
          {contactDetails.contactDetails?.whatsapp_numebr.replace('+91', '')}
        </h1>
      </button>
      <button
        onClick={handleCallClick}
        className="flex text-sm justify-center space-x-2 items-center text-black p-2 min-w-40 rounded-sm"
      >
        <MdAddCall className="w-5 h-5" />
        <h1>
          {contactDetails.contactDetails?.phone_number.replace('+91', '')}
        </h1>
      </button>
    </div>
  );
};

export default ContactOptions;
