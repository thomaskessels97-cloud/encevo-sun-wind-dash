/**
 * Investment calculation utilities for dynamic portfolio allocation
 */

export interface OptimalInvestment {
  optimal: number;
  min: number;
  max: number;
  selfConsumptionRate: number;
  annualConsumption: number;
}

/**
 * Calculate optimal investment based on annual consumption
 * Targets ~65% self-consumption rate for best ROI
 */
export function calculateOptimalInvestment(annualConsumption: number): OptimalInvestment {
  // Luxembourg-specific parameters
  const SOLAR_PRODUCTION_PER_KWC = 950; // kWh/year in Luxembourg
  const COST_PER_KWC = 1111; // € per kWc installed
  const OPTIMAL_SELF_CONSUMPTION_RATE = 0.65; // 65% = sweet spot for ROI
  
  // Calculate optimal solar capacity to cover 65% of consumption
  const targetProduction = annualConsumption * OPTIMAL_SELF_CONSUMPTION_RATE;
  const optimalCapacityKwc = targetProduction / SOLAR_PRODUCTION_PER_KWC;
  
  // Calculate investment (round to €250 increments)
  const rawOptimal = optimalCapacityKwc * COST_PER_KWC;
  const optimalInvestment = Math.round(rawOptimal / 250) * 250;
  
  // Define recommended range (±30% around optimal)
  const minInvestment = Math.round((rawOptimal * 0.7) / 250) * 250;
  const maxInvestment = Math.round((rawOptimal * 1.3) / 250) * 250;
  
  return {
    optimal: Math.max(250, Math.min(50000, optimalInvestment)),
    min: Math.max(250, Math.min(50000, minInvestment)),
    max: Math.max(250, Math.min(50000, maxInvestment)),
    selfConsumptionRate: OPTIMAL_SELF_CONSUMPTION_RATE,
    annualConsumption,
  };
}

export interface UserProfile {
  budget: number;
  objectives: string[];
  riskAppetite: "conservative" | "moderate" | "aggressive";
  energyConsumption?: number;
  housingType?: string;
  tariff?: string;
}

export interface PortfolioAllocation {
  solar: {
    percentage: number;
    investment: number;
    capacity: string;
  };
  battery: {
    percentage: number;
    investment: number;
    capacity: string;
  };
  wind: {
    percentage: number;
    investment: number;
    capacity: string;
  };
}

export interface ScenarioMetrics {
  return: number;
  autonomy: number;
  co2: number;
}

/**
 * Calculate dynamic portfolio allocation based on user profile
 */
export function calculatePortfolioAllocation(profile: UserProfile): PortfolioAllocation {
  const budget = profile.budget;
  let solarPct = 50;
  let batteryPct = 30;
  let windPct = 20;

  // Adjust based on objectives
  if (profile.objectives.includes("maximize-return")) {
    solarPct += 10;
    windPct += 5;
    batteryPct -= 15;
  }
  
  if (profile.objectives.includes("energy-autonomy")) {
    batteryPct += 15;
    solarPct += 5;
    windPct -= 20;
  }
  
  if (profile.objectives.includes("sustainability")) {
    windPct += 10;
    batteryPct += 5;
    solarPct -= 15;
  }

  // Adjust based on risk appetite
  switch (profile.riskAppetite) {
    case "conservative":
      batteryPct += 10;
      solarPct += 5;
      windPct -= 15;
      break;
    case "aggressive":
      windPct += 10;
      solarPct += 5;
      batteryPct -= 15;
      break;
    // moderate stays at baseline
  }

  // Ensure percentages sum to 100 and stay within reasonable bounds
  const total = solarPct + batteryPct + windPct;
  solarPct = Math.round((solarPct / total) * 100);
  batteryPct = Math.round((batteryPct / total) * 100);
  windPct = 100 - solarPct - batteryPct; // Ensure exact 100%

  // Constrain to realistic ranges
  solarPct = Math.max(30, Math.min(65, solarPct));
  batteryPct = Math.max(15, Math.min(45, batteryPct));
  windPct = Math.max(10, Math.min(40, windPct));

  // Normalize again after constraints
  const constrainedTotal = solarPct + batteryPct + windPct;
  solarPct = Math.round((solarPct / constrainedTotal) * 100);
  batteryPct = Math.round((batteryPct / constrainedTotal) * 100);
  windPct = 100 - solarPct - batteryPct;

  // Calculate investments
  const solarInvestment = Math.round(budget * (solarPct / 100));
  const batteryInvestment = Math.round(budget * (batteryPct / 100));
  const windInvestment = budget - solarInvestment - batteryInvestment; // Ensure total matches budget

  // Calculate capacities (based on approximate costs per kW/kWh)
  const solarCapacity = (solarInvestment / 1111).toFixed(1); // ~€1111 per kWc
  const batteryCapacity = (batteryInvestment / 625).toFixed(0); // ~€625 per kWh
  const windCapacity = (windInvestment / 2500).toFixed(1); // ~€2500 per kW

  return {
    solar: {
      percentage: solarPct,
      investment: solarInvestment,
      capacity: `${solarCapacity} kWc`,
    },
    battery: {
      percentage: batteryPct,
      investment: batteryInvestment,
      capacity: `${batteryCapacity} kWh`,
    },
    wind: {
      percentage: windPct,
      investment: windInvestment,
      capacity: `${windCapacity} kW`,
    },
  };
}

/**
 * Calculate expected metrics for a given allocation
 */
export function calculateScenarioMetrics(
  solarPct: number,
  batteryPct: number,
  windPct: number
): ScenarioMetrics {
  // Base return rates: solar (7.2%), battery (5.8%), wind (6.8%)
  const avgReturn = (solarPct * 7.2 + batteryPct * 5.8 + windPct * 6.8) / 100;

  // Autonomy: battery and solar contribute most
  const autonomy = 40 + (solarPct * 0.4) + (batteryPct * 0.6) + (windPct * 0.2);

  // CO2: wind has highest impact, then solar, then battery
  const co2 = (solarPct * 0.035 + batteryPct * 0.025 + windPct * 0.045);

  return {
    return: Math.round(avgReturn * 10) / 10,
    autonomy: Math.round(autonomy),
    co2: Math.round(co2 * 10) / 10,
  };
}

/**
 * Generate alternative scenarios based on current recommendation
 */
export function generateAlternativeScenarios(
  current: PortfolioAllocation,
  budget: number
) {
  const scenarios = [
    {
      name: "Current Recommendation",
      solar: current.solar.percentage,
      battery: current.battery.percentage,
      wind: current.wind.percentage,
      ...calculateScenarioMetrics(
        current.solar.percentage,
        current.battery.percentage,
        current.wind.percentage
      ),
    },
    {
      name: "Max Return",
      solar: 60,
      battery: 20,
      wind: 20,
      ...calculateScenarioMetrics(60, 20, 20),
    },
    {
      name: "Max Autonomy",
      solar: 45,
      battery: 40,
      wind: 15,
      ...calculateScenarioMetrics(45, 40, 15),
    },
    {
      name: "Most Sustainable",
      solar: 35,
      battery: 25,
      wind: 40,
      ...calculateScenarioMetrics(35, 25, 40),
    },
  ];

  return scenarios;
}
