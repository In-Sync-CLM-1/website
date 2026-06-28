import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import insyncLogo from "@/assets/insync-logo-color.png";
import DemoRequestModal from "./DemoRequestModal";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Products", href: "/products/eventsync" },
    { name: "Features", href: "/features" },
    { name: "Industries", href: "/industries" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
    { name: "Partnership", href: "/partnership" },
    { name: "Resources", href: "/resources" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-section">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img src={insyncLogo} alt="In-Sync" className="relative h-12 w-auto transform group-hover:scale-105 transition-transform" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="font-semibold text-foreground/70 hover:text-primary hover:bg-primary/5"
              asChild
            >
              <a href="https://crm.in-sync.co.in/login" target="_blank" rel="noopener noreferrer">
                CRM
              </a>
            </Button>
            <DemoRequestModal trigger={
              <Button variant="default" size="sm" className="font-semibold btn-glow rounded-lg">
                Request Demo
              </Button>
            } />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 glass-card rounded-b-xl -mx-4 px-4">
            <nav className="flex flex-col space-y-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors px-4 py-3 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/50 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-semibold"
                  asChild
                >
                  <a href="https://crm.in-sync.co.in/login" target="_blank" rel="noopener noreferrer">
                    CRM
                  </a>
                </Button>
                <DemoRequestModal trigger={
                  <Button variant="default" size="sm" className="w-full btn-glow">
                    Request Demo
                  </Button>
                } />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
