import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Sun, TrendingUp, Leaf, Shield, ArrowRight } from "lucide-react";

export default function ConfirmationPage() {
  const selectedInvestment = {
    name: "Luxembourg Solar Park Phase 2",
    type: "Solar Panels",
    capacity: "2.5 kWc",
    price: 1250,
    return: 7.2,
    co2: 1.8,
  };

  const impact = {
    coverageIncrease: 18,
    annualReturn: 90,
    co2Reduction: 1.8,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sun className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Confirm Your Investment</h1>
        <p className="text-muted-foreground">
          Review your investment details before finalizing
        </p>
      </div>

      {/* Investment Summary */}
      <Card className="p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-1">{selectedInvestment.name}</h2>
          <p className="text-muted-foreground">{selectedInvestment.type} • {selectedInvestment.capacity}</p>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Investment Amount</span>
            <span className="text-2xl font-bold text-primary">€{selectedInvestment.price.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Expected Return</span>
              </div>
              <div className="text-xl font-bold text-primary">{selectedInvestment.return}%</div>
              <div className="text-sm text-muted-foreground">per year</div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Leaf className="w-4 h-4" />
                <span>CO₂ Impact</span>
              </div>
              <div className="text-xl font-bold">{selectedInvestment.co2}t</div>
              <div className="text-sm text-muted-foreground">saved per year</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Impact Visualization */}
      <Card className="p-8 space-y-6 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <h2 className="text-xl font-bold">Your Investment Impact</h2>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-accent" />
                <span className="font-medium">Energy Coverage</span>
              </div>
              <span className="text-lg font-bold text-primary">+{impact.coverageIncrease}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: "65%" }} />
            </div>
            <p className="text-sm text-muted-foreground">
              You'll now cover 65% of your annual energy consumption
            </p>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-5 h-5" />
                <span>Annual Income</span>
              </div>
              <div className="text-3xl font-bold text-primary">€{impact.annualReturn}</div>
              <p className="text-sm text-muted-foreground">Expected return in year 1</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Leaf className="w-5 h-5" />
                <span>Environmental Impact</span>
              </div>
              <div className="text-3xl font-bold text-secondary">{impact.co2Reduction}t CO₂</div>
              <p className="text-sm text-muted-foreground">Equivalent to 450 trees planted</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Terms */}
      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
          <div className="space-y-2 text-sm">
            <p className="font-medium">By confirming, you agree to:</p>
            <ul className="space-y-1 text-muted-foreground ml-4 list-disc">
              <li>Investment terms and conditions</li>
              <li>Long-term commitment (minimum 5 years)</li>
              <li>Risk disclosure and return expectations</li>
              <li>Privacy policy and data handling</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/opportunities" className="flex-1">
          <Button variant="outline" className="w-full">
            Back to Projects
          </Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button className="w-full bg-primary hover:bg-primary-dark text-lg h-12">
            Confirm Investment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
