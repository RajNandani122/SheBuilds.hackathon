import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Layers, 
  Share2, 
  Check, 
  Car, 
  Compass, 
  Radio, 
  Volume2, 
  Leaf, 
  Gift 
} from 'lucide-react';

interface HackathonPitchModalProps {
  onClose: () => void;
}

export const HackathonPitchModal: React.FC<HackathonPitchModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'roadmap'>('overview');
  const [copiedPitch, setCopiedPitch] = useState(false);

  const pitchText = `TrustFirstCarpool: AI-Powered Carpooling That People Will Actually Use
• Problem: Commuters travel alone due to route/timing mismatch, confusing cost splitting, and stranger safety concerns.
• Solution: Web-based platform built around verified closed networks, transparent distance cost-splitting, and proactive safety telemetry.
• Key Implemented Features:
  ✓ Verified Closed-Network Onboarding (.edu / corporate SSO & ID badge checks)
  ✓ AI Route + Schedule Matching with Commuter Synergy breakdown
  ✓ Recurring Weekly Seat Booking with multi-commute discounts
  ✓ Automatic Distance-Based Cost Split (non-profit fuel + toll formulas)
  ✓ Live Trip Tracking with Dynamic ETA & animated GIS corridor radar
  ✓ Reliability Score (PRRS) predicting driver & commuter show-up probability
  ✓ Route Deviation Auto-Alert detecting off-track travel with rapid check-in
  ✓ Distress Sound Detection with 4.2-second emergency dispatch trigger
  ✓ Carbon Footprint Tracking & EcoCoins Gamified Rewards Marketplace
  ✓ Women-Only Carpool Mode & Both-Way Reviews
• Future Scope: Native hardware crash detection, in-app escrow payments, multi-city dynamic routing.`;

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              Hackathon Pitch & Feature Verification Dossier
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              TrustFirstCarpool
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyPitch}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedPitch ? 'Copied Pitch!' : 'Copy Pitch Script'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-4 border-b border-slate-100 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'features'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Core & Unique Features Checklist
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'roadmap'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Future Scope & Roadmap
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-rose-600" />
                  <span>The Real Problem in Commuting</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Millions commute alone every day, even when peers travel the exact same highway corridors. Conventional carpooling fails because travellers don't trust strangers in their car, cost splitting is confusing, and no-shows ruin daily routines.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>The Solution: Trust-First Architecture</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-xs">
                  TrustFirst combines closed-network institutional authentication, machine-learning reliability prediction (PRRS), acoustic distress listening, and automated route deviation alerts with gamified carbon-offset EcoCoins.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              
              {/* Core Features */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-3">
                  Core Implemented Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block">✅ Verified Closed-Network Onboarding</span>
                    <span className="text-slate-500 text-[11px]">Direct Stanford / UC Berkeley / Stripe SSO validation with ID badge scanning.</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block">🤖 AI Route + Schedule Matching</span>
                    <span className="text-slate-500 text-[11px]">Multi-factor synergy scoring factoring corridor proximity, timing, and vibes.</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block">📅 Recurring Weekly Seat Booking</span>
                    <span className="text-slate-500 text-[11px]">M-F routine reservation engine with 10% multi-ride consistency discount.</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block">💰 Distance-Based Cost Split</span>
                    <span className="text-slate-500 text-[11px]">Non-profit formula covering EV kWh/gas, bridge tolls, and wear divided equally.</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block">📍 Live Trip Tracking with ETA</span>
                    <span className="text-slate-500 text-[11px]">Real-time GPS simulation on interactive vector route with live speed telemetry.</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-900 block">👩 Women-Only Carpool Mode</span>
                    <span className="text-slate-500 text-[11px]">Verified female-only filter for both drivers and passengers.</span>
                  </div>
                </div>
              </div>

              {/* Unique Innovations */}
              <div>
                <h3 className="font-bold text-emerald-950 text-sm mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Unique Innovation Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                    <span className="font-bold text-emerald-950 block">🛡️ PRRS Reliability Score</span>
                    <span className="text-slate-600 text-[11px]">Predictive algorithm forecasting driver punctuality and eliminating morning no-show anxiety.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                    <span className="font-bold text-emerald-950 block">🛣️ Route Deviation Auto-Alert</span>
                    <span className="text-slate-600 text-[11px]">Proactively detects off-track detours &gt;0.4 miles and initiates automated safety check-in.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                    <span className="font-bold text-emerald-950 block">🔊 Distress Sound Detection (4.2s)</span>
                    <span className="text-slate-600 text-[11px]">Acoustic monitoring detecting emergency decibel spikes and keywords with 4.2s response.</span>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                    <span className="font-bold text-emerald-950 block">🌱 Carbon Footprint + EcoCoins</span>
                    <span className="text-slate-600 text-[11px]">Gamified sustainability credits redeemable for real coffee, tolls, and parking vouchers.</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="font-bold text-slate-900 text-sm">
                  Future Roadmap (Post-Hackathon Expansion)
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">→</span>
                    <span><strong>Automated In-App Escrow Payments:</strong> Instant split settlement via Stripe Connect without handling cash.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">→</span>
                    <span><strong>Hardware-Free Crash Detection:</strong> Accelerometer gyroscope sensor telemetry for automatic collision dispatch.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">→</span>
                    <span><strong>Multi-Hop AI Detour Optimization:</strong> Clustering algorithm for multi-passenger dynamic waypoint routing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">→</span>
                    <span><strong>Inter-City Corridor Rollout:</strong> Expansion into Seattle Tech, Austin Innovation Corridor, and Boston universities.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
