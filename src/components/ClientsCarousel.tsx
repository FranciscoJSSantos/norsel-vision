import { clientLogos } from "@/data/clientLogos";

const ClientsCarousel = () => {
  // Duplicar o array para criar o efeito de loop infinito
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-2">
          Nossos Parceiros Integradores
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Empresas que confiam na Norsel Engenharia para projetos de energia solar
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays para efeito de fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background/80 to-transparent z-10" />

        {/* Container do carrossel */}
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.alt}-${index}`}
              className="flex-shrink-0 w-48 h-32 mx-4 bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center p-6"
            >
              <img
                src={client.src}
                alt={client.alt}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientsCarousel;
