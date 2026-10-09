import React, { useState, useEffect } from 'react';
import { Booking } from '../types/carpool';
import { 
  Navigation, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Share2, 
  PhoneCall, 
  Play, 
  Pause, 
  Radio, 
  Sparkles 
} from 'lucide-react';

interface LiveTripTrackerProps {
  booking: Booking;
  onOpenSafetyGuardian: () => void;
}

export const LiveTripTracker: React.FC<LiveTripTrackerProps> = ({
  booking,
  onOpenSafetyGuardian,
}) => {
  const [progressPercent, setProgressPercent] = useState(58);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMph, setSpeedMph] = useState(58);
  const [isRouteDeviated, setIsRouteDeviated] = useState(false);
  const [deviationCountdown, setDeviationCountdown] = useState(30);
  const [safeConfirmed, setSafeConfirmed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-progress simulation
  useEffect(() => {
    if (!isPlaying || isRouteDeviated) return;
    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 98) return 98;
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying, isRouteDeviated]);

  // Route deviation countdown timer
  useEffect(() => {
    if (!isRouteDeviated || safeConfirmed) return;
    const timer = setInterval(() => {
      setDeviationCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRouteDeviated, safeConfirmed]);

  const remainingMins = Math.max(3, Math.round(((100 - progressPercent) / 100) * booking.ride.estimatedDurationMins));

  const handleSimulateDeviation = () => {
    setIsRouteDeviated(true);
    setSafeConfirmed(false);
    setDeviationCountdown(30);
  };

  const handleConfirmSafe = () => {
    setSafeConfirmed(true);
    setTimeout(() => {
      setIsRouteDeviated(false);
    }, 2500);
  };

  const handleShareTrip = () => {
    const text = `Live TrustFirst Carpool GPS Tracking: Riding with ${booking.ride.driver.name} (${booking.ride.driver.vehicle?.make} ${booking.ride.driver.vehicle?.model}, ${booking.ride.driver.vehicle?.licensePlateMasked}). En route to ${booking.ride.destinationHub}. ETA ~${remainingMins} mins. Boarding PIN: ${booking.pickupCodePin}.`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Active GPS Telemetry & Corridor Radar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Live Trip Tracking & Safety Monitor
          </h2>
        </div>

        {/* Action strip */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShareTrip}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Live GPS'}</span>
          </button>
          
          <button
            type="button"
            onClick={onOpenSafetyGuardian}
            className="px-3.5 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Emergency SOS & Sound Detection</span>
          </button>
        </div>
      </div>

      {/* Proactive Route Deviation Banner (if triggered) */}
      {isRouteDeviated && (
        <div className="p-4 sm:p-5 bg-rose-50 border-2 border-rose-400 rounded-xl space-y-3 animate-pulse-subtle">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-600 text-white rounded-lg mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                  <span>PROACTIVE ALERT: Route Deviation Detected (&gt;0.4 miles off corridor)</span>
                </h3>
                <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                  The vehicle has departed from the agreed US-101 highway path near Broadway / Millbrae Exit.
                  {!safeConfirmed ? (
                    <span className="font-semibold block mt-1">
                      Auto-notifying Stanford campus security & emergency contacts in <span className="tabular-nums font-mono text-rose-950 text-sm">{deviationCountdown}s</span> if unconfirmed.
                    </span>
                  ) : (
                    <span className="font-semibold text-emerald-800 block mt-1">
                      ✓ Safe status confirmed by passenger. Emergency notification paused.
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-rose-700 tabular-nums">
                {deviationCountdown}s
              </span>
            </div>
          </div>

          {!safeConfirmed ? (
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-rose-200">
              <button
                type="button"
                onClick={handleConfirmSafe}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>I am Safe (Driver taking traffic detour)</span>
              </button>

              <button
                type="button"
                onClick={onOpenSafetyGuardian}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Trigger Emergency Dispatch Now</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Detour acknowledged. Resuming normal telemetry monitoring.</span>
            </div>
          )}
        </div>
      )}

      {/* Main Map Visualizer & Live Telemetry Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Stylized Map Canvas */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md relative">
          
          {/* Map Status Overlay Bar */}
          <div className="p-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-emerald-400">GPS Live: US-101 FastTrak HOV Lane</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 tabular-nums font-mono">{speedMph} MPH</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title={isPlaying ? 'Pause telemetry playback' : 'Resume telemetry playback'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={handleSimulateDeviation}
                className="px-2.5 py-1 text-[11px] font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded transition-colors"
              >
                Simulate Route Deviation Alert
              </button>
            </div>
          </div>

          {/* Stylized Vector Route Canvas */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-[#0B132B] flex items-center justify-center p-6 overflow-hidden">
            
            {/* Subtle GIS Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* SVG Path Visualization */}
            <svg className="w-full h-full max-w-xl" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              
              {/* Background highway corridor */}
              <path
                d="M 50 250 Q 180 200 240 140 T 450 50"
                stroke="#1E293B"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Verified Path Line */}
              <path
                d="M 50 250 Q 180 200 240 140 T 450 50"
                stroke="#047857"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />

              {/* Deviation off-track curve (visible during deviation test) */}
              {isRouteDeviated && (
                <path
                  d="M 240 140 C 270 190 320 220 350 230"
                  stroke="#E11D48"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              )}

              {/* Waypoint 1: Origin (Palo Alto) */}
              <circle cx="50" cy="250" r="8" fill="#10B981" />
              <circle cx="50" cy="250" r="14" stroke="#10B981" strokeWidth="2" opacity="0.4" />
              <text x="65" y="255" fill="#E2E8F0" fontSize="11" fontWeight="600">Palo Alto Hub (7:45 AM)</text>

              {/* Waypoint 2: Redwood City Midpoint */}
              <circle cx="200" cy="170" r="6" fill="#3B82F6" />
              <text x="215" y="175" fill="#94A3B8" fontSize="10">Redwood City 101 (7:58 AM)</text>

              {/* Waypoint 3: Destination (SF Transit Center) */}
              <circle cx="450" cy="50" r="8" fill="#F59E0B" />
              <circle cx="450" cy="50" r="14" stroke="#F59E0B" strokeWidth="2" opacity="0.4" />
              <text x="310" y="45" fill="#E2E8F0" fontSize="11" fontWeight="600">Salesforce Transit Center (ETA 8:27 AM)</text>

              {/* Current GPS Vehicle Position (Calculated dynamically) */}
              {(() => {
                const t = progressPercent / 100;
                // Interpolate along the curve
                let cx = 50 + (450 - 50) * t;
                let cy = 250 - (250 - 50) * Math.pow(t, 0.85);

                if (isRouteDeviated) {
                  cx += 28;
                  cy += 38;
                }

                return (
                  <g>
                    {/* Pulsing beacon radar ring */}
                    <circle cx={cx} cy={cy} r="20" fill={isRouteDeviated ? '#E11D48' : '#10B981'} opacity="0.2">
                      <animate attributeName="r" values="12;26;12" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={cx} cy={cy} r="8" fill={isRouteDeviated ? '#E11D48' : '#10B981'} stroke="#FFFFFF" strokeWidth="2" />
                    
                    {/* Car Marker Label */}
                    <rect x={cx - 45} y={cy - 30} width="90" height="20" rx="4" fill="#0F172A" stroke="#334155" />
                    <text x={cx} y={cy - 16} fill="#F8FAFC" fontSize="9" fontWeight="bold" textAnchor="middle">
                      {isRouteDeviated ? '⚠️ DEVIATED' : 'Tesla Model Y'}
                    </text>
                  </g>
                );
              })()}

            </svg>

            {/* Bottom Floating Telemetry Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-white">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Remaining to Drop-off</span>
                <span className="text-emerald-400 font-bold text-sm tabular-nums">
                  ~{remainingMins} minutes ({((100 - progressPercent) * 0.34).toFixed(1)} miles)
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Est. Arrival Time</span>
                <span className="text-white font-bold text-sm tabular-nums">
                  8:27 AM
                </span>
              </div>
            </div>

          </div>

          {/* Progress Slider Controller */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
            <span className="shrink-0 font-medium text-slate-300">Simulate Progress:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercent}
              onChange={(e) => setProgressPercent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="shrink-0 font-mono text-emerald-400 tabular-nums">{progressPercent}%</span>
          </div>

        </div>

        {/* Right Column: Driver & Vehicle Trust Dossier */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* PRRS Reliability Highlight Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                Reliability Index
              </span>
              <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">
                PRRS {booking.ride.driver.prrsScore}%
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5">
              <div className="text-sm font-bold text-slate-900">
                Predictive Ride Reliability: High
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Based on {booking.ride.driver.totalRides} trips, {booking.ride.driver.name} has a 99.2% on-time departure rate and zero late cancellations in the last 42 days.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-500 block">Punctuality</span>
                <span className="font-bold text-slate-900 text-xs tabular-nums">{booking.ride.driver.prrsDetails.punctualityRate}%</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-500 block">Active Streak</span>
                <span className="font-bold text-emerald-700 text-xs tabular-nums">{booking.ride.driver.prrsDetails.streakDays} Commutes</span>
              </div>
            </div>
          </div>

          {/* Vehicle & Verification Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 text-xs">
            <div className="font-bold text-slate-900">
              Verified Driver & Vehicle
            </div>

            <div className="flex items-center gap-3">
              <img
                src={booking.ride.driver.avatar}
                alt={booking.ride.driver.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/30 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-bold text-slate-900">{booking.ride.driver.name}</div>
                <div className="text-slate-500">{booking.ride.driver.organization}</div>
                <div className="text-emerald-700 font-medium">★ {booking.ride.driver.rating} · ID Verified</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-semibold text-slate-900">{booking.ride.driver.vehicle?.color} {booking.ride.driver.vehicle?.make} {booking.ride.driver.vehicle?.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">License Plate:</span>
                <span className="font-mono font-semibold text-slate-900">{booking.ride.driver.vehicle?.licensePlateMasked} (CA)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup PIN:</span>
                <span className="font-mono font-bold text-emerald-700 tabular-nums">{booking.pickupCodePin}</span>
              </div>
            </div>
          </div>

          {/* EcoCoins reward for this trip */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1 text-xs">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>+{booking.ride.ecoCoinsReward} EcoCoins Earned</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Credited automatically to your sustainability wallet upon destination drop-off.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
