import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlertTriangle, CheckCircle, Clock, Eye, Users, User } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { isInWithdrawalPeriod, getDaysUntilWithdrawalEnd, getWithdrawalPeriod } from '@/data/withdrawalPeriods';

interface FarmerEntry {
  EntryID: number;
  FarmerName: string;
  FarmName: string;
  AnimalID: string;
  AnimalType: string;
  Medicine: string;
  Dosage: string;
  Frequency: string;
  Duration: string;
  Reason: string;
  Date: string;
  VetApproved: string;
  WithdrawalStatus: string;
  State?: string;
  District?: string;
  BlockchainID?: string;
  PhotoURL?: string;
  PrescriptionFileURL?: string;
}

const translations = {
  english: {
    welcome: 'Welcome back',
    recordUsage: 'Record Usage',
    treatmentHistory: 'Treatment History',
    alertsTab: 'Alerts & Compliance',
    treatmentMode: 'Treatment Mode',
    individualMode: 'Individual Animal',
    batchMode: 'Batch / Group',
    individualDesc: 'Record treatment for a single animal with specific ID',
    batchDesc: 'Record treatment for a group, pen, or flock of animals',
    animalType: 'Animal Type',
    animalId: 'Animal ID',
    batchId: 'Batch / Pen / Group ID',
    numberOfAnimals: 'Number of Animals (Optional)',
    drugName: 'Drug Name',
    dosage: 'Dosage',
    frequency: 'Frequency',
    duration: 'Duration',
    reason: 'Reason for Treatment',
    takePhoto: 'Take Photo',
    uploadPrescription: 'Upload Prescription',
    submit: 'Submit Entry',
    recent: 'Recent Entries',
    viewDetails: 'View Details',
    compliant: 'Compliant',
    nonCompliant: 'Non-Compliant',
    inWithdrawal: 'In Withdrawal',
    vetApproved: 'Vet Approved',
    pending: 'Pending Approval',
    description: 'Log antimicrobial usage for your animals',
    administrationMethod: 'Administration Method',
    submitting: 'Submitting...',
    reasonLabel: 'Reason:',
    placeholder: {
      animalType: 'Select animal type',
      medicine: 'Select medicine',
      frequency: 'Select frequency',
      method: 'Select method',
      reason: 'Fever, Infection, etc.'
    },
    alerts: {
      withdrawalPeriodAlert: 'Withdrawal Period Alert',
      detailedComplianceStatus: 'Detailed Compliance Status',
      withdrawalPeriodActive: 'Withdrawal Period Active',
      mrlLimitApproached: 'MRL Limit Approached',
      actionRequired: 'Action Required',
      daysLeft: 'days left',
      overallCompliance: 'Overall Compliance',
      mrlCompliance: 'MRL Compliance',
      recordKeeping: 'Record Keeping',
      vetApprovals: 'Vet Approvals',
      good: 'Good',
      complete: 'Complete',
      highUsageDetected: 'High antibiotic usage detected this month',
      withdrawalRemaining: 'has {} days remaining'
    },
    history: {
      prescription: 'Prescription:',
      viewPrescription: 'View Prescription',
      photo: 'Photo:',
      viewPhoto: 'View Photo'
    }
  },
  tamil: {
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    recordUsage: 'பயன்பாட்டை பதிவு செய்க',
    treatmentHistory: 'சிகிச்சை வரலாறு',
    alertsTab: 'எச்சரிக்கைகள் & இணக்கம்',
    treatmentMode: 'சிகிச்சை முறை',
    individualMode: 'தனிப்பட்ட விலங்கு',
    batchMode: 'குழு / கூட்டம்',
    individualDesc: 'குறிப்பிட்ட எண்ணுடன் ஒரு விலங்குக்கு சிகிச்சை பதிவு செய்க',
    batchDesc: 'விலங்குகளின் குழு, கொட்டகை அல்லது மந்தைக்கு சிகிச்சை பதிவு செய்க',
    animalType: 'கால்நடை வகை',
    animalId: 'கால்நடை எண்',
    batchId: 'குழு / கொட்டகை / குழுமம் எண்',
    numberOfAnimals: 'விலங்குகளின் எண்ணிக்கை (விருப்பம்)',
    drugName: 'மருந்தின் பெயர்',
    dosage: 'அளவு',
    frequency: 'அடிக்கடி',
    duration: 'கால அளவு',
    reason: 'சிகிச்சையின் காரணம்',
    takePhoto: 'புகைப்படம் எடுக்க',
    uploadPrescription: 'மருந்துச்சீட்டு பதிவேற்ற',
    submit: 'சமர்ப்பிக்க',
    recent: 'சமீபத்திய பதிவுகள்',
    viewDetails: 'விவரங்களைப் பார்க்க',
    compliant: 'இணக்கமான',
    nonCompliant: 'இணக்கமற்ற',
    inWithdrawal: 'திரும்பப் பெறுதலில்',
    vetApproved: 'மருத்துவர் ஒப்புதல்',
    pending: 'ஒப்புதல் நிலுவையில்',
    description: 'உங்கள் கால்நடைகளுக்கு நுண்ணுயிர் எதிர்ப்பு மருந்து பயன்பாட்டை பதிவு செய்யுங்கள்',
    administrationMethod: 'மருந்து அளிக்கும் முறை',
    submitting: 'சமர்ப்பிக்கிறது...',
    reasonLabel: 'காரணம்:',
    placeholder: {
      animalType: 'கால்நடை வகையைத் தேர்ந்தெடுக்கவும்',
      medicine: 'மருந்தைத் தேர்ந்தெடுக்கவும்',
      frequency: 'அடிக்கடி தேர்ந்தெடுக்கவும்',
      method: 'முறையைத் தேர்ந்தெடுக்கவும்',
      reason: 'காய்ச்சல், தொற்று, முதலியன.'
    },
    alerts: {
      withdrawalPeriodAlert: 'திரும்பப் பெறும் காலம் எச்சரிக்கை',
      detailedComplianceStatus: 'விரிவான இணக்க நிலை',
      withdrawalPeriodActive: 'திரும்பப் பெறும் காலம் செயல்படுகிறது',
      mrlLimitApproached: 'MRL வரம்பு நெருங்கப்பட்டது',
      actionRequired: 'நடவடிக்கை தேவைப்படுகிறது',
      daysLeft: 'நாட்கள் மீதமுள்ளன',
      overallCompliance: 'ஒட்டுமொத்த இணக்கம்',
      mrlCompliance: 'MRL இணக்கம்',
      recordKeeping: 'பதிவு வைத்தல்',
      vetApprovals: 'மருத்துவர் ஒப்புதல்கள்',
      good: 'நல்லது',
      complete: 'முழுமையானது',
      highUsageDetected: 'இந்த மாதம் அதிக நுண்ணுயிர் எதிர்ப்பு மருந்து பயன்பாடு கண்டறியப்பட்டது',
      withdrawalRemaining: '{} நாட்கள் மீதமுள்ளன'
    },
    history: {
      prescription: 'மருந்துச்சீட்டு:',
      viewPrescription: 'மருந்துச்சீட்டைப் பார்க்கவும்',
      photo: 'புகைப்படம்:',
      viewPhoto: 'புகைப்படத்தைப் பார்க்கவும்'
    }
  }
};

