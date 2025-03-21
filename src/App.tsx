import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ChatProvider } from "@/context/ChatContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import JobCategories from "./pages/JobCategories";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import Services from "./pages/Services";
import SoftwareJobs from "./pages/SoftwareJobs";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ChatProvider>
            <Toaster />
            <Sonner />
            <ChatBot />
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/job-categories" element={<JobCategories />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/software-development" element={<SoftwareJobs />} />
                <Route path="/jobs/software-development/:id" element={<SoftwareJobDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </ChatProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
