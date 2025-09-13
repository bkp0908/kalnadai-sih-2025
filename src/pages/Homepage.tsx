import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, BookOpen, AlertTriangle, Users, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">🌾</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Kalnadai AMR Portal
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Digital Livestock Monitoring & Antimicrobial Resistance Management System
            </p>
            <p className="text-lg text-muted-foreground mb-10">
              Empowering farmers, veterinarians, and government officials with comprehensive 
              livestock health management and compliance monitoring tools.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Livestock Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Monitor, track, and ensure compliance with antimicrobial usage across your livestock operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>For Farmers</CardTitle>
                <CardDescription>
                  Log antimicrobial usage, track withdrawal periods, and ensure food safety compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Easy medication logging</li>
                  <li>• Automated withdrawal period alerts</li>
                  <li>• Compliance status tracking</li>
                  <li>• Photo documentation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>For Veterinarians</CardTitle>
                <CardDescription>
                  Prescribe treatments, monitor usage patterns, and ensure responsible antimicrobial use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Digital prescriptions</li>
                  <li>• Usage pattern analysis</li>
                  <li>• Treatment history tracking</li>
                  <li>• Compliance monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>For Government</CardTitle>
                <CardDescription>
                  Monitor compliance, analyze data, and ensure food safety standards across regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Regional compliance tracking</li>
                  <li>• Data analytics dashboard</li>
                  <li>• Policy enforcement tools</li>
                  <li>• Reporting system</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for responsible antimicrobial management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data Management</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive livestock and treatment data storage
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Automated withdrawal period and compliance notifications
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Compliance</h3>
              <p className="text-sm text-muted-foreground">
                MRL limits and regulatory compliance monitoring
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Complete treatment history and prescription records
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Did You Know?
            </h2>
            <p className="text-xl text-muted-foreground">
              Key statistics about antimicrobial resistance in livestock
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-elegant transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-foreground font-medium mb-2">Global Consumer</p>
                <p className="text-sm text-muted-foreground">
                  India is among the top 5 consumers of veterinary antimicrobials globally.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-secondary mb-2">60%</div>
                <p className="text-foreground font-medium mb-2">Unsupervised Usage</p>
                <p className="text-sm text-muted-foreground">
                  Up to 60% of antimicrobials in livestock are used without veterinary oversight.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-accent mb-2">10M</div>
                <p className="text-foreground font-medium mb-2">Deaths by 2050</p>
                <p className="text-sm text-muted-foreground">
                  Antimicrobial resistance could cause 10 million deaths annually by 2050 if not controlled.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Understanding AMR
            </h2>
            <p className="text-xl text-muted-foreground">
              Essential information about antimicrobial resistance and monitoring
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">What is AMR?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Antimicrobial Resistance (AMR) occurs when bacteria, viruses, fungi, and parasites evolve to resist the drugs designed to kill them. This makes infections harder to treat and increases the risk of disease spread, severe illness, and death.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Why Monitor AMU?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Monitoring Antimicrobial Usage (AMU) in livestock is crucial for preventing the development of resistant bacteria that can transfer to humans through the food chain, ensuring food safety and protecting public health.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">What are MRLs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Maximum Residue Limits (MRLs) are the maximum concentrations of antimicrobial residues that are legally permitted in food products. They ensure that food consumption remains safe for human health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="gradient-primary w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">🌾</span>
                </div>
                <span className="font-bold text-lg">Kalnadai</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Digital Livestock Monitoring & AMR Management System
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/login" className="hover:text-foreground">Login</Link></li>
                <li><Link to="/about" className="hover:text-foreground">About</Link></li>
                <li>
                  <a 
                    href="https://www.youtube.com/watch?v=NVIe8Bj78rE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    Tutorial
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Compliance</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/mrl" className="hover:text-foreground">MRL Compliance</Link></li>
                <li><Link to="/banned" className="hover:text-foreground">Banned Antimicrobials</Link></li>
                <li><Link to="/withdrawal" className="hover:text-foreground">Withdrawal Periods</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/docs" className="hover:text-foreground">Documentation</Link></li>
                <li><Link to="/about" className="hover:text-foreground">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Kalnadai AMR Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;