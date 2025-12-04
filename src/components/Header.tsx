import { useState, useEffect } from "react";
import { Menu, X, Sun, Zap } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Início", href: "#inicio" },
  { name: "Sobre Nós", href: "#sobre" },
  { name: "Serviços", href: "#servicos" },
  { name: "Portfólio", href: "#portfolio" },
  { name: "Contato", href: "#contato" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary-foreground/80 hover:text-accent font-medium transition-colors duration-200 text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button variant="accent" size="default">
            Solicite Orçamento
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-primary/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 border-t border-primary-foreground/10" : "max-h-0"
        }`}
      >
        <nav className="container mx-auto py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary-foreground/80 hover:text-accent font-medium py-3 px-4 transition-colors duration-200 text-sm uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="px-4 pt-2 pb-4">
            <Button variant="accent" size="lg" className="w-full">
              Solicite Orçamento
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
