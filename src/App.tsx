import { useState, useEffect, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { 
  Wind, 
  Heart, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Share2
} from 'lucide-react';

// Pixel Art Icons
const PixelCigarette = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Smoke pixels */}
    <rect className="smoke-p1" x="22" y="8" width="2" height="2" fill="#9ca3af" opacity="0.6" />
    <rect className="smoke-p2" x="24" y="5" width="2" height="2" fill="#d1d5db" opacity="0.4" />
    <rect className="smoke-p3" x="21" y="2" width="2" height="2" fill="#e5e7eb" opacity="0.2" />
    
    {/* Cigarette Body */}
    <rect x="4" y="16" width="6" height="4" fill="#d97706" />
    <rect x="4" y="16" width="6" height="1" fill="#f59e0b" />
    <rect x="10" y="16" width="10" height="4" fill="#ffffff" />
    <rect x="10" y="16" width="10" height="1" fill="#e5e7eb" />
    <rect x="9" y="16" width="1" height="4" fill="#1e293b" />
    <rect x="20" y="16" width="2" height="4" fill="#4b5563" />
    <rect x="21" y="17" width="1" height="2" fill="#ef4444" />
    <rect x="22" y="17" width="1" height="2" fill="#f59e0b" />
  </svg>
);

const PixelVape = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Vapor clouds */}
    <rect className="smoke-p2" x="14" y="6" width="3" height="3" fill="#d1d5db" opacity="0.5" />
    <rect className="smoke-p1" x="12" y="3" width="4" height="4" fill="#e5e7eb" opacity="0.3" />
    
    {/* Mouthpiece */}
    <rect x="13" y="11" width="6" height="3" fill="#1e293b" />
    <rect x="14" y="11" width="4" height="1" fill="#475569" />
    
    {/* Vape body */}
    <rect x="11" y="14" width="10" height="14" fill="#8b5cf6" />
    <rect x="11" y="14" width="10" height="1" fill="#a78bfa" />
    <rect x="11" y="15" width="2" height="13" fill="#a78bfa" />
    <rect x="14" y="18" width="4" height="4" fill="#14b8a6" />
    <rect className="vape-light" x="15" y="25" width="2" height="1" fill="#14b8a6" />
  </svg>
);

const PixelCigar = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Smoke */}
    <rect className="smoke-p3" x="22" y="8" width="2" height="2" fill="#9ca3af" opacity="0.6" />
    <rect className="smoke-p1" x="24" y="5" width="2" height="2" fill="#d1d5db" opacity="0.4" />
    <rect className="smoke-p2" x="21" y="2" width="2" height="2" fill="#e5e7eb" opacity="0.2" />

    {/* Cigar Body */}
    <rect x="4" y="15" width="16" height="5" fill="#78350f" />
    <rect x="4" y="15" width="16" height="1" fill="#92400e" />
    
    {/* Gold Band */}
    <rect x="8" y="15" width="3" height="5" fill="#f59e0b" />
    <rect x="9" y="15" width="1" height="5" fill="#fef08a" />
    
    {/* Ash Tip */}
    <rect x="20" y="15" width="3" height="5" fill="#4b5563" />
    {/* Ember */}
    <rect x="20" y="16" width="1" height="3" fill="#ef4444" />
    <rect x="21" y="17" width="1" height="1" fill="#f59e0b" />
  </svg>
);

const PixelHookah = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Vapor/Bubbles */}
    <rect className="smoke-p1" x="15" y="2" width="2" height="2" fill="#9ca3af" opacity="0.6" />
    <rect className="smoke-p2" x="17" y="4" width="2" height="2" fill="#d1d5db" opacity="0.4" />
    
    {/* Bowl */}
    <rect x="13" y="8" width="6" height="2" fill="#78350f" />
    <rect x="14" y="10" width="4" height="2" fill="#ef4444" /> {/* Burning coal/flavor */}
    
    {/* Stem */}
    <rect x="15" y="10" width="2" height="12" fill="#94a3b8" />
    <rect x="14" y="14" width="4" height="1" fill="#cbd5e1" />
    
    {/* Base (Glass Bottle) */}
    <rect x="12" y="22" width="8" height="8" rx="2" fill="#0284c7" opacity="0.8" />
    <rect x="13" y="23" width="6" height="6" fill="#38bdf8" opacity="0.5" />
    <rect x="14" y="25" width="4" height="2" fill="#ffffff" opacity="0.4" /> {/* Water line/reflection */}
    
    {/* Hose/Pipe */}
    <path d="M 18 20 C 24 20, 26 24, 26 26 M 26 26 L 28 28" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <rect x="27" y="27" width="2" height="2" fill="#b45309" /> {/* Mouthpiece */}
  </svg>
);

