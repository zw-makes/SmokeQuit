import React from 'react';

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

interface AuthViewProps {
  onSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
  // Rotate between two backgrounds
  const [bgIndex, setBgIndex] = React.useState(0);

  React.useEffect(() => {
    // Pick background randomly or toggle when visiting/mounting
    setBgIndex(Math.random() > 0.5 ? 1 : 0);
  }, []);

  const handleAuthOption = () => {
    // View-only authentication simulation
    onSuccess();
  };

  return (
    <div className="slide slide-cream slide-active" style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'default' }}>
      {/* Background illustration area */}
      <div 
        style={{ 
          width: '100%', 
          height: '240px', 
          backgroundImage: `url(${bgIndex === 0 ? '/bg_auth_1.jpg' : '/bg_auth_2.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '4px solid #1e293b',
          position: 'relative'
        }}
      >
        {/* Decorative Pixel overlay */}
        <div style={{ position: 'absolute', bottom: '8px', left: '16px', background: 'rgba(250, 247, 240, 0.95)', border: '2px solid #1e293b', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: "'Outfit', sans-serif", fontWeight: 'bold', color: '#1e293b' }}>
          🏔️ LEVEL 1: QUIT BASE
        </div>
      </div>

      {/* Main interactive area */}
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
            onClick={handleAuthOption}
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
              Don't have an account? <span onClick={handleAuthOption} style={{ color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</span>
            </span>
          </div>
        </div>

        {/* Footer info */}
        <p style={{ fontSize: '11px', color: '#888888', textAlign: 'center', lineHeight: 1.4, marginTop: '16px' }}>
          By continuing, you agree to our terms of service and privacy policy. No spam, we promise.
        </p>
      </div>
    </div>
  );
};
