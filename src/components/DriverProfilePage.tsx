import React from 'react';
import { Driver, DRIVERS } from '../data/carpoolData';
import { 
  Star, 
  ShieldCheck, 
  Car, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Calendar, 
  Users, 
  Check 
} from 'lucide-react';

interface DriverProfilePageProps {
  driver: Driver;
  onSelectDriver: (driver: Driver) => void;
  onBookSeat: (driver: Driver) => void;
  onBackToMatches: () => void;
  womenOnlyMode: boolean;
}

export const DriverProfilePage: React.FC<DriverProfilePageProps> = ({
  driver,
  onSelectDriver,
  onBookSeat,
  onBackToMatches,
  womenOnlyMode,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top Bar with Back Button & Driver Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToMatches}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches Feed</span>
        </button>

        {/* Quick Driver switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs">
          {DRIVERS.map((d) => (
            <button
              key={d.id}
              onClick={() => onSelectDriver(d)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                driver.id === d.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d.name} {d.gender === 'female' ? '👩' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Profile Dossier Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Header Profile Identity */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {driver.name}
                </h2>
                {driver.gender === 'female' && (
                  <span className="text-base" title="Female Colleague">👩</span>
                )}
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                  Acme Verified
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 font-medium">
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{driver.rating} ({driver.ridesCompleted} shared rides)</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="font-bold text-[#1976D2]">
                  Reliability {driver.reliabilityScore}/10
                </span>
              </div>

              {/* Badges Checklist */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                {driver.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg font-semibold text-[11px]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA & Fare */}
          <div className="sm:text-right shrink-0">
            <div className="text-3xl font-black text-slate-900 tabular-nums">
              ₹{driver.costShareInr}
              <span className="text-xs font-normal text-slate-500"> / seat</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              Includes Fuel & Toll Split
            </div>

            <button
              type="button"
              onClick={() => onBookSeat(driver)}
              className={`mt-3 w-full sm:w-auto px-6 py-3 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                womenOnlyMode
                  ? 'bg-[#E91E63] hover:bg-[#C2185B]'
                  : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Confirm Recurring Seat</span>
            </button>
          </div>
        </div>

        {/* Vehicle & Capacity Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block font-bold uppercase text-[10px]">Vehicle Model</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{driver.carModel} ({driver.carYear})</span>
            <span className="text-slate-500 font-mono text-[11px]">{driver.plateNumber}</span>
          </div>

          <div>
            <span className="text-slate-400 block font-bold uppercase text-[10px]">Seats Available</span>
            <span className="font-bold text-emerald-800 text-sm mt-0.5 block">
              {driver.availableSeats} of {driver.totalSeats} seats open
            </span>
            <span className="text-slate-500 text-[11px]">Clean interior, AC on</span>
          </div>

          <div>
            <span className="text-slate-400 block font-bold uppercase text-[10px]">Schedule & Vibe</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{driver.days} at {driver.pickupTime}</span>
            <span className="text-slate-500 text-[11px]">{driver.vibe} Morning Vibe</span>
          </div>
        </div>

        {/* 4 Core Reliability & Match Metrics */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Corridor Match & Punctuality Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Route Overlap</span>
              <span className="text-2xl font-black text-[#2E7D32] tabular-nums block mt-1">
                {driver.routeOverlapPct}%
              </span>
              <span className="text-[10px] text-slate-500">Same highway corridor</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Detour Added</span>
              <span className="text-2xl font-black text-slate-900 tabular-nums block mt-1">
                {driver.detourKm} <span className="text-xs font-normal text-slate-500">km</span>
              </span>
              <span className="text-[10px] text-slate-500">Minimal pickup diversion</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">On-Time %</span>
              <span className="text-2xl font-black text-[#1976D2] tabular-nums block mt-1">
                {driver.onTimePct}%
              </span>
              <span className="text-[10px] text-slate-500">Punctual arrival record</span>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cancellations</span>
              <span className="text-2xl font-black text-emerald-800 tabular-nums block mt-1">
                {driver.cancellationsPct}%
              </span>
              <span className="text-[10px] text-slate-500">Near zero cancellation</span>
            </div>

          </div>
        </div>

        {/* Recent Colleague Reviews (3 fake reviews) */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Recent Reviews from Acme Colleagues
          </h3>
          <div className="space-y-3">
            {driver.recentReviews.map((rev, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">{rev.reviewerName}</div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                    <span className="text-slate-400 text-[11px] ml-1">{rev.date}</span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
