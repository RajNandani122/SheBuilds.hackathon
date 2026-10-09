import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Car, 
  Users, 
  Zap, 
  TrendingDown, 
  Check, 
  Share2, 
  ShieldCheck, 
  Leaf 
} from 'lucide-react';

export const CostCalculator: React.FC = () => {
  const [distanceMiles, setDistanceMiles] = useState(30);
  const [vehicleType, setVehicleType] = useState<'gas' | 'hybrid' | 'ev'>('ev');
  const [passengersCount, setPassengersCount] = useState(3);
  const [tollsCost, setTollsCost] = useState(7.0);
  const [workDaysPerMonth, setWorkDaysPerMonth] = useState(20);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Cost calculation mechanics
  let fuelPerMile = 0.17; // gas default
  if (vehicleType === 'hybrid') fuelPerMile = 0.09;
  if (vehicleType === 'ev') fuelPerMile = 0.05;

  const fuelTotal = distanceMiles * fuelPerMile;
  const wearTearPerMile = 0.08; // modest carpool maintenance
  const wearTearTotal = distanceMiles * wearTearPerMile;
  const tripBaseCost = fuelTotal + tollsCost + wearTearTotal;

  // Fair cost split across all seats (driver + riders)
  const totalCommuters = passengersCount; // e.g. 1 driver + (passengersCount-1) riders
  const costPerPerson = tripBaseCost / totalCommuters;

  // Comparison metrics
  const soloDriveCost = (distanceMiles * 0.17) + tollsCost + (distanceMiles * 0.12); // solo gas + toll + depreciation
  const soloDriveMonthly = soloDriveCost * 2 * workDaysPerMonth; // round trip

  const rideshareUberBenchmark = Math.max(22, (distanceMiles * 1.85) + tollsCost + 6);
  const rideshareMonthly = rideshareUberBenchmark * 2 * workDaysPerMonth;

  const carpoolMonthlyPerPerson = costPerPerson * 2 * workDaysPerMonth;
  const monthlySavingsVsSolo = soloDriveMonthly - carpoolMonthlyPerPerson;
  const monthlySavingsVsRideshare = rideshareMonthly - carpoolMonthlyPerPerson;

  // CO2 savings estimate: ~404 grams CO2 per mile driven in avg gas car
  const co2SavedKgMonthly = Math.round(
    (distanceMiles * 2 * workDaysPerMonth * 0.404 * ((totalCommuters - 1) / totalCommuters))
  );

  const handleCopySummary = () => {
    const text = `TrustFirst Carpool Cost Split Summary:
• Route Distance: ${distanceMiles} miles (${vehicleType.toUpperCase()})
• Passengers: ${totalCommuters} commuters
• Fair cost per person per trip: $${costPerPerson.toFixed(2)}
• Monthly carpool cost: $${carpoolMonthlyPerPerson.toFixed(0)}/mo
• Monthly savings vs solo drive: $${monthlySavingsVsSolo.toFixed(0)}/mo
• CO2 avoided: ${co2SavedKgMonthly} kg/month`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Title */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-1">
          Non-Profit Fair Share Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Fair Commute Cost-Splitting Calculator
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          Carpooling shouldn't be confusing or profitable for brokers. Calculate exact vehicle energy, bridge tolls, and wear-and-tear split evenly across all seats.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-6 shadow-xs">
          
          {/* Distance Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2">
              <span>One-Way Commute Distance</span>
              <span className="text-emerald-700 text-sm font-bold tabular-nums">
                {distanceMiles} miles
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="70"
              step="1"
              value={distanceMiles}
              onChange={(e) => setDistanceMiles(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>5 mi (local)</span>
              <span>30 mi (Peninsula / East Bay)</span>
              <span>70 mi (intercity)</span>
            </div>
          </div>

          {/* Vehicle Efficiency Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              Vehicle Powertrain
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setVehicleType('ev')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  vehicleType === 'ev'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Electric EV</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">~$0.05 / mile</div>
              </button>

              <button
                type="button"
                onClick={() => setVehicleType('hybrid')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  vehicleType === 'hybrid'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs">
                  <Car className="w-3.5 h-3.5 text-slate-600" />
                  <span>Hybrid</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">50 mpg (~$0.09/mi)</div>
              </button>

              <button
                type="button"
                onClick={() => setVehicleType('gas')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  vehicleType === 'gas'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs">
                  <Car className="w-3.5 h-3.5 text-slate-600" />
                  <span>Gasoline Sedan</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">28 mpg (~$0.17/mi)</div>
              </button>
            </div>
          </div>

          {/* Commuters in Carpool */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2">
              <span>Total Commuters Sharing Vehicle</span>
              <span className="text-slate-500 font-normal">Includes driver</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setPassengersCount(count)}
                  className={`py-2.5 px-3 rounded-lg border text-center transition-colors text-xs font-semibold ${
                    passengersCount === count
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {count} Commuters {count >= 3 ? '(HOV 3+ FastTrak)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Tolls and Monthly Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Tolls & Parking per Trip ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.5"
                  value={tollsCost}
                  onChange={(e) => setTollsCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 tabular-nums"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                e.g. Bay Bridge $7, Dumbarton $7, Golden Gate $9.75
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Commute Days per Month
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={workDaysPerMonth}
                onChange={(e) => setWorkDaysPerMonth(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Typical full-time in-office: 20 days/month
              </span>
            </div>
          </div>

          {/* Itemized Trip Breakdown */}
          <div className="pt-4 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-700 mb-2">
              Itemized Total Trip Cost ({distanceMiles} miles):
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Energy / Fuel:</span>
                <span className="font-semibold text-slate-800 tabular-nums">${fuelTotal.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Bridge Tolls:</span>
                <span className="font-semibold text-slate-800 tabular-nums">${tollsCost.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Wear & Maintenance:</span>
                <span className="font-semibold text-slate-800 tabular-nums">${wearTearTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Results & Impact Summary Column */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Price Card */}
          <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-md">
            <div className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
              Fair Share per Person
            </div>
            
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums text-white">
                ${costPerPerson.toFixed(2)}
              </span>
              <span className="text-slate-400 text-sm">/ one-way ride</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Solo Driver Cost (Gas + Wear + Toll):</span>
                <span className="line-through text-slate-400 tabular-nums">${soloDriveCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Rideshare (Uber/Lyft) Benchmark:</span>
                <span className="line-through text-rose-300 tabular-nums">${rideshareUberBenchmark.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 font-semibold pt-1 border-t border-slate-800">
                <span>Net Savings per Person per Trip:</span>
                <span className="tabular-nums">+${(soloDriveCost - costPerPerson).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopySummary}
              className="mt-5 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Summary Copied to Clipboard!' : 'Share Fair Split Summary'}</span>
            </button>
          </div>

          {/* Monthly Macro Impact Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Monthly Commuter Impact ({workDaysPerMonth} Workdays)
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg">
                <div className="flex items-center gap-1 text-emerald-800 text-xs font-semibold">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Cost Saved</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-950 mt-1 tabular-nums">
                  ${monthlySavingsVsSolo.toFixed(0)}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  vs solo driving costs
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-1 text-slate-700 text-xs font-semibold">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CO₂ Avoided</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                  {co2SavedKgMonthly} kg
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  emissions eliminated
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-normal pt-2 border-t border-slate-100">
              TrustFirst Carpool uses strict non-profit formulas based on actual California utility and fuel benchmarks, ensuring 100% legal compliance with commuter carpool cost-sharing statutes.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
