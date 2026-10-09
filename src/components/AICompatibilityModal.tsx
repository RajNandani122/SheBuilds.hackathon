import React from 'react';
import { Ride, UserProfile } from '../types/carpool';
import { computeLocalCompatibility } from '../services/aiMatcher';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  HeartHandshake, 
  Car 
} from 'lucide-react';

interface AICompatibilityModalProps {
  ride: Ride;
  currentUser: UserProfile;
  onClose: () => void;
  onBookRide: (ride: Ride) => void;
}

export const AICompatibilityModal: React.FC<AICompatibilityModalProps> = ({
  ride,
  currentUser,
  onClose,
  onBookRide,
}) => {
  const analysis = computeLocalCompatibility(ride, currentUser);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                AI Commuter Compatibility Analysis
              </h2>
              <div className="text-xs text-slate-500">
                Peer synergy with {ride.driver.name}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          
          {/* Main Score Hero */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                Overall Compatibility Match
              </span>
              <div className="text-3xl font-extrabold text-emerald-950 tabular-nums">
                {analysis.overallScore}%
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Exceptional route and schedule alignment
              </div>
            </div>

            <div className="w-14 h-14 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center shadow-xs">
              <span className="text-xs font-bold text-emerald-700">HIGH</span>
            </div>
          </div>

          {/* Dimension Progress Bars */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Dimension Evaluation
            </div>

            {/* Route Overlap */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Route Overlap & Hub Proximity</span>
                <span className="font-bold text-slate-900 tabular-nums">{analysis.routeOverlapPct}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${analysis.routeOverlapPct}%` }}
                />
              </div>
            </div>

            {/* Trust Factor */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Mutual Verification & Trust Score</span>
                <span className="font-bold text-slate-900 tabular-nums">{analysis.trustFactorScore}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${analysis.trustFactorScore}%` }}
                />
              </div>
            </div>

            {/* Vibe & Commute Style */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">In-Car Vibe & Climate Harmony</span>
                <span className="font-bold text-slate-900 tabular-nums">{analysis.vibeSynergyScore}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${analysis.vibeSynergyScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Match Highlights */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Key Match Highlights
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {analysis.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Commuter Recommendation */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-600">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart Recommendation:</span>
            </div>
            <p className="leading-relaxed">
              {analysis.commuterAdvice}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              ${ride.costDetails.costPerPassenger.toFixed(2)} per passenger
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookRide(ride);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                Reserve Seat Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
