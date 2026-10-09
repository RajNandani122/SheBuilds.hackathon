import React, { useState } from 'react';
import { REWARDS, LEADERBOARD } from '../data/carpoolData';
import { 
  Gift, 
  Leaf, 
  Award, 
  Sparkles, 
  Check, 
  Copy, 
  TrendingUp, 
  Car, 
  Coffee 
} from 'lucide-react';

interface RewardsPageProps {
  ecoCoins: number;
  onDeductCoins: (amount: number) => void;
}

export const RewardsPage: React.FC<RewardsPageProps> = ({
  ecoCoins,
  onDeductCoins,
}) => {
  const [co2SavedToday] = useState(3.8); // kg
  const [ecoCoinsEarnedToday] = useState(40);
  const [totalRides] = useState(32);

  const [activeVoucher, setActiveVoucher] = useState<{
    title: string;
    code: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRedeem = (item: typeof REWARDS[0]) => {
    if (ecoCoins < item.coins) return;
    onDeductCoins(item.coins);
    setActiveVoucher({
      title: item.title,
      code: `${item.voucherCode}-${Math.floor(100 + Math.random() * 900)}`,
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <div className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5" />
          <span>Carbon Footprint & Sustainability Perks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          EcoCoins & Corporate Rewards
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Every shared kilometer eliminates vehicular carbon emissions. Redeem your verified sustainability coins for cafe coffee, prime parking, and movie tickets.
        </p>
      </div>

      {/* 3 Core Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CO₂ Saved Today</span>
          <div className="text-3xl font-black text-[#2E7D32] tabular-nums mt-1">
            {co2SavedToday} <span className="text-sm font-semibold text-slate-500">kg</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">142.6 kg cumulative avoided</span>
        </div>

        <div className="p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">EcoCoins Balance</span>
          <div className="text-3xl font-black text-emerald-950 tabular-nums mt-1">
            🌱 {ecoCoins}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">+{ecoCoinsEarnedToday} coins earned today</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Shared Rides</span>
          <div className="text-3xl font-black text-[#1976D2] tabular-nums mt-1">
            {totalRides} <span className="text-sm font-semibold text-slate-500">rides</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">100% on-time completion</span>
        </div>

      </div>

      {/* Rewards Redeem Catalog */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#2E7D32]" />
              <span>Redeem EcoCoins for Corporate Perks</span>
            </h3>
            <p className="text-xs text-slate-500">
              Vouchers generated instantly with digital redemption code
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800">
            Available: {ecoCoins} Coins
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REWARDS.map((rew) => {
            const canAfford = ecoCoins >= rew.coins;
            return (
              <div
                key={rew.id}
                className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{rew.icon}</span>
                    <span className="font-extrabold text-sm text-emerald-800 tabular-nums">
                      🌱 {rew.coins} Coins
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">
                    {rew.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {rew.partner}
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {rew.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => handleRedeem(rew)}
                    className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all ${
                      canAfford
                        ? 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? `Redeem (${rew.coins} Coins)` : `Need ${rew.coins - ecoCoins} more coins`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Acme Corp Carpool Leaderboard</span>
            </h3>
            <p className="text-xs text-slate-500">
              Top green commuters this quarter
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Updated Daily
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Employee</th>
                <th className="pb-3">Status Badge</th>
                <th className="pb-3 text-right">CO₂ Avoided</th>
                <th className="pb-3 text-right">EcoCoins</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LEADERBOARD.map((user) => (
                <tr
                  key={user.rank}
                  className={user.name.includes('You') ? 'bg-emerald-50/70 font-bold' : ''}
                >
                  <td className="py-3 font-extrabold text-slate-900 tabular-nums">
                    #{user.rank}
                  </td>
                  <td className="py-3 font-bold text-slate-900">
                    {user.name}
                  </td>
                  <td className="py-3 text-slate-600 font-medium">
                    {user.badge}
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-[#2E7D32]">
                    {user.co2Kg} kg
                  </td>
                  <td className="py-3 text-right font-mono font-extrabold text-emerald-800">
                    🌱 {user.coins.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Voucher Code Modal */}
      {activeVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
              🎉
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {activeVoucher.title} Redeemed!
            </h4>
            <p className="text-xs text-slate-600">
              Show this digital voucher code at the partner kiosk or enter it during checkout:
            </p>

            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Voucher Passcode</span>
              <div className="font-mono text-base font-bold text-emerald-400 tracking-wider">
                {activeVoucher.code}
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(activeVoucher.code)}
                className="mt-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 mx-auto"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActiveVoucher(null)}
              className="w-full py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
