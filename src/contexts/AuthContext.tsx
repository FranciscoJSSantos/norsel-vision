import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authApi } from "@/services/authApi";
import type { User, LoginCredentials, AuthContextType } from "@/types/auth";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "norsel_auth_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await authApi.getMe(storedToken);
      setUser(userData);
      setToken(storedToken);
    } catch (error) {
      // Token inválido ou expirado
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const { access_token } = await authApi.login(credentials);

      // Salvar token
      localStorage.setItem(TOKEN_KEY, access_token);
      setToken(access_token);

      // Buscar dados do usuário
      const userData = await authApi.getMe(access_token);
      setUser(userData);

      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer login");
      throw error;
    }
  };

  const logout = () => {
    // Remover token
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);

    toast.success("Logout realizado com sucesso!");
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === "admin",
    login,
    logout,
    checkAuth,
  };

  // Não renderizar enquanto está verificando autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
