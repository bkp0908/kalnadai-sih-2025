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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Camera, Upload, Plus, Calendar, AlertTriangle, CheckCircle, Clock, Users, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FarmerDashboardProps {
  userName: string;
  farmName: string;
}

export const FarmerDashboard = ({ userName, farmName }: FarmerDashboardProps) => {
  const [treatmentMode, setTreatmentMode] = useState<"individual" | "batch">("individual");
  const [formData, setFormData] = useState({
    animalType: "",
    animalId: "",
    batchId: "",
    numberOfAnimals: "",
    drugName: "",
    dosage: "",
    frequency: "",
    duration: "",
    administrationMethod: "",
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

  // Set default mode based on animal type
  const handleAnimalTypeChange = (value: string) => {
    setFormData(prev => ({...prev, animalType: value}));
    
    // Set default modes
    const largeAnimals = ["cattle", "buffalo", "pig", "goat", "sheep"];
    const smallAnimals = ["poultry", "chicken", "duck", "rabbit"];
    
    if (largeAnimals.includes(value)) {
      setTreatmentMode("individual");
    } else if (smallAnimals.includes(value)) {
      setTreatmentMode("batch");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Entry Submitted",
      description: `Antimicrobial usage has been recorded successfully for ${treatmentMode === "batch" ? "batch treatment" : "individual animal"}.`,
    });
    // Reset form
    setFormData({
      animalType: "",
      animalId: "",
      batchId: "",
      numberOfAnimals: "",
      drugName: "",
      dosage: "",
      frequency: "",
      duration: "",
      administrationMethod: "",
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
                {/* Treatment Mode Selection */}
                <div className="space-y-3">
                  <Label>Treatment Mode</Label>
                  <ToggleGroup 
                    type="single" 
                    value={treatmentMode} 
                    onValueChange={(value) => value && setTreatmentMode(value as "individual" | "batch")}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="individual" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Individual Animal</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="batch" className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Batch / Group</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <p className="text-sm text-muted-foreground">
                    {treatmentMode === "individual" 
                      ? "Record treatment for a single animal with specific ID" 
                      : "Record treatment for a group, pen, or flock of animals"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Animal Type - Always visible */}
                  <div className="space-y-2">
                    <Label htmlFor="animalType">Animal Type</Label>
                    <Select value={formData.animalType} onValueChange={handleAnimalTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cattle">Cattle (மாடு)</SelectItem>
                        <SelectItem value="buffalo">Buffalo (எருமை)</SelectItem>
                        <SelectItem value="goat">Goat (ஆடு)</SelectItem>
                        <SelectItem value="sheep">Sheep (செம்மறி)</SelectItem>
                        <SelectItem value="pig">Pig (பன்றி)</SelectItem>
                        <SelectItem value="chicken">Chicken (கோழி)</SelectItem>
                        <SelectItem value="duck">Duck (வாத்து)</SelectItem>
                        <SelectItem value="rabbit">Rabbit (முயல்)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Animal ID - Only for Individual Mode */}
                  {treatmentMode === "individual" && (
                    <div className="space-y-2">
                      <Label htmlFor="animalId">Animal ID/Tag</Label>
                      <Input
                        id="animalId"
                        placeholder="e.g., A123, B456"
                        value={formData.animalId}
                        onChange={(e) => setFormData(prev => ({...prev, animalId: e.target.value}))}
                      />
                    </div>
                  )}

                  {/* Batch Selection - Only for Batch Mode */}
                  {treatmentMode === "batch" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="batchId">Batch / Pen / Group ID</Label>
                        <Select value={formData.batchId} onValueChange={(value) => setFormData(prev => ({...prev, batchId: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select batch/pen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pen-1">Pen 1</SelectItem>
                            <SelectItem value="pen-2">Pen 2</SelectItem>
                            <SelectItem value="pen-3">Pen 3</SelectItem>
                            <SelectItem value="barn-a">Barn A</SelectItem>
                            <SelectItem value="barn-b">Barn B</SelectItem>
                            <SelectItem value="flock-1">Flock 1</SelectItem>
                            <SelectItem value="flock-2">Flock 2</SelectItem>
                            <SelectItem value="group-young">Young Group</SelectItem>
                            <SelectItem value="group-adult">Adult Group</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="numberOfAnimals">Number of Animals (Optional)</Label>
                        <Input
                          id="numberOfAnimals"
                          type="number"
                          placeholder="e.g., 50"
                          value={formData.numberOfAnimals}
                          onChange={(e) => setFormData(prev => ({...prev, numberOfAnimals: e.target.value}))}
                        />
                      </div>
                    </>
                  )}

                  {/* Drug Name - Tamil names included */}
                  <div className="space-y-2">
                    <Label htmlFor="drugName">Drug Name</Label>
                    <Select value={formData.drugName} onValueChange={(value) => setFormData(prev => ({...prev, drugName: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select antimicrobial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amoxicillin">Amoxicillin - அமோக்சிசில்லின் (Amoxil, Amoxycillin)</SelectItem>
                        <SelectItem value="oxytetracycline">Oxytetracycline - ஆக்ஸிடெட்ராசைசைலின் (Terramycin, Oxytet)</SelectItem>
                        <SelectItem value="enrofloxacin">Enrofloxacin - என்ரோஃப்ளாக்சாசின் (Baytril, Enrocin)</SelectItem>
                        <SelectItem value="tylosin">Tylosin - டைலோசின் (Tylan, Tylosin)</SelectItem>
                        <SelectItem value="chloramphenicol">Chloramphenicol - குளோராம்பெனிகால் (Chloromycetin)</SelectItem>
                        <SelectItem value="doxycycline">Doxycycline - டாக்சிசைக்கிளின் (Vibramycin)</SelectItem>
                        <SelectItem value="gentamicin">Gentamicin - ஜென்டாமிசின் (Gentamicin)</SelectItem>
                        <SelectItem value="ciprofloxacin">Ciprofloxacin - சிப்ரோஃப்ளாக்சாசின் (Cipro, Cifran)</SelectItem>
                        <SelectItem value="sulfachlorpyridazine">Sulfachlorpyridazine - சல்பாச்லோர்பிரிடாசின் (Vetisulid)</SelectItem>
                        <SelectItem value="colistin">Colistin - கொலிஸ்டின் (Coly-Mycin M)</SelectItem>
                        <SelectItem value="amikacin">Amikacin - அமிகாசின் (Amikacin)</SelectItem>
                        <SelectItem value="trimethoprim-sulphamethoxazole">Trimethoprim-Sulphamethoxazole - டிரைமெதோபிரிம்-சல்பாமெதோக்சாசோலே (Bactrim, Septrin)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dosage">
                      Dosage {treatmentMode === "batch" ? "(per animal)" : ""} (mg/kg)
                    </Label>
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
                        <SelectItem value="once-daily">Once Daily (நாளொன்றுக்கு ஒருமுறை)</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily (நாளொன்றுக்கு இருமுறை)</SelectItem>
                        <SelectItem value="thrice-daily">Three Times Daily (நாளொன்றுக்கு மூன்றுமுறை)</SelectItem>
                        <SelectItem value="weekly">Weekly (வாரத்திற்கு ஒருமுறை)</SelectItem>
                        <SelectItem value="as-needed">As Needed (தேவையானபோது)</SelectItem>
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

                  <div className="space-y-2">
                    <Label htmlFor="administrationMethod">Administration Method</Label>
                    <Select value={formData.administrationMethod} onValueChange={(value) => setFormData(prev => ({...prev, administrationMethod: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oral">Oral (வாய்வழி)</SelectItem>
                        <SelectItem value="injection-im">Injection - Intramuscular (தசையினுள் ஊசி)</SelectItem>
                        <SelectItem value="injection-iv">Injection - Intravenous (நரம்பினுள் ஊசி)</SelectItem>
                        <SelectItem value="injection-sc">Injection - Subcutaneous (தோலடியில் ஊசி)</SelectItem>
                        <SelectItem value="topical">Topical (மேற்பூச்சு)</SelectItem>
                        <SelectItem value="feed-mix">Mixed in Feed (உணவில் கலந்து)</SelectItem>
                        <SelectItem value="water">In Drinking Water (குடிநீரில்)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Treatment Reason</Label>
                    <Select value={formData.reason} onValueChange={(value) => setFormData(prev => ({...prev, reason: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select treatment reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="respiratory-infection">Respiratory Infection (சுவாச தொற்று)</SelectItem>
                        <SelectItem value="mastitis">Mastitis (மடி அழற்சி)</SelectItem>
                        <SelectItem value="digestive-disorder">Digestive Disorder (செரிமான கோளாறு)</SelectItem>
                        <SelectItem value="wound-infection">Wound Infection (காயத் தொற்று)</SelectItem>
                        <SelectItem value="fever">Fever (காய்ச்சல்)</SelectItem>
                        <SelectItem value="preventive">Preventive Treatment (தடுப்பு சிகிச்சை)</SelectItem>
                        <SelectItem value="other">Other (மற்றவை)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
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

                  {treatmentMode === "batch" && formData.numberOfAnimals && (
                    <div className="p-4 bg-muted rounded-lg">
                      <Label className="text-sm font-medium">Estimated Total Medicine Quantity</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.dosage && formData.numberOfAnimals 
                          ? `Approximately ${parseFloat(formData.numberOfAnimals) * (parseFloat(formData.dosage.replace(/[^0-9.]/g, '')) || 0)} mg total (based on ${formData.dosage} per animal × ${formData.numberOfAnimals} animals)`
                          : "Enter dosage and number of animals to see estimate"}
                      </p>
                    </div>
                  )}
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
                  Submit Record - {treatmentMode === "batch" ? "Batch Treatment" : "Individual Animal"}
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