import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Clock, FileText, Users, AlertTriangle, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VeterinarianDashboardProps {
  userName: string;
  licenseNumber: string;
}

export const VeterinarianDashboard = ({ userName, licenseNumber }: VeterinarianDashboardProps) => {
  const [pendingReviews] = useState([
    {
      id: 1,
      farmName: "Green Valley Farm",
      farmer: "John Doe",
      animal: "Cow #A123",
      drug: "Amoxicillin",
      date: "2024-09-04",
      status: "pending"
    },
    {
      id: 2,
      farmName: "Sunshine Dairy",
      farmer: "Jane Smith",
      animal: "Buffalo #B456",
      drug: "Oxytetracycline",
      date: "2024-09-03",
      status: "pending"
    }
  ]);

  const [managedFarms] = useState([
    {
      id: 1,
      name: "Green Valley Farm",
      farmer: "John Doe",
      location: "Punjab",
      animals: 150,
      lastVisit: "2024-09-01",
      compliance: 95
    },
    {
      id: 2,
      name: "Sunshine Dairy",
      farmer: "Jane Smith",
      location: "Haryana",
      animals: 200,
      lastVisit: "2024-08-28",
      compliance: 88
    },
    {
      id: 3,
      name: "Golden Meadow",
      farmer: "Raj Kumar",
      location: "Uttar Pradesh",
      animals: 120,
      lastVisit: "2024-08-25",
      compliance: 92
    }
  ]);

  const [prescriptionStats] = useState({
    thisMonth: 45,
    lastMonth: 38,
    compliant: 42,
    flagged: 3
  });

  const { toast } = useToast();

  const handleApproval = (id: number, approved: boolean) => {
    toast({
      title: approved ? "Entry Approved" : "Entry Flagged",
      description: approved 
        ? "The antimicrobial usage entry has been approved." 
        : "The entry has been flagged for review.",
    });
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-success";
    if (compliance >= 85) return "text-warning";
    return "text-danger";
  };

  const getComplianceBadge = (compliance: number) => {
    if (compliance >= 95) return "bg-success/10 text-success border-success";
    if (compliance >= 85) return "bg-warning/10 text-warning border-warning";
    return "bg-danger/10 text-danger border-danger";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="gradient-sky text-sky-foreground">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Dr. {userName}</h2>
          <p className="text-sky-foreground/80">License: {licenseNumber} • Veterinary Professional Dashboard</p>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{prescriptionStats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">Prescriptions This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-sky" />
              <div>
                <p className="text-2xl font-bold">{managedFarms.length}</p>
                <p className="text-xs text-muted-foreground">Managed Farms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{prescriptionStats.compliant}</p>
                <p className="text-xs text-muted-foreground">Compliant Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{prescriptionStats.flagged}</p>
                <p className="text-xs text-muted-foreground">Flagged for Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="farms">Managed Farms</TabsTrigger>
          <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Entries Requiring Review</CardTitle>
              <CardDescription>
                Review and approve antimicrobial usage entries from farmers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{entry.farmName}</p>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entry.farmer} • {entry.animal} • {entry.drug}
                        </p>
                        <p className="text-xs text-muted-foreground">Submitted: {entry.date}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApproval(entry.id, false)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Flag
                      </Button>
                      <Button 
                        size="sm" 
                        className="gradient-primary"
                        onClick={() => handleApproval(entry.id, true)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="farms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Managed Farms Overview</CardTitle>
              <CardDescription>
                Monitor compliance and performance across your assigned farms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farm Name</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Animals</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {managedFarms.map((farm) => (
                    <TableRow key={farm.id}>
                      <TableCell className="font-medium">{farm.name}</TableCell>
                      <TableCell>{farm.farmer}</TableCell>
                      <TableCell>{farm.location}</TableCell>
                      <TableCell>{farm.animals}</TableCell>
                      <TableCell>{farm.lastVisit}</TableCell>
                      <TableCell>
                        <Badge className={getComplianceBadge(farm.compliance)}>
                          {farm.compliance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Management</CardTitle>
              <CardDescription>
                Create and manage prescriptions for your farms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm-select">Select Farm</Label>
                    <Input placeholder="Search farms..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="animal-select">Animal ID</Label>
                    <Input placeholder="Enter animal ID" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Prescribed Drug</Label>
                    <Input placeholder="Drug name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Dosage</Label>
                    <Input placeholder="mg/kg" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input placeholder="Days" />
                  </div>
                </div>

                <Button className="gradient-sky">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Prescription
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-success mr-2" />
                    <span className="font-semibold text-success">+18%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">vs Last Month</p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span className="font-semibold">93%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Compliance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};