import { SiWhatsapp } from 'react-icons/si';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917058779219"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
    >
      <SiWhatsapp size={28} />
    </a>
  );
}
