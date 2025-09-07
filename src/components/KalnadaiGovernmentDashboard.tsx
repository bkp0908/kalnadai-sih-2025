import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, AlertTriangle, CheckCircle, Download, Filter } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComplianceReport {
  'Report ID': string;
  District: string;
  'Officer Name': string;
  'Drug Reported': string;
  'Livestock Type': string;
  'Quantity Used': string;
  'Compliance Status': string;
  Remarks: string;
  Date: string;
}

interface FarmerEntry {
  EntryID: number;
  District: string;
  AnimalType: string;
  Medicine: string;
  WithdrawalStatus: string;
  VetApproved: string;
  Date: string;
}

const translations = {
  english: {
    welcome: 'Welcome',
    overview: 'Overview',
    regionalAnalysis: 'Regional Analysis',
    compliance: 'Compliance Reports',
    alerts: 'Alerts',
    totalEntries: 'Total Entries',
    compliantEntries: 'Compliant Entries',
    nonCompliantEntries: 'Non-Compliant Entries',
    pendingReview: 'Pending Review',
    districtWiseCompliance: 'District-wise Compliance',
    drugUsagePattern: 'Drug Usage Pattern',
    animalTypeDistribution: 'Animal Type Distribution',
    complianceRate: 'Compliance Rate',
    district: 'District',
    officer: 'Officer',
    drug: 'Drug',
    livestock: 'Livestock',
    status: 'Status',
    remarks: 'Remarks',
    date: 'Date',
    compliant: 'Compliant',
    nonCompliant: 'Non-Compliant',
    monitor: 'Monitor',
    exportData: 'Export Data',
    filterBy: 'Filter by'
  },
  tamil: {
    welcome: 'வரவேற்கிறோம்',
    overview: 'கண்ணோட்டம்',
    regionalAnalysis: 'பிராந்திய பகுப்பாய்வு',
    compliance: 'இணக்க அறிக்கைகள்',
    alerts: 'எச்சரிக்கைகள்',
    totalEntries: 'மொத்த பதிவுகள்',
    compliantEntries: 'இணக்கமான பதிவுகள்',
    nonCompliantEntries: 'இணக்கமற்ற பதிவுகள்',
    pendingReview: 'ஒப்புதல் நிலுவை',
    districtWiseCompliance: 'மாவட்ட வாரியான இணக்கம்',
    drugUsagePattern: 'மருந்து பயன்பாட்டு முறை',
    animalTypeDistribution: 'கால்நடை வகை விநியோகம்',
    complianceRate: 'இணக்க விகிதம்',
    district: 'மாவட்டம்',
    officer: 'அதிகாரி',
    drug: 'மருந்து',
    livestock: 'கால்நடை',
    status: 'நிலை',
    remarks: 'குறிப்புகள்',
    date: 'தேதி',
    compliant: 'இணக்கமான',
    nonCompliant: 'இணக்கமற்ற',
    monitor: 'கண்காணிப்பு',
    exportData: 'தரவு ஏற்றுமதி',
    filterBy: 'வடிகட்ட'
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface Props {
  language: 'english' | 'tamil';
}

export const KalnadaiGovernmentDashboard: React.FC<Props> = ({ language }) => {
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([]);
  const [farmerEntries, setFarmerEntries] = useState<FarmerEntry[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  
  const { profile } = useAuth();
  const t = translations[language];

  useEffect(() => {
    fetchComplianceReports();
    fetchFarmerEntries();
  }, []);

  const fetchComplianceReports = async () => {
    const { data, error } = await supabase
      .from('Compliance_Reports')
      .select('*')
      .order('Date', { ascending: false });
    
    if (error) {
      console.error('Error fetching compliance reports:', error);
    } else {
      setComplianceReports(data || []);
    }
  };

  const fetchFarmerEntries = async () => {
    const { data, error } = await supabase
      .from('FARMER DASHBOARD')
      .select('*')
      .order('EntryID', { ascending: false });
    
    if (error) {
      console.error('Error fetching farmer entries:', error);
    } else {
      setFarmerEntries(data || []);
    }
  };

  // Calculate statistics
  const stats = {
    totalEntries: farmerEntries.length,
    compliantEntries: farmerEntries.filter(e => e.WithdrawalStatus === 'Cleared' || e.WithdrawalStatus === 'Compliant').length,
    nonCompliantEntries: farmerEntries.filter(e => e.WithdrawalStatus === 'Non-Compliant').length,
    pendingReview: farmerEntries.filter(e => e.VetApproved === 'No').length
  };

  // District-wise compliance data
  const districtData = farmerEntries.reduce((acc, entry) => {
    const district = entry.District || 'Unknown';
    if (!acc[district]) {
      acc[district] = { district, total: 0, compliant: 0 };
    }
    acc[district].total++;
    if (entry.WithdrawalStatus === 'Cleared' || entry.WithdrawalStatus === 'Compliant') {
      acc[district].compliant++;
    }
    return acc;
  }, {} as Record<string, { district: string; total: number; compliant: number }>);

  const chartData = Object.values(districtData).map(d => ({
    district: d.district,
    compliance: Math.round((d.compliant / d.total) * 100),
    total: d.total
  }));

  // Drug usage data
  const drugData = farmerEntries.reduce((acc, entry) => {
    const drug = entry.Medicine || 'Unknown';
    acc[drug] = (acc[drug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const drugChartData = Object.entries(drugData).map(([drug, count]) => ({
    drug,
    count
  }));

  // Animal type data
  const animalData = farmerEntries.reduce((acc, entry) => {
    const animal = entry.AnimalType || 'Unknown';
    acc[animal] = (acc[animal] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const animalChartData = Object.entries(animalData).map(([animal, count], index) => ({
    name: animal,
    value: count,
    color: COLORS[index % COLORS.length]
  }));

  const getStatusBadge = (status: string) => {
    if (status.includes('Compliant') || status === '✅ Compliant') {
      return <Badge variant="secondary">{t.compliant}</Badge>;
    }
    if (status.includes('Monitor') || status === '⚠ Monitor') {
      return <Badge variant="outline">{t.monitor}</Badge>;
    }
    return <Badge variant="destructive">{t.nonCompliant}</Badge>;
  };

  const filteredReports = selectedDistrict === 'all' 
    ? complianceReports 
    : complianceReports.filter(report => report.District === selectedDistrict);

  const districts = [...new Set(complianceReports.map(r => r.District))];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {t.welcome}, {profile?.full_name || 'Officer'}
        </h1>
        {profile?.department && (
          <p className="text-muted-foreground mt-2">{profile.department}</p>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t.totalEntries}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalEntries}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t.compliantEntries}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{stats.compliantEntries}</div>
            <p className="text-sm text-muted-foreground">
              {Math.round((stats.compliantEntries / stats.totalEntries) * 100)}% {t.complianceRate}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t.nonCompliantEntries}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.nonCompliantEntries}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t.pendingReview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{stats.pendingReview}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="regional">{t.regionalAnalysis}</TabsTrigger>
          <TabsTrigger value="compliance">{t.compliance}</TabsTrigger>
          <TabsTrigger value="alerts">{t.alerts}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.districtWiseCompliance}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="compliance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t.animalTypeDistribution}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={animalChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {animalChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>{t.drugUsagePattern}</CardTitle>
              <CardDescription>Usage patterns across different antimicrobial drugs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={drugChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="drug" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>{t.compliance}</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder={t.filterBy} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {districts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  {t.exportData}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.district}</TableHead>
                    <TableHead>{t.officer}</TableHead>
                    <TableHead>{t.drug}</TableHead>
                    <TableHead>{t.livestock}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.date}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.slice(0, 10).map((report) => (
                    <TableRow key={report['Report ID']}>
                      <TableCell>{report.District}</TableCell>
                      <TableCell>{report['Officer Name']}</TableCell>
                      <TableCell>{report['Drug Reported']}</TableCell>
                      <TableCell>{report['Livestock Type']}</TableCell>
                      <TableCell>{getStatusBadge(report['Compliance Status'])}</TableCell>
                      <TableCell>{report.Date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="space-y-4">
            {complianceReports.filter(r => r['Compliance Status'].includes('Monitor')).map((alert) => (
              <Card key={alert['Report ID']}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    High Usage Alert - {alert.District}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {alert['Drug Reported']} usage in {alert['Livestock Type']} detected above normal levels.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Remarks:</strong> {alert.Remarks}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};