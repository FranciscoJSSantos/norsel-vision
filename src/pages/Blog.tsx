import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Blog Norsel
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Fique por dentro das últimas novidades sobre energia solar, projetos elétricos e sustentabilidade.
            </p>

            {/* Placeholder para posts do blog */}
            <div className="grid gap-8">
              <div className="bg-card rounded-lg p-6 shadow-md border border-border">
                <h2 className="text-2xl font-heading font-bold mb-2">
                  Em breve: conteúdo sobre energia solar
                </h2>
                <p className="text-muted-foreground mb-4">
                  Estamos preparando artigos incríveis sobre energia solar, sustentabilidade e muito mais.
                </p>
                <span className="text-sm text-accent font-medium">
                  Em desenvolvimento
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
