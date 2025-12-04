import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ClientLogo {
  alt: string;
  src: string;
  title: string;
}

const clientLogos: ClientLogo[] = [
  {
    alt: "7inove",
    src: "/images/site/Logomarca dos parceiros/7inove.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Ampery",
    src: "/images/site/Logomarca dos parceiros/ampery.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Carlos Lima Eletricidade",
    src: "/images/site/Logomarca dos parceiros/carloslimaeletricidade.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Choqueseg",
    src: "/images/site/Logomarca dos parceiros/Choqueseg.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Dudde",
    src: "/images/site/Logomarca dos parceiros/dudde.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Eco Solar Energy",
    src: "/images/site/Logomarca dos parceiros/Eco Solar Energy.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "EP Engenharia",
    src: "/images/site/Logomarca dos parceiros/ep engenharia.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "EP Elétrica",
    src: "/images/site/Logomarca dos parceiros/ep_eletrica_SVG.svg",
    title: "Parceiro integrador",
  },
  {
    alt: "Fiel Solar",
    src: "/images/site/Logomarca dos parceiros/fielsolar.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Gloria Tech",
    src: "/images/site/Logomarca dos parceiros/gloriatech.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Home Protect",
    src: "/images/site/Logomarca dos parceiros/Home Protect.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Inovare",
    src: "/images/site/Logomarca dos parceiros/inovare.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "MEA Solutions",
    src: "/images/site/Logomarca dos parceiros/measolutions.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "New Energy",
    src: "/images/site/Logomarca dos parceiros/newenergy.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Nordeste",
    src: "/images/site/Logomarca dos parceiros/nordeste2.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "O Sol Energia",
    src: "/images/site/Logomarca dos parceiros/osolenergia.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Sigma",
    src: "/images/site/Logomarca dos parceiros/sigma.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Solar Life",
    src: "/images/site/Logomarca dos parceiros/solarlife.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Top Sol",
    src: "/images/site/Logomarca dos parceiros/topsol.avif",
    title: "Parceiro integrador",
  },
  {
    alt: "Voltz",
    src: "/images/site/Logomarca dos parceiros/voltz.avif",
    title: "Parceiro integrador",
  },
];

const Clientes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Nossos Clientes
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Conheça as empresas e pessoas que confiam na Norsel Engenharia
              para suas soluções em energia solar e projetos elétricos.
            </p>

            {/* Placeholder para lista de clientes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-8 shadow-md border border-border flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground text-center">
                  Em breve: portfólio completo de clientes
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 shadow-md border border-border flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground text-center">
                  Projetos residenciais
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 shadow-md border border-border flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground text-center">
                  Projetos comerciais
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Clientes;
