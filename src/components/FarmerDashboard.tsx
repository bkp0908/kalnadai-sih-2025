import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, Upload, Plus, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FarmerDashboardProps {
  userName: string;
  farmName: string;
}

export const FarmerDashboard = ({ userName, farmName }: FarmerDashboardProps) => {
  const [formData, setFormData] = useState({
    animalType: "",
    animalId: "",
    drugName: "",
    dosage: "",
    frequency: "",
    duration: "",
    reason: "",
    veterinarianId: "",
    notes: ""
  });
  
  const [recentEntries] = useState([
    {
      id: 1,
      date: "2024-09-03",
      animal: "Cow #A123",
      drug: "Amoxicillin",
      status: "Active",
      withdrawalDate: "2024-09-10"
    },
    {
      id: 2,
      date: "2024-09-01",
      animal: "Buffalo #B456",
      drug: "Oxytetracycline",
      status: "Completed",
      withdrawalDate: "2024-09-08"
    }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Withdrawal period for Cow #A123 ends in 2 days",
      date: "2024-09-05"
    },
    {
      id: 2,
      type: "success",
      message: "Buffalo #B456 cleared for processing",
      date: "2024-09-04"
    }
  ]);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Entry Submitted",
      description: "Antimicrobial usage has been recorded successfully.",
    });
    // Reset form
    setFormData({
      animalType: "",
      animalId: "",
      drugName: "",
      dosage: "",
      frequency: "",
      duration: "",
      reason: "",
      veterinarianId: "",
      notes: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-warning/10 text-warning border-warning";
      case "Completed": return "bg-success/10 text-success border-success";
      case "Overdue": return "bg-danger/10 text-danger border-danger";
      default: return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "success": return <CheckCircle className="h-4 w-4" />;
      case "info": return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="gradient-primary text-primary-foreground">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
          <p className="text-primary-foreground/80">{farmName} • Livestock Management Dashboard</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="record" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="record">Record Usage</TabsTrigger>
          <TabsTrigger value="history">Treatment History</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Log Antimicrobial Usage</span>
              </CardTitle>
              <CardDescription>
                Record detailed information about antimicrobial administration to your livestock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="animalType">Animal Type</Label>
                    <Select value={formData.animalType} onValueChange={(value) => setFormData(prev => ({...prev, animalType: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cattle">Cattle</SelectItem>
                        <SelectItem value="buffalo">Buffalo</SelectItem>
                        <SelectItem value="goat">Goat</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="pig">Pig</SelectItem>
                        <SelectItem value="poultry">Poultry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="animalId">Animal ID/Tag</Label>
                    <Input
                      id="animalId"
                      placeholder="e.g., A123, B456"
                      value={formData.animalId}
                      onChange={(e) => setFormData(prev => ({...prev, animalId: e.target.value}))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="drugName">Drug Name</Label>
                    <Select value={formData.drugName} onValueChange={(value) => setFormData(prev => ({...prev, drugName: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select antimicrobial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
                        <SelectItem value="oxytetracycline">Oxytetracycline</SelectItem>
                        <SelectItem value="penicillin">Penicillin</SelectItem>
                        <SelectItem value="streptomycin">Streptomycin</SelectItem>
                        <SelectItem value="enrofloxacin">Enrofloxacin</SelectItem>
                        <SelectItem value="tylosin">Tylosin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage (mg/kg)</Label>
                    <Input
                      id="dosage"
                      placeholder="e.g., 10mg/kg"
                      value={formData.dosage}
                      onChange={(e) => setFormData(prev => ({...prev, dosage: e.target.value}))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={formData.frequency} onValueChange={(value) => setFormData(prev => ({...prev, frequency: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once-daily">Once Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                        <SelectItem value="thrice-daily">Three Times Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="as-needed">As Needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="e.g., 5"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({...prev, duration: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reason">Treatment Reason</Label>
                    <Select value={formData.reason} onValueChange={(value) => setFormData(prev => ({...prev, reason: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select treatment reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="respiratory-infection">Respiratory Infection</SelectItem>
                        <SelectItem value="mastitis">Mastitis</SelectItem>
                        <SelectItem value="digestive-disorder">Digestive Disorder</SelectItem>
                        <SelectItem value="wound-infection">Wound Infection</SelectItem>
                        <SelectItem value="preventive">Preventive Treatment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="veterinarianId">Veterinarian ID (Optional)</Label>
                    <Input
                      id="veterinarianId"
                      placeholder="Enter veterinarian's ID or license number"
                      value={formData.veterinarianId}
                      onChange={(e) => setFormData(prev => ({...prev, veterinarianId: e.target.value}))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional observations or notes..."
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Take Photo</span>
                  </Button>
                  <Button type="button" variant="outline" className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload Prescription</span>
                  </Button>
                </div>

                <Button type="submit" className="w-full gradient-primary">
                  Submit Record
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Treatment Records</CardTitle>
              <CardDescription>
                View and manage your recent antimicrobial usage entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{entry.animal}</p>
                          <p className="text-sm text-muted-foreground">{entry.drug} • {entry.date}</p>
                        </div>
                        <Badge className={getStatusColor(entry.status)}>
                          {entry.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Withdrawal: {entry.withdrawalDate}</p>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Compliance Status</CardTitle>
              <CardDescription>
                Stay informed about withdrawal periods and compliance requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Alert key={alert.id} className={`border-l-4 ${alert.type === 'warning' ? 'border-l-warning' : alert.type === 'success' ? 'border-l-success' : 'border-l-primary'}`}>
                    <div className="flex items-start space-x-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <AlertTitle>
                          {alert.type === 'warning' ? 'Withdrawal Period Alert' : 
                           alert.type === 'success' ? 'Compliance Cleared' : 'Information'}
                        </AlertTitle>
                        <AlertDescription className="mt-1">
                          {alert.message}
                        </AlertDescription>
                        <p className="text-xs text-muted-foreground mt-2">{alert.date}</p>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};