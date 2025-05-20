import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Forum from "@/pages/Forum";
import ThreadView from "@/pages/ThreadView";
import Shop from "@/pages/Shop";
import ProductView from "@/pages/ProductView";
import Learn from "@/pages/Learn";
import ArticleView from "@/pages/ArticleView";
import Profile from "@/pages/Profile";
import Cart from "@/pages/Cart";
import Auth from "@/pages/Auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/forum" component={Forum} />
          <Route path="/forum/:id" component={ThreadView} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/:id" component={ProductView} />
          <Route path="/learn" component={Learn} />
          <Route path="/learn/:id" component={ArticleView} />
          <Route path="/profile/:username" component={Profile} />
          <Route path="/cart" component={Cart} />
          <Route path="/auth" component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Set default title
    document.title = "Auto Detailing Nation - The Premier Community for Detailing Enthusiasts";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
