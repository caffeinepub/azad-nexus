import { SiWhatsapp } from 'react-icons/si';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917058779219"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp size={28} className="text-white" />
    </a>
  );
}
