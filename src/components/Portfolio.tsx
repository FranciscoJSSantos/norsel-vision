import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import solarProject1 from "@/assets/solar-project-1.jpg";
import solarProject2 from "@/assets/solar-project-2.jpg";
import heroSolar from "@/assets/hero-solar.jpg";

const projects = [
  {
    title: "Arena GM Society",
    category: "Comercial",
    image: solarProject2,
    power: "150 kWp",
  },
  {
    title: "Hotel Tropical",
    category: "Hotelaria",
    image: heroSolar,
    power: "200 kWp",
  },
  {
    title: "Magg's Sanduíches",
    category: "Alimentação",
    image: solarProject1,
    power: "45 kWp",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-accent font-heading font-semibold uppercase tracking-widest text-sm">
              Portfólio
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Nossos Projetos
            </h2>
          </div>
          <Button variant="outline" size="lg">
            Ver todos os projetos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="font-heading font-bold text-primary-foreground text-xl md:text-2xl">
                  {project.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-primary-foreground/80 text-sm">
                    Potência: {project.power}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ExternalLink className="w-5 h-5 text-accent-foreground" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
