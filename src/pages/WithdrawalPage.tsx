import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Search, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";

const WithdrawalPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const withdrawalData = [
    {
      drug: "Enrofloxacin",
      class: "Fluoroquinolone",
      meatPeriod: "14-28",
      milkPeriod: "84 hours (3.5 days)",
      priority: "Highest Priority CIA",
      species: ["Cattle", "Poultry", "Swine", "Sheep", "Goat"]
    },
    {
      drug: "Ceftriaxone", 
      class: "3rd Gen Cephalosporin",
      meatPeriod: "7-10",
      milkPeriod: "72 hours (3 days)",
      priority: "Highest Priority CIA",
      species: ["Cattle", "Buffalo", "Sheep", "Goat"]
    },
    {
      drug: "Oxytetracycline",
      class: "Tetracycline", 
      meatPeriod: "21-28",
      milkPeriod: "96-168 hours (4-7 days)",
      priority: "Highly Important",
      species: ["Cattle", "Sheep", "Goat", "Swine", "Poultry"]
    },
    {
      drug: "Amoxicillin",
      class: "Aminopenicillin",
      meatPeriod: "14-21", 
      milkPeriod: "60 hours (2.5 days)",
      priority: "High Priority CIA",
      species: ["Cattle", "Buffalo", "Sheep", "Goat", "Pigs"]
    },
    {
      drug: "Gentamicin",
      class: "Aminoglycoside",
      meatPeriod: "40+",
      milkPeriod: "72-120 hours (3-5 days)",
      priority: "High Priority CIA", 
      species: ["Cattle", "Horse", "Sheep", "Goat", "Poultry"]
    }
  ];

  const filteredData = withdrawalData.filter(item =>
    item.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    if (priority.includes("Highest")) return "destructive";
    if (priority.includes("High")) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Withdrawal Periods</h1>
          <p className="text-xl text-muted-foreground">
            Mandatory withdrawal periods for antimicrobials used in food-producing animals
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Active Withdrawals</CardTitle>
              <Clock className="h-4 w-4 text-blue-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">127</div>
              <p className="text-xs text-blue-600">Animals in withdrawal</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Cleared Today</CardTitle>
              <Clock className="h-4 w-4 text-green-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">34</div>
              <p className="text-xs text-green-600">Ready for market</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Extended Periods</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">8</div>
              <p className="text-xs text-orange-600">Beyond standard period</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Total Drugs</CardTitle>
              <Info className="h-4 w-4 text-purple-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{withdrawalData.length}</div>
              <p className="text-xs text-purple-600">In database</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Withdrawal Period Database
              </span>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{item.drug}</h3>
                      <p className="text-sm text-muted-foreground">{item.class}</p>
                    </div>
                    <Badge variant={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="font-medium text-sm text-muted-foreground block">Meat Withdrawal</span>
                      <p className="text-lg font-semibold text-red-600">{item.meatPeriod} days</p>
                    </div>
                    <div>
                      <span className="font-medium text-sm text-muted-foreground block">Milk Withdrawal</span>
                      <p className="text-lg font-semibold text-blue-600">{item.milkPeriod}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-sm text-muted-foreground block">Approved Species</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.species.map((species, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {species}
                          </Badge>
                        ))}
                      </div>
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
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-red-800">Mandatory Compliance</h3>
                  <p className="text-sm text-red-700">
                    Withdrawal periods must be strictly observed. Products from animals in withdrawal cannot be sold.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-orange-800">Variable Periods</h3>
                  <p className="text-sm text-orange-700">
                    Withdrawal periods may vary based on dosage, administration route, and animal condition.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-blue-800">Documentation Required</h3>
                  <p className="text-sm text-blue-700">
                    All treatments must be properly documented with dates, dosages, and withdrawal calculations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculation Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Start Date</h3>
                  <p className="text-sm text-muted-foreground">
                    Withdrawal period begins from the last day of treatment administration.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Safety Margin</h3>
                  <p className="text-sm text-muted-foreground">
                    Always use the maximum recommended withdrawal period when ranges are provided.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Extended Periods</h3>
                  <p className="text-sm text-muted-foreground">
                    Some conditions may require extended withdrawal periods beyond standard recommendations.
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

export default WithdrawalPage;