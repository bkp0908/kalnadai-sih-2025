import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

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
}

const translations = {
  english: {
    welcome: 'Welcome back',
    recordUsage: 'Record Usage',
    treatmentHistory: 'Treatment History',
    alerts: 'Alerts & Compliance',
    animalType: 'Animal Type',
    animalId: 'Animal ID',
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
    pending: 'Pending Approval'
  },
  tamil: {
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    recordUsage: 'பயன்பாட்டை பதிவு செய்க',
    treatmentHistory: 'சிகிச்சை வரலாறு',
    alerts: 'எச்சரிக்கைகள் & இணக்கம்',
    animalType: 'கால்நடை வகை',
    animalId: 'கால்நடை எண்',
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
    pending: 'ஒப்புதல் நிலுவையில்'
  }
};

interface Props {
  language: 'english' | 'tamil';
}

export const KalnadaiFarmerDashboard: React.FC<Props> = ({ language }) => {
  const [formData, setFormData] = useState({
    animalType: '',
    animalId: '',
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    reason: ''
  });
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
      PhotoURL: '',
      PrescriptionFileURL: ''
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
        medicine: '',
        dosage: '',
        frequency: '',
        duration: '',
        reason: ''
      });
      
      fetchEntries();
    }
    
    setLoading(false);
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
          <TabsTrigger value="alerts">{t.alerts}</TabsTrigger>
        </TabsList>

        <TabsContent value="record">
          <Card>
            <CardHeader>
              <CardTitle>{t.recordUsage}</CardTitle>
              <CardDescription>Log antimicrobial usage for your animals</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="animalType">{t.animalType}</Label>
                    <Select value={formData.animalType} onValueChange={(value) => setFormData({...formData, animalType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cow">Cow / பசு</SelectItem>
                        <SelectItem value="Buffalo">Buffalo / எருமை</SelectItem>
                        <SelectItem value="Goat">Goat / ஆடு</SelectItem>
                        <SelectItem value="Sheep">Sheep / செம்மறியாடு</SelectItem>
                        <SelectItem value="Hen">Hen / கோழி</SelectItem>
                        <SelectItem value="Duck">Duck / வாத்து</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="animalId">{t.animalId}</Label>
                    <Input
                      id="animalId"
                      value={formData.animalId}
                      onChange={(e) => setFormData({...formData, animalId: e.target.value})}
                      placeholder="TN-XXX-001"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="medicine">{t.drugName}</Label>
                    <Select value={formData.medicine} onValueChange={(value) => setFormData({...formData, medicine: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select medicine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Oxytetracycline">Oxytetracycline</SelectItem>
                        <SelectItem value="Enrofloxacin">Enrofloxacin</SelectItem>
                        <SelectItem value="Amoxicillin">Amoxicillin</SelectItem>
                        <SelectItem value="Tylosin">Tylosin</SelectItem>
                        <SelectItem value="Streptomycin">Streptomycin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="dosage">{t.dosage}</Label>
                    <Input
                      id="dosage"
                      value={formData.dosage}
                      onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                      placeholder="10 ml"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="frequency">{t.frequency}</Label>
                    <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily / தினமும்</SelectItem>
                        <SelectItem value="Twice Daily">Twice Daily / தினம் இருமுறை</SelectItem>
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
                </div>
                
                <div>
                  <Label htmlFor="reason">{t.reason}</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    placeholder="Fever, Infection, etc."
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    {t.takePhoto}
                  </Button>
                  <Button type="button" variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    {t.uploadPrescription}
                  </Button>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Submitting...' : t.submit}
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
                      <strong>Reason:</strong> {entry.Reason}
                    </div>
                    <Button variant="ghost" size="sm">
                      {t.viewDetails}
                    </Button>
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
                  Withdrawal Period Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Animal TN-ERD-001 (Cow) treated with Oxytetracycline has 2 days remaining in withdrawal period.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your farm is currently 85% compliant with MRL regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};