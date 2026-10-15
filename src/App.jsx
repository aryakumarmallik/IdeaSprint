import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DonorPortal from './components/DonorPortal';
import VolunteerDashboard from './components/VolunteerDashboard';
import StudentPreCommitment from './components/StudentPreCommitment';
import { INITIAL_FOOD_ITEMS } from './data/mockData';
import { 
  Sprout, 
  UtensilsCrossed, 
  HeartHandshake, 
  Users, 
  RotateCcw,
  Sparkles,
  Award,
  Coins,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // Shared local state bridging all 3 views
  const [foodItems, setFoodItems] = useState(() => {
    try {
      const saved = localStorage.getItem('zfw_food_items_v2');
      return saved ? JSON.parse(saved) : INITIAL_FOOD_ITEMS;
    } catch {
      return INITIAL_FOOD_ITEMS;
    }
  });

  const [claimedItems, setClaimedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('zfw_claimed_items_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active view: 'donor', 'volunteer', or 'student'
  const [activeView, setActiveView] = useState('donor');

  // Gamified Hero Volunteer Profile state
  const [heroProfile, setHeroProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('zfw_hero_profile');
      return saved ? JSON.parse(saved) : {
        level: 3,
        title: 'Level 3 Campus Hero',
        rescuedKg: 42,
        xp: 180,
        nextLevelXp: 250,
        streak: 7
      };
    } catch {
      return {
        level: 3,
        title: 'Level 3 Campus Hero',
        rescuedKg: 42,
        xp: 180,
        nextLevelXp: 250,
        streak: 7
      };
    }
  });

  // Student Pre-Commitment state
  const [studentPoints, setStudentPoints] = useState(() => {
    try {
      const saved = localStorage.getItem('zfw_student_points');
      return saved ? parseInt(saved, 10) : 350;
    } catch {
      return 350;
    }
  });

  const [totalStudentsSkippedToday, setTotalStudentsSkippedToday] = useState(() => {
    try {
      const saved = localStorage.getItem('zfw_skipped_count');
      return saved ? parseInt(saved, 10) : 142;
    } catch {
      return 142;
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zfw_food_items_v2', JSON.stringify(foodItems));
    } catch {}
  }, [foodItems]);

  useEffect(() => {
    try {
      localStorage.setItem('zfw_claimed_items_v2', JSON.stringify(claimedItems));
    } catch {}
  }, [claimedItems]);

  useEffect(() => {
    try {
      localStorage.setItem('zfw_hero_profile', JSON.stringify(heroProfile));
    } catch {}
  }, [heroProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('zfw_student_points', studentPoints.toString());
    } catch {}
  }, [studentPoints]);

  useEffect(() => {
    try {
      localStorage.setItem('zfw_skipped_count', totalStudentsSkippedToday.toString());
    } catch {}
  }, [totalStudentsSkippedToday]);

  // Handler to append food item to global state (from Donor Portal)
  const handleAddFoodItem = (newItem) => {
    setFoodItems((prev) => [newItem, ...prev]);
  };

  // Handler to claim food item and instantly remove from dashboard
  const handleClaimItem = (itemId) => {
    const itemToClaim = foodItems.find((item) => item.id === itemId);
    if (itemToClaim) {
      setClaimedItems((prev) => [
        {
          ...itemToClaim,
          claimedAt: new Date().toISOString()
        },
        ...prev
      ]);
      setFoodItems((prev) => prev.filter((item) => item.id !== itemId));

      // Level up volunteer gamification stats!
      const addedWeight = itemToClaim.weightKg || 8.5;
      setHeroProfile((prev) => {
        const nextXp = prev.xp + 50;
        const willLevelUp = nextXp >= prev.nextLevelXp;
        return {
          ...prev,
          rescuedKg: parseFloat((prev.rescuedKg + addedWeight).toFixed(1)),
          xp: willLevelUp ? nextXp - prev.nextLevelXp : nextXp,
          level: willLevelUp ? prev.level + 1 : prev.level,
          title: willLevelUp ? `Level ${prev.level + 1} Eco Champion` : prev.title
        };
      });
    }
  };

  // Handler to update student points
  const handleUpdatePoints = (delta) => {
    setStudentPoints((prev) => Math.max(0, prev + delta));
  };

  // Handler to update skipped student counter
  const handleToggleSkip = (delta) => {
    setTotalStudentsSkippedToday((prev) => Math.max(0, prev + delta));
  };

  // Handler to reset demo to initial state
  const handleResetDemo = () => {
    setFoodItems(INITIAL_FOOD_ITEMS);
    setClaimedItems([]);
    setStudentPoints(350);
    setTotalStudentsSkippedToday(142);
    setHeroProfile({
      level: 3,
      title: 'Level 3 Campus Hero',
      rescuedKg: 42,
      xp: 180,
      nextLevelXp: 250,
      streak: 7
    });
    try {
      localStorage.removeItem('zfw_food_items_v2');
      localStorage.removeItem('zfw_claimed_items_v2');
      localStorage.removeItem('zfw_hero_profile');
      localStorage.removeItem('zfw_student_points');
      localStorage.removeItem('zfw_skipped_count');
    } catch {}
  };

  const totalAvailableServings = foodItems.reduce((acc, curr) => acc + (Number(curr.servings) || 0), 0);
  const totalRescuedServings = claimedItems.reduce((acc, curr) => acc + (Number(curr.servings) || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pb-20 sm:pb-0">
      
      {/* Sticky Top Navigation Bar with 3 View Toggles */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        itemCount={foodItems.length}
        claimedCount={claimedItems.length}
        studentPoints={studentPoints}
        onResetDemo={handleResetDemo}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {activeView === 'donor' && (
          <DonorPortal
            onAddFoodItem={handleAddFoodItem}
            onSwitchToVolunteer={() => setActiveView('volunteer')}
            activeItems={foodItems}
          />
        )}

        {activeView === 'volunteer' && (
          <VolunteerDashboard
            foodItems={foodItems}
            onClaimItem={handleClaimItem}
            onSwitchToDonor={() => setActiveView('donor')}
            onResetDemo={handleResetDemo}
            claimedItems={claimedItems}
            heroProfile={heroProfile}
          />
        )}

        {activeView === 'student' && (
          <StudentPreCommitment
            studentPoints={studentPoints}
            onUpdatePoints={handleUpdatePoints}
            totalSkippedCount={totalStudentsSkippedToday}
            onToggleSkip={handleToggleSkip}
          />
        )}
      </main>

      {/* Mobile-Friendly Bottom Sticky View Switcher (Thumb Navigation) */}
      <nav aria-label="Mobile Navigation" className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 p-1.5 flex items-center justify-around gap-1 ring-1 ring-slate-900/5">
        <button
          onClick={() => setActiveView('donor')}
          className={`flex-1 py-2 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition-all cursor-pointer ${
            activeView === 'donor'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Donor CV</span>
        </button>

        <button
          onClick={() => setActiveView('volunteer')}
          className={`flex-1 py-2 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition-all relative cursor-pointer ${
            activeView === 'volunteer'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Volunteer ({foodItems.length})</span>
        </button>

        <button
          onClick={() => setActiveView('student')}
          className={`flex-1 py-2 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition-all relative cursor-pointer ${
            activeView === 'student'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Pre-Commit</span>
        </button>
      </nav>

      {/* Eco-Friendly Platform Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-slate-900">
                ZeroFoodWaste Campus Initiative 2.0
              </p>
              <p className="text-xs text-slate-500">
                Computer Vision • AI Forecast Pre-Planning • Student Pre-Commitment
              </p>
            </div>
          </div>

          {/* Dynamic Impact Counters */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-600">
            <div className="text-center md:text-right">
              <span className="block font-black text-emerald-600 text-base">
                {heroProfile.rescuedKg} kg
              </span>
              <span className="text-[11px] text-slate-500">Total Food Rescued</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center md:text-right">
              <span className="block font-black text-teal-600 text-base">
                {totalStudentsSkippedToday}
              </span>
              <span className="text-[11px] text-slate-500">Mess Pre-Commitments</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center md:text-right">
              <span className="block font-black text-slate-800 text-base">
                {studentPoints} pts
              </span>
              <span className="text-[11px] text-slate-500">Campus EcoPoints</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDemo}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
