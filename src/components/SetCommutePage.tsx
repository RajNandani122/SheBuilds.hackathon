import React, { useState } from 'react';
import { CommuteRouteMap } from './CommuteRouteMap';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Volume2, 
  Car, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface SetCommutePageProps {
  onFindMatches: () => void;
  womenOnlyMode: boolean;
}

export const SetCommutePage: React.FC<SetCommutePageProps> = ({
  onFindMatches,
  womenOnlyMode,
}) => {
  const [homeLocation, setHomeLocation] = useState('12.9750, 77.6000');
  const [officeLocation, setOfficeLocation] = useState('12.9352, 77.6245');
  const [days, setDays] = useState('Mon-Fri');
  const [arrivalTime, setArrivalTime] = useState('08:45 AM');
  const [userRole, setUserRole] = useState<'rider' | 'driver'>('rider');
  const [vibe, setVibe] = useState<'Any' | 'Quiet' | 'Chatty' | 'Music'>('Quiet');

  // Convert coords string to numbers
  const homeCoords: [number, number] = [12.9750, 77.6000];
  const officeCoords: [number, number] = [12.9352, 77.6245];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Closed Corporate Corridor · Acme Corp HQ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Set Your Recurring Commute
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Lock in a predictable daily ride with verified Acme colleagues. Zero morning surge, zero awkward coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          
          {/* Role selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              I am travelling as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserRole('rider')}
                className={`py-3 px-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 text-xs font-bold ${
                  userRole === 'rider'
                    ? womenOnlyMode
                      ? 'border-[#E91E63] bg-pink-50 text-[#E91E63] shadow-xs'
                      : 'border-[#2E7D32] bg-emerald-50 text-[#2E7D32] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Rider (Looking for Carpool)</span>
              </button>

              <button
                type="button"
                onClick={() => setUserRole('driver')}
                className={`py-3 px-4 rounded-xl border text-center transition-all flex items-center justify-center gap-2 text-xs font-bold ${
                  userRole === 'driver'
                    ? womenOnlyMode
                      ? 'border-[#E91E63] bg-pink-50 text-[#E91E63] shadow-xs'
                      : 'border-[#2E7D32] bg-emerald-50 text-[#2E7D32] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Driver (Offering Seats)</span>
              </button>
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>
                <span>Home Pickup GPS Coords</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#2E7D32] absolute left-3 top-3" />
                <input
                  type="text"
                  value={homeLocation}
                  onChange={(e) => setHomeLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Richmond Town, Central Bangalore
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>Office Destination Coords</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-rose-600 absolute left-3 top-3" />
                <input
                  type="text"
                  value={officeLocation}
                  onChange={(e) => setOfficeLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Acme Tech Park, Koramangala
              </span>
            </div>
          </div>

          {/* Schedule & Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Recurring Days
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] appearance-none"
                >
                  <option value="Mon-Fri">Mon-Fri (Standard Office Week)</option>
                  <option value="Mon-Sat">Mon-Sat (6-Day Commute)</option>
                  <option value="Weekdays">Weekdays (Flexible Hybrid)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Arrival by Time
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  placeholder="08:45 AM"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
            </div>
          </div>

          {/* Vibe preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Cabin Vibe Preference
            </label>
            <div className="relative">
              <Volume2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={vibe}
                onChange={(e) => setVibe(e.target.value as any)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] appearance-none"
              >
                <option value="Quiet">Quiet (Morning reading / focus / silent commute)</option>
                <option value="Chatty">Chatty (Friendly conversations & networking)</option>
                <option value="Music">Music (Podcasts & indie playlist)</option>
                <option value="Any">Any Vibe (Flexible)</option>
              </select>
            </div>
          </div>

          {/* Find Matches Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onFindMatches}
              className={`w-full py-3.5 px-5 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                womenOnlyMode
                  ? 'bg-gradient-to-r from-[#E91E63] to-[#C2185B] hover:opacity-95'
                  : 'bg-gradient-to-r from-[#2E7D32] to-[#1976D2] hover:opacity-95'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Find Matches along this Route</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>

        {/* Right Map Visualizer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Live Leaflet Corridor Map
              </h3>
              <span className="text-xs text-slate-500">7.2 km · 24 min avg</span>
            </div>

            <CommuteRouteMap
              homeCoords={homeCoords}
              officeCoords={officeCoords}
            />

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Estimated Daily Cab Fare (Solo):</span>
                <span className="line-through text-slate-400">₹380 - ₹450</span>
              </div>
              <div className="flex justify-between font-bold text-[#2E7D32]">
                <span>TrustFirst Carpool Share:</span>
                <span>₹110 - ₹125 / seat</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
