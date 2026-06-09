import React, { useState, useEffect } from 'react';

// Pixel Art Email/Envelope Icon (32x32)
export const PixelEnvelope = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Envelope Body border & fill */}
    <rect x="6" y="8" width="20" height="16" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
    {/* Letter flaps */}
    <rect x="8" y="10" width="2" height="2" fill="currentColor" />
    <rect x="22" y="10" width="2" height="2" fill="currentColor" />
    
    <rect x="10" y="12" width="2" height="2" fill="currentColor" />
    <rect x="20" y="12" width="2" height="2" fill="currentColor" />
    
    <rect x="12" y="14" width="2" height="2" fill="currentColor" />
    <rect x="18" y="14" width="2" height="2" fill="currentColor" />
    
    <rect x="14" y="16" width="4" height="2" fill="currentColor" />
  </svg>
);

// Pixel Art Lock Icon
export const PixelLock = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="10" y="14" width="12" height="10" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
    <path d="M 12 14 L 12 10 C 12 8, 20 8, 20 10 L 20 14" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="15" y="18" width="2" height="3" fill="currentColor" />
  </svg>
);

// Pixel Art User Icon
export const PixelUser = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="#ffffff" />
    <path d="M 8 24 C 8 20, 24 20, 24 24" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

interface AuthViewProps {
  onSuccess: () => void;
}

