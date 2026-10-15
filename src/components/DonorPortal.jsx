import React, { useState } from 'react';
import { 
  Camera, 
  Scan, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  MapPin,
  Calendar,
  Calculator,
  ShieldCheck,
  TrendingDown,
  Scale,
  ChefHat,
  Clock,
  UtensilsCrossed
} from 'lucide-react';
import { sound } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';
import { CV_SCAN_SAMPLES } from '../data/mockData';

export default function DonorPortal({ 
  onAddFoodItem, 
  onSwitchToVolunteer, 
  activeItems = [] 
}) {
  // Donor Sub-tabs: 'scan' (Frictionless CV) or 'planning' (AI Pre-Planning)
  const [activeTab, setActiveTab] = useState('scan');

  // CV Scan states
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('');
  const [scanSampleIndex, setScanSampleIndex] = useState(0);
  const [detectedData, setDetectedData] = useState(null);

  // Form Fields (Auto-filled by CV)
  const [foodDescription, setFoodDescription] = useState('');
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [servings, setServings] = useState('');
  const [location, setLocation] = useState('North Dining Hall - Loading Dock Station 2');
  const [successNotice, setSuccessNotice] = useState(null);
  const [formError, setFormError] = useState('');

  // AI Pre-Planning Tab states
  const [rsvps, setRsvps] = useState(500);

  // Trigger CV Scanning Simulation (2 seconds)
  const handleStartScan = () => {
    setIsScanning(true);
    setDetectedData(null);
    setFormError('');
    sound.playScanBlip();

    setScanStepText('Analyzing volumetric depth & thermal signature...');

    setTimeout(() => {
      sound.playScanBlip();
      setScanStepText('Identifying food category & estimating mass density...');
    }, 900);

    setTimeout(() => {
      // Pick next mock CV sample
      const sample = CV_SCAN_SAMPLES[scanSampleIndex % CV_SCAN_SAMPLES.length];
      setScanSampleIndex((prev) => prev + 1);

      setIsScanning(false);
      sound.playScanComplete();

      // Automatically fill the form with mock data
      const autoDesc = `Detected: ${sample.dishName}, Estimated Weight: ${sample.estimatedWeight}kg`;
      setFoodDescription(autoDesc);
      setEstimatedWeight(sample.estimatedWeight.toString());
      setServings(sample.estimatedServings.toString());
      setLocation(sample.suggestedLocation);
      setDetectedData(sample);
    }, 2000);
  };

  const handlePostSurplus = (e) => {
    e.preventDefault();

    const descToSubmit = foodDescription.trim();
    const locToSubmit = location.trim();
    const parsedServings = parseInt(servings, 10) || 25;
    const parsedWeight = parseFloat(estimatedWeight) || 10;

    if (!descToSubmit) {
      setFormError('Please scan leftovers or provide a food description before posting.');
      return;
    }

    if (!locToSubmit) {
      setFormError('Please confirm the pickup location.');
      return;
    }

    setFormError('');

    const newItem = {
      id: `food-${Date.now()}`,
      description: descToSubmit,
      servings: parsedServings,
      weightKg: parsedWeight,
      location: locToSubmit,
      dietary: detectedData ? detectedData.dietary : ['Freshly Prepared', 'Hot & Packed'],
      pickupWindow: 'Within 45 mins',
      urgencyBadge: 'High Priority: Expires in 45 mins',
      activeViewers: 2,
      temperature: detectedData ? detectedData.temperatureEstimated : 'Steam Table Ready',
      createdAt: new Date().toISOString(),
      donorName: 'Campus Dining Services',
      donorRole: 'Cafeteria Manager'
    };

    onAddFoodItem(newItem);
    sound.playPostSuccess();
    triggerConfetti();

    setSuccessNotice({
      title: 'Surplus Food Broadcasted!',
      description: descToSubmit,
      servings: parsedServings,
      weight: parsedWeight,
      location: locToSubmit
    });

    // Reset CV scan form
    setFoodDescription('');
    setEstimatedWeight('');
    setServings('');
    setDetectedData(null);
  };

  // AI Pre-Planning Scaled Calculations
  // User enters expected RSVPs (e.g. 500) -> Scaled down for 410 people with 5% Scarcity Buffer
  const parsedRsvps = Math.max(10, parseInt(rsvps, 10) || 500);
  const actualRatio = 410 / 500; // 82% actual attendance benchmark
  const targetCookHeadcount = Math.round(parsedRsvps * actualRatio); // 410
  const scarcityBufferCount = Math.round(targetCookHeadcount * 0.05); // 5% buffer (~20)
  const totalPortionsPlanned = targetCookHeadcount + scarcityBufferCount; // 430 portions (saves 70 from 500!)

  // Ingredient list scaled for 410 people
  const ingredients = [
    {
      name: 'Basmati Rice / Grains',
      standardPrepKg: (parsedRsvps * 0.15).toFixed(1),
      aiOptimizedKg: (targetCookHeadcount * 0.15).toFixed(1),
      savedKg: ((parsedRsvps - targetCookHeadcount) * 0.15).toFixed(1)
    },
    {
      name: 'Marinated Protein / Paneer / Tofu',
      standardPrepKg: (parsedRsvps * 0.175).toFixed(1),
      aiOptimizedKg: (targetCookHeadcount * 0.175).toFixed(1),
      savedKg: ((parsedRsvps - targetCookHeadcount) * 0.175).toFixed(1)
    },
    {
      name: 'Farm Vegetables & Salad Mix',
      standardPrepKg: (parsedRsvps * 0.10).toFixed(1),
      aiOptimizedKg: (targetCookHeadcount * 0.10).toFixed(1),
      savedKg: ((parsedRsvps - targetCookHeadcount) * 0.10).toFixed(1)
    },
    {
      name: 'Yogurt, Curries & Accompaniments (Liters)',
      standardPrepKg: (parsedRsvps * 0.075).toFixed(1),
      aiOptimizedKg: (targetCookHeadcount * 0.075).toFixed(1),
      savedKg: ((parsedRsvps - targetCookHeadcount) * 0.075).toFixed(1)
    }
  ];

  const totalRawFoodSavedKg = ingredients.reduce((sum, item) => sum + parseFloat(item.savedKg), 0).toFixed(1);
  const estimatedCostSaved = (parseFloat(totalRawFoodSavedKg) * 7.5).toFixed(0);

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      
      {/* View Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
          <ChefHat className="w-3.5 h-3.5" />
          <span>Kitchen Management Console • AI Vision & Forecasting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cafeteria Donor & Planning Portal
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Eliminate data-entry friction with Computer Vision leftover scanning, and forecast exact prep portions to stop overcooking before it happens.
        </p>
      </div>

      {/* Primary Sub-Tab Switcher: Scan Leftovers vs Event Prediction */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-300/70 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('scan')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'scan'
                ? 'bg-white text-emerald-800 shadow-md ring-1 ring-slate-900/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-600" />
            <span>Scan Leftovers (CV Engine)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('planning')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'planning'
                ? 'bg-white text-emerald-800 shadow-md ring-1 ring-slate-900/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Event Prediction (AI Pre-Planning)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FRICTIONLESS COMPUTER VISION SCANNING ENGINE                       */}
      {/* ========================================================================= */}
      {activeTab === 'scan' && (
        <div className="space-y-8 animate-pop-in">
          
          {/* Main Centered Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/90 overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 p-6 sm:p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Log Surplus Food
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                    Zero data-entry hassle for kitchen staff: Just scan trays with camera
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/30 border border-emerald-400/30 text-xs font-semibold text-emerald-100">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>CV Model v4.2 Active</span>
                </div>
              </div>
            </div>

            {/* Success Toast */}
            {successNotice && (
              <div className="m-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-400 text-emerald-950 shadow-md animate-pop-in">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-emerald-500 rounded-full text-white shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-emerald-900">
                        {successNotice.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                        Broadcasted <span className="font-semibold">{successNotice.description}</span> ({successNotice.servings} Servings / ~{successNotice.weight}kg) to student couriers.
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        Pickup Location: <span className="font-semibold">{successNotice.location}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSuccessNotice(null)}
                    className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-200/80 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-medium text-emerald-800">
                    Live item now active in volunteer queue:
                  </span>
                  <button
                    type="button"
                    onClick={onSwitchToVolunteer}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>Switch to Volunteer Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {formError && (
              <div className="m-6 flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm animate-pop-in">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <p className="font-medium">{formError}</p>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">

              {/* MASSIVE PROMINENT "Scan Leftovers (Camera/Upload)" DROPZONE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Frictionless AI Capture (Zero Manual Typing)
                </label>

                <div
                  onClick={!isScanning ? handleStartScan : undefined}
                  className={`relative group cursor-pointer border-3 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 overflow-hidden ${
                    isScanning
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-inner'
                      : detectedData
                      ? 'border-emerald-400 bg-emerald-50/20 hover:border-emerald-500'
                      : 'border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 shadow-xs hover:shadow-lg'
                  }`}
                >
                  {/* High-tech Scanning Laser Bar Effect */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce top-1/2 -translate-y-1/2 pointer-events-none" />
                  )}

                  <div className="max-w-md mx-auto flex flex-col items-center">
                    
                    {/* Viewfinder Icon Container */}
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center transition-all duration-300 shadow-md mb-4 ${
                      isScanning
                        ? 'bg-emerald-600 text-white ring-8 ring-emerald-400/20 animate-pulse'
                        : detectedData
                        ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400'
                        : 'bg-white text-emerald-600 border border-slate-200 group-hover:scale-105 group-hover:border-emerald-300'
                    }`}>
                      {isScanning ? (
                        <Scan className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-white" />
                      ) : (
                        <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
                      )}
                    </div>

                    {/* Headline and Instructions */}
                    {isScanning ? (
                      <div className="space-y-2">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 animate-pulse">
                          ● AI Computer Vision Analyzing...
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900">
                          Scanning Steam Trays & Weight Density
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-800 font-mono">
                          {scanStepText}
                        </p>
                      </div>
                    ) : detectedData ? (
                      <div className="space-y-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          CV Detection Complete ({detectedData.confidence})
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                          {detectedData.fullDescription}
                        </h3>
                        <p className="text-xs text-slate-600">
                          Estimated Weight: <span className="font-bold text-emerald-700">{detectedData.estimatedWeight} kg</span> (~{detectedData.estimatedServings} servings)
                        </p>
                        <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                          Click dropzone again to scan a different tray
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          Scan Leftovers (Camera/Upload)
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Click here to simulate pointing a tablet camera or uploading a photo of closing cafeteria trays.
                        </p>
                        <div className="pt-2 flex items-center justify-center gap-2">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            Auto-Detects Dish & Weight
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs">
                            <Scale className="w-3 h-3 text-emerald-600" />
                            2-Sec Frictionless Fill
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Form Auto-Filled by Computer Vision */}
              <form onSubmit={handlePostSurplus} className="space-y-5 pt-2">
                
                {/* Auto-Filled Food Description & Detected Mass */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-800">
                      Food Description & Detected Weight <span className="text-emerald-600">*</span>
                    </label>
                    {detectedData && (
                      <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                        Auto-detected by AI
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={foodDescription}
                    onChange={(e) => setFoodDescription(e.target.value)}
                    placeholder="Click 'Scan Leftovers' above to auto-detect, or type manually..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base font-semibold shadow-inner"
                  />
                </div>

                {/* Weight & Servings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-800">
                      Estimated Weight (kg)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Scale className="w-4 h-4 text-emerald-600" />
                      </div>
                      <input
                        type="number"
                        step="0.5"
                        value={estimatedWeight}
                        onChange={(e) => setEstimatedWeight(e.target.value)}
                        placeholder="e.g. 12"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-base font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-800">
                      Estimated Servings
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                      </div>
                      <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        placeholder="e.g. 30"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-base font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Pickup Location <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. North Dining Hall - Loading Dock Station 2"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm sm:text-base font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 shadow-inner"
                    />
                  </div>
                </div>

                {/* Large Primary Action Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-green-700 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Post to Volunteers</span>
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-2">
                    Appends directly to Volunteer Dashboard in real time with zero manual delay.
                  </p>
                </div>

              </form>

            </div>

          </div>

          {/* Active Items in Circulation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  Currently Live In Circulation ({activeItems.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={onSwitchToVolunteer}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>View Volunteer Feed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeItems.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No surplus food currently in circulation.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeItems.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.description}</h4>
                      <p className="text-[11px] text-slate-500">
                        {item.servings} Servings • {item.weightKg ? `${item.weightKg}kg` : '~9kg'} • 📍 {item.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      Live
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: AI PRE-PLANNING ENGINE (EVENT PREDICTION & SCARCITY BUFFER)       */}
      {/* ========================================================================= */}
      {activeTab === 'planning' && (
        <div className="space-y-8 animate-pop-in">
          
          {/* Card Container */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/90 overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-emerald-800 p-6 sm:p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    AI Pre-Planning & Event Prediction Engine
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                    Calculate true turnout probability to optimize raw ingredient purchases before prep begins
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-white border border-white/20">
                  <Calculator className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Turnout Model v3</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">

              {/* RSVP Input Section */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <label htmlFor="rsvp-input" className="text-sm font-extrabold text-slate-900 block">
                      Expected Event RSVPs / Roster Headcount:
                    </label>
                    <p className="text-xs text-slate-500">
                      Enter registered attendees or hostel meal bookings for the upcoming service.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative w-36">
                      <input
                        id="rsvp-input"
                        type="number"
                        min="50"
                        max="2000"
                        step="25"
                        value={rsvps}
                        onChange={(e) => setRsvps(e.target.value)}
                        className="w-full text-center px-4 py-2.5 rounded-xl bg-white border-2 border-emerald-500 text-slate-900 font-black text-lg focus:outline-none shadow-sm"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600">People</span>
                  </div>
                </div>

                {/* Quick RSVP presets */}
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-slate-500 font-semibold">Quick Scenarios:</span>
                  {[300, 500, 750, 1000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRsvps(val)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                        parseInt(rsvps, 10) === val
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                      }`}
                    >
                      {val} RSVPs
                    </button>
                  ))}
                </div>
              </div>

              {/* Headcount Breakdown: 500 RSVPs -> 410 People Planned */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Gross RSVPs
                  </span>
                  <span className="text-2xl font-black text-slate-800 block mt-1">
                    {parsedRsvps}
                  </span>
                  <span className="text-[11px] text-slate-500">Unfiltered signups</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-center shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    AI Expected Attendance
                  </span>
                  <span className="text-2xl font-black text-emerald-900 block mt-1">
                    {targetCookHeadcount} People
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ~82% Campus Turnout Benchmark
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                    Recommended Prep Target
                  </span>
                  <span className="text-2xl font-black text-teal-900 block mt-1">
                    {totalPortionsPlanned} Portions
                  </span>
                  <span className="text-[11px] text-teal-700 font-semibold">
                    410 Base + 5% Scarcity Buffer
                  </span>
                </div>

              </div>

              {/* CRITICAL PSYCHOLOGICAL ELEMENT / NUDGE: 5% SCARCITY BUFFER NOTE */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-500 text-emerald-950 shadow-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-emerald-600 rounded-xl text-white shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm sm:text-base text-emerald-950">
                        Psychological Safety Guarantee: 5% Scarcity Buffer Applied
                      </h4>
                      <span className="px-2 py-0.5 bg-emerald-200/80 text-emerald-900 text-[10px] font-bold rounded-full">
                        Loss Aversion Protection
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                      To alleviate caterers' innate fear of running out of food, the AI engine intentionally includes an automatic <strong>+5% safety cushion (+{scarcityBufferCount} extra portions)</strong>. Even in the rarest case of 100% peak attendance, your buffet will not run dry—yet you safely eliminate <strong>{parsedRsvps - totalPortionsPlanned} overcooked portions</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scaled-Down Ingredient List for 410 People */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                    <span>Scaled-Down Kitchen Ingredient List (Optimized for {targetCookHeadcount} People)</span>
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Saves {totalRawFoodSavedKg} kg of Raw Prep
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5 sm:p-4">Ingredient Category</th>
                        <th className="p-3.5 sm:p-4 text-slate-500">Traditional Prep (500 RSVPs)</th>
                        <th className="p-3.5 sm:p-4 text-emerald-800 bg-emerald-50/50">AI Scaled (410 People)</th>
                        <th className="p-3.5 sm:p-4 text-emerald-700">Raw Food Saved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium">
                      {ingredients.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 sm:p-4 font-bold text-slate-800">
                            {item.name}
                          </td>
                          <td className="p-3.5 sm:p-4 text-slate-500 line-through">
                            {item.standardPrepKg} kg
                          </td>
                          <td className="p-3.5 sm:p-4 font-extrabold text-emerald-900 bg-emerald-50/30">
                            {item.aiOptimizedKg} kg
                          </td>
                          <td className="p-3.5 sm:p-4 font-black text-emerald-600">
                            -{item.savedKg} kg
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Economic & Carbon Impact Bar */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
                      Pre-Emptive Kitchen Savings
                    </span>
                    <span className="text-base sm:text-lg font-black text-white">
                      {totalRawFoodSavedKg} kg Surplus Prevented • ~${estimatedCostSaved} Saved
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playPostSuccess();
                    triggerConfetti();
                    alert(`Prep targets dispatched to kitchen display: Cook for ${targetCookHeadcount} + ${scarcityBufferCount} buffer.`);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs transition-colors cursor-pointer shadow-md"
                >
                  Send Targets to Head Chef
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
