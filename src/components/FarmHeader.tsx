import { Bell, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface FarmHeaderProps {
  userRole: string;
  userName: string;
  farmName?: string;
  onRoleSwitch: () => void;
}

export const FarmHeader = ({ userRole, userName, farmName, onRoleSwitch }: FarmHeaderProps) => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "farmer": return "default";
      case "veterinarian": return "secondary";
      case "government": return "outline";
      default: return "default";
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🌾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Farm Management Portal</h1>
              {farmName && <p className="text-muted-foreground text-sm">{farmName}</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant={getRoleBadgeVariant(userRole)} className="capitalize">
              {userRole}
            </Badge>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-danger rounded-full text-xs"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onRoleSwitch}>
                  <User className="mr-2 h-4 w-4" />
                  Switch Role
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};