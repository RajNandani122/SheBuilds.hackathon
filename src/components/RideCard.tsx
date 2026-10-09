import React, { useState } from 'react';
import { 
  Ride, 
  UserProfile 
} from '../types/carpool';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Info, 
  Car, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Leaf 
} from 'lucide-react';

interface RideCardProps {
  ride: Ride;
  onBookRide: (ride: Ride) => void;
  onOpenAIAnalysis: (ride: Ride) => void;
}

export const RideCard: React.FC<RideCardProps> = ({
  ride,
  onBookRide,
  onOpenAIAnalysis,
}) => {
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [showWaypoints, setShowWaypoints] = useState(false);
  const [showPrrsExplainer, setShowPrrsExplainer] = useState(false);

  const isSoldOut = ride.availableSeats <= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-xs">
      
      {/* Top Row: Driver Profile & Verification Badges */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3.5">
          <img
            src={ride.driver.avatar}
            alt={ride.driver.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900 text-base">
                {ride.driver.name}
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                ★ {ride.driver.rating.toFixed(2)} ({ride.driver.totalRides} rides)
              </span>
            </div>

            {/* Unboxed clean metadata with PRRS Reliability metric */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <span>{ride.driver.organization}</span>
              <span aria-hidden="true">·</span>
              
              {/* Clickable PRRS Reliability badge */}
              <button
                type="button"
                onClick={() => setShowPrrsExplainer(!showPrrsExplainer)}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                title="Predictive Ride Reliability Score (PRRS)"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PRRS {ride.driver.prrsScore}% Reliable</span>
              </button>
            </div>

            {/* Verification checklist in clean unboxed text */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1.5">
              <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Gov ID Verified
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Driver License On File
              </span>
              {ride.driver.verificationBadges.includes('corporate_verified') && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Corporate Email
                  </span>
                </>
              )}
              {ride.driver.verificationBadges.includes('university_verified') && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> University .edu
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Vehicle & Fair Per-Seat Price */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 tabular-nums">
              ${ride.costDetails.costPerPassenger.toFixed(2)}
              <span className="text-xs font-normal text-slate-500"> / seat</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              Saves ~${(ride.costDetails.rideshareAlternativeEstimate - ride.costDetails.costPerPassenger).toFixed(0)} vs solo rideshare
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCostBreakdown(!showCostBreakdown)}
            className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 flex items-center gap-1 mt-1"
          >
            <Info className="w-3 h-3" />
            <span>Fair Cost Math</span>
          </button>
        </div>
      </div>

      {/* PRRS Explainer Popover (Unique Feature) */}
      {showPrrsExplainer && (
        <div className="mt-3 p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-slate-700 space-y-1.5 animate-fade-in">
          <div className="font-bold text-emerald-950 flex items-center justify-between">
            <span>Predictive Ride Reliability Score (PRRS: {ride.driver.prrsScore}%)</span>
            <button
              onClick={() => setShowPrrsExplainer(false)}
              className="text-slate-400 hover:text-slate-700 text-xs"
            >
              Close
            </button>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            PRRS predicts driver show-up probability using machine learning over historical morning on-time departure rates ({ride.driver.prrsDetails.punctualityRate}%), late cancellations (under {ride.driver.prrsDetails.cancellationRate}%), and weather/traffic resilience across {ride.driver.totalRides} trips.
          </p>
          <div className="text-[11px] text-emerald-800 font-semibold">
            Status: {ride.driver.prrsDetails.reliabilityTier} · {ride.driver.prrsDetails.streakDays}-Day Perfect Departure Streak
          </div>
        </div>
      )}

      {/* Fair Cost Calculation Drawer */}
      {showCostBreakdown && (
        <div className="mt-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
          <div className="font-semibold text-slate-800 mb-1.5 flex items-center justify-between">
            <span>Fair Non-Profit Cost Splitting Breakdown:</span>
            <span className="text-slate-500 font-normal">Zero surge pricing applied</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-200">
            <div>
              <span className="text-slate-500 block">Fuel / EV Electricity:</span>
              <span className="font-semibold text-slate-800 tabular-nums">${ride.costDetails.totalFuelCost.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Bridge & Express Tolls:</span>
              <span className="font-semibold text-slate-800 tabular-nums">${ride.costDetails.totalTolls.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">IRS Wear & Depreciation:</span>
              <span className="font-semibold text-slate-800 tabular-nums">${ride.costDetails.wearTearAllowance.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Total Shared By {ride.totalSeats} seats:</span>
              <span className="font-semibold text-emerald-700 tabular-nums">${ride.costDetails.costPerPassenger.toFixed(2)} / person</span>
            </div>
          </div>
        </div>
      )}

      {/* Middle Row: Route Journey & Timing */}
      <div className="mt-4 pt-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Origin to Destination Stepper */}
        <div className="md:col-span-8">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
              <div className="w-0.5 h-8 bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            </div>

            <div className="flex-1 space-y-2">
              <div>
                <div className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>{ride.origin}</span>
                  <span className="text-emerald-700 font-semibold">{ride.departureTime}</span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Pickup: {ride.originHub}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>{ride.destination}</span>
                  <span className="text-slate-500">~{ride.estimatedDurationMins} min drive ({ride.distanceMiles} mi)</span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>Drop-off: {ride.destinationHub}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Waypoints */}
          {ride.waypoints.length > 2 && (
            <div className="mt-2 pl-6">
              <button
                type="button"
                onClick={() => setShowWaypoints(!showWaypoints)}
                className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
              >
                {showWaypoints ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                <span>{showWaypoints ? 'Hide route stops' : `View ${ride.waypoints.length} route stops along US-101 / I-80`}</span>
              </button>

              {showWaypoints && (
                <div className="mt-2 space-y-1.5 pl-2 border-l border-slate-200 text-xs text-slate-600">
                  {ride.waypoints.map((wp, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{wp.name} ({wp.landmark})</span>
                      <span className="text-slate-400 tabular-nums">{wp.estimatedTime}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Matchmaker Badge & Rationale */}
        <div className="md:col-span-4 bg-emerald-50/70 border border-emerald-100 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{ride.aiMatchScore}% Smart Compatibility</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-700 leading-snug line-clamp-2">
            {ride.aiMatchReasoning}
          </p>
          <button
            type="button"
            onClick={() => onOpenAIAnalysis(ride)}
            className="mt-2 text-xs font-medium text-emerald-800 hover:text-emerald-900 underline underline-offset-2 flex items-center gap-1"
          >
            <span>Analyze Match Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Bottom Row: Commuter Preferences & Book Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Preference markers with EcoCoins & Recurring indicator */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-slate-400" />
            <span>{ride.driver.vehicle?.year} {ride.driver.vehicle?.make} {ride.driver.vehicle?.model}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {ride.preferences.quietRide ? 'Quiet Commute' : 'Conversation Friendly'}
          </span>
          {ride.recurringDays && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Recurring Weekly</span>
              </span>
            </>
          )}
          {ride.preferences.womenOnly && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-purple-700 font-semibold">Women-Only Carpool</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span className="text-emerald-800 font-semibold flex items-center gap-1">
            <Leaf className="w-3 h-3 text-emerald-600" />
            <span>+{ride.ecoCoinsReward} EcoCoins</span>
          </span>
        </div>

        {/* Seats left and Booking button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-900 tabular-nums">{ride.availableSeats}</span> of {ride.totalSeats} seats open
          </div>

          <button
            type="button"
            disabled={isSoldOut}
            onClick={() => onBookRide(ride)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              isSoldOut
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }`}
          >
            {isSoldOut ? 'Ride Filled' : 'Reserve Seat'}
          </button>
        </div>

      </div>

    </div>
  );
};
