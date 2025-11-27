import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Battery, Wind, MapPin, TrendingUp, Leaf, Clock } from "lucide-react";

const projects = [
  {
    id: 1,
    type: "solar",
    name: "Luxembourg Solar Park Phase 2",
    location: "Bettembourg, Luxembourg",
    capacity: "2.5 kWc",
    price: 1250,
    return: 7.2,
    co2: 1.8,
    availability: "available",
    image: "🌞",
  },
  {
    id: 2,
    type: "battery",
    name: "Community Battery Storage",
    location: "Esch-sur-Alzette, Luxembourg",
    capacity: "5 kWh",
    price: 750,
    return: 5.8,
    co2: 1.2,
    availability: "low",
    image: "🔋",
  },
  {
    id: 3,
    type: "wind",
    name: "Northern Wind Farm Expansion",
    location: "Erpeldange, Luxembourg",
    capacity: "1.5 kW",
    price: 850,
    return: 6.5,
    co2: 2.1,
    availability: "available",
    image: "💨",
  },
  {
    id: 4,
    type: "solar",
    name: "Residential Solar Initiative",
    location: "Luxembourg City",
    capacity: "3 kWc",
    price: 1500,
    return: 6.8,
    co2: 2.0,
    availability: "available",
    image: "🌞",
  },
  {
    id: 5,
    type: "battery",
    name: "Industrial Battery Hub",
    location: "Differdange, Luxembourg",
    capacity: "8 kWh",
    price: 1200,
    return: 6.2,
    co2: 1.5,
    availability: "waitlist",
    image: "🔋",
  },
  {
    id: 6,
    type: "wind",
    name: "Offshore Wind Partnership",
    location: "Belgium Coast (shared)",
    capacity: "2 kW",
    price: 1100,
    return: 7.5,
    co2: 2.5,
    availability: "low",
    image: "💨",
  },
];

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState<"all" | "solar" | "battery" | "wind">("all");

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case "solar":
        return Sun;
      case "battery":
        return Battery;
      case "wind":
        return Wind;
      default:
        return Sun;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-success">Available</Badge>;
      case "low":
        return <Badge variant="outline" className="border-accent text-accent">Low Availability</Badge>;
      case "waitlist":
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Waitlist</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Investment Opportunities</h1>
        <p className="text-muted-foreground">
          Browse available renewable energy projects and start investing today
        </p>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Projects
          </Button>
          <Button
            variant={filter === "solar" ? "default" : "outline"}
            onClick={() => setFilter("solar")}
          >
            <Sun className="w-4 h-4 mr-2" />
            Solar
          </Button>
          <Button
            variant={filter === "battery" ? "default" : "outline"}
            onClick={() => setFilter("battery")}
          >
            <Battery className="w-4 h-4 mr-2" />
            Battery
          </Button>
          <Button
            variant={filter === "wind" ? "default" : "outline"}
            onClick={() => setFilter("wind")}
          >
            <Wind className="w-4 h-4 mr-2" />
            Wind
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const Icon = getIcon(project.type);
          return (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all group">
              {/* Project Image/Icon */}
              <div className="h-32 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center text-6xl">
                {project.image}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{project.name}</h3>
                    {getAvailabilityBadge(project.availability)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{project.capacity}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Return</span>
                    </div>
                    <div className="font-bold text-primary">{project.return}%</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <Leaf className="w-4 h-4" />
                      <span>CO₂ Saved</span>
                    </div>
                    <div className="font-bold">{project.co2}t/year</div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Entry Price</span>
                    <span className="text-2xl font-bold text-primary">€{project.price}</span>
                  </div>

                  {project.availability === "waitlist" ? (
                    <Button variant="outline" className="w-full" disabled>
                      <Clock className="w-4 h-4 mr-2" />
                      Join Waitlist
                    </Button>
                  ) : (
                    <Link to="/confirmation" className="block">
                      <Button className="w-full bg-primary hover:bg-primary-dark group-hover:scale-105 transition-transform">
                        Invest Now
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
