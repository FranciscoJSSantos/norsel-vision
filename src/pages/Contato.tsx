import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contato = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    servico: "",
    mensagem: "",
  });

  // Preencher mensagem se vier da página de serviços
  useEffect(() => {
    if (location.state?.mensagem) {
      setFormData((prev) => ({
        ...prev,
        mensagem: location.state.mensagem,
      }));
    }
  }, [location]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formatar mensagem para WhatsApp
    const mensagemWhatsApp = `*Nova Solicitação de Contato*%0A%0A*Nome:* ${formData.nome}%0A*Email:* ${formData.email}%0A*Telefone:* ${formData.telefone}%0A*Cidade/Estado:* ${formData.cidade}%0A*Serviço de Interesse:* ${formData.servico}%0A*Mensagem:* ${formData.mensagem}`;

    // Redirecionar para WhatsApp
    window.open(
      `https://wa.me/5579998305785?text=${mensagemWhatsApp}`,
      "_blank"
    );

    // Limpar formulário
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      cidade: "",
      servico: "",
      mensagem: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Cabeçalho */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Fale com a nossa equipe
              </h1>
              <p className="text-lg text-muted-foreground">
                Retornamos rapidamente com análise técnica e próxima etapa.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Formulário de Contato */}
              <div className="bg-card rounded-lg p-8 shadow-md border border-border">
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Envie sua mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium mb-2"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-medium mb-2"
                    >
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cidade"
                      className="block text-sm font-medium mb-2"
                    >
                      Cidade/Estado *
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="servico"
                      className="block text-sm font-medium mb-2"
                    >
                      Serviço de interesse *
                    </label>
                    <select
                      id="servico"
                      name="servico"
                      value={formData.servico}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Selecione um serviço</option>
                      <option value="Energia Solar Residencial">
                        Energia Solar Residencial
                      </option>
                      <option value="Energia Solar Comercial">
                        Energia Solar Comercial
                      </option>
                      <option value="Projetos Elétricos">
                        Projetos Elétricos
                      </option>
                      <option value="Manutenção e Monitoramento">
                        Manutenção e Monitoramento
                      </option>
                      <option value="Consultoria">Consultoria</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="mensagem"
                      className="block text-sm font-medium mb-2"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                  >
                    Enviar mensagem
                  </Button>
                </form>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-8 shadow-md border border-border">
                  <h2 className="text-2xl font-heading font-bold mb-6">
                    Informações de Contato
                  </h2>

                  <div className="space-y-6">
                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/5579998305785"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/10 transition-colors group"
                    >
                      <Phone className="w-6 h-6 text-accent mt-1 group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-semibold mb-1">
                          WhatsApp / Telefone
                        </h3>
                        <p className="text-muted-foreground">
                          +55 (79) 99830-5785
                        </p>
                      </div>
                    </a>

                    {/* Email */}
                    <a
                      href="mailto:contato@norsel.com.br"
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/10 transition-colors group"
                    >
                      <Mail className="w-6 h-6 text-accent mt-1 group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="font-semibold mb-1">E-mail</h3>
                        <p className="text-muted-foreground">
                          contato@norsel.com.br
                        </p>
                      </div>
                    </a>

                    {/* Endereço */}
                    <div className="flex items-start gap-4 p-4">
                      <MapPin className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Endereço</h3>
                        <p className="text-muted-foreground">
                          Rua Urquiza Leal, 98
                          <br />
                          Aracaju/SE - CEP 49020-490
                        </p>
                      </div>
                    </div>

                    {/* Horário */}
                    <div className="flex items-start gap-4 p-4">
                      <Clock className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">
                          Horário de Atendimento
                        </h3>
                        <p className="text-muted-foreground">
                          Segunda a Sexta
                          <br />
                          9h às 18h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mapa */}
                <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3899999999994!2d-37.0563!3d-10.9119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71ab1f1c0c7a7e7%3A0x1234567890abcdef!2sRua%20Urquiza%20Leal%2C%2098%20-%20Aracaju%2C%20SE%2C%2049020-490!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Norsel Engenharia"
                  />
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

export default Contato;
