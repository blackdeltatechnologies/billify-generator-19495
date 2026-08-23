import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, History, Share2, Shield, Zap, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Bills & Receipts',
    description: 'Generate professional invoices and receipts with multiple templates.',
  },
  {
    icon: Users,
    title: 'Customer Database',
    description: 'Save customers and auto-fill their details on every document.',
  },
  {
    icon: History,
    title: 'Document History',
    description: 'Keep a searchable record of every invoice and receipt you create.',
  },
  {
    icon: Share2,
    title: 'Share & Email',
    description: 'Send PDFs directly to clients or share them with a public link.',
  },
  {
    icon: Shield,
    title: 'Secure Cloud Storage',
    description: 'Your data is safely stored in the cloud and accessible anywhere.',
  },
  {
    icon: Zap,
    title: 'Fast & Simple',
    description: 'Create polished documents in seconds with an easy-to-use interface.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Zap className="h-4 w-4" />
            Free to get started
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Professional Bills</span>
            <br />
            <span className="text-foreground">& Receipts in Seconds</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            Create, store, and share invoices and receipts for your business. Built for Tanzania and Kenya with TSH and KSH support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-primary-foreground px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete document toolkit for small businesses, freelancers, and shops.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="glass-effect border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass-effect rounded-3xl p-12 text-center shadow-card">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to streamline your billing?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join today and start creating professional documents for your business.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-primary-foreground px-8">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Billify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
