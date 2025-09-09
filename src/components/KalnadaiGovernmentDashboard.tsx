import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, AlertTriangle, CheckCircle, Download, Filter } from 'lucide-react';
import { IndiaMap } from '@/components/IndiaMap';
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

  // Export compliance reports to CSV
  const exportComplianceToCSV = () => {
    const rows = (selectedDistrict === 'all' ? complianceReports : complianceReports.filter(r => r.District === selectedDistrict)).map(r => ({
      ReportID: r['Report ID'],
      District: r.District,
      OfficerName: r['Officer Name'],
      DrugReported: r['Drug Reported'],
      LivestockType: r['Livestock Type'],
      QuantityUsed: r['Quantity Used'],
      ComplianceStatus: r['Compliance Status'],
      Remarks: r.Remarks,
      Date: r.Date,
    }));
    const headers = Object.keys(rows[0] || { ReportID: '', District: '', OfficerName: '', DrugReported: '', LivestockType: '', QuantityUsed: '', ComplianceStatus: '', Remarks: '', Date: '' });
    const csv = [headers.join(','), ...rows.map(r => headers.map(h => `"${String((r as any)[h] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'compliance_reports.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Optional: Seed demo data (for preview/demo only)
  const seedDemoData = async () => {
    const samples = [
      { FarmerName: 'முத்துசாமி (Muthusamy)', FarmName: 'ஆறு பசு பண்ணை', State: 'Tamil Nadu', District: 'Erode', AnimalID: 'TN-ERD-001', AnimalType: 'Cow', Medicine: 'Oxytetracycline', Dosage: '10 ml', Frequency: 'Daily', Duration: '5 days', Reason: 'Fever', Date: '01-09-2025', VetApproved: 'No', WithdrawalStatus: 'Pending', BlockchainID: `BC-${Date.now()-1}` },
      { FarmerName: 'ராமு (Ramu)', FarmName: 'கங்கை பால் பண்ணை', State: 'Tamil Nadu', District: 'Namakkal', AnimalID: 'TN-NMK-002', AnimalType: 'Buffalo', Medicine: 'Enrofloxacin', Dosage: '8 ml', Frequency: 'Twice Daily', Duration: '3 days', Reason: 'Infection', Date: '02-09-2025', VetApproved: 'Yes', WithdrawalStatus: 'Cleared', BlockchainID: `BC-${Date.now()-2}` },
      { FarmerName: 'குமார் (Kumar)', FarmName: 'வெள்ளை மாடு பண்ணை', State: 'Tamil Nadu', District: 'Erode', AnimalID: 'TN-ERD-003', AnimalType: 'Cow', Medicine: 'Amoxicillin', Dosage: '12 ml', Frequency: 'Daily', Duration: '7 days', Reason: 'Mastitis', Date: '03-09-2025', VetApproved: 'Yes', WithdrawalStatus: 'In Withdrawal', BlockchainID: `BC-${Date.now()-3}` },
      { FarmerName: 'சிவா (Siva)', FarmName: 'சிவன் பண்ணை', State: 'Tamil Nadu', District: 'Salem', AnimalID: 'TN-SLM-004', AnimalType: 'Goat', Medicine: 'Tylosin', Dosage: '5 ml', Frequency: 'Daily', Duration: '3 days', Reason: 'Cough', Date: '04-09-2025', VetApproved: 'Rejected', WithdrawalStatus: 'Non-Compliant', BlockchainID: `BC-${Date.now()-4}` },
      { FarmerName: 'அருண் (Arun)', FarmName: 'ஆரோக்ய பண்ணை', State: 'Tamil Nadu', District: 'Coimbatore', AnimalID: 'TN-CBE-005', AnimalType: 'Cow', Medicine: 'Streptomycin', Dosage: '15 ml', Frequency: 'Weekly', Duration: '2 weeks', Reason: 'Infection', Date: '05-09-2025', VetApproved: 'Yes', WithdrawalStatus: 'Compliant', BlockchainID: `BC-${Date.now()-5}` },
    ];
    await supabase.from('FARMER DASHBOARD').insert(samples.map((s, idx) => ({ ...s, EntryID: Date.now()+idx })));
    await supabase.from('Compliance_Reports').insert([
      { 'Report ID': `CR-${Date.now()}`, District: 'Erode', 'Officer Name': 'R. Kumar', 'Drug Reported': 'Oxytetracycline', 'Livestock Type': 'Cow', 'Quantity Used': 'High', 'Compliance Status': '⚠ Monitor', Remarks: 'Increased usage observed', Date: '05-09-2025' },
      { 'Report ID': `CR-${Date.now()-1}`, District: 'Namakkal', 'Officer Name': 'S. Priya', 'Drug Reported': 'Enrofloxacin', 'Livestock Type': 'Buffalo', 'Quantity Used': 'Normal', 'Compliance Status': '✅ Compliant', Remarks: 'Within limits', Date: '04-09-2025' },
    ]);
    fetchComplianceReports();
    fetchFarmerEntries();
  };

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
          <div className="space-y-6">
            {/* India Map Integration */}
            <Card>
              <CardHeader>
                <CardTitle>India Compliance Map</CardTitle>
                <CardDescription>Interactive map showing state and district-wise compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <IndiaMap language={language} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.districtWiseCompliance}</CardTitle>
                  <CardDescription>Compliance percentage by district (Government Standard Format)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="district" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                        stroke="#666"
                      />
                      <YAxis 
                        label={{ value: 'Compliance %', angle: -90, position: 'insideLeft' }}
                        stroke="#666"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#f8f9fa', 
                          border: '1px solid #dee2e6',
                          borderRadius: '4px'
                        }}
                        formatter={(value, name) => [`${value}%`, 'Compliance Rate']}
                        labelFormatter={(label) => `District: ${label}`}
                      />
                      <Legend />
                      <Bar 
                        dataKey="compliance" 
                        fill="#2563eb"
                        name="Compliance Rate (%)"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Compliance Trend</CardTitle>
                  <CardDescription>Year-over-year compliance tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart 
                      data={[
                        { month: 'Jan', compliance: 78, target: 85 },
                        { month: 'Feb', compliance: 82, target: 85 },
                        { month: 'Mar', compliance: 79, target: 85 },
                        { month: 'Apr', compliance: 85, target: 85 },
                        { month: 'May', compliance: 87, target: 85 },
                        { month: 'Jun', compliance: 84, target: 85 },
                        { month: 'Jul', compliance: 88, target: 85 },
                        { month: 'Aug', compliance: 86, target: 85 },
                        { month: 'Sep', compliance: 89, target: 85 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#666" fontSize={12} />
                      <YAxis stroke="#666" fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="compliance" fill="#22c55e" name="Actual Compliance %" />
                      <Bar dataKey="target" fill="#94a3b8" name="Target %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="regional">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.drugUsagePattern}</CardTitle>
                <CardDescription>Antimicrobial usage patterns - Government Standard Report Format</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart 
                    data={drugChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis 
                      dataKey="drug" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={11}
                      stroke="#666"
                    />
                    <YAxis 
                      label={{ value: 'Usage Count', angle: -90, position: 'insideLeft' }}
                      stroke="#666"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f8f9fa', 
                        border: '1px solid #dee2e6',
                        borderRadius: '4px'
                      }}
                      formatter={(value, name) => [`${value} farms`, 'Usage Count']}
                      labelFormatter={(label) => `Drug: ${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      fill="#10b981"
                      name="Number of Farms Using"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: 'Erode', risk: 'High', cases: 12, trend: 'increasing' },
                      { region: 'Namakkal', risk: 'Medium', cases: 6, trend: 'stable' },
                      { region: 'Salem', risk: 'Medium', cases: 8, trend: 'decreasing' },
                      { region: 'Coimbatore', risk: 'Low', cases: 3, trend: 'stable' }
                    ].map((item) => (
                      <div key={item.region} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{item.region}</h4>
                          <p className="text-sm text-muted-foreground">{item.cases} non-compliant cases</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={item.risk === 'High' ? 'destructive' : item.risk === 'Medium' ? 'outline' : 'secondary'}>
                            {item.risk} Risk
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{item.trend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Drug Category Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart 
                      data={[
                        { category: 'Antibiotics', count: 45, critical: 8 },
                        { category: 'Anti-parasitic', count: 23, critical: 2 },
                        { category: 'Anti-inflammatory', count: 31, critical: 1 },
                        { category: 'Hormones', count: 12, critical: 5 }
                      ]}
                      layout="horizontal"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={100} fontSize={10} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#3b82f6" name="Total Usage" />
                      <Bar dataKey="critical" fill="#ef4444" name="Critical Cases" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
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
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2" onClick={exportComplianceToCSV}>
                    <Download className="h-4 w-4" />
                    {t.exportData}
                  </Button>
                  <Button variant="ghost" className="gap-2" onClick={seedDemoData}>
                    Seed Demo Data
                  </Button>
                </div>
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