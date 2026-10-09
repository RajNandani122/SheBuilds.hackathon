import React, { useState } from 'react';
import { ShieldCheck, Car, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string, womenOnly: boolean) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('priya@acme.com');
  const [employeeCode, setEmployeeCode] = useState('ACME2026');
  const [womenOnly, setWomenOnly] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCode = employeeCode.trim();

    if (!trimmedEmail.endsWith('@acme.com')) {
      setErrorMessage('Corporate Closed Network: Email must end with @acme.com');
      return;
    }

    if (trimmedCode !== 'ACME2026') {
      setErrorMessage('Invalid employee verification code. Use demo code: ACME2026');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(trimmedEmail, womenOnly);
    }, 700);
  };

  const handleFillDemo = () => {
    setEmail('priya@acme.com');
    setEmployeeCode('ACME2026');
    setWomenOnly(true);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      
      {/* Container Card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Green & Blue Gradient Header with Car Icon */}
        <div className="bg-gradient-to-r from-[#2E7D32] to-[#1976D2] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
          
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-md ring-2 ring-white/30">
            <Car className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            TrustFirst Carpool
          </h1>
          <p className="text-xs text-white/80 mt-1 font-medium">
            Closed-Network Recurring Carpooling for Acme Corp
          </p>
        </div>

        {/* Demo Credentials Pill Bar */}
        <div className="bg-emerald-50/80 border-b border-emerald-100 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="text-emerald-900 font-medium">
            Demo Credentials: <span className="font-mono font-bold">priya@acme.com</span> / <span className="font-mono font-bold">ACME2026</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline"
          >
            Auto Fill
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Work Email (@acme.com required)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@acme.com"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] transition-colors"
              />
            </div>
          </div>

          {/* Employee Code Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Employee Security Passcode
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                placeholder="ACME2026"
                className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1976D2] focus:border-[#1976D2] transition-colors font-mono tracking-wider uppercase"
              />
            </div>
          </div>

          {/* Women-only carpool checkbox */}
          <div className="p-3.5 bg-pink-50/70 border border-pink-200 rounded-xl flex items-start gap-3">
            <input
              type="checkbox"
              id="womenOnlyLogin"
              checked={womenOnly}
              onChange={(e) => setWomenOnly(e.target.checked)}
              className="w-4 h-4 text-[#E91E63] rounded border-pink-300 focus:ring-[#E91E63] mt-0.5 accent-[#E91E63]"
            />
            <label htmlFor="womenOnlyLogin" className="text-xs text-slate-700 cursor-pointer">
              <span className="font-bold text-[#E91E63] block">👩 Women-only carpool mode</span>
              <span className="text-[11px] text-slate-500">
                Only match and commute with verified female drivers and colleagues.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#2E7D32] to-[#1976D2] hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Acme SSO & Badges...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Login</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

          {/* Trust Guarantees */}
          <div className="pt-2 text-center text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Closed Network: Acme Corp Employees Only</span>
            </div>
            <div>HR Verified Directory · Real-time SOS · 100% Non-Profit Split</div>
          </div>

        </form>

      </div>

    </div>
  );
};
