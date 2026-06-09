import { useState } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// Custom Pixel Icons for Auth
const PixelLock = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Lock body */}
    <rect x="8" y="14" width="16" height="12" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
    <rect x="10" y="16" width="12" height="8" fill="#ff7a57" />
    {/* Keyhole */}
    <rect x="15" y="19" width="2" height="3" fill="#1e293b" />
    <rect x="14" y="22" width="4" height="1" fill="#1e293b" />
    {/* Shackle */}
    <path d="M 11 14 L 11 10 C 11 7, 21 7, 21 10 L 21 14" stroke="#1e293b" strokeWidth="2.5" fill="none" />
  </svg>
);

const PixelKey = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Key head */}
    <rect x="6" y="12" width="8" height="8" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
    {/* Key shaft */}
    <rect x="14" y="15" width="12" height="2" fill="#f59e0b" />
    {/* Teeth */}
    <rect x="20" y="17" width="2" height="3" fill="#f59e0b" />
    <rect x="24" y="17" width="2" height="3" fill="#f59e0b" />
  </svg>
);

const PixelMail = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Envelope body */}
    <rect x="6" y="10" width="20" height="12" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
    {/* Flap details */}
    <path d="M 6 10 L 16 16 L 26 10" stroke="#1e293b" strokeWidth="1.5" fill="none" />
  </svg>
);

interface AuthPageProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

export default function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {
      if (navigator.vibrate) {
        navigator.vibrate(style === ImpactStyle.Medium ? 45 : 20);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    triggerHaptic(ImpactStyle.Medium);
    onAuthSuccess();
  };

  return (
    <div className="slide slide-cream slide-active" style={{ cursor: 'default' }}>
      {/* Header questions section style matching onboarding */}
      <div style={{ padding: '0 24px', marginTop: '24px', width: '100%', zIndex: 10 }}>
        <div className="poison-question-1" style={{ fontSize: '24px', fontWeight: 800, color: '#000', textAlign: 'left', lineHeight: 1.3 }}>
          {isLogin ? "Welcome back, quit buddy!" : "Join the squad to quit together!"}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', padding: '0 24px', marginTop: '16px', justifyContent: 'center', zIndex: 10 }}>
        
        {/* Dynamic Image / Pixel Art */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', gap: '16px', width: '100%' }}>
          <div className="poison-question-2" style={{ fontSize: '20px', fontWeight: 700, color: '#444' }}>
            {isLogin ? "Sign in to resume" : "Create your account"}
          </div>
          
          <div className="poison-image-container pop-item visible" style={{ transform: 'rotate(5deg)' }}>
            <PixelLock size={90} />
          </div>
        </div>

        {/* Input Forms resembling the Onboarding setup fields */}
        <form onSubmit={handleSubmit} className="setup-form" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
              <PixelMail size={24} /> Email Address
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="input-control"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #1e293b',
                boxShadow: '3px 3px 0px #1e293b',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit',
                fontSize: '15px'
              }}
              required
            />
          </div>

          <div className="input-group" style={{ marginTop: '4px' }}>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
              <PixelKey size={24} /> Password
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-control"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #1e293b',
                boxShadow: '3px 3px 0px #1e293b',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit',
                fontSize: '15px'
              }}
              required
            />
          </div>

          {/* Form Action Button */}
          <button 
            type="submit" 
            style={{
              marginTop: '12px',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #1e293b',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              boxShadow: '3px 3px 0px #1e293b',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {isLogin ? "Let's Go! 🚀" : "Register & Start ✊"}
          </button>
        </form>

        {/* Toggle between Log In / Sign Up */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => {
              triggerHaptic(ImpactStyle.Light);
              setIsLogin(!isLogin);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#ef4444',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>

      </div>

      {/* Aligned bottom footer details */}
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <button 
          onClick={() => {
            triggerHaptic(ImpactStyle.Light);
            onBack();
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
