import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import Homepage from "./pages/Homepage";
import DocsPage from "./pages/DocsPage";
import MRLPage from "./pages/MRLPage";
import BannedPage from "./pages/BannedPage";
import WithdrawalPage from "./pages/WithdrawalPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import Navbar from "@/components/Navbar";
import { SimplifiedGovernmentDashboard } from "@/components/SimplifiedGovernmentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes with navbar */}
            <Route path="/" element={
              <div>
                <Navbar />
                <Homepage />
              </div>
            } />
            <Route path="/docs" element={
              <div>
                <Navbar />
                <DocsPage />
              </div>
            } />
            <Route path="/mrl" element={
              <div>
                <Navbar />
                <MRLPage />
              </div>
            } />
            <Route path="/banned" element={
              <div>
                <Navbar />
                <BannedPage />
              </div>
            } />
            <Route path="/withdrawal" element={
              <div>
                <Navbar />
                <WithdrawalPage />
              </div>
            } />
            <Route path="/about" element={
              <div>
                <Navbar />
                <AboutPage />
              </div>
            } />
            
            {/* App routes without navbar */}
            <Route path="/login" element={<Index />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/simple-government" element={<SimplifiedGovernmentDashboard language="english" />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
