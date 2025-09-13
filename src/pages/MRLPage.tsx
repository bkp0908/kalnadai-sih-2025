import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, Download } from "lucide-react";

const MRLPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">MRL Compliance</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Maximum Residue Limits (MRL) guidelines and compliance monitoring for food safety
          </p>
          <Button asChild className="gap-2">
            <a href="/docs/MRL-Guidelines.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" />
              Download Official MRL Guidelines (PDF)
            </a>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Compliant Products</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">847</div>
              <p className="text-xs text-green-600">Within MRL limits</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-800">Approaching Limits</CardTitle>
              <Info className="h-4 w-4 text-yellow-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">23</div>
              <p className="text-xs text-yellow-600">80-95% of MRL</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Non-Compliant</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">5</div>
              <p className="text-xs text-red-600">Exceeding MRL limits</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>FSSAI MRL Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold">Fluoroquinolones</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    MRL: 0.1 mg/kg (Muscle, Liver, Kidney, Fat)
                  </p>
                  <Badge variant="secondary">Highest Priority CIA</Badge>
                </div>
                
                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="font-semibold">Cephalosporins</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    MRL: 0.1-4.0 mg/kg (varies by tissue type)
                  </p>
                  <Badge variant="secondary">Highest Priority CIA</Badge>
                </div>
                
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="font-semibold">Tetracyclines</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    MRL: 0.1-0.6 mg/kg (varies by tissue type)
                  </p>
                  <Badge variant="outline">Highly Important</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Automated Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular sampling and testing protocols to ensure MRL compliance across all registered farms.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Real-time Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Immediate notifications when residue levels approach or exceed established limits.
                  </p>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Corrective Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Mandatory withdrawal period extensions and enhanced monitoring protocols.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent MRL Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent MRL violations detected</p>
              <p className="text-sm">All monitored products are within acceptable limits</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MRLPage;