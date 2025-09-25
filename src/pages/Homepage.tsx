import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { CheckCircle, AlertTriangle, Shield, Users, TrendingUp, Globe } from 'lucide-react';
import indianCowHero from '@/assets/indian-cow-hero.jpg';
import indianFarm from '@/assets/indian-farm.jpg';
import governmentBuilding from '@/assets/government-building.jpg';

export const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 relative">
          <div className="absolute inset-0 rounded-lg overflow-hidden opacity-20">
            <img 
              src={indianCowHero} 
              alt="Indian dairy cow in pastoral setting"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Kalnadai AMR Portal
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering responsible antimicrobial use in livestock through digital monitoring, 
              veterinary oversight, and government compliance tracking.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card transition-smooth hover:shadow-elegant relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img src={indianFarm} alt="Indian farm" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="relative z-10">
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Farmer Dashboard</CardTitle>
                <CardDescription>
                  Log antimicrobial usage, track withdrawal periods, and maintain compliance records
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card transition-smooth hover:shadow-elegant">
              <CardHeader>
                <Shield className="h-12 w-12 text-success mb-4" />
                <CardTitle>Veterinary Oversight</CardTitle>
                <CardDescription>
                  Review prescriptions, approve treatments, and ensure proper veterinary guidance
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card transition-smooth hover:shadow-elegant relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img src={governmentBuilding} alt="Government building" className="w-full h-full object-cover" />
              </div>
              <CardHeader className="relative z-10">
                <Globe className="h-12 w-12 text-sky mb-4" />
                <CardTitle>Government Monitoring</CardTitle>
                <CardDescription>
                  Track compliance rates, monitor usage patterns, and enforce regulations
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card transition-smooth hover:shadow-elegant">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-warning mb-4" />
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>
                  Get notified about withdrawal periods, compliance issues, and regulatory updates
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card transition-smooth hover:shadow-elegant">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-accent mb-4" />
                <CardTitle>Data Analytics</CardTitle>
                <CardDescription>
                  Analyze usage trends, compliance rates, and regional patterns for better decisions
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card transition-smooth hover:shadow-elegant">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>MRL Compliance</CardTitle>
                <CardDescription>
                  Ensure Maximum Residue Limits compliance and maintain food safety standards
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Statistics / Did You Know Section */}
        <section className="py-16 bg-primary/5 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Did You Know?</h2>
            <p className="text-xl text-muted-foreground">
              Key statistics about antimicrobial resistance in livestock
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-foreground font-medium mb-2">Global Consumer</p>
                <p className="text-sm text-muted-foreground">
                  India is among the top 5 consumers of veterinary antimicrobials globally.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-warning mb-2">60%</div>
                <p className="text-foreground font-medium mb-2">Without Oversight</p>
                <p className="text-sm text-muted-foreground">
                  Up to 60% of antimicrobials in livestock are used without veterinary oversight.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-elegant transition-smooth">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-danger mb-2">10M</div>
                <p className="text-foreground font-medium mb-2">Deaths by 2050</p>
                <p className="text-sm text-muted-foreground">
                  Antimicrobial resistance could cause 10 million deaths annually by 2050 if not controlled.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Understanding AMR</h2>
            <p className="text-xl text-muted-foreground">
              Essential information about antimicrobial resistance and monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader>
                <CardTitle className="text-xl">What is AMR?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Antimicrobial Resistance occurs when bacteria, viruses, and parasites evolve to resist drugs. 
                  This makes infections harder to treat and increases risks.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader>
                <CardTitle className="text-xl">Why monitoring AMU matters?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Monitoring prevents resistant bacteria development that can transfer to humans through 
                  food chain, ensuring food safety and public health.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader>
                <CardTitle className="text-xl">What are Maximum Residue Limits (MRLs)?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  MRLs are maximum concentrations of antimicrobial residues legally permitted in food products 
                  to ensure human consumption safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12 rounded-lg mt-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <span className="font-bold text-2xl">Kalnadai AMR Portal</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Digital Livestock Monitoring & Antimicrobial Resistance Management System
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Kalnadai AMR Portal. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Homepage;