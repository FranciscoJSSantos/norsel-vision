import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Nosso Portfólio
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Conheça alguns dos projetos que já realizamos com excelência e dedicação.
            </p>

            {/* Placeholder para projetos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
                <div className="bg-accent/10 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Imagem do Projeto</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    Projeto Residencial 1
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Sistema fotovoltaico residencial de 5kWp instalado em São Paulo.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
                <div className="bg-accent/10 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Imagem do Projeto</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    Projeto Comercial 1
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Sistema fotovoltaico comercial de 15kWp para empresa no interior.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
                <div className="bg-accent/10 h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Imagem do Projeto</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    Projeto Industrial 1
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Grande projeto industrial de 50kWp com economia garantida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
