import React from 'react';
import { 
  Navigation, 
  MapPin, 
  Users, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

export default function ClaimRouteModal({ claimedItem, onClose }) {
  if (!claimedItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-white/80 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 p-6 text-white text-center relative overflow-hidden">
          <div className="inline-flex p-3 bg-white/15 rounded-2xl backdrop-blur-md mb-2 shadow-inner ring-1 ring-white/20">
            <Navigation className="w-7 h-7 text-white animate-bounce" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Hyperlocal Route Dispatched!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Match locked! Card removed from public dashboard.
          </p>
        </div>

        {/* Route Details Content */}
        <div className="p-6 space-y-5">
          
          {/* Mission Summary Card */}
          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Rescue Mission Summary
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              {claimedItem.description}
            </h3>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500">Servings Rescued</div>
                  <div className="font-bold text-slate-800">{claimedItem.servings} Servings</div>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500">Est. Arrival</div>
                  <div className="font-bold text-slate-800">5-8 Mins (Walking)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hyperlocal Step-by-Step Directions */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Redistribution Waypoints
            </span>
            
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Pickup from Donor</span>
                  <span className="text-slate-600">{claimedItem.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Redistribute Hyperlocally</span>
                  <span className="text-slate-600">Deliver to Campus Pantry Hub & Student Commuter Lounge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Volunteer Verification Badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/90 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-600 font-medium">Redistribution Auth ID:</span>
            </div>
            <span className="font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
              #{claimedItem.id.toUpperCase().slice(-7)}
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Confirm & Return to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
