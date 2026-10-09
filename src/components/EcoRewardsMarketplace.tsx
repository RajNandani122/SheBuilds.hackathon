import React, { useState } from 'react';
import { RewardItem, CampusLeaderboardEntry, UserProfile } from '../types/carpool';
import { REWARDS_CATALOG, CAMPUS_LEADERBOARD } from '../data/mockData';
import { 
  Sparkles, 
  Leaf, 
  Award, 
  Gift, 
  TrendingUp, 
  Check, 
  Coffee, 
  Zap, 
  CreditCard, 
  BookOpen, 
  Car, 
  ShieldCheck, 
  Copy 
} from 'lucide-react';

interface EcoRewardsMarketplaceProps {
  currentUser: UserProfile;
  ecoCoins: number;
  onRedeemReward: (cost: number, rewardTitle: string) => void;
}

export const EcoRewardsMarketplace: React.FC<EcoRewardsMarketplaceProps> = ({
  currentUser,
  ecoCoins,
  onRedeemReward,
}) => {
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'campus' | 'individual'>('campus');

  // Commuter sustainability metrics
  const treesEquivalent = (currentUser.lifetimeCo2SavedKg / 21.7).toFixed(1); // 1 tree absorbs ~21.7kg CO2/year
  const gallonsSaved = (currentUser.lifetimeCo2SavedKg / 8.887).toFixed(1); // 1 gal gas = 8.887kg CO2

  const handleRedeem = (item: RewardItem) => {
    if (ecoCoins < item.costEcoCoins) return;
    onRedeemReward(item.costEcoCoins, item.title);
    setRedeemedCode(`${item.codePlaceholder}-${Math.floor(100 + Math.random() * 900)}`);
    setSelectedReward(item);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Top Banner: Sustainability Impact & Wallet */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-900/50 shadow-lg relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: Summary Prose */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Gamified Sustainability & Rewards Engine</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Turn Empty Car Seats into Carbon Credits & Real Perks
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Every shared carpool mile eliminates single-occupancy emissions. Earn <strong>EcoCoins</strong> automatically on every verified commute and redeem them for free coffee, bridge tolls, and campus perks.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">CO₂ Avoided</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-400 tabular-nums">
                  {currentUser.lifetimeCo2SavedKg} kg
                </span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Fuel Saved</span>
                <span className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {gallonsSaved} gal
                </span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Tree Equiv.</span>
                <span className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {treesEquivalent} trees
                </span>
              </div>
            </div>
          </div>

          {/* Right: EcoCoins Wallet Balance Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full max-w-xs text-center space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/10">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-300 font-medium uppercase tracking-wider block">
                  Available Balance
                </span>
                <div className="text-4xl font-extrabold text-white tabular-nums mt-0.5 flex items-center justify-center gap-1.5">
                  <span className="text-emerald-400">🌱</span>
                  <span>{ecoCoins}</span>
                </div>
                <span className="text-[11px] text-emerald-300 font-medium block mt-1">
                  EcoCoins Ready to Redeem
                </span>
              </div>
              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                Earn +25 to +40 EcoCoins per shared trip
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Rewards Catalog Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              <span>Rewards Marketplace</span>
            </h3>
            <p className="text-xs text-slate-500">
              Redeem your verified sustainability balance for real commuter discounts
            </p>
          </div>
          <div className="text-xs text-slate-600 font-medium">
            Your Wallet: <span className="font-bold text-emerald-700 tabular-nums">{ecoCoins} EcoCoins</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REWARDS_CATALOG.map((item) => {
            const canAfford = ecoCoins >= item.costEcoCoins;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                      {item.category === 'coffee' && <Coffee className="w-5 h-5" />}
                      {item.category === 'toll' && <CreditCard className="w-5 h-5" />}
                      {item.category === 'charging' && <Zap className="w-5 h-5" />}
                      {item.category === 'books' && <BookOpen className="w-5 h-5" />}
                      {item.category === 'parking' && <Car className="w-5 h-5" />}
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-700 tabular-nums flex items-center gap-1 justify-end">
                        <span>🌱</span>
                        <span>{item.costEcoCoins}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase">EcoCoins</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.provider}
                  </div>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Instant voucher code
                  </span>
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => handleRedeem(item)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      canAfford
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Voucher' : `Need ${item.costEcoCoins - ecoCoins} more`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus & Community Leaderboard */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Campus & Corporate Commute Leaderboard</span>
            </h3>
            <p className="text-xs text-slate-500">
              Community rankings based on cumulative greenhouse gas reduction
            </p>
          </div>
          <div className="text-xs text-slate-500">
            Updated live from verified shared corridors
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="pb-3 pr-4">Rank</th>
                <th className="pb-3 pr-4">Community Network</th>
                <th className="pb-3 pr-4">Corridor Focus</th>
                <th className="pb-3 pr-4 text-right">CO₂ Avoided</th>
                <th className="pb-3 pr-4 text-right">EcoCoins Pool</th>
                <th className="pb-3 text-right">Rides</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CAMPUS_LEADERBOARD.map((team) => (
                <tr key={team.rank} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pr-4 font-bold text-slate-900 tabular-nums">
                    #{team.rank}
                  </td>
                  <td className="py-3.5 pr-4 font-semibold text-slate-900">
                    {team.name}
                  </td>
                  <td className="py-3.5 pr-4 text-slate-500">
                    {team.community}
                  </td>
                  <td className="py-3.5 pr-4 text-right font-bold text-emerald-700 tabular-nums">
                    {team.co2SavedKg.toLocaleString()} kg
                  </td>
                  <td className="py-3.5 pr-4 text-right font-semibold text-slate-700 tabular-nums">
                    🌱 {team.ecoCoins.toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right font-medium text-slate-600 tabular-nums">
                    {team.ridesCount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Voucher Confirmation Modal */}
      {selectedReward && redeemedCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Reward Redeemed Successfully!
              </h3>
              <p className="text-xs text-slate-600">
                You redeemed <strong>{selectedReward.title}</strong> for {selectedReward.costEcoCoins} EcoCoins.
              </p>
            </div>

            {/* Voucher Code Box */}
            <div className="p-4 bg-slate-900 text-white rounded-xl text-center space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Your Digital Voucher Code</span>
              <div className="font-mono text-lg font-bold text-emerald-400 tracking-wider">
                {redeemedCode}
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(redeemedCode)}
                className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 mx-auto"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Voucher Copied!' : 'Copy Voucher Code'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Present this code at checkout or apply it directly in your partner app (Philz Cafe, FastTrak, ChargePoint).
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedReward(null);
                setRedeemedCode(null);
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Done & Return to Marketplace
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