interface Props {
  language: 'english' | 'tamil';
}

export const KalnadaiFarmerDashboard: React.FC<Props> = ({ language }) => {
  const [treatmentMode, setTreatmentMode] = useState<"individual" | "batch">("individual");
  const [formData, setFormData] = useState({
    animalType: '',
    animalId: '',
    batchId: '',
    numberOfAnimals: '',
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    reason: '',
    administrationMethod: ''
  });
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [prescriptionUrl, setPrescriptionUrl] = useState<string>('');
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);
  const [entries, setEntries] = useState<FarmerEntry[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { profile } = useAuth();
  const { toast } = useToast();
  const t = translations[language];

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('FARMER DASHBOARD')
      .select('*')
      .order('EntryID', { ascending: false });
    
    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      setEntries(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);
    
    // Generate a simple blockchain ID for demo
    const blockchainId = `BC-${Date.now()}`;
    
    const newEntry = {
      FarmerName: profile.full_name,
      FarmName: profile.farm_name || 'Unknown Farm',
      State: profile.state || 'Tamil Nadu',
      District: profile.district || 'Unknown',
      AnimalID: formData.animalId,
      AnimalType: formData.animalType,
      Medicine: formData.medicine,
      Dosage: formData.dosage,
      Frequency: formData.frequency,
      Duration: formData.duration,
      Reason: formData.reason,
      Date: new Date().toLocaleDateString('en-GB'),
      VetApproved: 'No',
      WithdrawalStatus: 'Pending',
      BlockchainID: blockchainId,
      PhotoURL: photoUrl,
      PrescriptionFileURL: prescriptionUrl
    };
    
    const { error } = await supabase
      .from('FARMER DASHBOARD')
      .insert([{ 
        ...newEntry,
        EntryID: Date.now() // Generate a simple ID
      }]);
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit entry',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Entry submitted successfully',
        variant: 'default'
      });
      
      setFormData({
        animalType: '',
        animalId: '',
        batchId: '',
        numberOfAnimals: '',
        medicine: '',
        dosage: '',
        frequency: '',
        duration: '',
        reason: '',
        administrationMethod: ''
      });
      setPhotoUrl('');
      setPrescriptionUrl('');
      
      fetchEntries();
    }
    
    setLoading(false);
  };

  // Set default mode based on animal type
  const handleAnimalTypeChange = (value: string) => {
    setFormData({...formData, animalType: value});
    
    // Set default modes
    const largeAnimals = ["Cow", "Buffalo", "Goat", "Sheep"];
    const smallAnimals = ["Hen", "Duck", "Chicken"];
    
    if (largeAnimals.includes(value)) {
      setTreatmentMode("individual");
    } else if (smallAnimals.includes(value)) {
      setTreatmentMode("batch");
    }
  };

  const getStatusBadge = (status: string, approved: string) => {
    if (approved === 'No') return <Badge variant="outline">{t.pending}</Badge>;
    if (status === 'Compliant' || status === 'Cleared') return <Badge variant="secondary">{t.compliant}</Badge>;
    if (status === 'Non-Compliant') return <Badge variant="destructive">{t.nonCompliant}</Badge>;
    if (status === 'In Withdrawal') return <Badge variant="outline">{t.inWithdrawal}</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Compliant' || status === 'Cleared') return <CheckCircle className="h-4 w-4 text-success" />;
    if (status === 'Non-Compliant') return <AlertTriangle className="h-4 w-4 text-destructive" />;
    return <Clock className="h-4 w-4 text-warning" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {t.welcome}, {profile?.full_name || 'Farmer'}
        </h1>
        {profile?.farm_name && (
          <p className="text-muted-foreground mt-2">{profile.farm_name}</p>
        )}
      </div>

      <Tabs defaultValue="record" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="record">{t.recordUsage}</TabsTrigger>
          <TabsTrigger value="history">{t.treatmentHistory}</TabsTrigger>
          <TabsTrigger value="alerts">{t.alertsTab}</TabsTrigger>
        </TabsList>

        <TabsContent value="record">
          <Card>
            <CardHeader>
              <CardTitle>{t.recordUsage}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Treatment Mode Selection */}
                <div className="space-y-3">
                  <Label>{t.treatmentMode}</Label>
                  <ToggleGroup 
                    type="single" 
                    value={treatmentMode} 
                    onValueChange={(value) => value && setTreatmentMode(value as "individual" | "batch")}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="individual" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{t.individualMode}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="batch" className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{t.batchMode}</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <p className="text-sm text-muted-foreground">
                    {treatmentMode === "individual" ? t.individualDesc : t.batchDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Animal Type - Always visible */}
                  <div>
                    <Label htmlFor="animalType">{t.animalType}</Label>
                    <Select value={formData.animalType} onValueChange={handleAnimalTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.placeholder.animalType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cow">Cow / பசு</SelectItem>
                        <SelectItem value="Buffalo">Buffalo / எருமை</SelectItem>
                        <SelectItem value="Goat">Goat / ஆடு</SelectItem>
                        <SelectItem value="Sheep">Sheep / செம்மறியாடு</SelectItem>
                        <SelectItem value="Hen">Hen / கோழி</SelectItem>
                        <SelectItem value="Duck">Duck / வாத்து</SelectItem>
                        <SelectItem value="Chicken">Chicken / கோழி</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Animal ID - Only for Individual Mode */}
                  {treatmentMode === "individual" && (
                    <div>
                      <Label htmlFor="animalId">{t.animalId}</Label>
                      <Input
                        id="animalId"
                        value={formData.animalId}
                        onChange={(e) => setFormData({...formData, animalId: e.target.value})}
                        placeholder="TN-XXX-001"
                        required={treatmentMode === "individual"}
                      />
                    </div>
                  )}

                  {/* Batch Selection - Only for Batch Mode */}
                  {treatmentMode === "batch" && (
                    <>
                      <div>
                        <Label htmlFor="batchId">{t.batchId}</Label>
                        <Select value={formData.batchId} onValueChange={(value) => setFormData({...formData, batchId: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select batch/pen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pen-1">Pen 1 / கொட்டகை 1</SelectItem>
                            <SelectItem value="pen-2">Pen 2 / கொட்டகை 2</SelectItem>
                            <SelectItem value="pen-3">Pen 3 / கொட்டகை 3</SelectItem>
                            <SelectItem value="barn-a">Barn A / களஞ்சியம் A</SelectItem>
                            <SelectItem value="barn-b">Barn B / களஞ்சியம் B</SelectItem>
                            <SelectItem value="flock-1">Flock 1 / மந்தை 1</SelectItem>
                            <SelectItem value="flock-2">Flock 2 / மந்தை 2</SelectItem>
                            <SelectItem value="group-young">Young Group / இளம் குழு</SelectItem>
                            <SelectItem value="group-adult">Adult Group / வயது குழு</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="numberOfAnimals">{t.numberOfAnimals}</Label>
                        <Input
                          id="numberOfAnimals"
                          type="number"
                          placeholder="e.g., 50"
                          value={formData.numberOfAnimals}
                          onChange={(e) => setFormData({...formData, numberOfAnimals: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="medicine">{t.drugName}</Label>
                    <Select value={formData.medicine} onValueChange={(value) => setFormData({...formData, medicine: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.placeholder.medicine} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Amoxicillin">Amoxicillin - அமோக்சிசில்லின் (Amoxil, Amoxycillin)</SelectItem>
                        <SelectItem value="Oxytetracycline">Oxytetracycline - ஆக்ஸிடெட்ராசைசைலின் (Terramycin, Oxytet)</SelectItem>
                        <SelectItem value="Enrofloxacin">Enrofloxacin - என்ரோஃப்ளாக்சாசின் (Baytril, Enrocin)</SelectItem>
                        <SelectItem value="Tylosin">Tylosin - டைலோசின் (Tylan, Tylosin)</SelectItem>
                        <SelectItem value="Chloramphenicol">Chloramphenicol - குளோராம்பெனிகால் (Chloromycetin)</SelectItem>
                        <SelectItem value="Doxycycline">Doxycycline - டாக்சிசைக்கிளின் (Vibramycin)</SelectItem>
                        <SelectItem value="Gentamicin">Gentamicin - ஜென்டாமிசின் (Gentamicin)</SelectItem>
                        <SelectItem value="Ciprofloxacin">Ciprofloxacin - சிப்ரோஃப்ளாக்சாசின் (Cipro, Cifran)</SelectItem>
                        <SelectItem value="Sulfachlorpyridazine">Sulfachlorpyridazine - சல்பாச்லோர்பிரிடாசின் (Vetisulid)</SelectItem>
                        <SelectItem value="Colistin">Colistin - கொலிஸ்டின் (Coly-Mycin M)</SelectItem>
                        <SelectItem value="Amikacin">Amikacin - அமிகாசின் (Amikacin)</SelectItem>
                        <SelectItem value="Trimethoprim-Sulphamethoxazole">Trimethoprim-Sulphamethoxazole - டிரைமெதோபிரிம்-சல்பாமெதோக்சாசோலே (Bactrim, Septrin)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="dosage">
                      {t.dosage} {treatmentMode === "batch" ? "(per animal)" : ""} (mg/kg)
                    </Label>
                    <Input
                      id="dosage"
                      value={formData.dosage}
                      onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                      placeholder="10 mg/kg"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="frequency">{t.frequency}</Label>
                    <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.placeholder.frequency} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily / தினமும்</SelectItem>
                        <SelectItem value="Twice Daily">Twice Daily / தினம் இருமுறை</SelectItem>
                        <SelectItem value="Three Times Daily">Three Times Daily / தினம் மூன்றுமுறை</SelectItem>
                        <SelectItem value="Weekly">Weekly / வாரம் ஒருமுறை</SelectItem>
                        <SelectItem value="As Needed">As Needed / தேவையின் போது</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">{t.duration}</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="5 days"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="administrationMethod">{t.administrationMethod}</Label>
                    <Select value={formData.administrationMethod} onValueChange={(value) => setFormData({...formData, administrationMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.placeholder.method} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Oral">Oral / வாய் வழியாக</SelectItem>
                        <SelectItem value="Injection-IM">Injection - Intramuscular / தசையினுள் ஊசி</SelectItem>
                        <SelectItem value="Injection-IV">Injection - Intravenous / நரம்பினுள் ஊசி</SelectItem>
                        <SelectItem value="Injection-SC">Injection - Subcutaneous / தோலடியில் ஊசி</SelectItem>
                        <SelectItem value="Topical">Topical / மேற்பூச்சு</SelectItem>
                        <SelectItem value="Feed-Mix">Mixed in Feed / உணவில் கலந்து</SelectItem>
                        <SelectItem value="Water">In Drinking Water / குடிநீரில்</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reason">{t.reason}</Label>
                  <Select value={formData.reason} onValueChange={(value) => setFormData({...formData, reason: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.placeholder.reason} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Respiratory Infection">Respiratory Infection / சுவாச தொற்று</SelectItem>
                      <SelectItem value="Mastitis">Mastitis / மடி அழற்சி</SelectItem>
                      <SelectItem value="Digestive Disorder">Digestive Disorder / செரிமான கோளாறு</SelectItem>
                      <SelectItem value="Wound Infection">Wound Infection / காயத் தொற்று</SelectItem>
                      <SelectItem value="Fever">Fever / காய்ச்சல்</SelectItem>
                      <SelectItem value="Preventive Treatment">Preventive Treatment / தடுப்பு சிகிச்சை</SelectItem>
                      <SelectItem value="Other">Other / மற்றவை</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Medicine calculation for batch mode */}
                {treatmentMode === "batch" && formData.numberOfAnimals && formData.dosage && (
                  <div className="p-4 bg-muted rounded-lg">
                    <Label className="text-sm font-medium">Estimated Total Medicine Quantity</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Approximately {parseFloat(formData.numberOfAnimals) * (parseFloat(formData.dosage.replace(/[^0-9.]/g, '')) || 0)} mg total
                      <br />
                      (Based on {formData.dosage} per animal × {formData.numberOfAnimals} animals)
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUpload
                    buttonText={t.takePhoto}
                    buttonIcon="camera"
                    acceptedTypes="image/*"
                    onFileUploaded={(url, type) => {
                      if (type === 'photo') setPhotoUrl(url);
                    }}
                  />
                  <FileUpload
                    buttonText={t.uploadPrescription}
                    buttonIcon="upload"
                    acceptedTypes=".pdf,image/*"
                    onFileUploaded={(url, type) => {
                      if (type === 'prescription') setPrescriptionUrl(url);
                    }}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t.submitting : t.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>{t.treatmentHistory}</CardTitle>
              <CardDescription>{t.recent}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.slice(0, 10).map((entry) => (
                  <div key={entry.EntryID} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{entry.AnimalType} ({entry.AnimalID})</div>
                        <div className="text-sm text-muted-foreground">
                          {entry.Medicine} - {entry.Dosage} - {entry.Frequency}
                        </div>
                        <div className="text-sm text-muted-foreground">{entry.Date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(entry.WithdrawalStatus)}
                        {getStatusBadge(entry.WithdrawalStatus, entry.VetApproved)}
                      </div>
                    </div>
                    <div className="text-sm">
                      <strong>{t.reasonLabel}</strong> {entry.Reason}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setExpandedEntry(expandedEntry === entry.EntryID ? null : entry.EntryID)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {expandedEntry === entry.EntryID ? 'Hide Details' : t.viewDetails}
                    </Button>
                    
                    {expandedEntry === entry.EntryID && (
                      <div className="mt-4 p-4 bg-muted rounded-lg space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div><strong>Farm:</strong> {entry.FarmName}</div>
                          <div><strong>State:</strong> {entry.State}</div>
                          <div><strong>District:</strong> {entry.District}</div>
                          <div><strong>Duration:</strong> {entry.Duration}</div>
                          <div><strong>Blockchain ID:</strong> {entry.BlockchainID}</div>
                          <div><strong>Vet Status:</strong> {entry.VetApproved}</div>
                        </div>
                        {entry.PhotoURL && (
                          <div>
                            <strong>{t.history.photo}</strong>
                            <a href={entry.PhotoURL} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                              {t.history.viewPhoto}
                            </a>
                          </div>
                        )}
                        {entry.PrescriptionFileURL && (
                          <div>
                            <strong>{t.history.prescription}</strong>
                            <a href={entry.PrescriptionFileURL} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">
                              {t.history.viewPrescription}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  {t.alerts.withdrawalPeriodAlert}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border-l-4 border-warning bg-warning/5 rounded">
                    <div>
                      <p className="font-medium">{t.alerts.withdrawalPeriodActive}</p>
                      <p className="text-sm text-muted-foreground">
                        Animal TN-ERD-001 (Cow) treated with Oxytetracycline {t.alerts.withdrawalRemaining.replace('{}', '2')}
                      </p>
                    </div>
                    <Badge variant="outline">2 {t.alerts.daysLeft}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border-l-4 border-danger bg-danger/5 rounded">
                    <div>
                      <p className="font-medium">{t.alerts.mrlLimitApproached}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.alerts.highUsageDetected}
                      </p>
                    </div>
                    <Badge variant="destructive">{t.alerts.actionRequired}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  {t.alerts.detailedComplianceStatus}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.alerts.overallCompliance}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.alerts.mrlCompliance}:</span>
                      <span className="text-success">{t.alerts.good}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.alerts.recordKeeping}:</span>
                      <span className="text-success">{t.alerts.complete}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.alerts.vetApprovals}:</span>
                      <span className="text-warning">Pending: 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Withdrawal Violations:</span>
                      <span className="text-success">None</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Next Action:</strong> Submit pending entries for veterinary approval
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};