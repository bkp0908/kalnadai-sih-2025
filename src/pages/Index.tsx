import { useState } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { FarmHeader } from "@/components/FarmHeader";
import { FarmerDashboard } from "@/components/FarmerDashboard";
import { VeterinarianDashboard } from "@/components/VeterinarianDashboard";
import { GovernmentDashboard } from "@/components/GovernmentDashboard";

interface UserData {
  role: string;
  userName: string;
  extraInfo: string;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleRoleSelect = (role: string, userName: string, extraInfo?: string) => {
    setCurrentUser({
      role,
      userName,
      extraInfo: extraInfo || ""
    });
  };

  const handleRoleSwitch = () => {
    setCurrentUser(null);
  };

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case "farmer":
        return (
          <FarmerDashboard 
            userName={currentUser.userName} 
            farmName={currentUser.extraInfo}
          />
        );
      case "veterinarian":
        return (
          <VeterinarianDashboard 
            userName={currentUser.userName} 
            licenseNumber={currentUser.extraInfo}
          />
        );
      case "government":
        return (
          <GovernmentDashboard 
            userName={currentUser.userName} 
            department={currentUser.extraInfo}
          />
        );
      default:
        return null;
    }
  };

  if (!currentUser) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <FarmHeader 
        userRole={currentUser.role}
        userName={currentUser.userName}
        farmName={currentUser.extraInfo}
        onRoleSwitch={handleRoleSwitch}
      />
      <main className="container mx-auto px-6 py-6">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;