import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Index from "./pages/Index";
import FeaturedProperties from "./pages/FeaturedProperties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";   // ✔ FINAL WORKING ONE

import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";

import PastTransactions from "./pages/PastTransactions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/featured-properties" element={<FeaturedProperties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Blog list */}
          <Route path="/blog" element={<Blog />} />

          {/* Static blogs */}
          <Route path="/blog/luxury-farmhouses-hyderabad" element={<BlogPost1 />} />
          <Route path="/blog/navigating-luxury-real-estate-hyderabad" element={<BlogPost2 />} />
          <Route path="/blog/terranova-difference-legacy-farmhouses" element={<BlogPost3 />} />

          {/* Dynamic blog detail */}
          <Route path="/blog/:id" element={<BlogDetail />} />

          <Route path="/past-transactions" element={<PastTransactions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/careers" element={<Careers />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
