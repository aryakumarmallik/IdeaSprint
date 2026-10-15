# Important Links
- **Slide link:** https://drive.google.com/file/d/1kS82Wsi6LosW5WegC4fJAHdt3XbyVYv2/view?usp=sharing
- **Video link:** https://drive.google.com/file/d/1Zw2NGUVxB71LUYkl9uiJhKpoFaV_f7W2/view?usp=sharing

# 🌱 ZeroFoodWaste

> **Hyperlocal Campus Food Rescue, AI Forecasting & Student Pre-Commitment Platform**

A modern Single Page Application (SPA) designed to solve collegiate cafeteria food waste at both ends of the supply chain: demand-side forecasting & pre-commitment and supply-side Computer Vision redistribution.

---

## 🚀 Key Features

### 1. 🍽️ Cafeteria Donor Portal (CV & Planning Engine)
- **Computer Vision Leftovers Scanner:** 1-click camera dropzone simulating real-time visual tray scanning (dish classification, thermal check, volume and weight estimation in kilograms).
- **AI Pre-Planning & Event Prediction:** Headcount attendance forecaster that scales bulk cooking down from gross signups (e.g., 500 RSVPs → 410 attendees).
- **5% Scarcity Buffer Guarantee:** A psychological safety cushion (+20 portions) mitigating caterers' fear of running dry while preventing bulk overcooking.

### 2. 🚴 Volunteer Dispatch Dashboard (Gamification & Social Proof)
- **Gamified Profile Header:** *"Level 3 Campus Hero | 42kg Rescued This Month"* with XP level progression and 7-day streak tracker.
- **Urgency & Social Proof Nudges:** Real-time indicator badges (*"High Priority: Expires in 45 mins"* and *"🔥 2 other volunteers are viewing this route"*).
- **Rewarding Claim Micro-Interaction:** Haptic checkmark animation, triumphant audio chime, and eco-confetti before route assignment.
- **Hyperlocal Route Guidance:** Campus waypoint modal with courier ID verification.

### 3. 🎓 Hostel Student Pre-Commitment View
- **Demand Reduction Toggle:** *"Skip Today's Mess Lunch"* to inform the kitchen before cooking begins.
- **Pre-Commitment Incentive Nudge:** Earn +50 Campus Reward Points for canceling 12 hours ahead.
- **Live Collective Impact Tracker:** Tracks student opt-outs and total kilograms saved from morning cooking pots.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Tailwind CSS v4, Lucide Icons
- **State Management:** Reactive local state with cross-view bridging & localStorage sync
- **Audio Synthesizer:** Web Audio API sound synthesis (zero external audio dependencies)
- **Visual Micro-Interactions:** Canvas Confetti & CSS3 animations
- **Build Tool:** Vite 8

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deployment Options

### GitHub Pages (Automated via GitHub Actions)
1. Push to your repository's `main` branch.
2. In your GitHub repository, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) will build and publish automatically.

### Vercel / Netlify
- Import the GitHub repository into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
- The included `vercel.json` and `netlify.toml` automatically configure the build and SPA client-side routing.
