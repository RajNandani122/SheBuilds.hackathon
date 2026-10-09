import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  CreditCard, 
  CheckCircle2, 
  TrendingDown, 
  Users, 
  Fuel, 
  Receipt, 
  Sparkles, 
  Check 
} from 'lucide-react';

export const CostSplitPage: React.FC = () => {
  const [tripDistanceKm] = useState(18.4);
  const [fuelCost] = useState(260);
  const [tollCost] = useState(100);
  const [maintenanceCost] = useState(80);
  const totalCost = fuelCost + tollCost + maintenanceCost; // ₹440
  const totalPeople = 4;
  const yourShare = totalCost / totalPeople; // ₹110

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [upiId, setUpiId] = useState('priya@okhdfcbank');

  const handlePayViaUpi = () => {
    // Fire festive canvas-confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2E7D32', '#1976D2', '#4CAF50', '#E91E63', '#FFD700'],
      });
    } catch (e) {
      // fallback safe
    }

    setPaymentSuccess(true);
    setTimeout(() => {
      // Keep success state visible
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5" />
          <span>Non-Profit Cost Splitting Engine · Zero Platform Markup</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Automated Distance & Toll Cost Split
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Fuel, toll plaza fares, and maintenance calculated down to the kilometer and split evenly among 4 commuters.
        </p>
      </div>

      {/* 3 Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trip Distance</span>
          <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">
            {tripDistanceKm} <span className="text-sm font-semibold text-slate-500">km</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Richmond Circle ⇄ Acme Tech Park</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Vehicle Cost</span>
          <div className="text-3xl font-black text-slate-900 tabular-nums mt-1">
            ₹{totalCost}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Full commute operational expense</span>
        </div>

        <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Your Fair Share</span>
          <div className="text-3xl font-black text-emerald-950 tabular-nums mt-1">
            ₹{yourShare}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">Split between 4 commuters</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cost Breakdown Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#1976D2]" />
              <span>Itemized Travel Cost Breakdown</span>
            </h3>
            <span className="text-xs text-slate-500">Per Commute Run</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="pb-3">Expense Category</th>
                  <th className="pb-3 text-right">Trip Total</th>
                  <th className="pb-3 text-right">Split (4 People)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 font-semibold text-slate-800 flex items-center gap-2">
                    <Fuel className="w-3.5 h-3.5 text-slate-400" />
                    <span>Fuel (Petrol @ ₹102.86/L)</span>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-slate-800">₹{fuelCost}</td>
                  <td className="py-3 text-right font-mono font-bold text-slate-600">₹{fuelCost / 4}</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-slate-800 flex items-center gap-2">
                    <span>🛣️</span>
                    <span>Elevated Toll Plaza (Electronic FASTag)</span>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-slate-800">₹{tollCost}</td>
                  <td className="py-3 text-right font-mono font-bold text-slate-600">₹{tollCost / 4}</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-slate-800 flex items-center gap-2">
                    <span>🔧</span>
                    <span>Vehicle Depreciation & Tires</span>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-slate-800">₹{maintenanceCost}</td>
                  <td className="py-3 text-right font-mono font-bold text-slate-600">₹{maintenanceCost / 4}</td>
                </tr>
                <tr className="bg-emerald-50/60 font-bold">
                  <td className="py-3 px-2 text-emerald-950 font-extrabold">Total Trip Amount</td>
                  <td className="py-3 px-2 text-right font-mono text-emerald-950">₹{totalCost}</td>
                  <td className="py-3 px-2 text-right font-mono text-emerald-800 text-sm">₹{yourShare} / person</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between font-medium">
              <span>Solo Cab Surge Rate (Uber/Ola):</span>
              <span className="line-through text-slate-400">₹420.00</span>
            </div>
            <div className="flex justify-between font-bold text-[#2E7D32]">
              <span>Your Savings Today:</span>
              <span>+₹310.00 saved per day</span>
            </div>
          </div>
        </div>

        {/* UPI Payment Box (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#2E7D32]" />
              <span>Instant UPI Settlement</span>
            </h3>
            <p className="text-xs text-slate-500">
              Direct peer-to-peer settlement to driver Sneha Rao
            </p>
          </div>

          {paymentSuccess ? (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="font-extrabold text-emerald-950 text-base">
                Payment Successful! 🎉
              </h4>
              <p className="text-xs text-emerald-800">
                ₹{yourShare}.00 transferred directly to Sneha Rao via UPI. Transaction reference: <span className="font-mono font-bold">UPI/ACME/992014</span>.
              </p>
              <div className="pt-2 text-[11px] text-emerald-700 font-semibold">
                +40 EcoCoins credited to your sustainability wallet!
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Linked UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] font-mono"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Payee:</span>
                  <span className="font-bold text-slate-800">Sneha Rao (sneha@upi)</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Amount Due:</span>
                  <span className="font-bold text-emerald-800 text-sm">₹{yourShare}.00</span>
                </div>
              </div>

              {/* Pay via UPI button */}
              <button
                type="button"
                onClick={handlePayViaUpi}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#2E7D32] to-[#1976D2] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>💳 Pay via UPI (₹{yourShare})</span>
              </button>

              <span className="text-[11px] text-slate-400 text-center block">
                Instant UPI transfer via Google Pay, PhonePe, or BHIM. Zero processing fee.
              </span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
