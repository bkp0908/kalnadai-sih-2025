import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { LoginPage } from "@/components/LoginPage";
import { KalnadaiFarmerDashboard } from "@/components/KalnadaiFarmerDashboard";
import { KalnadaiVeterinarianDashboard } from "@/components/KalnadaiVeterinarianDashboard";
import { KalnadaiGovernmentDashboard } from "@/components/KalnadaiGovernmentDashboard";
import { Bell, User, LogOut, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Index = () => {
  const [language, setLanguage] = useState<'english' | 'tamil'>('tamil');
  const [roleOverride, setRoleOverride] = useState<'farmer' | 'veterinarian' | 'government' | null>(null);
  const { user, profile, loading, signOut } = useAuth();

  useEffect(() => {
    if (profile?.role === 'farmer') setLanguage('tamil');
  }, [profile?.role]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>;
  }

  if (!user || !profile) {
    return <LoginPage language={language} setLanguage={setLanguage} />;
  }

  const renderDashboard = () => {
    const role = roleOverride ?? profile.role;
    switch (role) {
      case 'farmer':
        return <KalnadaiFarmerDashboard language={language} />;
      case 'veterinarian':
        return <KalnadaiVeterinarianDashboard language={language} />;
      case 'government':
        return <KalnadaiGovernmentDashboard language={language} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Kalnadai Portal</h1>
                <p className="text-muted-foreground text-sm">Digital Livestock Monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
                className="gap-2"
              >
                <Languages className="h-4 w-4" />
                {language === 'english' ? 'தமிழ்' : 'English'}
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-danger rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">{profile.full_name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    Settings (Coming soon)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleOverride(null)}>
                    Use Profile Role: {profile.role}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleOverride('farmer')}>
                    Switch to Farmer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleOverride('veterinarian')}>
                    Switch to Veterinarian
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleOverride('government')}>
                    Switch to Government
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;