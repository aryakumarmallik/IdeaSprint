import React from 'react';
import { 
  Sprout, 
  UtensilsCrossed, 
  HeartHandshake, 
  RotateCcw,
  Users,
  Coins
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  itemCount, 
  onResetDemo,
  studentPoints = 350
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer shrink-0" 
            onClick={() => setActiveView('donor')}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/20">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900">
                  Zero<span className="text-emerald-600">FoodWaste</span>
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  AI + Behavioral Net
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block font-medium">
                CV Vision • AI Forecasting • Student Pre-Commitment
              </p>
            </div>
          </div>

          {/* 3 Prominent View Toggles in Navbar */}
          <nav aria-label="Platform Views" className="flex items-center bg-slate-100 p-1 sm:p-1.5 rounded-2xl border border-slate-200 shadow-inner overflow-x-auto max-w-full">
            
            {/* View 1: Donor Portal */}
            <button
              onClick={() => setActiveView('donor')}
              className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeView === 'donor'
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <UtensilsCrossed className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeView === 'donor' ? 'text-emerald-600' : 'text-slate-500'}`} />
              <span>Donor Portal</span>
            </button>

            {/* View 2: Volunteer Dashboard */}
            <button
              onClick={() => setActiveView('volunteer')}
              className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer relative whitespace-nowrap ${
                activeView === 'volunteer'
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <HeartHandshake className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeView === 'volunteer' ? 'text-emerald-600' : 'text-slate-500'}`} />
              <span>Volunteer Dashboard</span>

              {itemCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-emerald-500 text-white min-w-4 h-4 shadow-xs animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* View 3: Hostel Students (NEW) */}
            <button
              onClick={() => setActiveView('student')}
              className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer relative whitespace-nowrap ${
                activeView === 'student'
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Users className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeView === 'student' ? 'text-emerald-600' : 'text-slate-500'}`} />
              <span>Hostel Students</span>
              
              <span className="hidden md:inline-flex items-center text-[10px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-md">
                +50 pts
              </span>
            </button>

          </nav>

          {/* Reset Demo / Quick Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onResetDemo}
              title="Reset sample data"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset Demo</span>
            </button>

            {/* Student Points Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 text-xs font-extrabold rounded-lg border border-amber-200">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>{studentPoints} pts</span>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-banner for demo context */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-t border-emerald-100/70 px-4 py-1.5 text-center text-xs text-emerald-900 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="font-bold">Active View:</span>
        <span className="text-emerald-800 font-semibold">
          {activeView === 'donor' && 'Donor Portal (Frictionless CV Scan & AI Event Prediction)'}
          {activeView === 'volunteer' && 'Volunteer Dashboard (Sticky Hero Gamification & Social Proof Nudges)'}
          {activeView === 'student' && "Hostel Student Portal (Skip Mess Lunch Pre-Commitment & +50 Points Nudge)"}
        </span>
      </div>
    </header>
  );
}
