import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tractor, Stethoscope, Building2, Leaf, Shield, BarChart3 } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: string, userName: string, farmName?: string) => void;
}

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const [formData, setFormData] = useState({
    farmer: { name: "", farmName: "" },
    veterinarian: { name: "", licenseNumber: "" },
    government: { name: "", department: "" }
  });

  const handleLogin = (role: string) => {
    const data = formData[role as keyof typeof formData];
    if (data.name) {
      let extraInfo = "";
      if (role === "farmer" && "farmName" in data) {
        extraInfo = data.farmName;
      } else if (role === "veterinarian" && "licenseNumber" in data) {
        extraInfo = data.licenseNumber;
      } else if (role === "government" && "department" in data) {
        extraInfo = data.department;
      }
      onRoleSelect(role, data.name, extraInfo);
    }
  };

  const updateFormData = (role: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [role]: {
        ...prev[role as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen agricultural-pattern bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="gradient-primary w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-elegant">
            <Leaf className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Digital Farm Management Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitoring Maximum Residue Limits (MRL) and Antimicrobial Usage (AMU) in Livestock
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Select Your Role</CardTitle>
            <CardDescription>
              Choose your role to access the appropriate dashboard and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="farmer" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="farmer" className="flex items-center space-x-2">
                  <Tractor className="h-4 w-4" />
                  <span>Farmer</span>
                </TabsTrigger>
                <TabsTrigger value="veterinarian" className="flex items-center space-x-2">
                  <Stethoscope className="h-4 w-4" />
                  <span>Veterinarian</span>
                </TabsTrigger>
                <TabsTrigger value="government" className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Official</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="farmer">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tractor className="h-8 w-8 text-success" />
                    </div>
                    <CardTitle>Farmer Portal</CardTitle>
                    <CardDescription>
                      கால்நடைகளுக்கு நுண்ணுயிர் எதிர்ப்பு மருந்து பயன்பாட்டை பதிவு செய்யுங்கள், கால்நடை பதிவுகளை நிர்வகிக்கவும், இணக்க எச்சரிக்கைகளைப் பெறவும்
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmer-name">Your Name</Label>
                      <Input
                        id="farmer-name"
                        placeholder="Enter your name"
                        value={formData.farmer.name}
                        onChange={(e) => updateFormData("farmer", "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farm-name">Farm Name</Label>
                      <Input
                        id="farm-name"
                        placeholder="Enter your farm name"
                        value={formData.farmer.farmName}
                        onChange={(e) => updateFormData("farmer", "farmName", e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleLogin("farmer")} 
                      className="w-full gradient-primary"
                      disabled={!formData.farmer.name}
                    >
                      Access Farmer Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="veterinarian">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-sky/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="h-8 w-8 text-sky" />
                    </div>
                    <CardTitle>Veterinarian Portal</CardTitle>
                    <CardDescription>
                      Manage prescriptions, monitor treatment protocols, and verify farmer entries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vet-name">Your Name</Label>
                      <Input
                        id="vet-name"
                        placeholder="Enter your name"
                        value={formData.veterinarian.name}
                        onChange={(e) => updateFormData("veterinarian", "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license-number">License Number</Label>
                      <Input
                        id="license-number"
                        placeholder="Enter your license number"
                        value={formData.veterinarian.licenseNumber}
                        onChange={(e) => updateFormData("veterinarian", "licenseNumber", e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleLogin("veterinarian")} 
                      className="w-full gradient-sky"
                      disabled={!formData.veterinarian.name}
                    >
                      Access Veterinarian Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="government">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-earth/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-earth" />
                    </div>
                    <CardTitle>Government Official Portal</CardTitle>
                    <CardDescription>
                      Monitor compliance, analyze trends, and access comprehensive analytics dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="official-name">Your Name</Label>
                      <Input
                        id="official-name"
                        placeholder="Enter your name"
                        value={formData.government.name}
                        onChange={(e) => updateFormData("government", "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        placeholder="Enter your department"
                        value={formData.government.department}
                        onChange={(e) => updateFormData("government", "department", e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => handleLogin("government")} 
                      className="w-full gradient-earth"
                      disabled={!formData.government.name}
                    >
                      Access Analytics Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};