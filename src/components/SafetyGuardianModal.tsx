import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldAlert, 
  Volume2, 
  Mic, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  Share2, 
  Radio, 
  ShieldCheck, 
  BellRing 
} from 'lucide-react';

interface SafetyGuardianModalProps {
  onClose: () => void;
  driverName?: string;
  vehicleInfo?: string;
  plateMasked?: string;
}

export const SafetyGuardianModal: React.FC<SafetyGuardianModalProps> = ({
  onClose,
  driverName = 'Sarah Chen',
  vehicleInfo = 'Tesla Model Y Midnight Silver',
  plateMasked = '8XYZ•••',
}) => {
  const [micActive, setMicActive] = useState(true);
  const [ambientDb, setAmbientDb] = useState(48);
  const [isDistressDetected, setIsDistressDetected] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(4.2);
  const [isDispatched, setIsDispatched] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  // Simulated ambient decibel flutter
  useEffect(() => {
    if (!micActive || isDistressDetected) return;
    const interval = setInterval(() => {
      setAmbientDb(Math.floor(45 + Math.random() * 8));
    }, 600);
    return () => clearInterval(interval);
  }, [micActive, isDistressDetected]);

  // Distress countdown timer (4.2 seconds rapid response)
  useEffect(() => {
    if (!isDistressDetected || cancelled || isDispatched) return;
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 0.2) {
          clearInterval(timer);
          setIsDispatched(true);
          return 0;
        }
        return Math.round((prev - 0.2) * 10) / 10;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [isDistressDetected, cancelled, isDispatched]);

  const handleTriggerDistressSimulation = () => {
    setAmbientDb(88); // simulate sudden loud peak
    setIsDistressDetected(true);
    setCancelled(false);
    setIsDispatched(false);
    setCountdownSeconds(4.2);
  };

  const handleCancelCountdown = () => {
    setCancelled(true);
    setIsDistressDetected(false);
    setCountdownSeconds(4.2);
    setAmbientDb(48);
  };

  const handleManualSos = () => {
    setIsDistressDetected(true);
    setIsDispatched(true);
    setCountdownSeconds(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Safety Guardian & Emergency Response
              </h2>
              <div className="text-xs text-slate-500">
                Proactive acoustic monitoring & panic dispatch
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

        <div className="p-6 space-y-6">
          
          {/* Active Rapid Dispatch Banner (if triggered) */}
          {isDistressDetected && !cancelled && (
            <div className={`p-4 rounded-xl border-2 space-y-3 ${
              isDispatched 
                ? 'bg-rose-50 border-rose-500 text-rose-950' 
                : 'bg-amber-50 border-amber-500 text-amber-950'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <BellRing className={`w-5 h-5 mt-0.5 ${isDispatched ? 'text-rose-600 animate-bounce' : 'text-amber-600 animate-spin'}`} />
                  <div>
                    <h3 className="font-bold text-sm">
                      {isDispatched 
                        ? 'EMERGENCY DISPATCH BROADCASTED' 
                        : 'DISTRESS SOUND DETECTED (>85 dB peak)'}
                    </h3>
                    <p className="text-xs mt-1 leading-relaxed">
                      {isDispatched ? (
                        <span>
                          Automated alert transmitted to your emergency contact (+1 555-349-8821), campus safety dispatch, and local highway monitoring with vehicle telemetry and GPS pin.
                        </span>
                      ) : (
                        <span>
                          Rapid response countdown active. Dispatching 911 telemetry & emergency contact in{' '}
                          <strong className="font-mono text-base text-rose-700 tabular-nums">
                            {countdownSeconds.toFixed(1)}s
                          </strong>.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {!isDispatched && (
                  <span className="font-mono text-lg font-bold text-rose-700 tabular-nums shrink-0">
                    {countdownSeconds.toFixed(1)}s
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-rose-200">
                <button
                  type="button"
                  onClick={handleCancelCountdown}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  {isDispatched ? 'Deactivate & Mark False Alarm' : 'I Am Safe (Cancel Countdown)'}
                </button>
              </div>
            </div>
          )}

          {/* Acoustic Sound Monitor Feature */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className={`w-4 h-4 ${micActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Distress Sound Detection (4.2s Response)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMicActive(!micActive)}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded transition-colors ${
                  micActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {micActive ? 'Active' : 'Paused'}
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When enabled during active trips, our neural client-side sound parser continuously listens for acute distress keywords, sudden glass fracture, or crash deceleration sounds. If triggered, emergency assistance is initiated in exactly <strong>4.2 seconds</strong> unless cancelled.
            </p>

            {/* Audio dB Level Visualizer */}
            <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Ambient Cabin Noise:</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {ambientDb} dB {ambientDb > 80 ? '(HIGH PEAK)' : '(Normal)'}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${ambientDb > 80 ? 'bg-rose-600' : 'bg-emerald-600'}`}
                  style={{ width: `${Math.min(100, (ambientDb / 100) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 dB (Silence)</span>
                <span>50 dB (Conversation)</span>
                <span>85 dB (Distress Threshold)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTriggerDistressSimulation}
              className="w-full py-2 px-3 bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Simulate Distress Audio Event (&gt;85 dB)</span>
            </button>
          </div>

          {/* Active Trip Telemetry Snapshot */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 text-xs">
            <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              <span>Emergency Packet Telemetry Ready</span>
            </div>
            <div className="space-y-1 text-slate-300 text-[11px]">
              <div><strong>Driver:</strong> {driverName} (Verified)</div>
              <div><strong>Vehicle:</strong> {vehicleInfo}</div>
              <div><strong>License Plate:</strong> {plateMasked} (California)</div>
              <div><strong>Current Route:</strong> US-101 Northbound HOV Carpool Lane</div>
              <div><strong>Emergency Recipient:</strong> +1 (555) 349-8821 (Autoconfigured)</div>
            </div>
          </div>

          {/* Manual SOS Panic Button */}
          <div>
            <button
              type="button"
              onClick={handleManualSos}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Instant Emergency SOS Dispatch</span>
            </button>
            <span className="text-[11px] text-slate-400 text-center block mt-1.5">
              Instantly sends distress signal, location beacon, and vehicle plate details.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