const PixelPipe = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Smoke */}
    <rect className="smoke-p1" x="8" y="6" width="2" height="2" fill="#9ca3af" opacity="0.6" />
    <rect className="smoke-p2" x="10" y="3" width="2" height="2" fill="#d1d5db" opacity="0.4" />
    
    {/* Pipe Bowl */}
    <rect x="6" y="12" width="8" height="8" fill="#78350f" rx="1" />
    <rect x="5" y="11" width="10" height="2" fill="#92400e" />
    <rect x="7" y="13" width="6" height="2" fill="#ef4444" /> {/* Ember */}
    
    {/* Stem */}
    <path d="M 13 18 L 22 18 C 24 18, 26 16, 26 14 L 26 12" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Mouthpiece */}
    <rect x="25" y="11" width="2" height="2" fill="#1e293b" />
  </svg>
);


const PixelPack = () => (
  <svg width="80" height="80" viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Sticking out cigarette filters */}
    <rect x="10" y="4" width="2" height="5" fill="#d97706" />
    <rect x="10" y="4" width="2" height="1" fill="#f59e0b" />
    <rect x="13" y="3" width="2" height="6" fill="#d97706" />
    <rect x="13" y="3" width="2" height="1" fill="#f59e0b" />
    <rect x="16" y="5" width="2" height="4" fill="#d97706" />
    <rect x="16" y="5" width="2" height="1" fill="#f59e0b" />
    
    {/* Pack Box */}
    <rect x="8" y="9" width="16" height="20" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
    
    {/* Red Top Lid (Marlboro Style) */}
    <path d="M 8 9 L 24 9 L 24 15 L 19 15 L 16 18 L 13 15 L 8 15 Z" fill="#dc2626" />
    
    {/* Gold crest detail */}
    <rect x="15" y="19" width="2" height="2" fill="#d97706" />
    
    {/* "QUIT" Text in Pixel Style */}
    <path d="M 10 23 L 12 23 L 12 26 L 10 26 Z" fill="#1e293b" />
    <rect x="11" y="24" width="1" height="1" fill="#ffffff" />
    <rect x="12" y="26" width="1" height="1" fill="#1e293b" />
    
    <path d="M 14 23 L 14 26 L 16 26 L 16 23" stroke="#1e293b" strokeWidth="1" fill="none" />
    
    <path d="M 18 23 L 18 26" stroke="#1e293b" strokeWidth="1" />
    
    <path d="M 20 23 L 22 23 M 21 23 L 21 26" stroke="#1e293b" strokeWidth="1" />
  </svg>
);

const PixelMatch = () => (
  <svg width="80" height="80" viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Animated Flame */}
    {/* Outer Red Flame */}
    <path className="flame-outer" d="M13 2h6v2h2v4h-2v3h-6V8H11V4h2V2z" fill="#ef4444" />
    {/* Middle Orange Flame */}
    <path className="flame-mid" d="M14 4h4v2h2v3h-2v2h-4v-2h-2V6h2V4z" fill="#f97316" />
    {/* Inner Yellow Core */}
    <path className="flame-inner" d="M15 6h2v2h1v2h-4V8h1V6z" fill="#facc15" />
    
    {/* Match Head */}
    <rect x="14" y="11" width="4" height="3" fill="#450a0a" />
    <rect x="15" y="11" width="2" height="1" fill="#7f1d1d" />
    
    {/* Wooden Stick */}
    <rect x="15" y="14" width="2" height="16" fill="#d97706" />
    <rect x="15" y="14" width="1" height="16" fill="#b45309" />
  </svg>
);

