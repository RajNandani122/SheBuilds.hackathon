import React, { useState } from 'react';
import { Driver, DRIVERS } from '../data/carpoolData';
import { 
  ShieldCheck, 
  Car, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Check, 
  Star, 
  Sparkles, 
  ArrowRight, 
  Send, 
  X 
} from 'lucide-react';

interface MatchesPageProps {
  womenOnlyMode: boolean;
  onSelectDriverProfile: (driver: Driver) => void;
  onBookSeat: (driver: Driver) => void;
}

export const MatchesPage: React.FC<MatchesPageProps> = ({
  womenOnlyMode,
  onSelectDriverProfile,
  onBookSeat,
}) => {
  const [chattingDriver, setChattingDriver] = useState<Driver | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSent, setChatSent] = useState(false);

  // Filter drivers based on Women-only mode
  const displayedDrivers = womenOnlyMode
    ? DRIVERS.filter(d => d.gender === 'female')
    : DRIVERS;

  const getReliabilityBadge = (score: number) => {
    if (score >= 9.0) {
      return { label: '🏆 Excellent', color: 'bg-emerald-100 text-emerald-800' };
    } else if (score >= 8.0) {
      return { label: '✅ Great', color: 'bg-blue-100 text-blue-800' };
    } else {
      return { label: '👍 Good', color: 'bg-slate-100 text-slate-800' };
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatSent(true);
    setTimeout(() => {
      setChatSent(false);
      setChatMessage('');
      setChattingDriver(null);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Verified Matchmaker · Acme Corp Fleet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Matching Commuters along your Route
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {displayedDrivers.length} matched colleagues travelling Richmond Town ⇄ Acme Tech Park
            {womenOnlyMode && <span className="font-bold text-[#E91E63]"> (Women-only filter applied)</span>}
          </p>
        </div>

        {womenOnlyMode && (
          <div className="bg-pink-50 border border-pink-200 text-[#E91E63] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs shrink-0">
            <span>👩</span>
            <span>Women-Only Matches Active</span>
          </div>
        )}
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedDrivers.map((driver) => {
          const relBadge = getReliabilityBadge(driver.reliabilityScore);
          return (
            <div
              key={driver.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Top Row: Driver Profile & Reliability Badge */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="w-13 h-13 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base">
                          {driver.name}
                        </h3>
                        {driver.gender === 'female' && (
                          <span className="text-sm" title="Female Commuter">👩</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {driver.carModel} · {driver.days}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-700 font-semibold mt-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Pickup: {driver.pickupTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Big Price Tag */}
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900 tabular-nums">
                      ₹{driver.costShareInr}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Your cost share</div>
                  </div>
                </div>

                {/* Verification Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 py-3 border-b border-slate-100 text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <span>✅</span> Email
                  </span>
                  <span className="flex items-center gap-1 text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">
                    <span>🪪</span> ID
                  </span>
                  <span className="flex items-center gap-1 text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md">
                    <span>🤳</span> Selfie
                  </span>
                  {driver.womenOnly && (
                    <span className="flex items-center gap-1 text-pink-800 bg-pink-50 px-2 py-0.5 rounded-md font-bold">
                      <span>👩</span> Women-only
                    </span>
                  )}
                </div>

                {/* Key Matching Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 py-4 text-center">
                  
                  {/* Metric 1: Route Overlap */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Route Overlap</span>
                    <span className="text-xl font-extrabold text-[#2E7D32] tabular-nums block mt-0.5">
                      {driver.routeOverlapPct}%
                    </span>
                  </div>

                  {/* Metric 2: Detour */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Detour</span>
                    <span className="text-xl font-extrabold text-slate-800 tabular-nums block mt-0.5">
                      {driver.detourKm} <span className="text-xs font-normal text-slate-500">km</span>
                    </span>
                  </div>

                  {/* Metric 3: Reliability Score */}
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Reliability</span>
                    <span className="text-xl font-extrabold text-[#1976D2] tabular-nums block mt-0.5">
                      {driver.reliabilityScore}<span className="text-xs font-normal text-slate-500">/10</span>
                    </span>
                  </div>

                </div>

                {/* Reliability Badge banner */}
                <div className="mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg inline-flex items-center gap-1 ${relBadge.color}`}>
                    {relBadge.label} (Show-up Rate: {driver.onTimePct}%)
                  </span>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                
                <button
                  type="button"
                  onClick={() => setChattingDriver(driver)}
                  className="px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectDriverProfile(driver)}
                  className="px-3 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 underline transition-colors"
                >
                  View Profile
                </button>

                <button
                  type="button"
                  onClick={() => onBookSeat(driver)}
                  className={`flex-1 py-2.5 px-4 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                    womenOnlyMode
                      ? 'bg-[#E91E63] hover:bg-[#C2185B]'
                      : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Book Seat (₹{driver.costShareInr})</span>
                </button>

              </div>

            </div>
          );
        })}
      </div>

      {/* In-App Chat Modal */}
      {chattingDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={chattingDriver.avatar}
                  alt={chattingDriver.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Chat with {chattingDriver.name}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    Acme Corp Verified · {chattingDriver.carModel}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChattingDriver(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat conversation preview */}
            <div className="space-y-3 py-2 text-xs">
              <div className="p-3 bg-slate-100 rounded-xl rounded-tl-none text-slate-700 max-w-[85%]">
                Hi Priya! I leave from Richmond Circle at 08:30 AM every weekday. Let me know if that pickup spot works for you!
              </div>

              {chatSent && (
                <div className="p-3 bg-emerald-600 text-white rounded-xl rounded-tr-none ml-auto max-w-[85%] text-right font-medium">
                  {chatMessage}
                </div>
              )}
            </div>

            <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about pickup spot or luggage..."
                required
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