type SubScreen = 'connect' | 'login' | 'signup';

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
  const [screen, setScreen] = useState<SubScreen>('connect');
  const [bgIndex, setBgIndex] = useState(0);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userAge, setUserAge] = useState('');

  useEffect(() => {
    setBgIndex(Math.random() > 0.5 ? 1 : 0);
  }, [screen]);

  const handleAuthOption = () => {
    onSuccess();
  };

  const handleBackToConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    setScreen('connect');
  };

  return (
    <div className="slide slide-cream slide-active" style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'default' }}>
      {/* Background illustration area */}
      <div 
        style={{ 
          width: '100%', 
          height: '180px', 
          backgroundImage: `url(${bgIndex === 0 ? '/bg_auth_1.jpg' : '/bg_auth_2.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '4px solid #1e293b',
          position: 'relative'
        }}
      >
        {/* Decorative Pixel overlay */}
        <div style={{ position: 'absolute', bottom: '8px', left: '16px', background: 'rgba(250, 247, 240, 0.95)', border: '2px solid #1e293b', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 'bold', color: '#1e293b' }}>
          {screen === 'connect' && '🏔️ LEVEL 1: QUIT BASE'}
          {screen === 'login' && '🔑 SIGN IN TO RECLAIM'}
          {screen === 'signup' && '🌱 CREATE A FRESH PATH'}
        </div>

        {/* Back arrow inside the image for sub-screens */}
        {screen !== 'connect' && (
          <button
            onClick={handleBackToConnect}
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              padding: '6px',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #1e293b',
              backgroundColor: '#ffffff',
              color: '#1e293b',
              boxShadow: '2px 2px 0px #1e293b',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <rect x="12" y="14" width="12" height="4" fill="currentColor" />
              <rect x="10" y="12" width="2" height="8" fill="currentColor" />
              <rect x="8" y="14" width="2" height="4" fill="currentColor" />
              <rect x="6" y="16" width="2" height="2" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>

      {/* Main interactive area */}
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {screen === 'connect' && (
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', textAlign: 'center' }}>
              Choose the way to connect us
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#555555', textAlign: 'center', marginBottom: '28px' }}>
              Sync your progress across devices and start your quit journey with the community.
            </p>

            {/* Social Auth Providers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Google */}
              <button 
                onClick={handleAuthOption}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '2px solid #1e293b',
                  backgroundColor: '#ffffff',
                  color: '#1e293b',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  boxShadow: '4px 4px 0px #1e293b',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease',
                }}
                className="auth-btn-google"
              >
                <img src="/btn_google.jpg" alt="Google Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                <span>Connect with Google</span>
              </button>

              {/* Apple */}
              <button 
                onClick={handleAuthOption}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '2px solid #1e293b',
                  backgroundColor: '#ffffff',
                  color: '#1e293b',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  boxShadow: '4px 4px 0px #1e293b',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease',
                }}
                className="auth-btn-apple"
              >
                <img src="/btn_apple.jpg" alt="Apple Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                <span>Connect with Apple</span>
              </button>
            </div>

            {/* Separator line */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '28px 0 20px 0', gap: '12px' }}>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#1e293b', opacity: 0.15 }} />
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b', opacity: 0.5 }}>OR USE EMAIL</span>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#1e293b', opacity: 0.15 }} />
            </div>

            {/* Email Option */}
            <button 
              onClick={() => setScreen('login')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '14px 20px',
                borderRadius: '12px',
                border: '2px solid #1e293b',
                backgroundColor: '#FAF7F0',
                color: '#1e293b',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.1s ease',
              }}
              className="auth-btn-email"
            >
              <PixelEnvelope size={20} />
              <span>Continue with Email</span>
            </button>

            {/* Don't have an account? Sign Up text */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#555555' }}>
                Don't have an account? <span onClick={() => setScreen('signup')} style={{ color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</span>
              </span>
            </div>
          </div>
        )}

        {screen === 'login' && (
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', textAlign: 'center' }}>
              Welcome Back
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#555555', textAlign: 'center', marginBottom: '24px' }}>
              Enter your credentials to restore your progress.
            </p>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleAuthOption(); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#1e293b' }}>
                    <PixelEnvelope size={18} />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 42px',
                      borderRadius: '10px',
                      border: '2px solid #1e293b',
                      fontSize: '15px',
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#1e293b' }}>
                    <PixelLock size={18} />
                  </span>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 42px',
                      borderRadius: '10px',
                      border: '2px solid #1e293b',
                      fontSize: '15px',
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  marginTop: '12px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '2px solid #1e293b',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  boxShadow: '4px 4px 0px #ef4444',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Sign In
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#555555' }}>
                Don't have an account? <span onClick={() => setScreen('signup')} style={{ color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</span>
              </span>
            </div>
          </div>
        )}

        {screen === 'signup' && (
          <div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', textAlign: 'center' }}>
              Create Account
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#555555', textAlign: 'center', marginBottom: '24px' }}>
              Get started on your new smoke-free life.
            </p>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleAuthOption(); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#1e293b' }}>
                    <PixelUser size={18} />
                  </span>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 42px',
                      borderRadius: '10px',
                      border: '2px solid #1e293b',
                      fontSize: '15px',
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#1e293b' }}>
                    <PixelEnvelope size={18} />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 42px',
                      borderRadius: '10px',
                      border: '2px solid #1e293b',
                      fontSize: '15px',
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>
              </div>

              {/* Age field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Age</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#1e293b' }}>
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                      <rect x="8" y="10" width="16" height="16" rx="2" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
                      <rect x="12" y="6" width="2" height="4" fill="currentColor" />
                      <rect x="18" y="6" width="2" height="4" fill="currentColor" />
                      <rect x="12" y="14" width="8" height="2" fill="currentColor" />
                    </svg>
                  </span>
                  <input 
                    type="number" 
                    min="12"
                    max="120"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                    placeholder="25"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 42px',
                      borderRadius: '10px',
                      border: '2px solid #1e293b',
                      fontSize: '15px',
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#1e293b' }}>
                    <PixelLock size={18} />
                  </span>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create security key"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 42px',
                      borderRadius: '10px',
                      border: '2px solid #1e293b',
                      fontSize: '15px',
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  marginTop: '12px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '2px solid #1e293b',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  boxShadow: '4px 4px 0px #ef4444',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Sign Up
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#555555' }}>
                Already have an account? <span onClick={() => setScreen('login')} style={{ color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>Sign In</span>
              </span>
            </div>
          </div>
        )}

        {/* Footer info */}
        <p style={{ fontSize: '11px', color: '#888888', textAlign: 'center', lineHeight: 1.4, marginTop: '16px' }}>
          By continuing, you agree to our terms of service and privacy policy. No spam, we promise.
        </p>
      </div>
    </div>
  );
};
