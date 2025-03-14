
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Victims from "./pages/Victims";
import Volunteers from "./pages/Volunteers";
import Organizations from "./pages/Organizations";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import Emergency from "./pages/Emergency";
import Auth from "./pages/Auth";
import VictimRegistration from "./pages/VictimRegistration";
import VolunteerRegistration from "./pages/VolunteerRegistration";
import OrganizationRegistration from "./pages/OrganizationRegistration";
import GovernmentRegistration from "./pages/GovernmentRegistration";
import Government from "./pages/Government";
import Donate from "./pages/Donate";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/victims" element={<Victims />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/government" element={<Government />} />
            <Route path="/news" element={<News />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/register/victim" element={<VictimRegistration />} />
            <Route path="/register/volunteer" element={<VolunteerRegistration />} />
            <Route path="/register/organization" element={<OrganizationRegistration />} />
            <Route path="/register/government" element={<GovernmentRegistration />} />
            <Route path="/donate" element={<Donate />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
