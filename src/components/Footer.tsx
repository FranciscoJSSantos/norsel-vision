import { Sun, Zap, Instagram, Youtube, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contato" className="bg-primary pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-primary-foreground/10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <a href="#inicio" className="flex items-center gap-2 group">
              <div className="relative">
                <Sun className="w-10 h-10 text-accent transition-transform duration-300 group-hover:rotate-180" />
                <Zap className="w-4 h-4 text-primary-foreground absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold text-primary-foreground tracking-tight">
                  NORSEL
                </span>
                <span className="text-[10px] text-primary-foreground/70 uppercase tracking-[0.2em] -mt-1">
                  Engenharia
                </span>
              </div>
            </a>
            <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed">
              Transformando energia em eficiência e economia. Soluções completas em
              energia solar e projetos elétricos.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-lg mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {["Início", "Sobre Nós", "Serviços", "Portfólio", "Blog"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-lg mb-4">
              Serviços
            </h4>
            <ul className="space-y-3">
              {[
                "Energia Solar",
                "Projetos Elétricos",
                "Consultoria",
                "Perícia Técnica",
                "Manutenção",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#servicos"
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground text-lg mb-4">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Av. Paulista, 1000 - São Paulo, SP
                  <br />
                  CEP: 01310-100
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:contato@norsel.com.br"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  contato@norsel.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 Norsel Engenharia. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-primary-foreground/50 hover:text-accent transition-colors text-sm"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-primary-foreground/50 hover:text-accent transition-colors text-sm"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
