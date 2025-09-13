import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const LegalitiesDropdown = ({ isMobile = false }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`flex items-center gap-1 ${isMobile ? 'w-full justify-start' : ''}`}>
          Legalities
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isMobile ? "start" : "end"} className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/docs" className="w-full">
            Docs/Datasets
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/mrl" className="w-full">
            MRL Compliance
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/banned" className="w-full">
            Banned Antimicrobials
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/withdrawal" className="w-full">
            Withdrawal Periods
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="gradient-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">🌾</span>
            </div>
            <span className="font-bold text-xl text-foreground">Kalnadai AMR Portal</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Video Tutorial
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <a 
                    href="https://youtu.be/NVIe8Bj78rE?si=uqHDbKKrfbj5Mqmh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    English Tutorial
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a 
                    href="https://youtu.be/-PRj8Rj7x4c?si=esORghdZMi-Pd35T" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    Tamil Tutorial
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <LegalitiesDropdown />
            
            <Button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                  </Button>
                  
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                  </Button>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground px-3">Video Tutorial</p>
                    <Button variant="ghost" asChild className="justify-start w-full">
                      <a 
                        href="https://youtu.be/NVIe8Bj78rE?si=uqHDbKKrfbj5Mqmh" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                      >
                        English Tutorial
                      </a>
                    </Button>
                    <Button variant="ghost" asChild className="justify-start w-full">
                      <a 
                        href="https://youtu.be/-PRj8Rj7x4c?si=esORghdZMi-Pd35T" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                      >
                        Tamil Tutorial
                      </a>
                    </Button>
                  </div>
                  
                  <LegalitiesDropdown isMobile />
                  
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;