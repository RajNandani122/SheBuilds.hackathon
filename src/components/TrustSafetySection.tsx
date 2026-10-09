import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  Award, 
  Star 
} from 'lucide-react';
import avatarSarah from '../assets/images/avatar_sarah_tech_1791578242065.jpg';
import avatarMarcus from '../assets/images/avatar_marcus_student_1791578254603.jpg';
import avatarPriya from '../assets/images/avatar_priya_consultant_1791578265726.jpg';

export const TrustSafetySection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-1">
          Trust Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Carpooling Designed Around Trust First
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          The number one reason people commute alone isn't route matching—it's trusting who is in the vehicle with them. Here is how TrustFirst solves it.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            1. Dual Verification
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every commuter verifies their institutional university (.edu) or corporate workplace email alongside government identity credentials.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
            Zero anonymous accounts permitted.
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            2. Secure Boarding PIN
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Passengers receive an encrypted 4-digit pickup code that only the confirmed driver can validate upon arrival, preventing any wrong car mix-ups.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
            Verified car boarding protocol.
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            3. Women-Only & Peer Hubs
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Drivers and passengers can choose verified women-only carpools or restrict rides to their specific campus community (e.g. Stanford or Berkeley students only).
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
            Custom comfort preferences respected.
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            4. Live Emergency Toolkit
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            One-touch automated SMS trip sharing with emergency contacts, including vehicle license plates, driver verification, and active drop-off schedule.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
            Always shared with loved ones.
          </div>
        </div>

      </div>

      {/* Community Proof & Verified Commuter Reviews */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Verified Commuter Testimonials
            </h3>
            <p className="text-xs text-slate-500">
              Real reviews from daily Bay Area university and tech corridor commuters
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>4.96 Average Safety & Experience Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Review 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={avatarSarah}
                alt="Sarah Chen"
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Sarah Chen</div>
                <div className="text-[11px] text-slate-500">Stripe · Stanford Alum</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Driving alone from Palo Alto to SF was burning $25 a day in tolls and gas. With TrustFirst, I carpool with two Stanford grad students. It pays my tolls and we use the diamond HOV lane."
            </p>
            <div className="text-[11px] text-slate-400">86 shared trips completed</div>
          </div>

          {/* Review 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={avatarMarcus}
                alt="Marcus Miller"
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Marcus Miller</div>
                <div className="text-[11px] text-slate-500">UC Berkeley Engineering</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "As a student without a car, Uber was $45 one-way to downtown SF internships. TrustFirst costs me $4, and I know everyone in the car is a verified university or lab colleague."
            </p>
            <div className="text-[11px] text-slate-400">34 shared trips completed</div>
          </div>

          {/* Review 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={avatarPriya}
                alt="Priya Sharma"
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Priya Sharma</div>
                <div className="text-[11px] text-slate-500">Genentech Bio Hub</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "The women-only carpool toggle gave me the confidence to finally offer rides. My car is 100% electric, quiet, and my regular commuters are wonderful working professionals."
            </p>
            <div className="text-[11px] text-slate-400">112 shared trips completed</div>
          </div>

        </div>
      </div>

    </div>
  );
};
