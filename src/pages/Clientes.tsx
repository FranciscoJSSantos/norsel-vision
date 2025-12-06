import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { clientLogos } from "@/data/clientLogos";

const Clientes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Header Section - Dark Blue Background */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
                Clientes
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                Os projetos executados pela Norsel Engenharia foram realizados
                para nossos parceiros integradores. Cada projeto de nosso
                portfólio remete ao integrador cliente.
              </p>
            </div>
          </div>
        </section>

        {/* Logos Grid Section - White Background */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Grid responsivo: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clientLogos.map((client) => (
                  <div
                    key={client.alt}
                    className="bg-white border border-slate-200 rounded-lg p-6 h-28 flex items-center justify-center hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={client.src}
                      alt={client.alt}
                      title={client.title}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Clientes;
