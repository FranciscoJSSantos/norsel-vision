import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 550, suffix: "+", label: "projetos elaborados" },
  { value: 6, suffix: " MWp+", label: "de potência projetada" },
  { value: 99, suffix: "%+", label: "de aprovação na primeira submissão" },
  { value: 25, suffix: "+", label: "integradores como clientes" },
  { value: 400, suffix: "+", label: "clientes finais atendidos" },
];

const AnimatedCounter = ({
  value,
  suffix,
  isVisible,
}: {
  value: number;
  suffix: string;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  return (
    <span className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 z-20 px-4 md:px-6 mb-12"
    >
      <div className="container mx-auto">
        <div className="bg-navy-gradient rounded-2xl border-4 border-accent p-6 md:p-8 shadow-strong">
          <h2 className="text-center text-base md:text-lg font-heading font-bold text-accent uppercase tracking-wider mb-6">
            Credibilidade se constrói com experiência, números e entregas reais.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
                <p className="mt-2 text-sm text-primary-foreground/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
