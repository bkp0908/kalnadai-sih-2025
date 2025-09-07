import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, FileText, Users } from 'lucide-react';
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
  District: string;
}

const translations = {
  english: {
    welcome: 'Welcome',
    pendingReviews: 'Pending Reviews',
    managedFarms: 'Managed Farms',
    myPrescriptions: 'My Prescriptions',
    approve: 'Approve',
    reject: 'Reject',
    farmer: 'Farmer',
    animal: 'Animal',
    medicine: 'Medicine',
    date: 'Date',
    reason: 'Reason',
    status: 'Status',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    actions: 'Actions',
    district: 'District',
    farmName: 'Farm Name',
    animalCount: 'Animal Count',
    compliance: 'Compliance Rate'
  },
  tamil: {
    welcome: 'வரவேற்கிறோம்',
    pendingReviews: 'ஒப்புதல் நிலுவை',
    managedFarms: 'நிர்வகிக்கும் பண்ணைகள்',
    myPrescriptions: 'எனது மருந்துச்சீட்டுகள்',
    approve: 'ஒப்புக்கொள்',
    reject: 'நிராகரிக்க',
    farmer: 'விவசாயி',
    animal: 'கால்நடை',
    medicine: 'மருந்து',
    date: 'தேதி',
    reason: 'காரணம்',
    status: 'நிலை',
    pending: 'நிலுவையில்',
    approved: 'ஒப்புதல் அளிக்கப்பட்டது',
    rejected: 'நிராகரிக்கப்பட்டது',
    actions: 'செயல்கள்',
    district: 'மாவட்டம்',
    farmName: 'பண்ணையின் பெயர்',
    animalCount: 'கால்நடை எண்ணிக்கை',
    compliance: 'இணக்க விகிதம்'
  }
};

interface Props {
  language: 'english' | 'tamil';
}

export const KalnadaiVeterinarianDashboard: React.FC<Props> = ({ language }) => {
  const [pendingEntries, setPendingEntries] = useState<FarmerEntry[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { profile } = useAuth();
  const { toast } = useToast();
  const t = translations[language];

  useEffect(() => {
    fetchPendingEntries();
  }, []);

  const fetchPendingEntries = async () => {
    const { data, error } = await supabase
      .from('FARMER DASHBOARD')
      .select('*')
      .eq('VetApproved', 'No')
      .order('EntryID', { ascending: false });
    
    if (error) {
      console.error('Error fetching pending entries:', error);
    } else {
      setPendingEntries(data || []);
    }
  };

  const handleApproval = async (entryId: number, approved: boolean) => {
    setLoading(true);
    
    const updates = {
      VetApproved: approved ? 'Yes' : 'Rejected',
      WithdrawalStatus: approved ? 'In Withdrawal' : 'Non-Compliant'
    };
    
    const { error } = await supabase
      .from('FARMER DASHBOARD')
      .update(updates)
      .eq('EntryID', entryId);
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update entry',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: `Entry ${approved ? 'approved' : 'rejected'} successfully`,
        variant: 'default'
      });
      
      fetchPendingEntries();
    }
    
    setLoading(false);
  };

  const getStatusBadge = (vetApproved: string) => {
    if (vetApproved === 'Yes') return <Badge variant="secondary">{t.approved}</Badge>;
    if (vetApproved === 'Rejected') return <Badge variant="destructive">{t.rejected}</Badge>;
    return <Badge variant="outline">{t.pending}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {t.welcome}, Dr. {profile?.full_name || 'Doctor'}
        </h1>
        {profile?.license_number && (
          <p className="text-muted-foreground mt-2">License: {profile.license_number}</p>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{pendingEntries.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Managed Farms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">24</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">89</div>
            <p className="text-sm text-muted-foreground">Prescriptions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">{t.pendingReviews}</TabsTrigger>
          <TabsTrigger value="farms">{t.managedFarms}</TabsTrigger>
          <TabsTrigger value="prescriptions">{t.myPrescriptions}</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>{t.pendingReviews}</CardTitle>
              <CardDescription>Review and approve farmer antimicrobial usage entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingEntries.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No pending entries to review
                  </p>
                ) : (
                  pendingEntries.map((entry) => (
                    <div key={entry.EntryID} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{entry.FarmerName}</div>
                          <div className="text-sm text-muted-foreground">{entry.FarmName} - {entry.District}</div>
                        </div>
                        {getStatusBadge(entry.VetApproved)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <strong>{t.animal}:</strong> {entry.AnimalType} ({entry.AnimalID})
                        </div>
                        <div>
                          <strong>{t.medicine}:</strong> {entry.Medicine}
                        </div>
                        <div>
                          <strong>Dosage:</strong> {entry.Dosage}
                        </div>
                        <div>
                          <strong>{t.date}:</strong> {entry.Date}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <strong>{t.reason}:</strong> {entry.Reason}
                      </div>
                      
                      {entry.VetApproved === 'No' && (
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleApproval(entry.EntryID, true)}
                            disabled={loading}
                            className="gap-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            {t.approve}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleApproval(entry.EntryID, false)}
                            disabled={loading}
                            className="gap-1"
                          >
                            <XCircle className="h-4 w-4" />
                            {t.reject}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="farms">
          <Card>
            <CardHeader>
              <CardTitle>{t.managedFarms}</CardTitle>
              <CardDescription>Farms under your supervision</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.farmer}</TableHead>
                    <TableHead>{t.farmName}</TableHead>
                    <TableHead>{t.district}</TableHead>
                    <TableHead>{t.animalCount}</TableHead>
                    <TableHead>{t.compliance}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>முத்துசாமி (Muthusamy)</TableCell>
                    <TableCell>ஆறு பசு பண்ணை</TableCell>
                    <TableCell>Erode</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>
                      <Badge variant="secondary">85%</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ராமு (Ramu)</TableCell>
                    <TableCell>கங்கை பால் பண்ணை</TableCell>
                    <TableCell>Namakkal</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>
                      <Badge variant="destructive">65%</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>{t.myPrescriptions}</CardTitle>
              <CardDescription>Upload and manage prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <Button variant="outline">
                    Upload Prescription
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload PDF or JPEG files
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Oxytetracycline Prescription</div>
                      <div className="text-sm text-muted-foreground">For Muthusamy - Cow TN-ERD-001</div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};