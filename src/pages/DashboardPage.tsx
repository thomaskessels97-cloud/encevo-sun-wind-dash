import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Battery, Wind, TrendingUp, Leaf, DollarSign, AlertCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const portfolio = {
    totalValue: 5000,
    totalReturn: 325,
    returnPercentage: 6.5,
    co2Saved: 4.5,
    autonomy: 65,
  };

  const investments = [
    {
      id: 1,
      name: "Luxembourg Solar Park Phase 2",
      type: "solar",
      icon: Sun,
      capacity: "2.5 kWc",
      invested: 1250,
      currentValue: 1340,
      return: 7.2,
      status: "active",
    },
    {
      id: 2,
      name: "Community Battery Storage",
      type: "battery",
      icon: Battery,
      capacity: "5 kWh",
      invested: 750,
      currentValue: 795,
      return: 6.0,
      status: "active",
    },
    {
      id: 3,
      name: "Northern Wind Farm",
      type: "wind",
      icon: Wind,
      capacity: "1.5 kW",
      invested: 850,
      currentValue: 905,
      return: 6.5,
      status: "active",
    },
  ];

  const aiRecommendations = [
    {
      type: "increase",
      message: "Consider increasing battery storage by 15% to optimize energy autonomy",
      priority: "medium",
    },
    {
      type: "opportunity",
      message: "New solar project available matching your profile - 8.2% expected return",
      priority: "high",
    },
    {
      type: "optimize",
      message: "Your wind energy allocation could be increased for better diversification",
      priority: "low",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Investment Dashboard</h1>
          <p className="text-muted-foreground">Track and optimize your energy portfolio</p>
        </div>
        <Link to="/opportunities">
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            New Investment
          </Button>
        </Link>
      </div>

      {/* Portfolio Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>Total Value</span>
          </div>
          <div className="text-3xl font-bold text-primary">€{portfolio.totalValue.toLocaleString()}</div>
          <div className="text-sm text-success">+€{portfolio.totalReturn} ({portfolio.returnPercentage}%)</div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Total Return</span>
          </div>
          <div className="text-3xl font-bold text-primary">{portfolio.returnPercentage}%</div>
          <div className="text-sm text-muted-foreground">Annual average</div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Leaf className="w-4 h-4" />
            <span>CO₂ Saved</span>
          </div>
          <div className="text-3xl font-bold text-secondary">{portfolio.co2Saved}t</div>
          <div className="text-sm text-muted-foreground">This year</div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sun className="w-4 h-4" />
            <span>Autonomy</span>
          </div>
          <div className="text-3xl font-bold text-accent">{portfolio.autonomy}%</div>
          <div className="text-sm text-muted-foreground">Energy coverage</div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <h2 className="text-xl font-bold">Smart Recommendations</h2>
        </div>

        <div className="space-y-3">
          {aiRecommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all"
            >
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${
                  rec.priority === "high"
                    ? "text-primary"
                    : rec.priority === "medium"
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm">{rec.message}</p>
              </div>
              <Badge
                variant={rec.priority === "high" ? "default" : "outline"}
                className={rec.priority === "high" ? "bg-primary" : ""}
              >
                {rec.priority}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Investments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Investments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map((investment) => {
            const Icon = investment.icon;
            const gain = investment.currentValue - investment.invested;
            const gainPercentage = ((gain / investment.invested) * 100).toFixed(1);

            return (
              <Card key={investment.id} className="p-6 space-y-4 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className="bg-success">Active</Badge>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">{investment.name}</h3>
                  <p className="text-sm text-muted-foreground">{investment.capacity}</p>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Invested</span>
                    <span className="font-medium">€{investment.invested}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Value</span>
                    <span className="font-bold text-primary">€{investment.currentValue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gain</span>
                    <span className="font-bold text-success">
                      +€{gain} ({gainPercentage}%)
                    </span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Consumption vs Production Chart Placeholder */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Consumption vs. Production</h2>
        <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed">
          <div className="text-center space-y-2">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Chart visualization coming soon</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
