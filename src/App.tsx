import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import { Loader2 } from "lucide-react";

// Eager load Index (homepage) for fast initial render
import Index from "./pages/Index";

// Lazy load all other pages for code splitting
const Sobre = lazy(() => import("./pages/Sobre"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Clientes = lazy(() => import("./pages/Clientes"));
const Contato = lazy(() => import("./pages/Contato"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-accent" />
  </div>
);

// Configure React Query with optimized caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache data for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests once
      retry: 1,
      // Don't refetch on window focus for better performance
      refetchOnWindowFocus: false,
      // Refetch on mount only if data is stale
      refetchOnMount: true,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen w-full overflow-x-hidden">
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
