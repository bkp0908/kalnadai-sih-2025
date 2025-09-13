import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Database, Stethoscope, Building, Mail, Phone, MapPin } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">🌾</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">About Kalnadai AMR Portal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive digital platform for managing antimicrobial resistance (AMR) in livestock, 
            ensuring food safety and promoting responsible antimicrobial use across Tamil Nadu.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To combat antimicrobial resistance by providing farmers, veterinarians, and government 
                officials with the tools and knowledge needed to ensure responsible antimicrobial use 
                in livestock, protecting both animal and human health while maintaining food safety standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-secondary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a sustainable future where antimicrobial resistance is effectively managed 
                through digital innovation, scientific evidence, and collaborative efforts across 
                the livestock industry, ensuring safe food production for generations to come.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Multi-User Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dedicated interfaces for farmers, veterinarians, and government officials, 
                  each tailored to their specific needs and responsibilities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Comprehensive Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete documentation of antimicrobial usage, withdrawal periods, and 
                  compliance status with automated alerts and notifications.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built-in compliance monitoring with FSSAI guidelines, MRL limits, 
                  and withdrawal period enforcement to ensure food safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Target Users */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who We Serve</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle>Farmers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Log antimicrobial treatments easily</li>
                  <li>• Track withdrawal periods automatically</li>
                  <li>• Receive compliance alerts and reminders</li>
                  <li>• Document treatment history with photos</li>
                  <li>• Ensure food safety compliance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>Veterinarians</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Create digital prescriptions</li>
                  <li>• Monitor treatment outcomes</li>
                  <li>• Analyze usage patterns</li>
                  <li>• Ensure responsible prescribing</li>
                  <li>• Support farmer compliance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle>Government Officials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Monitor regional compliance</li>
                  <li>• Generate comprehensive reports</li>
                  <li>• Track AMR trends</li>
                  <li>• Enforce policy implementation</li>
                  <li>• Support data-driven decisions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Built with Modern Technology</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Frontend</Badge>
                  <p className="text-sm text-muted-foreground">React, TypeScript, Tailwind CSS</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Backend</Badge>
                  <p className="text-sm text-muted-foreground">Supabase, PostgreSQL</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Security</Badge>
                  <p className="text-sm text-muted-foreground">Row Level Security, Encryption</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Multilingual</Badge>
                  <p className="text-sm text-muted-foreground">English & Tamil Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Contact & Support</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>support@kalnadai-amr.gov.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>+91-44-XXXX-XXXX</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a 
                    href="https://www.youtube.com/watch?v=NVIe8Bj78rE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    📹 Video Tutorials
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  📚 User Guides (Coming Soon)
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  💬 Live Chat Support (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the fight against antimicrobial resistance. Start managing your livestock 
            responsibly with our comprehensive digital platform.
          </p>
          <Button size="lg" asChild>
            <a href="/login">Access Portal</a>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;