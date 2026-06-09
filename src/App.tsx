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

function App() {
  const [step, setStep] = useState(0);

  // Trigger haptic feedback on slide changes
  useEffect(() => {
    const triggerHaptic = async () => {
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (e) {
        // Fallback to web vibration
        if (navigator.vibrate) {
          navigator.vibrate(40);
        }
      }
    };
    triggerHaptic();
  }, [step]);

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
        const cigsAvoided = totalDays * cigarettesPerDay;
        const packsAvoided = cigsAvoided / 20;
        const moneySaved = packsAvoided * costPerPack;

        setStats({
          saved: parseFloat(moneySaved.toFixed(2)),
          avoided: Math.floor(cigsAvoided)
        });
      } else {
        setStats({ saved: 0, avoided: 0 });
      }
    };

    calculateStats();
    const timer = setInterval(calculateStats, 1000);
    return () => clearInterval(timer);
  }, [step, quitDate, quitTime, cigarettesPerDay, costPerPack]);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className={`app-shell ${Capacitor.isNativePlatform() ? 'is-native' : 'web-preview'}`}>
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
            <div className="app-logo">
              <span>💨</span> Smoke<span>Quit</span>
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
          <div className={`slide slide-cream ${step === 0 ? 'slide-active' : 'slide-prev'}`} onClick={() => setStep(1)}>
            <div className="splash-quote">
              "The smoke clears.<br />So will you - zw"
            </div>
            <div className="click-helper">
              Click anywhere to continue
            </div>
          </div>

          {/* SLIDE 1: Cream Quote Screen 2 */}
          <div className={`slide slide-cream ${step === 1 ? 'slide-active' : step < 1 ? 'slide-next' : 'slide-prev'}`} onClick={() => setStep(2)}>
            <div className="splash-quote">
              "We quit together.<br />For our lungs, our wallets,<br />and our friends. - zw"
            </div>
            <div className="click-helper">
              Click anywhere to continue
            </div>
          </div>

          {/* SLIDE 2: Welcome Screen */}
          <div className={`slide ${step === 2 ? 'slide-active' : step < 2 ? 'slide-next' : 'slide-prev'}`}>
            <div className="slide-header">
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
                  <label className="input-label">Cigarettes smoked per day</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="40" 
                    value={cigarettesPerDay} 
                    onChange={(e) => setCigarettesPerDay(parseInt(e.target.value))}
                    className="range-slider"
                  />
                  <div className="slider-val">
                    <span>1 cig</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{cigarettesPerDay} cigarettes</span>
                    <span>40 cigs</span>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Cost per pack (20 cigs)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }}>$</span>
                    <input 
                      type="number" 
                      min="1" 
                      max="100" 
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
                  <div className="stat-label">Cigs Avoided</div>
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
