import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Filter, Plus, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ComplaintEntry {
  id: string;
  officerName: string;
  designation: string;
  farmName: string;
  farmerName: string;
  district: string;
  drugReported: string;
  actionTaken: string;
  actionDate: string;
  status: 'pending' | 'resolved' | 'investigating';
  createdAt: string;
}

const translations = {
  english: {
    title: 'Government Compliance Dashboard',
    addComplaint: 'Add New Complaint',
    officerName: 'Officer Name',
    designation: 'Designation',
    farmName: 'Farm Name',
    farmerName: 'Farmer Name',
    district: 'District',
    drugReported: 'Drug/Antimicrobial',
    actionTaken: 'Action Taken',
    actionDate: 'Action Date',
    status: 'Status',
    pending: 'Pending',
    resolved: 'Resolved',
    investigating: 'Investigating',
    submit: 'Submit Complaint',
    export: 'Export Data',
    filter: 'Filter by District',
    all: 'All Districts'
  },
  tamil: {
    title: 'அரசு இணக்க டாஷ்போர்டு',
    addComplaint: 'புதிய புகார் சேர்க்க',
    officerName: 'அதிகாரியின் பெயர்',
    designation: 'பதவி',
    farmName: 'பண்ணையின் பெயர்',
    farmerName: 'விவசாயியின் பெயர்',
    district: 'மாவட்டம்',
    drugReported: 'மருந்து/ஆன்டிமைக்ரோபியல்',
    actionTaken: 'எடுக்கப்பட்ட நடவடிக்கை',
    actionDate: 'நடவடிக்கை தேதி',
    status: 'நிலை',
    pending: 'நிலுவையில்',
    resolved: 'தீர்க்கப்பட்டது',
    investigating: 'விசாரணையில்',
    submit: 'புகார் சமர்ப்பிக்க',
    export: 'தரவு ஏற்றுமதி',
    filter: 'மாவட்டம் வாரியாக வடிகட்ட',
    all: 'அனைத்து மாவட்டங்களும்'
  }
};

interface Props {
  language: 'english' | 'tamil';
}