const PixelPills = () => (
  <svg width="80" height="80" viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Silver Blister Pack Base */}
    <rect x="6" y="4" width="20" height="24" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
    {/* Blister pack texture / highlight */}
    <rect x="7" y="5" width="18" height="1" fill="#f1f5f9" />
    <rect x="7" y="6" width="1" height="20" fill="#f1f5f9" />
    {/* Texture dots */}
    <circle cx="8" cy="11" r="0.5" fill="#94a3b8" />
    <circle cx="16" cy="11" r="0.5" fill="#94a3b8" />
    <circle cx="24" cy="11" r="0.5" fill="#94a3b8" />
    <circle cx="8" cy="18" r="0.5" fill="#94a3b8" />
    <circle cx="16" cy="18" r="0.5" fill="#94a3b8" />
    <circle cx="24" cy="18" r="0.5" fill="#94a3b8" />
    
    {/* Pockets & Capsules Grid */}
    {/* Row 1, Col 1 */}
    <rect x="9" y="7" width="6" height="3" rx="1" fill="#475569" />
    <rect x="9" y="7" width="3" height="3" fill="#1e293b" />
    <rect x="12" y="7" width="3" height="3" fill="#ef4444" />
    <rect x="12" y="7" width="1" height="1" fill="#fca5a5" />

    {/* Row 1, Col 2 */}
    <rect x="17" y="7" width="6" height="3" rx="1" fill="#475569" />
    <rect x="17" y="7" width="3" height="3" fill="#ef4444" />
    <rect x="20" y="7" width="3" height="3" fill="#1e293b" />
    <rect x="17" y="7" width="1" height="1" fill="#fca5a5" />

    {/* Row 2, Col 1 */}
    <rect x="9" y="14" width="6" height="3" rx="1" fill="#475569" />
    <rect x="9" y="14" width="3" height="3" fill="#1e293b" />
    <rect x="12" y="14" width="3" height="3" fill="#ef4444" />
    <rect x="12" y="14" width="1" height="1" fill="#fca5a5" />

    {/* Row 2, Col 2 */}
    <rect x="17" y="14" width="6" height="3" rx="1" fill="#475569" />
    <rect x="17" y="14" width="3" height="3" fill="#ef4444" />
    <rect x="20" y="14" width="3" height="3" fill="#1e293b" />
    <rect x="17" y="14" width="1" height="1" fill="#fca5a5" />

    {/* Row 3, Col 1 */}
    <rect x="9" y="21" width="6" height="3" rx="1" fill="#475569" />
    <rect x="9" y="21" width="3" height="3" fill="#ef4444" />
    <rect x="12" y="21" width="3" height="3" fill="#1e293b" />
    <rect x="9" y="21" width="1" height="1" fill="#fca5a5" />

    {/* Row 3, Col 2 */}
    <rect x="17" y="21" width="6" height="3" rx="1" fill="#475569" />
    <rect x="17" y="21" width="3" height="3" fill="#1e293b" />
    <rect x="20" y="21" width="3" height="3" fill="#ef4444" />
    <rect x="20" y="21" width="1" height="1" fill="#fca5a5" />
  </svg>
);

const PixelFirstAid = () => (
  <svg width="80" height="80" viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    {/* Isometric First Aid Box */}
    {/* Top Face */}
    <path d="M16 4 L26 9 L16 14 L6 9 Z" fill="#94a3b8" />
    <path d="M16 5 L24 9 L16 13 L8 9 Z" fill="#cbd5e1" />
    
    {/* Right Face */}
    <path d="M16 14 L26 9 L26 23 L16 28 Z" fill="#475569" />
    <path d="M17 14 L25 10 L25 22 L17 26 Z" fill="#334155" />

    {/* Left/Front Face */}
    <path d="M6 9 L16 14 L16 28 L6 23 Z" fill="#f8fafc" />
    
    {/* Red Cross on Front Face */}
    {/* Vertical bar */}
    <path d="M10 14.5 L12 15.5 L12 22.5 L10 21.5 Z" fill="#ef4444" />
    {/* Horizontal bar */}
    <path d="M8 14.5 L14 17.5 L14 19.5 L8 16.5 Z" fill="#ef4444" />
  </svg>
);

const PixelArrow = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    {/* Pixelated Orangish-Red Arrow Pointing Right */}
    <rect x="4" y="11" width="10" height="2" fill="#f95c3b" />
    <rect x="14" y="8" width="2" height="8" fill="#f95c3b" />
    <rect x="16" y="9" width="2" height="6" fill="#f95c3b" />
    <rect x="18" y="10" width="2" height="4" fill="#f95c3b" />
    <rect x="20" y="11" width="2" height="2" fill="#f95c3b" />
  </svg>
);

