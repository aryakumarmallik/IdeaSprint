import React, { useState } from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  Users, 
  Navigation, 
  Sparkles, 
  Clock, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  History, 
  RotateCcw,
  Bike,
  ShieldCheck,
  Flame,
  Award,
  Eye,
  AlertTriangle,
  Zap,
  TrendingUp,
  Scale
} from 'lucide-react';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import ClaimRouteModal from './ClaimRouteModal';

export default function VolunteerDashboard({ 
  foodItems, 
  onClaimItem, 
  onSwitchToDonor,
  onResetDemo,
  claimedItems = [],
  heroProfile = {
    level: 3,
    title: 'Level 3 Campus Hero',
    rescuedKg: 42,
    xp: 180,
    nextLevelXp: 250,
    streak: 7
  }
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClaimModal, setSelectedClaimModal] = useState(null);
  const [showClaimedHistory, setShowClaimedHistory] = useState(false);
  
  // State for claiming micro-interaction tracking
  const [claimingItemId, setClaimingItemId] = useState(null);

  // Filter items based on optional search
  const filteredItems = foodItems.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.description.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    );
  });

  const handleClaimClick = (item) => {
    if (claimingItemId) return; // Prevent double click

    // Step 1: Trigger satisfying micro-interaction on button
    setClaimingItemId(item.id);
    sound.playClaimSuccess();
    triggerConfetti();

    // Step 2: Allow user to absorb the rewarding checkmark & confetti animation (700ms)
    setTimeout(() => {
      setClaimingItemId(null);
      // Remove item from feed and open route modal
      onClaimItem(item.id);
      setSelectedClaimModal(item);
    }, 700);
  };

  const progressPercent = Math.min(100, Math.round((heroProfile.xp / heroProfile.nextLevelXp) * 100));

  return (
    <div className="py-4 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Route modal pops up when a card is claimed */}
      <ClaimRouteModal 
        claimedItem={selectedClaimModal} 
        onClose={() => setSelectedClaimModal(null)} 
      />

      {/* ========================================================================= */}
      {/* 1. STICKY GAMIFIED HERO PROFILE HEADER                                    */}
      {/* ========================================================================= */}
      <section aria-label="Volunteer Hero Profile" className="sticky top-16 sm:top-20 z-30 mb-8 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Hero Rank & Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 ring-2 ring-amber-300/30 shrink-0">
              <Award className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  Level 3 Campus Hero | 42kg Rescued This Month
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  Top 5% Couriers
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="font-semibold text-emerald-700">Verified Courier #402</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {heroProfile.streak}-Day Dispatch Streak
                </span>
              </div>
            </div>
          </div>

          {/* Gamified XP Progress Bar */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-56 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-600">XP to Level 4 Eco-Leader</span>
                <span className="text-emerald-700">{heroProfile.xp} / {heroProfile.nextLevelXp} XP</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>+50 XP per Claim</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Subheader & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Available Surplus Food Drops</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
              {foodItems.length} Live
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Claim prepared meals before expiration and deliver to nearest student pantries.
          </p>
        </div>

        {/* Toggles & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {claimedItems.length > 0 && (
            <button
              onClick={() => setShowClaimedHistory(!showClaimedHistory)}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-emerald-700" />
              <span>{claimedItems.length} Rescued Missions</span>
            </button>
          )}

          <button
            onClick={onSwitchToDonor}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Donor Camera</span>
          </button>
        </div>
      </div>

      {/* Claimed History Drawer */}
      {showClaimedHistory && claimedItems.length > 0 && (
        <div className="mb-8 p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl shadow-lg animate-slide-down">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="font-bold text-base">
                Completed & Active Courier Missions Today ({claimedItems.length})
              </h2>
            </div>
            <button
              onClick={() => setShowClaimedHistory(false)}
              className="text-xs text-emerald-300 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {claimedItems.map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 text-xs space-y-1">
                <span className="text-emerald-300 font-bold block text-sm">{item.description}</span>
                <div className="text-emerald-100 flex items-center justify-between">
                  <span>{item.servings} Servings ({item.weightKg ? `${item.weightKg}kg` : '~8kg'})</span>
                  <span className="bg-emerald-500/30 px-2 py-0.5 rounded text-[10px]">Successfully Matched</span>
                </div>
                <div className="text-slate-300 truncate">📍 {item.location}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      {foodItems.length > 0 && (
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search surplus by dish or dining hall..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs font-medium"
            />
          </div>
        </div>
      )}

      {/* Empty State when no food is available */}
      {foodItems.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-emerald-200/80 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm my-6 animate-pop-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 animate-pulse" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            No surplus food available right now.
          </h2>
          
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            All surplus cafeteria meals have been claimed by student volunteers! Scan new closing trays using the Donor Portal.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onSwitchToDonor}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Switch to Donor Portal to Scan Food</span>
            </button>

            <button
              onClick={onResetDemo}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reload Sample Surplus Items</span>
            </button>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-600 my-6">
          <p className="font-semibold text-base">No meals match "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs text-emerald-700 font-bold underline"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. CARD GRID WITH URGENCY NUDGES & SOCIAL PROOF BADGES                    */
        /* ========================================================================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item) => {
            const isClaiming = claimingItemId === item.id;
            const viewers = item.activeViewers || 2;
            const urgencyText = item.urgencyBadge || 'High Priority: Expires in 45 mins';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border shadow-sm hover:shadow-xl hover:shadow-slate-200/70 hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative ${
                  isClaiming ? 'ring-4 ring-emerald-500 scale-[0.98]' : 'border-slate-200/90'
                }`}
              >
                {/* URGENCY NUDGE & SOCIAL PROOF BANNER AT TOP OF CARD */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 px-4 py-2 flex items-center justify-between text-xs">
                  {/* Urgency Nudge */}
                  <span className="flex items-center gap-1.5 font-bold text-amber-900">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>{urgencyText}</span>
                  </span>

                  {/* Social Proof Badge */}
                  <span className="flex items-center gap-1 font-extrabold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-full text-[10px]">
                    <Eye className="w-3 h-3 text-orange-600" />
                    <span>🔥 {viewers} volunteers viewing</span>
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 pb-4">
                  
                  {/* Meta Pills */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
                        <Users className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                        {item.servings} Servings
                      </span>

                      {item.weightKg && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          <Scale className="w-3 h-3 mr-1 text-slate-500" />
                          {item.weightKg} kg
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <Zap className="w-3 h-3 text-emerald-500" />
                      <span>Ready Now</span>
                    </span>
                  </div>

                  {/* Food Description Title */}
                  <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 leading-snug group-hover:text-emerald-950 transition-colors">
                    {item.description}
                  </h3>

                  {/* Dietary Tags */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.dietary.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Pickup Location */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 shrink-0 mt-0.5 border border-emerald-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Pickup Location
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight block">
                        {item.location}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Footer with SATISFYING ACTION REWARD BUTTON */}
                <div className="p-6 pt-2 bg-gradient-to-b from-transparent to-slate-50/50">
                  <button
                    type="button"
                    disabled={isClaiming}
                    onClick={() => handleClaimClick(item)}
                    className={`w-full py-3.5 px-5 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                      isClaiming
                        ? 'bg-emerald-700 text-white scale-[1.02] shadow-emerald-700/40 ring-4 ring-emerald-300 animate-pulse'
                        : 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-green-700 text-white shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 active:scale-[0.98]'
                    }`}
                  >
                    {isClaiming ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                        <span>Claimed! Dispatching Route...</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
                        <span>Claim & Route</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-slate-500 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Awards <strong>+50 XP</strong> & routes to student pantry</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