export const SimplifiedGovernmentDashboard: React.FC<Props> = ({ language }) => {
  const [complaints, setComplaints] = useState<ComplaintEntry[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<ComplaintEntry[]>([]);
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [isAddingComplaint, setIsAddingComplaint] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    officerName: '',
    designation: '',
    farmName: '',
    farmerName: '',
    district: '',
    drugReported: '',
    actionTaken: '',
    actionDate: '',
    status: 'pending' as const
  });

  const { profile } = useAuth();
  const { toast } = useToast();
  const t = translations[language];

  const districts = [
    'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli',
    'Vellore', 'Erode', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Kanniyakumari'
  ];

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    if (filterDistrict === 'all') {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(complaints.filter(c => c.district === filterDistrict));
    }
  }, [complaints, filterDistrict]);

  const fetchComplaints = async () => {
    // For now, use mock data - in real implementation, fetch from Supabase
    const mockComplaints: ComplaintEntry[] = [
      {
        id: '1',
        officerName: 'Dr. Rajesh Kumar',
        designation: 'District Veterinary Officer',
        farmName: 'Green Valley Farm',
        farmerName: 'Murugan S',
        district: 'Salem',
        drugReported: 'Oxytetracycline',
        actionTaken: 'Farm inspection conducted, samples collected',
        actionDate: '2024-01-15',
        status: 'investigating',
        createdAt: '2024-01-10'
      },
      {
        id: '2',
        officerName: 'Dr. Priya Sharma',
        designation: 'Senior Veterinary Inspector',
        farmName: 'Sunrise Dairy',
        farmerName: 'Kumaran R',
        district: 'Coimbatore',
        drugReported: 'Amoxicillin',
        actionTaken: 'Warning issued, training provided',
        actionDate: '2024-01-20',
        status: 'resolved',
        createdAt: '2024-01-12'
      }
    ];
    setComplaints(mockComplaints);
  };

  const handleSubmitComplaint = async () => {
    try {
      const complaintData = {
        ...newComplaint,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setComplaints(prev => [complaintData, ...prev]);
      setNewComplaint({
        officerName: '',
        designation: '',
        farmName: '',
        farmerName: '',
        district: '',
        drugReported: '',
        actionTaken: '',
        actionDate: '',
        status: 'pending'
      });
      setIsAddingComplaint(false);

      toast({
        title: 'Success',
        description: 'Complaint added successfully',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add complaint',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">{t.pending}</Badge>;
      case 'investigating':
        return <Badge variant="secondary" className="bg-sky/20 text-sky-foreground">{t.investigating}</Badge>;
      case 'resolved':
        return <Badge variant="secondary" className="bg-success/20 text-success-foreground">{t.resolved}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Officer Name', 'Designation', 'Farm Name', 'Farmer Name', 'District', 'Drug', 'Action Taken', 'Action Date', 'Status'],
      ...filteredComplaints.map(c => [
        c.officerName, c.designation, c.farmName, c.farmerName, c.district, 
        c.drugReported, c.actionTaken, c.actionDate, c.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'government-complaints.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl">{t.title}</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              {profile?.full_name} - {profile?.department}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{complaints.length}</p>
                  <p className="text-sm text-muted-foreground">Total Complaints</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <span className="text-warning font-bold text-sm">{complaints.filter(c => c.status === 'pending').length}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{complaints.filter(c => c.status === 'pending').length}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-sky/20 flex items-center justify-center">
                  <span className="text-sky font-bold text-sm">{complaints.filter(c => c.status === 'investigating').length}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{complaints.filter(c => c.status === 'investigating').length}</p>
                  <p className="text-sm text-muted-foreground">Investigating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success font-bold text-sm">{complaints.filter(c => c.status === 'resolved').length}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{complaints.filter(c => c.status === 'resolved').length}</p>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <Select value={filterDistrict} onValueChange={setFilterDistrict}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={t.filter} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.all}</SelectItem>
                    {districts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={exportData} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  {t.export}
                </Button>
                <Dialog open={isAddingComplaint} onOpenChange={setIsAddingComplaint}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      {t.addComplaint}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{t.addComplaint}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t.officerName}</Label>
                        <Input 
                          value={newComplaint.officerName}
                          onChange={(e) => setNewComplaint(prev => ({...prev, officerName: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label>{t.designation}</Label>
                        <Input 
                          value={newComplaint.designation}
                          onChange={(e) => setNewComplaint(prev => ({...prev, designation: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label>{t.farmName}</Label>
                        <Input 
                          value={newComplaint.farmName}
                          onChange={(e) => setNewComplaint(prev => ({...prev, farmName: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label>{t.farmerName}</Label>
                        <Input 
                          value={newComplaint.farmerName}
                          onChange={(e) => setNewComplaint(prev => ({...prev, farmerName: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label>{t.district}</Label>
                        <Select value={newComplaint.district} onValueChange={(value) => setNewComplaint(prev => ({...prev, district: value}))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {districts.map(district => (
                              <SelectItem key={district} value={district}>{district}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>{t.drugReported}</Label>
                        <Input 
                          value={newComplaint.drugReported}
                          onChange={(e) => setNewComplaint(prev => ({...prev, drugReported: e.target.value}))}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>{t.actionTaken}</Label>
                        <Textarea 
                          value={newComplaint.actionTaken}
                          onChange={(e) => setNewComplaint(prev => ({...prev, actionTaken: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label>{t.actionDate}</Label>
                        <Input 
                          type="date"
                          value={newComplaint.actionDate}
                          onChange={(e) => setNewComplaint(prev => ({...prev, actionDate: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label>{t.status}</Label>
                        <Select value={newComplaint.status} onValueChange={(value: any) => setNewComplaint(prev => ({...prev, status: value}))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">{t.pending}</SelectItem>
                            <SelectItem value="investigating">{t.investigating}</SelectItem>
                            <SelectItem value="resolved">{t.resolved}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setIsAddingComplaint(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitComplaint}>
                        {t.submit}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.officerName}</TableHead>
                  <TableHead>{t.designation}</TableHead>
                  <TableHead>{t.farmName}</TableHead>
                  <TableHead>{t.farmerName}</TableHead>
                  <TableHead>{t.district}</TableHead>
                  <TableHead>{t.drugReported}</TableHead>
                  <TableHead>{t.actionTaken}</TableHead>
                  <TableHead>{t.actionDate}</TableHead>
                  <TableHead>{t.status}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.officerName}</TableCell>
                    <TableCell>{complaint.designation}</TableCell>
                    <TableCell>{complaint.farmName}</TableCell>
                    <TableCell>{complaint.farmerName}</TableCell>
                    <TableCell>{complaint.district}</TableCell>
                    <TableCell>{complaint.drugReported}</TableCell>
                    <TableCell className="max-w-xs truncate">{complaint.actionTaken}</TableCell>
                    <TableCell>{complaint.actionDate}</TableCell>
                    <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};