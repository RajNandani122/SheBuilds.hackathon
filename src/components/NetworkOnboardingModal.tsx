import React, { useState } from 'react';
import { UserProfile } from '../types/carpool';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Lock, 
  Upload, 
  Sparkles, 
  Check 
} from 'lucide-react';

interface NetworkOnboardingModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onCompleteVerification: (updatedUser: Partial<UserProfile>) => void;
}

export const NetworkOnboardingModal: React.FC<NetworkOnboardingModalProps> = ({
  currentUser,
  onClose,
  onCompleteVerification,
}) => {
  const [networkType, setNetworkType] = useState<'university' | 'corporate'>('university');
  const [institutionName, setInstitutionName] = useState('Stanford University');
  const [emailInput, setEmailInput] = useState('jordan.t@stanford.edu');
  const [idUploaded, setIdUploaded] = useState(true);
  const [step, setStep] = useState<1 | 2>(1);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setStep(2);
    }, 1200);
  };

  const handleFinish = () => {
    onCompleteVerification({
      organization: institutionName,
      organizationDomain: emailInput.split('@')[1] || 'stanford.edu',
      organizationType: networkType,
      verificationBadges: [
        'university_verified',
        'id_verified',
        'corporate_verified',
      ],
      prrsScore: 99.4,
      trustScore: 99,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Verified Closed-Network Onboarding
              </h2>
              <div className="text-xs text-slate-500">
                Exclusive peer corridors for colleges & tech workplaces
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

        <div className="p-6 space-y-5">
          
          {step === 1 ? (
            <div className="space-y-4">
              
              <p className="text-xs text-slate-600 leading-relaxed">
                TrustFirst ensures you only carpool with confirmed members of your university or corporate community. Select your institutional network to begin one-click verification.
              </p>

              {/* Network Type Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNetworkType('university');
                    setInstitutionName('Stanford University');
                    setEmailInput('jordan.t@stanford.edu');
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-colors ${
                    networkType === 'university'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-emerald-600 mb-1.5" />
                  <div className="text-xs font-bold">University Campus</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Students, faculty & researchers (.edu)</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNetworkType('corporate');
                    setInstitutionName('Stripe / Silicon Valley Tech Hub');
                    setEmailInput('jordan.t@stripe.com');
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-colors ${
                    networkType === 'corporate'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-emerald-600 mb-1.5" />
                  <div className="text-xs font-bold">Corporate Workplace</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Verified company email domain</div>
                </button>
              </div>

              {/* Institution and Email inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {networkType === 'university' ? 'Select University' : 'Company or Employer'}
                  </label>
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institutional Email Address
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@university.edu"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* ID badge card upload simulation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institutional ID Badge Scan
                  </label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Stanford_Student_ID_2026.png (Verified)</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold">Active</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={verifying}
                  onClick={handleVerify}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-2"
                >
                  {verifying ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating SSO...</span>
                    </>
                  ) : (
                    <span>Authenticate & Verify Network</span>
                  )}
                </button>
              </div>

            </div>
          ) : (
            /* Step 2: Verification Success & PRRS Baseline */
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Network Verified Successfully!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  You are now authenticated in the <strong>{institutionName}</strong> closed commuter network.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl text-left space-y-2 text-xs">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Trust & Reliability Benefits Activated</span>
                </div>
                <ul className="space-y-1 text-slate-700 list-disc list-inside">
                  <li><strong>99.4% PRRS Baseline:</strong> Granted diamond commuter standing.</li>
                  <li><strong>Closed-Network Corridors:</strong> Access to private campus-only carpool rides.</li>
                  <li><strong>+50 Welcome EcoCoins:</strong> Deposited directly into your sustainability wallet.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                Access Verified Commuter Network
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
