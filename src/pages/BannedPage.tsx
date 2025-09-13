import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Ban, Info } from "lucide-react";

const BannedPage = () => {
  const bannedSubstances = [
    {
      name: "Chloramphenicol",
      category: "Antibiotic",
      reason: "Aplastic anemia risk",
      status: "Completely Banned",
      severity: "high"
    },
    {
      name: "Nitrofurans",
      category: "Antibiotic",
      reason: "Carcinogenic potential",
      status: "Completely Banned", 
      severity: "high"
    },
    {
      name: "Nitroimidazoles",
      category: "Antiprotozoal",
      reason: "Mutagenic and carcinogenic",
      status: "Completely Banned",
      severity: "high"
    },
    {
      name: "Stilbenes",
      category: "Growth Promoter",
      reason: "Hormonal disruption",
      status: "Banned for Growth Promotion",
      severity: "medium"
    },
    {
      name: "Carbadox",
      category: "Growth Promoter",
      reason: "Carcinogenic residues",
      status: "Banned in Food Animals",
      severity: "high"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Banned Antimicrobials</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive list of antimicrobials prohibited for use in food-producing animals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Total Banned</CardTitle>
              <Ban className="h-4 w-4 text-red-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">{bannedSubstances.length}</div>
              <p className="text-xs text-red-600">Prohibited substances</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {bannedSubstances.filter(s => s.severity === 'high').length}
              </div>
              <p className="text-xs text-orange-600">Severe health risks</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Violations Detected</CardTitle>
              <Info className="h-4 w-4 text-blue-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">0</div>
              <p className="text-xs text-blue-600">This month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-red-600" />
              Prohibited Substances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bannedSubstances.map((substance, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{substance.name}</h3>
                    <Badge 
                      variant={substance.severity === 'high' ? 'destructive' : 'secondary'}
                      className="ml-2"
                    >
                      {substance.status}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Category:</span>
                      <p>{substance.category}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Reason for Ban:</span>
                      <p>{substance.reason}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Risk Level:</span>
                      <p className={substance.severity === 'high' ? 'text-red-600 font-medium' : 'text-orange-600'}>
                        {substance.severity === 'high' ? 'High Risk' : 'Medium Risk'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">FSSAI Regulations</h3>
                  <p className="text-sm text-muted-foreground">
                    Food Safety and Standards Authority of India guidelines on prohibited substances in food animals.
                  </p>
                </div>
                
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="font-semibold">WHO Guidelines</h3>
                  <p className="text-sm text-muted-foreground">
                    World Health Organization recommendations on critically important antimicrobials.
                  </p>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold">Codex Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    International food standards for veterinary drug residues in foods.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enforcement Measures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-sm mb-2 text-red-800">Zero Tolerance</h3>
                  <p className="text-sm text-red-700">
                    Any detection of banned substances results in immediate product recall and investigation.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-sm mb-2 text-orange-800">Penalties</h3>
                  <p className="text-sm text-orange-700">
                    Severe financial penalties and potential criminal charges for violations.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-sm mb-2 text-blue-800">Monitoring</h3>
                  <p className="text-sm text-blue-700">
                    Continuous surveillance through residue testing programs and farm inspections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BannedPage;