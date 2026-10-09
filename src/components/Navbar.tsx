import React from 'react';
import { ShieldCheck, Radio, Sparkles, HelpCircle, GraduationCap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'find' | 'offer' | 'live-trip' | 'rewards' | 'calculator' | 'my-rides' | 'trust';
  setActiveTab: (tab: 'find' | 'offer' | 'live-trip' | 'rewards' | 'calculator' | 'my-rides' | 'trust') => void;
  onOpenPitch: () => void;
  onOpenOnboarding: () => void;
  bookingCount: number;
  ecoCoins: number;
  currentNetwork: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPitch,
  onOpenOnboarding,
  bookingCount,
  ecoCoins,
  currentNetwork,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element Brand wordmark */}
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => setActiveTab('find')}>
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
            TrustFirst<span className="text-emerald-600">Carpool</span>
          </span>
        </div>

        {/* Zone 2: 5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('find')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'find'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Find Rides
          </button>

          <button
            onClick={() => setActiveTab('live-trip')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'live-trip'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Live Trip Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'rewards'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <span>EcoRewards</span>
            <span className="text-xs px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold tabular-nums">
              🌱 {ecoCoins}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'calculator'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Cost Split
          </button>

          <button
            onClick={() => setActiveTab('my-rides')}
            className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'my-rides'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="text-xs px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold tabular-nums">
                {bookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenOnboarding}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
            title="Closed Network Verified Status"
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>{currentNetwork.split('(')[0].trim()}</span>
          </button>

          <button
            onClick={onOpenPitch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
            title="View Hackathon Pitch & Scope"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hackathon Scope</span>
          </button>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 text-xs font-medium text-slate-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('find')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'find' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Find
        </button>
        <button
          onClick={() => setActiveTab('live-trip')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'live-trip' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Live Trip
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'rewards' ? 'text-emerald-700 font-bold' : ''}`}
        >
          EcoCoins ({ecoCoins})
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'calculator' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Cost Split
        </button>
        <button
          onClick={() => setActiveTab('my-rides')}
          className={`px-2 py-1 whitespace-nowrap ${activeTab === 'my-rides' ? 'text-emerald-700 font-bold' : ''}`}
        >
          Rides ({bookingCount})
        </button>
      </div>
    </header>
  );
};
