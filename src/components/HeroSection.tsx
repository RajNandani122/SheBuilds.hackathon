import React from 'react';
import { Search, MapPin, Calendar, Clock, Sparkles, Shield, Users } from 'lucide-react';
import heroImage from '../assets/images/hero_carpool_commuters_1791578228209.jpg';

interface HeroSectionProps {
  originQuery: string;
  setOriginQuery: (v: string) => void;
  destinationQuery: string;
  setDestinationQuery: (v: string) => void;
  selectedDate: string;
  setSelectedDate: (v: string) => void;
  timeFilter: string;
  setTimeFilter: (v: string) => void;
  womenOnlyFilter: boolean;
  setWomenOnlyFilter: (v: boolean) => void;
  verifiedOnlyFilter: boolean;
  setVerifiedOnlyFilter: (v: boolean) => void;
  onSearch: () => void;
  onQuickPreset: (origin: string, dest: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  originQuery,
  setOriginQuery,
  destinationQuery,
  setDestinationQuery,
  selectedDate,
  setSelectedDate,
  timeFilter,
  setTimeFilter,
  womenOnlyFilter,
  setWomenOnlyFilter,
  verifiedOnlyFilter,
  setVerifiedOnlyFilter,
  onSearch,
  onQuickPreset,
}) => {
  return (
    <div className="relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Human-readable sub-header without pill box */}
            <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-2">
              Verified Commuter Network · Bay Area & Campus Corridors
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              AI-Powered Carpooling That People Will Actually Use
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Commute with verified peers along your exact route. Split real fuel and toll costs fairly with zero surge markups, verified institutional IDs, and mutual safety ratings.
            </p>

            {/* Quick Corridor Presets */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Popular Corridors:</span>
              <button
                type="button"
                onClick={() => onQuickPreset('Palo Alto', 'San Francisco')}
                className="hover:text-emerald-700 underline underline-offset-2 decoration-slate-300 transition-colors"
              >
                Palo Alto ⇄ SF Financial District
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onQuickPreset('UC Berkeley', 'San Francisco')}
                className="hover:text-emerald-700 underline underline-offset-2 decoration-slate-300 transition-colors"
              >
                UC Berkeley ⇄ SF Market St
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onQuickPreset('San Jose', 'Mountain View')}
                className="hover:text-emerald-700 underline underline-offset-2 decoration-slate-300 transition-colors"
              >
                San Jose ⇄ Silicon Valley Tech Hub
              </button>
            </div>

            {/* Search Card Container */}
            <div className="mt-6 p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Origin */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pickup Location or Hub
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. Palo Alto, Berkeley BART, San Jose"
                      value={originQuery}
                      onChange={(e) => setOriginQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Hub
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="e.g. San Francisco SOMA, Mountain View"
                      value={destinationQuery}
                      onChange={(e) => setDestinationQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Commute Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Tomorrow, Oct 10"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Time Window */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                    >
                      <option value="all">Any Departure Time</option>
                      <option value="morning">Morning Commute (7:00 AM – 9:30 AM)</option>
                      <option value="afternoon">Mid-Day (11:00 AM – 2:00 PM)</option>
                      <option value="evening">Evening Return (4:30 PM – 7:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Trust Filters & Search Action */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={verifiedOnlyFilter}
                      onChange={(e) => setVerifiedOnlyFilter(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span>Verified IDs & Edu/Work only</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={womenOnlyFilter}
                      onChange={(e) => setWomenOnlyFilter(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span>Women-only rides</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={onSearch}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Matches</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src={heroImage}
                alt="Friendly commuters carpooling together in an electric vehicle on morning commute"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>TrustFirst Verification Standard</span>
                </div>
                <p className="text-sm font-medium leading-snug">
                  "I save $280 a month on bridge tolls and fuel, and ride with fellow engineers and students from Stanford and Berkeley."
                </p>
                <div className="mt-2 text-xs text-slate-300">
                  Sarah Chen · Verified Driver · 86 Shared Rides
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Quantified Adjacency Proof Row */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              $340+
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Avg. monthly savings per commuter
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Verified ID & institutional email
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              4.96 ★
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Community trust rating across rides
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              -62%
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              CO₂ emissions per shared passenger mile
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
