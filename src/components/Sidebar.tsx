import React from 'react';
import { 
  Compass, 
  Users, 
  UserCheck, 
  Navigation, 
  ShieldAlert, 
  Calculator, 
  Gift, 
  Sparkles, 
  Leaf, 
  LogOut, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  HeartHandshake 
} from 'lucide-react';

export type PageId = 
  | 'set-commute' 
  | 'matches' 
  | 'driver-profile' 
  | 'my-trip' 
  | 'safety-center' 
  | 'cost-split' 
  | 'rewards';

interface SidebarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  womenOnlyMode: boolean;
  setWomenOnlyMode: (v: boolean) => void;
  onLogout: () => void;
  co2SavedKg: number;
  ecoCoins: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  womenOnlyMode,
  setWomenOnlyMode,
  onLogout,
  co2SavedKg,
  ecoCoins,
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'set-commute', label: 'Set Commute', icon: <Compass className="w-4 h-4" /> },
    { id: 'matches', label: 'Matches', icon: <Users className="w-4 h-4" />, badge: '4' },
    { id: 'driver-profile', label: 'Driver Profile', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'my-trip', label: 'My Trip', icon: <Navigation className="w-4 h-4" />, badge: 'LIVE' },
    { id: 'safety-center', label: 'Safety Center', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'cost-split', label: 'Cost Split', icon: <Calculator className="w-4 h-4" /> },
    { id: 'rewards', label: 'Rewards', icon: <Gift className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-auto md:h-screen md:sticky md:top-0 z-30">
      
      {/* Top Section: Brand + User Profile */}
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs transition-colors ${
              womenOnlyMode ? 'bg-[#E91E63]' : 'bg-[#2E7D32]'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                TrustFirst<span className={womenOnlyMode ? 'text-[#E91E63]' : 'text-[#2E7D32]'}>Carpool</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">Acme Corp Closed Hub</span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Priya Sharma"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/30"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs text-slate-900 truncate">
                Priya Sharma
              </div>
              <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                <span>Verified · Acme Corp</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700 mt-0.5">
                <span className="text-amber-600 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>4.9</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-emerald-700">
                  Reliability 9.0/10
                </span>
              </div>
            </div>
          </div>

          {/* Women-Only Mode Toggle */}
          <div className={`mt-3 p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
            womenOnlyMode 
              ? 'bg-pink-50 border-pink-200 text-[#E91E63]' 
              : 'bg-white border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span>👩</span>
              <span>Women-only mode</span>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={womenOnlyMode}
                onChange={(e) => setWomenOnlyMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#E91E63]"></div>
            </label>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? womenOnlyMode
                      ? 'bg-pink-50 text-[#E91E63] font-bold shadow-xs'
                      : 'bg-emerald-50 text-[#2E7D32] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? (womenOnlyMode ? 'text-[#E91E63]' : 'text-[#2E7D32]') : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.badge === 'LIVE'
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: CO2 Saved & EcoCoins Counter + Logout */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        
        {/* Sustainability Counters */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-center text-xs">
          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-medium">
              <Leaf className="w-3 h-3 text-[#2E7D32]" />
              <span>CO₂ Saved</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm mt-0.5 tabular-nums">
              {co2SavedKg.toFixed(1)} <span className="text-[10px] font-normal text-slate-500">kg</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-medium">
              <span>🌱</span>
              <span>EcoCoins</span>
            </div>
            <div className="font-extrabold text-emerald-800 text-sm mt-0.5 tabular-nums">
              {ecoCoins}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Acme Network</span>
        </button>

      </div>

    </aside>
  );
};
