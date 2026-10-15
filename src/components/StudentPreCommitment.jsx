import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Coins, 
  Utensils, 
  Clock, 
  Flame, 
  Coffee, 
  Award, 
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Info,
  Calendar,
  Heart
} from 'lucide-react';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

export default function StudentPreCommitment({
  studentPoints = 350,
  onUpdatePoints,
  totalSkippedCount = 142,
  onToggleSkip
}) {
  const [skipLunch, setSkipLunch] = useState(false);
  const [skipDinner, setSkipDinner] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleToggleLunch = () => {
    const nextState = !skipLunch;
    setSkipLunch(nextState);

    if (nextState) {
      // User opted to skip lunch
      sound.playPointsEarned();
      triggerConfetti();
      onUpdatePoints(50);
      onToggleSkip(1);
      setToastMessage({
        type: 'success',
        title: '🎉 +50 Campus Reward Points Earned!',
        body: "Pre-commitment recorded! Kitchen staff was alerted to prepare 1 less lunch portion today. You saved ~0.35kg of potential food waste."
      });
    } else {
      // Reverted
      onUpdatePoints(-50);
      onToggleSkip(-1);
      setToastMessage({
        type: 'info',
        title: 'Meal Restored',
        body: 'Pre-commitment removed. Lunch portion added back to the cafeteria forecast.'
      });
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  const handleToggleDinner = () => {
    const nextState = !skipDinner;
    setSkipDinner(nextState);

    if (nextState) {
      sound.playPointsEarned();
      triggerConfetti();
      onUpdatePoints(50);
      onToggleSkip(1);
      setToastMessage({
        type: 'success',
        title: '🎉 +50 Campus Reward Points Earned!',
        body: "Pre-commitment recorded! Dinner kitchen tally reduced by 1 portion."
      });
    } else {
      onUpdatePoints(-50);
      onToggleSkip(-1);
      setToastMessage({
        type: 'info',
        title: 'Meal Restored',
        body: 'Dinner portion added back to hostel mess schedule.'
      });
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 max-w-4xl mx-auto">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-md w-full bg-white rounded-2xl p-4 shadow-2xl border-2 border-emerald-400 animate-slide-down">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-extrabold text-sm text-slate-900">
                {toastMessage.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {toastMessage.body}
              </p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
          <Utensils className="w-3.5 h-3.5 text-teal-700" />
          <span>Hostel Student Mess Portal • Demand-Side Pre-Commitment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Hostel Student Pre-Commitment
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Help the hostel kitchen cook the exact portions needed by signaling your plans in advance. Earn real campus rewards.
        </p>
      </div>

      {/* Student Wallet & Gamified Status */}
      <div className="mb-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-700/15 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Coins className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-emerald-100 font-bold">
                Your EcoWallet Balance
              </span>
              <span className="bg-emerald-500/40 text-[10px] px-2 py-0.5 rounded-full border border-white/20">
                Hostel Block C
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {studentPoints}
              </span>
              <span className="text-sm font-semibold text-emerald-100">
                Campus Reward Points
              </span>
            </div>
          </div>
        </div>

        {/* Quick perk badge */}
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-xs flex items-center gap-3">
          <Coffee className="w-5 h-5 text-amber-300" />
          <div>
            <span className="block font-bold text-white">Redeemable Today</span>
            <span className="text-emerald-100 text-[11px]">Free artisan brew at Campus Cafe (150 pts)</span>
          </div>
        </div>
      </div>

      {/* Core Interactive Pre-Commitment Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/90 overflow-hidden">
        
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Today's Meal Attendance Commitment
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              ● Mess Roster Open
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Signal whether you will be dining at the hostel mess today. Toggle ON if you are eating out or skipping.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">

          {/* Primary Toggle Requirement: "Skip Today's Mess Lunch" */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
            skipLunch 
              ? 'bg-emerald-50/70 border-emerald-500 shadow-md shadow-emerald-500/10' 
              : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
          }`}>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    Skip Today's Mess Lunch
                  </h3>
                  {skipLunch && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 text-white">
                      Opted Out (-1 Portion)
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Lunch Service: 12:30 PM – 2:30 PM • Main Dining Hall
                </p>
              </div>

              {/* The Toggle Switch */}
              <button
                type="button"
                onClick={handleToggleLunch}
                className={`relative inline-flex h-8 w-16 sm:h-9 sm:w-18 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  skipLunch ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={skipLunch}
              >
                <span className="sr-only">Skip Today's Mess Lunch</span>
                <span
                  className={`pointer-events-none inline-block h-7 w-7 sm:h-8 sm:w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                    skipLunch ? 'translate-x-8 sm:translate-x-9' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Psychological Element / Pre-Commitment Reward Nudge */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-semibold text-emerald-900 leading-snug">
                Cancel 12 hours in advance to earn 50 Campus Reward Points and help the kitchen cook exactly what's needed.
              </p>
            </div>
          </div>

          {/* Secondary Option: Skip Tonight's Dinner for Full Day Planning */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
            skipDinner 
              ? 'bg-emerald-50/70 border-emerald-500 shadow-md shadow-emerald-500/10' 
              : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
          }`}>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    Skip Tonight's Mess Dinner
                  </h3>
                  {skipDinner && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 text-white">
                      Opted Out (-1 Portion)
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Dinner Service: 7:30 PM – 9:30 PM • Main Dining Hall
                </p>
              </div>

              {/* The Dinner Toggle Switch */}
              <button
                type="button"
                onClick={handleToggleDinner}
                className={`relative inline-flex h-8 w-16 sm:h-9 sm:w-18 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  skipDinner ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={skipDinner}
              >
                <span className="sr-only">Skip Tonight's Mess Dinner</span>
                <span
                  className={`pointer-events-none inline-block h-7 w-7 sm:h-8 sm:w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                    skipDinner ? 'translate-x-8 sm:translate-x-9' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-200/80 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-semibold text-emerald-900 leading-snug">
                Earn 50 Campus Reward Points by giving the kitchen evening headcount clarity before 4:00 PM.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Social Proof & Collective Psychological Nudges */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-100 rounded-2xl text-emerald-700 shrink-0">
            <Flame className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Campus Social Proof
            </span>
            <span className="text-lg font-black text-slate-900 block mt-0.5">
              {totalSkippedCount} Students
            </span>
            <span className="text-xs text-slate-500">
              Pre-committed to skip lunch today across 4 hostel wings.
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 bg-teal-100 rounded-2xl text-teal-700 shrink-0">
            <TrendingDown className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pre-Emptive Waste Prevented
            </span>
            <span className="text-lg font-black text-slate-900 block mt-0.5">
              {(totalSkippedCount * 0.38).toFixed(1)} kg Food
            </span>
            <span className="text-xs text-slate-500">
              Excluded from morning pots before raw ingredients were cooked.
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 bg-amber-100 rounded-2xl text-amber-700 shrink-0">
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Dining Trust Index
            </span>
            <span className="text-lg font-black text-slate-900 block mt-0.5">
              99.2% Accuracy
            </span>
            <span className="text-xs text-slate-500">
              Kitchen cooks without fear of sudden food shortage.
            </span>
          </div>
        </div>

      </div>

      {/* Rewards Catalog Preview */}
      <div className="mt-8 bg-slate-100/80 rounded-3xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Campus Reward Store (Where Points Go)
            </h3>
          </div>
          <span className="text-xs text-emerald-700 font-semibold">
            Your Balance: {studentPoints} pts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 block">Artisan Coffee / Tea</span>
              <span className="text-slate-500 text-[11px]">Campus Center Cafe</span>
            </div>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              150 pts
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 block">Library Printing Pack</span>
              <span className="text-slate-500 text-[11px]">50 Free Pages</span>
            </div>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              100 pts
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 block">Laundry Token Fastpass</span>
              <span className="text-slate-500 text-[11px]">Hostel Wing Washers</span>
            </div>
            <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              200 pts
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
