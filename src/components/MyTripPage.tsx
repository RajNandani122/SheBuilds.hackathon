import React, { useState } from 'react';
import { Driver } from '../data/carpoolData';
import { LiveTripMap } from './LiveTripMap';
import { 
  CheckCircle2, 
  ShieldAlert, 
  Share2, 
  XCircle, 
  Clock, 
  MapPin, 
  Car, 
  Navigation, 
  PhoneCall, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

interface MyTripPageProps {
  activeDriver: Driver;
  onOpenSos: () => void;
  onCancelTrip: () => void;
}

export const MyTripPage: React.FC<MyTripPageProps> = ({
  activeDriver,
  onOpenSos,
  onCancelTrip,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [simulatedDeviation, setSimulatedDeviation] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const handleShareTrip = () => {
    const text = `TrustFirst Live Trip Link: Priya Sharma is commuting with verified driver ${activeDriver.name} (${activeDriver.carModel}, ${activeDriver.plateNumber}). On the way to Acme Tech Park. Live ETA: 8 mins.`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Success Banner */}
      <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-emerald-950">
              Recurring seat with {activeDriver.name} — {activeDriver.days}, {activeDriver.pickupTime}
            </h2>
            <div className="text-xs text-emerald-800 mt-0.5">
              Pickup Point: Richmond Circle · Vehicle: {activeDriver.carColor} {activeDriver.carModel} ({activeDriver.plateNumber})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>🟢 Status: On the way</span>
          </span>
        </div>
      </div>

      {/* 4 Live Trip Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated ETA</span>
          <span className="text-2xl font-black text-slate-900 tabular-nums block mt-1">
            8 mins
          </span>
          <span className="text-[11px] text-slate-500">Arrival at 08:38 AM</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Route Detour</span>
          <span className="text-2xl font-black text-[#2E7D32] tabular-nums block mt-1">
            {activeDriver.detourKm} km
          </span>
          <span className="text-[11px] text-slate-500">Direct office corridor</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trip Status</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">
            🟢 Active
          </span>
          <span className="text-[11px] text-slate-500">Driver approaching pickup</span>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Distance Left</span>
          <span className="text-2xl font-black text-[#1976D2] tabular-nums block mt-1">
            4.2 km
          </span>
          <span className="text-[11px] text-slate-500">Speed ~42 km/h</span>
        </div>

      </div>

      {/* Live Leaflet Map Visualizer */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#1976D2]" />
            <span>Leaflet Live Map: Pickup (Green) → Driver (Blue Car) → Drop (Red)</span>
          </div>

          <button
            type="button"
            onClick={() => setSimulatedDeviation(!simulatedDeviation)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
          >
            {simulatedDeviation ? 'Reset Normal Route' : 'Simulate +700m Route Deviation'}
          </button>
        </div>

        <LiveTripMap isDeviated={simulatedDeviation} />
      </div>

      {/* Route Deviation Monitor Bar */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
        simulatedDeviation
          ? 'bg-rose-50 border-rose-300 text-rose-900'
          : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
      }`}>
        <div className="flex items-center gap-2 font-bold">
          {simulatedDeviation ? (
            <>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Route deviation detected: Driver deviated 700m from approved corridor. Family alerted.</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Route deviation monitor status: Monitoring active — no deviation</span>
            </>
          )}
        </div>

        <span className="text-[11px] font-medium text-slate-500">
          GIS Geo-fence: ±300m tolerance threshold
        </span>
      </div>

      {/* Safety Actions Bar */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Prominent Red SOS Button */}
        <button
          type="button"
          onClick={onOpenSos}
          className="w-full sm:w-auto px-7 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <ShieldAlert className="w-5 h-5" />
          <span>🆘 SOS Emergency Assist</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Share Trip Button */}
          <button
            type="button"
            onClick={handleShareTrip}
            className="flex-1 sm:flex-initial px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedShare ? 'Trip Link Copied!' : '📍 Share Trip'}</span>
          </button>

          {/* Cancel Trip Button */}
          <button
            type="button"
            onClick={() => setCancelModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-3 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-rose-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            <span>❌ Cancel Trip</span>
          </button>
        </div>

      </div>

      {/* Cancellation Confirmation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Cancel Recurring Commute?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under Acme Corp's carpool guidelines, free cancellation is guaranteed up to 30 mins before pickup with zero penalty fee.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Keep Seat
              </button>
              <button
                type="button"
                onClick={() => {
                  setCancelModalOpen(false);
                  onCancelTrip();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