function App() {
  const [step, setStep] = useState(0);
  const [selectedPoison, setSelectedPoison] = useState<'cigarette' | 'cigar' | 'vape' | 'hookah' | 'pipe'>('cigarette');

  // Staggered element revealing state for onboarding quote slides
  const [revealedElements, setRevealedElements] = useState(0);

  // Trigger haptic feedback on slide changes, matching text animations
  useEffect(() => {
    const timers: any[] = [];

    const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Light) => {
      try {
        await Haptics.impact({ style });
      } catch (e) {
        if (navigator.vibrate) {
          navigator.vibrate(style === ImpactStyle.Medium ? 40 : 25);
        }
      }
    };

    const triggerHeartbeat = async () => {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
        const t = setTimeout(() => {
          Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
        }, 130);
        timers.push(t);
      } catch (e) {
        if (navigator.vibrate) {
          navigator.vibrate([30, 80, 30]);
        }
      }
    };

    if (step === 0) {
      setRevealedElements(0);

      // Define sequential intervals (in ms) for 7 reveal steps
      const staggerTimes = [400, 700, 1000, 1300, 1600, 1900, 2200];

      staggerTimes.forEach((delay, index) => {
        const t = setTimeout(() => {
          setRevealedElements(index + 1);
          if (index === 0) {
            triggerHeartbeat();
          } else if (index === 6) {
            triggerHaptic(ImpactStyle.Medium);
          } else {
            triggerHaptic(ImpactStyle.Light);
          }
        }, delay);
        timers.push(t);
      });
    } else if (step === 1) {
      setRevealedElements(0);

      // Define sequential intervals (in ms) for 4 reveal steps
      const staggerTimes = [400, 700, 1000, 1300];

      staggerTimes.forEach((delay, index) => {
        const t = setTimeout(() => {
          setRevealedElements(index + 1);
          if (index === 0) {
            triggerHeartbeat();
          } else if (index === 3) {
            triggerHaptic(ImpactStyle.Medium);
          } else {
            triggerHaptic(ImpactStyle.Light);
          }
        }, delay);
        timers.push(t);
      });
    } else {
      // Immediate haptic trigger for other steps
      triggerHaptic(ImpactStyle.Medium);
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [step]);

  const getPoisonConfig = () => {
    switch (selectedPoison) {
      case 'cigar':
        return {
          labelDaily: 'Cigars smoked per day',
          labelCost: 'Cost per cigar',
          unitSingular: 'cigar',
          unitPlural: 'cigars',
          minDaily: 1,
          maxDaily: 10,
          divisor: 1,
          avoidedLabel: 'Cigars Avoided'
        };
      case 'vape':
        return {
          labelDaily: 'Vape refills/pods per week',
          labelCost: 'Cost per pod',
          unitSingular: 'pod',
          unitPlural: 'pods',
          minDaily: 1,
          maxDaily: 10,
          divisor: 1,
          avoidedLabel: 'Refills Avoided'
        };
      case 'hookah':
        return {
          labelDaily: 'Hookah sessions per week',
          labelCost: 'Cost per session',
          unitSingular: 'session',
          unitPlural: 'sessions',
          minDaily: 1,
          maxDaily: 10,
          divisor: 1,
          avoidedLabel: 'Sessions Avoided'
        };
      case 'pipe':
        return {
          labelDaily: 'Pipe bowls smoked per day',
          labelCost: 'Cost per tobacco pouch',
          unitSingular: 'bowl',
          unitPlural: 'bowls',
          minDaily: 1,
          maxDaily: 15,
          divisor: 30, // pouch pouch has ~30 bowls on average
          avoidedLabel: 'Bowls Avoided'
        };
      case 'cigarette':
      default:
        return {
          labelDaily: 'Cigarettes smoked per day',
          labelCost: 'Cost per pack (20 cigs)',
          unitSingular: 'cig',
          unitPlural: 'cigarettes',
          minDaily: 1,
          maxDaily: 40,
          divisor: 20,
          avoidedLabel: 'Cigs Avoided'
        };
    }
  };

  const poisonConfig = getPoisonConfig();

  // Update defaults when selected poison changes
  useEffect(() => {
    switch (selectedPoison) {
      case 'cigar':
        setCigarettesPerDay(1);
        setCostPerPack(15);
        break;
      case 'vape':
        setCigarettesPerDay(2); // 2 pods per week
        setCostPerPack(10);
        break;
      case 'hookah':
        setCigarettesPerDay(2); // 2 sessions per week
        setCostPerPack(8);
        break;
      case 'pipe':
        setCigarettesPerDay(3); // 3 bowls per day
        setCostPerPack(18); // per tobacco pouch
        break;
      case 'cigarette':
      default:
        setCigarettesPerDay(15);
        setCostPerPack(12);
        break;
    }
  }, [selectedPoison]);

  // User Profile inputs
  const [cigarettesPerDay, setCigarettesPerDay] = useState(15);
  const [costPerPack, setCostPerPack] = useState(12);
  const [quitDate, setQuitDate] = useState(() => {
    const today = new Date();
    // Default to yesterday so they immediately see some "smoke-free" time elapsed
    today.setDate(today.getDate() - 1);
    return today.toISOString().split('T')[0];
  });
  const [quitTime, setQuitTime] = useState('08:00');

  // Breathing Coach State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const breathTimerRef = useRef<any>(null);

  // Live Stats
  const [timeDiff, setTimeDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
  const [stats, setStats] = useState({ saved: 0, avoided: 0 });

  // Handle Breathing exercise cycle
  useEffect(() => {
    if (!isBreathing) {
      setBreathPhase('idle');
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
      return;
    }

    setBreathPhase('inhale');
    setBreathSeconds(4);

    breathTimerRef.current = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Phase transitions
          setBreathPhase((currentPhase) => {
            if (currentPhase === 'inhale') {
              setBreathSeconds(4);
              return 'hold';
            } else if (currentPhase === 'hold') {
              setBreathSeconds(4);
              return 'exhale';
            } else {
              setBreathSeconds(4);
              return 'inhale';
            }
          });
          return 4;
        }
      });
    }, 1000);

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isBreathing]);

  // Live Stats calculations (run every second on the dashboard)
  useEffect(() => {
    if (step !== 5) return;

    const calculateStats = () => {
      const quitDateTime = new Date(`${quitDate}T${quitTime}`);
      const now = new Date();
      const diffMs = now.getTime() - quitDateTime.getTime();
      const isPast = diffMs >= 0;
      const absDiff = Math.abs(diffMs);

      const seconds = Math.floor((absDiff / 1000) % 60);
      const minutes = Math.floor((absDiff / (1000 * 60)) % 60);
      const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));

      setTimeDiff({ days, hours, minutes, seconds, isPast });

      if (isPast) {
        const totalDays = absDiff / (1000 * 60 * 60 * 24);
        const config = getPoisonConfig();
        const unitsAvoided = totalDays * (selectedPoison === 'vape' || selectedPoison === 'hookah' ? cigarettesPerDay / 7 : cigarettesPerDay);
        const moneySaved = (unitsAvoided / config.divisor) * costPerPack;

        setStats({
          saved: parseFloat(moneySaved.toFixed(2)),
          avoided: Math.floor(unitsAvoided)
        });
      } else {
        setStats({ saved: 0, avoided: 0 });
      }
    };

    calculateStats();
    const timer = setInterval(calculateStats, 1000);
    return () => clearInterval(timer);
  }, [step, quitDate, quitTime, cigarettesPerDay, costPerPack, selectedPoison]);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className={`app-shell ${Capacitor.isNativePlatform() ? 'is-native' : 'web-preview'} ${step <= 1 ? 'theme-cream' : 'theme-dark'}`}>
      {/* Background blobs for premium glow styling */}
      {step > 1 && (
        <div className="bg-glow-container">
          <div className="bg-glow-blob blob-teal"></div>
          <div className="bg-glow-blob blob-purple"></div>
        </div>
      )}

      <div className="app-content">
        {/* Navigation Header */}
        {step > 1 && (
          <header className="app-header">
            <div className="app-logo" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img src="/logo.jpg" alt="SuuQuit Logo" style={{ width: '24px', height: '24px', borderRadius: '6px' }} />
              Suu<span>Quit</span>
            </div>
            {step > 2 && step < 5 && (
              <button className="btn-secondary" style={{ padding: '6px 12px', borderRadius: '10px', fontSize: '12px', width: 'auto' }} onClick={handleBack}>
                Back
              </button>
            )}
          </header>
        )}

        {/* Slides Wrapper */}
        <div className="slides-wrapper">
          
          {/* SLIDE 0: Cream Quote Screen 1 */}
          <div className={`slide slide-cream ${step === 0 ? 'slide-active' : 'slide-prev'}`}>
            {/* Scattered Pixel Elements */}
            <div style={{ position: 'absolute', top: '6%', left: '8%', transform: 'rotate(-15deg)', pointerEvents: 'none' }}>
              <div className={`pop-item ${revealedElements >= 2 ? 'visible' : ''}`}>
                <PixelMatch />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '10%', right: '12%', transform: 'rotate(25deg)', pointerEvents: 'none' }}>
              <div className={`pop-item ${revealedElements >= 3 ? 'visible' : ''}`}>
                <PixelCigarette />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '26%', right: '28%', transform: 'rotate(20deg)', pointerEvents: 'none' }}>
              <div className={`pop-item ${revealedElements >= 4 ? 'visible' : ''}`}>
                <PixelPack />
              </div>
            </div>
            <div style={{ position: 'absolute', top: '48%', right: '12%', transform: 'rotate(-10deg)', pointerEvents: 'none' }}>
              <div className={`pop-item ${revealedElements >= 5 ? 'visible' : ''}`}>
                <PixelVape />
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '22%', left: '16%', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              <div className={`pop-item ${revealedElements >= 6 ? 'visible' : ''}`}>
                <PixelFirstAid />
              </div>
            </div>
            {/* Pill Pack Button & Pointing Arrow (Slide 0) */}
            <div style={{ position: 'absolute', bottom: '80px', right: '32px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20 }}>
              <div className={`pop-item ${revealedElements >= 7 ? 'visible' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="arrow-bounce" style={{ pointerEvents: 'none' }}>
                  <PixelArrow />
                </div>
                <div 
                  className="pixel-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep(1);
                  }}
                  style={{ transform: 'rotate(15deg)' }}
                >
                  <div className="pixel-btn-hover-wrap">
                    <PixelPills />
                  </div>
                </div>
              </div>
            </div>

            {/* Center Quote Area */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', zIndex: 10 }}>
              <div className={`splash-quote ${revealedElements >= 1 ? 'visible' : ''}`}>
                "The <span style={{ position: 'relative', display: 'inline-block' }}>
                  smoke
                  <div 
                    className={`pop-item ${revealedElements >= 1 ? 'visible' : ''}`}
                    style={{ position: 'absolute', top: '-60px', left: '-10px', transform: 'rotate(-12deg)', pointerEvents: 'none' }}
                  >
                    <PixelCigar />
                  </div>
                </span> clears.<br />So will you <span style={{ color: '#f95c3b' }}>- zw</span>"
              </div>
            </div>
            <div className={`click-helper ${revealedElements >= 7 ? 'visible' : ''}`} style={{ zIndex: 10 }}>
              Tap the pills to continue
            </div>
          </div>

          {/* SLIDE 1: Cream Poison Selection Screen */}
          <div className={`slide slide-cream ${step === 1 ? 'slide-active' : step < 1 ? 'slide-next' : 'slide-prev'}`} style={{ cursor: 'default' }}>
            {/* Header / Question 1 */}
            <div style={{ padding: '0 24px', marginTop: '24px', width: '100%', zIndex: 10 }}>
              <div className={`poison-question-1 slide-up-item ${revealedElements >= 1 ? 'visible' : ''}`}>
                So… you're the brave one who's actually gonna quit smoking?
              </div>
            </div>

            {/* Question 2 & Selection Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', padding: '0 24px', marginTop: '16px', justifyContent: 'center', zIndex: 10 }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', gap: '16px', width: '100%' }}>
                <div className={`poison-question-2 slide-up-item ${revealedElements >= 2 ? 'visible' : ''}`}>
                  What's your poison?
                </div>
                
                {/* Dynamically changing SVG based on selection */}
                <div className={`poison-image-container pop-item ${revealedElements >= 2 ? 'visible' : ''}`}>
                  {selectedPoison === 'cigarette' && <PixelCigarette size={100} />}
                  {selectedPoison === 'cigar' && <PixelCigar size={100} />}
                  {selectedPoison === 'vape' && <PixelVape size={100} />}
                  {selectedPoison === 'hookah' && <PixelHookah size={100} />}
                  {selectedPoison === 'pipe' && <PixelPipe size={100} />}
                </div>
              </div>

              {/* List of Options */}
              <div className={`poison-options-list slide-up-item ${revealedElements >= 3 ? 'visible' : ''}`}>
                {[
                  { id: 'cigarette', label: 'Cigarettes', icon: <PixelCigarette size={40} /> },
                  { id: 'cigar', label: 'Cigars', icon: <PixelCigar size={40} /> },
                  { id: 'vape', label: 'Vapes / E-Cigs', icon: <PixelVape size={40} /> },
                  { id: 'hookah', label: 'Hookah / Shisha', icon: <PixelHookah size={40} /> },
                  { id: 'pipe', label: 'Pipe Tobacco', icon: <PixelPipe size={40} /> }
                ].map((option) => (
                  <div 
                    key={option.id}
                    className={`poison-option-item ${selectedPoison === option.id ? 'active' : ''}`}
                    onClick={async () => {
                      setSelectedPoison(option.id as any);
                      try {
                        await Haptics.impact({ style: ImpactStyle.Light });
                      } catch (e) {
                        if (navigator.vibrate) navigator.vibrate(20);
                      }
                    }}
                    style={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{option.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                      {option.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pill Pack Button & Pointing Arrow (Slide 1) */}
            <div style={{ position: 'absolute', bottom: '80px', right: '32px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20 }}>
              <div className={`pop-item ${revealedElements >= 4 ? 'visible' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="arrow-bounce" style={{ pointerEvents: 'none' }}>
                  <PixelArrow />
                </div>
                <div 
                  className="pixel-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStep(2);
                  }}
                  style={{ transform: 'rotate(-15deg)' }}
                >
                  <div className="pixel-btn-hover-wrap">
                    <PixelPills />
                  </div>
                </div>
              </div>
            </div>

            <div className={`click-helper ${revealedElements >= 4 ? 'visible' : ''}`} style={{ zIndex: 10 }}>
              Tap the pills to continue
            </div>
          </div>

          {/* SLIDE 2: Welcome Screen */}
          <div className={`slide ${step === 2 ? 'slide-active' : step < 2 ? 'slide-next' : 'slide-prev'}`}>
            <div className="slide-header">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <img src="/logo.jpg" alt="SuuQuit Logo" style={{ width: '80px', height: '80px', borderRadius: '18px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)' }} />
              </div>
              <h1 className="slide-title">
                Breathe <span className="slide-title-gradient">Free</span>,<br />Live Fully
              </h1>
              <p className="slide-subtitle">
                The group challenge to quit smoking together. Strengthen your lungs, save cash, and build healthier habits.
              </p>
            </div>

            {/* Interactive Breathing coach */}
            <div className="glass-card glass-card-highlighted" style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="breathing-container">
                <div className="breathing-circle-outer" style={{ 
                  animationDuration: isBreathing ? '4s' : '0s',
                  transform: breathPhase === 'inhale' ? 'scale(1.3)' : breathPhase === 'exhale' ? 'scale(1)' : 'scale(1)'
                }}>
                  <div className="breathing-circle-inner" 
                    onClick={() => setIsBreathing(!isBreathing)}
                    style={{
                      transform: breathPhase === 'inhale' ? 'scale(1.2)' : breathPhase === 'exhale' ? 'scale(0.9)' : 'scale(1)',
                      transition: isBreathing ? 'transform 4s ease-in-out' : 'transform 0.3s ease'
                    }}
                  >
                    <span className="breathing-text">
                      {isBreathing ? breathPhase.toUpperCase() : 'Breathe'}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', minHeight: '36px' }}>
                {isBreathing 
                  ? `Focus on your breathing. ${breathSeconds}s remaining...`
                  : "Feeling a craving? Tap the circle above to take a guided 4-7-8 deep breathing session."
                }
              </p>
            </div>

            <div className="bottom-nav">
              <div className="bullets-container">
                <div className="bullet active"></div>
                <div className="bullet"></div>
                <div className="bullet"></div>
              </div>
              <button className="btn-primary" onClick={handleNext}>
                Get Started <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* SLIDE 3: Benefits Overview */}
          <div className={`slide ${step === 3 ? 'slide-active' : step < 3 ? 'slide-next' : 'slide-prev'}`}>
            <div className="slide-header">
              <h1 className="slide-title">What You <span className="slide-title-gradient">Gain</span></h1>
              <p className="slide-subtitle">Quitting smoking triggers immediate, positive changes in your body and wallet.</p>
            </div>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon-wrapper icon-teal">
                  <Wind size={22} />
                </div>
                <div>
                  <h3 className="benefit-title">Regain Your Breath</h3>
                  <p className="benefit-desc">Within 24 hours, carbon monoxide levels in your blood drop to normal, letting you breathe easier.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-wrapper icon-coral">
                  <DollarSign size={22} />
                </div>
                <div>
                  <h3 className="benefit-title">Keep Your Money</h3>
                  <p className="benefit-desc">An average smoker saves over $350 a month. Imagine what you and your friends can buy instead.</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-wrapper icon-purple">
                  <Heart size={22} />
                </div>
                <div>
                  <h3 className="benefit-title">Protect Your Heart</h3>
                  <p className="benefit-desc">Your heart rate and blood pressure drop. In 1 year, your heart disease risk is cut in half.</p>
                </div>
              </div>
            </div>

            <div className="bottom-nav">
              <div className="bullets-container">
                <div className="bullet"></div>
                <div className="bullet active"></div>
                <div className="bullet"></div>
              </div>
              <button className="btn-primary" onClick={handleNext}>
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* SLIDE 4: Onboarding Setup */}
          <div className={`slide ${step === 4 ? 'slide-active' : step < 4 ? 'slide-next' : 'slide-prev'}`}>
            <div className="slide-header">
              <h1 className="slide-title">Setup <span className="slide-title-gradient">Goal</span></h1>
              <p className="slide-subtitle">Enter your smoking habits so we can calculate your savings and health improvements.</p>
            </div>

            <div className="glass-card" style={{ padding: '18px' }}>
              <div className="setup-form">
                <div className="input-group">
                  <label className="input-label">{poisonConfig.labelDaily}</label>
                  <input 
                    type="range" 
                    min={poisonConfig.minDaily} 
                    max={poisonConfig.maxDaily} 
                    value={cigarettesPerDay} 
                    onChange={(e) => setCigarettesPerDay(parseInt(e.target.value))}
                    className="range-slider"
                  />
                  <div className="slider-val">
                    <span>{poisonConfig.minDaily} {poisonConfig.unitSingular}</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                      {cigarettesPerDay} {cigarettesPerDay === 1 ? poisonConfig.unitSingular : poisonConfig.unitPlural}
                    </span>
                    <span>{poisonConfig.maxDaily} {poisonConfig.unitPlural}</span>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">{poisonConfig.labelCost}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }}>$</span>
                    <input 
                      type="number" 
                      min="1" 
                      max="1000" 
                      value={costPerPack} 
                      onChange={(e) => setCostPerPack(parseFloat(e.target.value) || 0)}
                      className="input-control"
                      style={{ paddingLeft: '32px', width: '100%' }}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Quit Date & Time</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '10px' }}>
                    <input 
                      type="date" 
                      value={quitDate} 
                      onChange={(e) => setQuitDate(e.target.value)}
                      className="input-control" 
                    />
                    <input 
                      type="time" 
                      value={quitTime} 
                      onChange={(e) => setQuitTime(e.target.value)}
                      className="input-control" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-nav">
              <div className="bullets-container">
                <div className="bullet"></div>
                <div className="bullet"></div>
                <div className="bullet active"></div>
              </div>
              <button className="btn-primary" onClick={handleNext}>
                Create Dashboard <Sparkles size={18} />
              </button>
            </div>
          </div>

          {/* SLIDE 5: Dashboard Mockup */}
          <div className={`slide ${step === 5 ? 'slide-active' : 'slide-next'}`}>
            <div className="slide-header">
              <p style={{ color: 'var(--accent-primary)', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>Your Live Dashboard</p>
              <h1 className="slide-title" style={{ fontSize: '28px', marginBottom: '4px' }}>Clean Progress</h1>
            </div>

            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Smoke-Free Timer */}
              <div className="dashboard-card-wide">
                <p className="timer-label">{timeDiff.isPast ? "TIME SMOKE-FREE" : "COUNTDOWN TO QUIT TIME"}</p>
                <div className="timer-value">
                  {timeDiff.days}d {timeDiff.hours}h {timeDiff.minutes}m {timeDiff.seconds}s
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {timeDiff.isPast ? "You are doing amazing! Keep it up." : "Get ready. Clean air awaits."}
                </p>
              </div>

              {/* Grid Stats */}
              <div className="dashboard-grid">
                <div className="stat-card">
                  <div className="stat-icon icon-coral">
                    <DollarSign size={18} />
                  </div>
                  <div className="stat-num">${stats.saved}</div>
                  <div className="stat-label">Money Saved</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon icon-teal">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="stat-num">{stats.avoided}</div>
                  <div className="stat-label">{poisonConfig.avoidedLabel}</div>
                </div>
              </div>

              {/* Health Recovery Widget */}
              <div className="glass-card" style={{ padding: '16px', margin: 0 }}>
                <h4 style={{ fontSize: '14px', fontFamily: 'var(--font-display)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Heart size={14} className="icon-teal" /> Body Recovery
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                      <span>Oxygen Level Normalized (12h)</span>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>100%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                      <div style={{ width: '100%', height: '100%', background: 'var(--accent-primary)', borderRadius: '2px' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                      <span>Carbon Monoxide Cleared (24h)</span>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                        {timeDiff.isPast ? (timeDiff.days >= 1 ? '100%' : '85%') : '0%'}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                      <div style={{ 
                        width: timeDiff.isPast ? (timeDiff.days >= 1 ? '100%' : '85%') : '0%', 
                        height: '100%', 
                        background: 'var(--accent-primary)', 
                        borderRadius: '2px',
                        transition: 'width 1s ease'
                      }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                      <span>Nicotine Flushed (48h)</span>
                      <span style={{ color: 'var(--accent-secondary)', fontWeight: 'bold' }}>
                        {timeDiff.isPast ? (timeDiff.days >= 2 ? '100%' : timeDiff.days === 1 ? '50%' : '20%') : '0%'}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                      <div style={{ 
                        width: timeDiff.isPast ? (timeDiff.days >= 2 ? '100%' : timeDiff.days === 1 ? '50%' : '20%') : '0%', 
                        height: '100%', 
                        background: 'var(--accent-secondary)', 
                        borderRadius: '2px',
                        transition: 'width 1s ease'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Friends Quitting Together (Social Feature) */}
              <div className="friend-activity">
                <div className="avatar-group">
                  <div className="avatar">A</div>
                  <div className="avatar">J</div>
                  <div className="avatar">S</div>
                  <span style={{ fontSize: '12px', fontWeight: '500', marginLeft: '4px' }}>Friends (3 active)</span>
                </div>
                <div className="friend-text">
                  Alex is 3d free!
                  <span className="friend-pulse"></span>
                </div>
              </div>

            </div>

            <div className="bottom-nav" style={{ padding: '8px 24px 16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button className="btn-secondary" style={{ padding: '12px' }} onClick={() => {
                  alert("Invite link copied to clipboard! Share it with your smoking buddies.");
                }}>
                  <Share2 size={16} /> Share
                </button>
                <button className="btn-primary" style={{ padding: '12px' }} onClick={() => setStep(0)}>
                  Restart Setup
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
