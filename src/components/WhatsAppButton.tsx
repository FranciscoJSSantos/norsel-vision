import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const mensagem =
      "Olá! Gostaria de saber mais sobre os serviços da Norsel Engenharia.";
    const mensagemEncoded = encodeURIComponent(mensagem);
    window.open(
      `https://wa.me/5579998305785?text=${mensagemEncoded}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group animate-bounce-slow"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />

      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Fale conosco no WhatsApp
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45" />
      </div>

      {/* Badge de notificação (opcional) */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
    </button>
  );
};

export default WhatsAppButton;
