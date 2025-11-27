import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, TrendingUp, Shield, Leaf } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
          Invest in Your Energy Future
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
          Become an Investor in
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Renewable Energy
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your energy consumption into investment opportunities. Own solar panels, wind turbines, and battery storage while reducing your carbon footprint.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/profile">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-lg px-8">
              Start Investing
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Zap,
            title: "Smart Matching",
            description: "AI-powered recommendations based on your energy profile and goals",
            color: "text-accent",
          },
          {
            icon: TrendingUp,
            title: "Maximize Returns",
            description: "Earn returns while reducing your energy costs and carbon footprint",
            color: "text-primary",
          },
          {
            icon: Shield,
            title: "Secure & Transparent",
            description: "Bank-grade security with full transparency on all investments",
            color: "text-secondary",
          },
          {
            icon: Leaf,
            title: "Sustainable Impact",
            description: "Track your CO₂ reduction and contribution to clean energy",
            color: "text-success",
          },
        ].map((feature, index) => (
          <Card key={index} className="p-6 space-y-4 border-border hover:shadow-lg transition-all">
            <div className={cn("w-12 h-12 rounded-xl bg-muted flex items-center justify-center", feature.color)}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground">Your journey to energy independence in 4 simple steps</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: "Create Profile", description: "Tell us about your energy needs and investment goals" },
            { step: 2, title: "Get Recommendations", description: "Receive AI-powered asset allocation suggestions" },
            { step: 3, title: "Choose Investments", description: "Browse available projects and invest easily" },
            { step: 4, title: "Track & Optimize", description: "Monitor performance and optimize your portfolio" },
          ].map((item) => (
            <div key={item.step} className="relative">
              <Card className="p-6 space-y-3 text-center hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-xl flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
              {item.step < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-accent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 px-6 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <h2 className="text-3xl font-bold">Ready to Start Your Energy Investment Journey?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Join thousands of investors who are already benefiting from renewable energy ownership
        </p>
        <Link to="/profile">
          <Button size="lg" className="bg-primary hover:bg-primary-dark text-lg px-8">
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
