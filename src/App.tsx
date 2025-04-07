
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ApiModeToggle from "./components/ApiModeToggle";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import NotFound from "./pages/NotFound";

// Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Add Bootstrap JS
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="position-fixed bottom-0 end-0 p-3 z-3">
              <ApiModeToggle />
            </div>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/todos" 
                element={
                  <ProtectedRoute>
                    <Todos />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
