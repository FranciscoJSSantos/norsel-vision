import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import Clientes from "./pages/Clientes";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen w-full overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/create" element={<CreatePost />} />
              <Route path="/blog/edit/:id" element={<EditPost />} />
              <Route path="/blog/:id" element={<PostDetail />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/login" element={<Login />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
