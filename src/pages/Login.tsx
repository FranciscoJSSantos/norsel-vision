import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import NorselLogo from "@/brand/NorselLogo";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Se já estiver autenticado, redirecionar
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      // Erro já tratado no AuthContext (toast)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="ml-12 flex justify-center mb-4 m-lg-5">
            <NorselLogo width={200} height={60} />
          </div>
          <CardTitle className="text-2xl font-heading font-bold text-foreground">
            Portal Administrativo
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Faça login para acessar o painel de administração
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Email ou Usuário
              </label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="border-2 focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Senha
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="border-2 focus:border-accent"
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-accent"
            >
              Voltar para o site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
