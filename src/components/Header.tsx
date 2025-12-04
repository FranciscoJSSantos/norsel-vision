import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import norselLogo from "../assets/logo_norsel_dark.png";
import NorselLogo from "../brand/NorselLogo";

const navLinks = [
  { name: "Início", href: "/", type: "route" },
  { name: "Sobre Nós", href: "/sobre", type: "route" },
  { name: "Serviços", href: "/servicos", type: "route" },
  { name: "Portfólio", href: "/portfolio", type: "route" },
  { name: "Blog", href: "/blog", type: "route" },
  { name: "Clientes", href: "/clientes", type: "route" },
  { name: "Contato", href: "/contato", type: "route" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/norsel.eng/#",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/norselengenharia/",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@norselengenharia",
    icon: Youtube,
  },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary/95 backdrop-blur-md ${
        isScrolled ? "shadow-strong py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* <img
            src={norselLogo}
            alt="Norsel Engenharia"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          /> */}
          <NorselLogo width={180} height={55} className="transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-primary-foreground/80 hover:text-accent font-medium transition-colors duration-200 text-sm uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Links & CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          <div className="w-px h-6 bg-primary-foreground/20" />
          <Button variant="accent" size="default">
            Solicite Orçamento
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary-foreground p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-primary backdrop-blur-md shadow-2xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-[500px] border-t border-accent/30"
            : "max-h-0"
        }`}
      >
        <nav className="container mx-auto py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-primary-foreground hover:text-accent hover:bg-accent/10 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-base uppercase tracking-wider"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="px-4 pt-4 pb-2 border-t border-primary-foreground/20 mt-2">
            <div className="flex items-center justify-center gap-6 py-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground hover:text-accent transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-7 h-7" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="px-4 pt-2 pb-4">
            <Button
              variant="accent"
              size="lg"
              className="w-full text-base font-bold shadow-lg hover:shadow-orange-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solicite Orçamento
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
