import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Activity,
  FileBarChart,
  Shield,
  Calendar
} from "lucide-react";

interface GovernmentDashboardProps {
  userName: string;
  department: string;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--sky))', 'hsl(var(--warning))', 'hsl(var(--success))', 'hsl(var(--earth))'];

export const GovernmentDashboard = ({ userName, department }: GovernmentDashboardProps) => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  
  // Mock data for various charts and analytics
  const regionData = [
    { name: 'Punjab', usage: 245, compliance: 92, violations: 3, farms: 150 },
    { name: 'Haryana', usage: 189, compliance: 88, violations: 5, farms: 120 },
    { name: 'UP', usage: 378, compliance: 85, violations: 8, farms: 280 },
    { name: 'Rajasthan', usage: 156, compliance: 94, violations: 2, farms: 90 },
    { name: 'Gujarat', usage: 203, compliance: 90, violations: 4, farms: 160 }
  ];

  const drugTypeData = [
    { name: 'Penicillin', value: 30, count: 234 },
    { name: 'Oxytetracycline', value: 25, count: 195 },
    { name: 'Amoxicillin', value: 20, count: 156 },
    { name: 'Streptomycin', value: 15, count: 117 },
    { name: 'Others', value: 10, count: 78 }
  ];

  const trendData = [
    { month: 'Jan', usage: 320, compliance: 88, mrl_violations: 12 },
    { month: 'Feb', usage: 295, compliance: 90, mrl_violations: 8 },
    { month: 'Mar', usage: 340, compliance: 85, mrl_violations: 15 },
    { month: 'Apr', usage: 310, compliance: 92, mrl_violations: 6 },
    { month: 'May', usage: 285, compliance: 94, mrl_violations: 4 },
    { month: 'Jun', usage: 275, compliance: 91, mrl_violations: 7 }
  ];

  const alertsData = [
    { 
      id: 1, 
      type: 'violation', 
      farm: 'Green Valley Farm', 
      region: 'Punjab',
      message: 'MRL exceeded for Oxytetracycline in milk samples',
      date: '2024-09-04',
      severity: 'high'
    },
    { 
      id: 2, 
      type: 'withdrawal', 
      farm: 'Sunshine Dairy', 
      region: 'Haryana',
      message: 'Withdrawal period violation detected',
      date: '2024-09-03',
      severity: 'medium'
    },
    { 
      id: 3, 
      type: 'usage', 
      farm: 'Golden Meadow', 
      region: 'UP',
      message: 'Excessive antimicrobial usage pattern',
      date: '2024-09-02',
      severity: 'low'
    }
  ];

  const complianceStats = {
    totalFarms: 800,
    compliantFarms: 728,
    violationFarms: 72,
    avgCompliance: 91,
    inspectionsDue: 45
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-l-danger bg-danger/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-sky bg-sky/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-danger/10 text-danger border-danger';
      case 'medium': return 'bg-warning/10 text-warning border-warning';
      case 'low': return 'bg-sky/10 text-sky border-sky';
      default: return 'bg-muted/10 text-muted-foreground border-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="gradient-earth text-earth-foreground">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">{userName}</h2>
          <p className="text-earth-foreground/80">{department} • Government Analytics Dashboard</p>
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{complianceStats.totalFarms}</p>
                <p className="text-xs text-muted-foreground">Total Farms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{complianceStats.compliantFarms}</p>
                <p className="text-xs text-muted-foreground">Compliant Farms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{complianceStats.violationFarms}</p>
                <p className="text-xs text-muted-foreground">Violations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-sky" />
              <div>
                <p className="text-2xl font-bold">{complianceStats.avgCompliance}%</p>
                <p className="text-xs text-muted-foreground">Avg Compliance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-earth" />
              <div>
                <p className="text-2xl font-bold">{complianceStats.inspectionsDue}</p>
                <p className="text-xs text-muted-foreground">Inspections Due</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends & Patterns</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Violations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Antimicrobial Usage by Drug Type</CardTitle>
                <CardDescription>Distribution of most commonly used antimicrobials</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={drugTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {drugTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Compliance Overview</CardTitle>
                <CardDescription>Compliance rates across different states</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="compliance" fill="hsl(var(--success))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>National Compliance Status</CardTitle>
              <CardDescription>Overall compliance metrics and performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Compliance</span>
                    <span className="text-sm text-muted-foreground">{complianceStats.avgCompliance}%</span>
                  </div>
                  <Progress value={complianceStats.avgCompliance} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">MRL Compliance</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Record Accuracy</span>
                    <span className="text-sm text-muted-foreground">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Usage Patterns</CardTitle>
              <CardDescription>Antimicrobial usage and violation patterns by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="hsl(var(--primary))" name="Usage Count" />
                  <Bar dataKey="violations" fill="hsl(var(--danger))" name="Violations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionData.map((region, index) => (
              <Card key={region.name}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{region.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Farms:</span>
                      <Badge variant="outline">{region.farms}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Usage Reports:</span>
                      <Badge variant="secondary">{region.usage}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Rate:</span>
                      <Badge className={region.compliance >= 90 ? "bg-success/10 text-success border-success" : "bg-warning/10 text-warning border-warning"}>
                        {region.compliance}%
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Violations:</span>
                      <Badge variant="destructive">{region.violations}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>6-Month Usage & Compliance Trends</CardTitle>
              <CardDescription>Monthly trends in antimicrobial usage and compliance rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="hsl(var(--primary))" strokeWidth={2} name="Usage Reports" />
                  <Line type="monotone" dataKey="compliance" stroke="hsl(var(--success))" strokeWidth={2} name="Compliance %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MRL Violations Trend</CardTitle>
              <CardDescription>Monthly MRL violations and improvement patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="mrl_violations" stroke="hsl(var(--danger))" fill="hsl(var(--danger) / 0.2)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts & Violations</CardTitle>
              <CardDescription>Recent compliance issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertsData.map((alert) => (
                  <Alert key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2 flex-1">
                        <AlertTriangle className="h-5 w-5 mt-0.5" />
                        <div className="flex-1">
                          <AlertTitle className="flex items-center space-x-2">
                            <span>{alert.farm}</span>
                            <Badge className={getSeverityBadge(alert.severity)} variant="outline">
                              {alert.severity}
                            </Badge>
                          </AlertTitle>
                          <AlertDescription className="mt-2">
                            {alert.message}
                          </AlertDescription>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>📍 {alert.region}</span>
                            <span>📅 {alert.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="default" size="sm">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">High Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-danger mb-2">3</div>
                  <p className="text-sm text-muted-foreground">Immediate Action Required</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Medium Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">8</div>
                  <p className="text-sm text-muted-foreground">Review Within 48hrs</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Low Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky mb-2">15</div>
                  <p className="text-sm text-muted-foreground">Monitor & Track</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};