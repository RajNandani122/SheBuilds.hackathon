import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Volume2, 
  Navigation, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Lock, 
  Sparkles, 
  Plus, 
  Trash2 
} from 'lucide-react';

interface SafetyCenterPageProps {
  womenOnlyMode: boolean;
}

export const SafetyCenterPage: React.FC<SafetyCenterPageProps> = ({ womenOnlyMode }) => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom (Radha Sharma)', phone: '+91 98450 12345', relation: 'Primary Family Contact' },
    { id: 2, name: 'Dad (Ramesh Sharma)', phone: '+91 98450 67890', relation: 'Secondary Family Contact' },
    { id: 3, name: 'Police / Emergency Control', phone: '100 / 112', relation: 'Bangalore City Police' },
  ]);

  const [distressAlert, setDistressAlert] = useState(false);
  const [deviationAlert, setDeviationAlert] = useState(false);

  const handleSimulateDistress = () => {
    setDistressAlert(true);
    setDeviationAlert(false);
  };

  const handleSimulateDeviation = () => {
    setDeviationAlert(true);
    setDistressAlert(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Proactive Guardian Telemetry · Acme Corp</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Trust & Safety Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Automated emergency protections configured for your daily commute. Test rapid SOS and acoustic response systems below.
        </p>
      </div>

      {/* Simulated Alert Banners */}
      {distressAlert && (
        <div className="p-5 bg-rose-50 border-2 border-rose-500 rounded-2xl space-y-2 animate-bounce-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-950 font-black text-sm">
              <span className="text-lg">🔊</span>
              <span>EMERGENCY DISPATCH TRIGGERED: Distress detected in 4.2s!</span>
            </div>
            <button
              onClick={() => setDistressAlert(false)}
              className="text-xs font-bold text-rose-700 hover:underline"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-rose-900 leading-relaxed">
            Distress detected in 4.2s! SOS sent. Family notified. Live location shared with Mom (+91 98450 12345) and Acme Corporate Security.
          </p>
        </div>
      )}

      {deviationAlert && (
        <div className="p-5 bg-amber-50 border-2 border-amber-500 rounded-2xl space-y-2 animate-bounce-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
              <span className="text-lg">🛣️</span>
              <span>PROACTIVE ROUTE WARNING: Driver deviated 700m</span>
            </div>
            <button
              onClick={() => setDeviationAlert(false)}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            Driver deviated 700m from approved Hosur Road corridor. Family alerted via automated SMS broadcast with live vehicle coordinates.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Emergency Contacts (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Emergency SOS Contacts List
              </h3>
              <p className="text-xs text-slate-500">
                Instantly alerted with GPS beacon if route deviates or distress is detected
              </p>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
              3 Active
            </span>
          </div>

          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{contact.name}</div>
                    <div className="text-[11px] text-slate-500">{contact.relation}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-slate-800">{contact.phone}</div>
                  <span className="text-[10px] text-emerald-700 font-semibold">SMS + Push Enabled</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Safety Simulation Sandbox (Test for Hackathon Judges)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleSimulateDistress}
                className="p-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs text-center"
              >
                <span>🔊 Simulate distress sound</span>
              </button>

              <button
                type="button"
                onClick={handleSimulateDeviation}
                className="p-3.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs text-center"
              >
                <span>🛣️ Simulate route deviation</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Active Safety Features (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Active Safety Features
            </h3>
            <p className="text-xs text-slate-500">
              Enforced across all TrustFirst closed-network rides
            </p>
          </div>

          <div className="space-y-3.5">
            
            <label className="flex items-start gap-3 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 text-emerald-600 rounded mt-0.5"
              />
              <div>
                <span className="font-bold text-slate-900 block">Live location tracking</span>
                <span className="text-[11px] text-slate-500">Streaming coordinates on encrypted Leaflet GIS map.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 text-emerald-600 rounded mt-0.5"
              />
              <div>
                <span className="font-bold text-slate-900 block">Route deviation alerts</span>
                <span className="text-[11px] text-slate-500">Triggers if vehicle veers &gt;400m from approved corridor.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 text-emerald-600 rounded mt-0.5"
              />
              <div>
                <span className="font-bold text-slate-900 block">Distress sound detection</span>
                <span className="text-[11px] text-slate-500">4.2s acoustic emergency dispatch response.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 text-emerald-600 rounded mt-0.5"
              />
              <div>
                <span className="font-bold text-slate-900 block">Masked calling</span>
                <span className="text-[11px] text-slate-500">Virtual VoIP numbers protect personal phone privacy.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={womenOnlyMode}
                disabled
                className="w-4 h-4 text-[#E91E63] rounded mt-0.5"
              />
              <div>
                <span className={`font-bold block ${womenOnlyMode ? 'text-[#E91E63]' : 'text-slate-900'}`}>
                  Women-only mode ({womenOnlyMode ? 'ACTIVE' : 'OFF'})
                </span>
                <span className="text-[11px] text-slate-500">Restricts matches to verified female colleagues.</span>
              </div>
            </label>

          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 leading-normal">
            All safety telemetry is tied directly to your verified Acme employee credential (priya@acme.com) with 24/7 audit logging.
          </div>

        </div>

      </div>

    </div>
  );
};
