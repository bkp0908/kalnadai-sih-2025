import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Database, BookOpen } from "lucide-react";

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Documentation & Datasets</h1>
          <p className="text-xl text-muted-foreground">
            Access comprehensive documentation, datasets, and resources for antimicrobial resistance management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Withdrawal Periods Database</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive database of withdrawal periods for various antimicrobials used in livestock.
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="/data/withdrawal-periods.xlsx" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download Dataset
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>MRL Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Maximum Residue Limits (MRL) guidelines and compliance requirements for food safety.
              </p>
              <Button variant="outline" className="w-full" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Regulatory Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Indian regulatory framework and guidelines for antimicrobial use in livestock.
              </p>
              <Button variant="outline" className="w-full" disabled>
                <Download className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Documentation</h2>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">Farmer Portal Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete guide on how to log antimicrobial usage and track withdrawal periods
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h3 className="font-semibold">Veterinarian Portal Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Instructions for prescribing treatments and monitoring compliance
                    </p>
                  </div>
                  <div className="border-l-4 border-accent pl-4">
                    <h3 className="font-semibold">Government Portal Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      How to monitor regional compliance and generate reports
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;