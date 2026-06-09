import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { AuthView } from './AuthView';

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

const PixelFirstAid = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
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

// Age Reaction Pixel Art Icons
const PixelSkateboard = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    <rect className="smoke-p1" x="22" y="6" width="2" height="2" fill="#facc15" opacity="0.8" />
    <rect className="smoke-p2" x="8" y="8" width="2" height="2" fill="#ef4444" opacity="0.6" />
    <rect x="5" y="14" width="2" height="2" fill="#14b8a6" />
    <rect x="7" y="15" width="2" height="2" fill="#0d9488" />
    <rect x="9" y="16" width="14" height="2" fill="#14b8a6" />
    <rect x="9" y="17" width="14" height="1" fill="#0d9488" />
    <rect x="11" y="16" width="10" height="1" fill="#facc15" />
    <rect x="23" y="15" width="2" height="2" fill="#10b981" />
    <rect x="25" y="14" width="2" height="2" fill="#059669" />
    <rect x="9" y="18" width="2" height="1" fill="#4b5563" />
    <rect x="21" y="18" width="2" height="1" fill="#4b5563" />
    <rect x="8" y="19" width="3" height="3" fill="#334155" rx="0.5" />
    <rect x="9" y="20" width="1" height="1" fill="#9ca3af" />
    <rect x="20" y="19" width="3" height="3" fill="#334155" rx="0.5" />
    <rect x="21" y="20" width="1" height="1" fill="#9ca3af" />
  </svg>
);

const PixelCoffeeMug = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    <rect className="smoke-p1" x="12" y="6" width="2" height="3" fill="#9ca3af" opacity="0.6" />
    <rect className="smoke-p2" x="16" y="4" width="2" height="3" fill="#d1d5db" opacity="0.4" />
    <rect className="smoke-p3" x="14" y="2" width="2" height="3" fill="#e5e7eb" opacity="0.2" />
    <rect x="9" y="12" width="12" height="13" fill="#ec4899" rx="1" />
    <rect x="10" y="13" width="2" height="11" fill="#f472b6" />
    <rect x="10" y="13" width="10" height="1" fill="#f472b6" />
    <rect x="21" y="15" width="3" height="2" fill="#ec4899" />
    <rect x="23" y="17" width="2" height="4" fill="#ec4899" />
    <rect x="21" y="21" width="3" height="2" fill="#ec4899" />
  </svg>
);

const PixelHourglass = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    <rect x="8" y="6" width="16" height="2" fill="#b45309" />
    <rect x="8" y="24" width="16" height="2" fill="#b45309" />
    <rect x="8" y="8" width="2" height="16" fill="#78350f" />
    <rect x="22" y="8" width="2" height="16" fill="#78350f" />
    <rect x="11" y="8" width="10" height="1" fill="#e2e8f0" />
    <rect x="12" y="9" width="8" height="2" fill="#cbd5e1" opacity="0.6" />
    <rect x="13" y="11" width="6" height="2" fill="#cbd5e1" opacity="0.6" />
    <rect x="14" y="13" width="4" height="2" fill="#94a3b8" />
    <rect x="14" y="17" width="4" height="2" fill="#94a3b8" />
    <rect x="13" y="19" width="6" height="2" fill="#cbd5e1" opacity="0.6" />
    <rect x="12" y="21" width="8" height="2" fill="#cbd5e1" opacity="0.6" />
    <rect x="11" y="23" width="10" height="1" fill="#e2e8f0" />
    <rect x="13" y="9" width="6" height="2" fill="#f97316" />
    <rect x="14" y="11" width="4" height="1" fill="#f97316" />
    <rect x="15" y="12" width="2" height="1" fill="#facc15" />
    <rect className="smoke-p1" x="15" y="13" width="2" height="6" fill="#facc15" />
    <rect x="15" y="19" width="2" height="1" fill="#f97316" />
    <rect x="14" y="20" width="4" height="2" fill="#f97316" />
    <rect x="12" y="22" width="8" height="1" fill="#f97316" />
    <rect x="12" y="23" width="8" height="1" fill="#facc15" />
  </svg>
);

const PixelMedal = ({ size = 80 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ marginRight: '8px' }}>
    <rect x="11" y="5" width="4" height="7" fill="#3b82f6" />
    <rect x="15" y="5" width="2" height="7" fill="#ffffff" />
    <rect x="17" y="5" width="4" height="7" fill="#ef4444" />
    <rect x="12" y="11" width="3" height="3" fill="#2563eb" />
    <rect x="17" y="11" width="3" height="3" fill="#dc2626" />
    <circle cx="16" cy="20" r="7" fill="#eab308" />
    <circle cx="16" cy="20" r="6" fill="#facc15" />
    <rect x="15" y="17" width="2" height="2" fill="#ffffff" />
    <rect x="14" y="19" width="4" height="2" fill="#ffffff" />
    <rect x="15" y="21" width="2" height="2" fill="#ffffff" />
    <rect x="13" y="20" width="6" height="1" fill="#ffffff" />
    <rect x="13" y="16" width="1" height="1" fill="#ffffff" />
  </svg>
);

// Intensity Pixel Art Icons
const PixelCasual = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Single relaxed cigarette at angle */}
    <rect className="smoke-p1" x="20" y="4" width="2" height="2" fill="#9ca3af" opacity="0.5" />
    {/* Cigarette body */}
    <rect x="6" y="17" width="8" height="3" fill="#d97706" />
    <rect x="14" y="17" width="8" height="3" fill="#f1f5f9" />
    <rect x="13" y="17" width="1" height="3" fill="#1e293b" />
    <rect x="22" y="18" width="2" height="1" fill="#ef4444" />
    {/* Happy face above */}
    <rect x="13" y="8" width="6" height="6" fill="#fde68a" />
    <rect x="14" y="9" width="1" height="1" fill="#1e293b" />
    <rect x="17" y="9" width="1" height="1" fill="#1e293b" />
    <rect x="14" y="12" width="4" height="1" fill="#1e293b" />
  </svg>
);

const PixelLeaf = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Leaf shape - light smoker */}
    <rect x="14" y="6" width="2" height="16" fill="#16a34a" />
    <rect x="10" y="9" width="12" height="2" fill="#22c55e" />
    <rect x="9" y="11" width="14" height="2" fill="#4ade80" />
    <rect x="10" y="13" width="12" height="2" fill="#22c55e" />
    <rect x="11" y="15" width="10" height="2" fill="#16a34a" />
    <rect x="13" y="17" width="6" height="2" fill="#15803d" />
    <rect x="13" y="22" width="2" height="4" fill="#92400e" />
    <rect x="15" y="22" width="2" height="4" fill="#a16207" />
  </svg>
);

const PixelFlame = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Medium flame - regular habit */}
    <rect x="14" y="6" width="4" height="2" fill="#ef4444" />
    <rect x="12" y="8" width="8" height="2" fill="#ef4444" />
    <rect x="10" y="10" width="12" height="2" fill="#f97316" />
    <rect x="10" y="12" width="12" height="2" fill="#f97316" />
    <rect x="10" y="14" width="12" height="2" fill="#fbbf24" />
    <rect x="12" y="16" width="8" height="2" fill="#fbbf24" />
    <rect x="14" y="18" width="4" height="2" fill="#fef08a" />
    <rect x="8" y="22" width="16" height="2" fill="#1e293b" />
    <rect x="14" y="10" width="4" height="4" fill="#fef08a" opacity="0.6" />
  </svg>
);

const PixelPackFull = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Pack of cigarettes - pack a day */}
    {/* Sticking out filters */}
    <rect x="11" y="4" width="2" height="5" fill="#d97706" />
    <rect x="14" y="3" width="2" height="5" fill="#d97706" />
    <rect x="17" y="4" width="2" height="4" fill="#d97706" />
    {/* Pack */}
    <rect x="9" y="9" width="14" height="18" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
    <rect x="9" y="9" width="14" height="6" fill="#dc2626" />
    {/* Gold bar */}
    <rect x="11" y="19" width="10" height="2" fill="#d97706" />
    {/* Smoke wisps */}
    <rect className="smoke-p1" x="20" y="5" width="2" height="2" fill="#9ca3af" opacity="0.6" />
    <rect className="smoke-p2" x="22" y="3" width="2" height="2" fill="#d1d5db" opacity="0.4" />
  </svg>
);

const PixelChain = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Chain links */}
    <rect x="6" y="10" width="6" height="4" rx="1" fill="none" stroke="#64748b" strokeWidth="2" />
    <rect x="8" y="11" width="2" height="2" fill="#94a3b8" />
    <rect x="12" y="11" width="4" height="2" fill="#64748b" />
    <rect x="14" y="10" width="6" height="4" rx="1" fill="none" stroke="#64748b" strokeWidth="2" />
    <rect x="16" y="11" width="2" height="2" fill="#94a3b8" />
    <rect x="20" y="11" width="4" height="2" fill="#64748b" />
    <rect x="22" y="10" width="4" height="4" rx="1" fill="none" stroke="#64748b" strokeWidth="2" />
    {/* Second row */}
    <rect x="8" y="16" width="4" height="2" fill="#64748b" />
    <rect x="10" y="15" width="6" height="4" rx="1" fill="none" stroke="#475569" strokeWidth="2" />
    <rect x="12" y="16" width="2" height="2" fill="#94a3b8" />
    <rect x="16" y="16" width="4" height="2" fill="#64748b" />
    <rect x="18" y="15" width="6" height="4" rx="1" fill="none" stroke="#475569" strokeWidth="2" />
    <rect x="20" y="16" width="2" height="2" fill="#94a3b8" />
    {/* Cigarette clamped in chain */}
    <rect x="4" y="21" width="24" height="3" fill="#f1f5f9" />
    <rect x="4" y="21" width="6" height="3" fill="#d97706" />
    <rect x="3" y="21" width="1" height="3" fill="#1e293b" />
    <rect x="28" y="22" width="2" height="1" fill="#ef4444" />
  </svg>
);

// Readiness Pixel Art Icons
const PixelFist = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Power fist */}
    <rect x="10" y="14" width="14" height="4" fill="#f97316" />
    <rect x="10" y="18" width="14" height="4" fill="#ea580c" />
    <rect x="10" y="22" width="14" height="4" fill="#f97316" />
    <rect x="8" y="18" width="2" height="8" fill="#ea580c" />
    <rect x="24" y="16" width="2" height="6" fill="#c2410c" />
    <rect x="12" y="10" width="10" height="4" fill="#f97316" />
    <rect x="10" y="12" width="2" height="2" fill="#ea580c" />
    {/* Spark lines */}
    <rect x="6" y="10" width="3" height="1" fill="#fbbf24" />
    <rect x="5" y="14" width="3" height="1" fill="#fbbf24" />
    <rect x="25" y="10" width="3" height="1" fill="#fbbf24" />
    <rect x="26" y="14" width="2" height="1" fill="#fbbf24" />
    <rect x="14" y="6" width="1" height="3" fill="#fbbf24" />
    <rect x="18" y="5" width="1" height="3" fill="#fbbf24" />
  </svg>
);

const PixelCalendar = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Calendar */}
    <rect x="6" y="8" width="20" height="18" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
    <rect x="6" y="8" width="20" height="5" fill="#1e293b" />
    <rect x="11" y="5" width="2" height="5" fill="#1e293b" />
    <rect x="19" y="5" width="2" height="5" fill="#1e293b" />
    {/* Day cells */}
    <rect x="8" y="15" width="3" height="3" fill="#e2e8f0" />
    <rect x="12" y="15" width="3" height="3" fill="#e2e8f0" />
    <rect x="16" y="15" width="3" height="3" fill="#e2e8f0" />
    <rect x="20" y="15" width="3" height="3" fill="#e2e8f0" />
    <rect x="8" y="20" width="3" height="3" fill="#e2e8f0" />
    {/* Highlighted quit date cell */}
    <rect x="12" y="20" width="3" height="3" fill="#f95c3b" />
    <rect x="16" y="20" width="3" height="3" fill="#e2e8f0" />
    <rect x="20" y="20" width="3" height="3" fill="#e2e8f0" />
  </svg>
);

const PixelSpyglass = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Magnifying glass */}
    <rect x="10" y="6" width="12" height="2" fill="#64748b" />
    <rect x="8" y="8" width="2" height="8" fill="#64748b" />
    <rect x="22" y="8" width="2" height="8" fill="#64748b" />
    <rect x="10" y="16" width="12" height="2" fill="#64748b" />
    {/* Glass tint */}
    <rect x="10" y="8" width="12" height="8" fill="#bae6fd" opacity="0.5" />
    <rect x="11" y="9" width="3" height="3" fill="#f0f9ff" opacity="0.8" />
    {/* Handle */}
    <rect x="20" y="18" width="2" height="2" fill="#78350f" />
    <rect x="22" y="20" width="2" height="2" fill="#78350f" />
    <rect x="24" y="22" width="2" height="2" fill="#78350f" />
    <rect x="26" y="24" width="2" height="2" fill="#78350f" />
    {/* Question mark inside */}
    <rect x="15" y="10" width="2" height="3" fill="#1e293b" />
    <rect x="15" y="14" width="2" height="2" fill="#1e293b" />
  </svg>
);

const PixelBackArrow = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Arrow shaft */}
    <rect x="12" y="14" width="12" height="4" fill="currentColor" />
    {/* Arrow head */}
    <rect x="10" y="12" width="2" height="8" fill="currentColor" />
    <rect x="8" y="14" width="2" height="4" fill="currentColor" />
    <rect x="6" y="16" width="2" height="2" fill="currentColor" />
  </svg>
);

const PixelSkip = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {/* Double arrowheads pointing right */}
    <rect x="8" y="10" width="2" height="12" fill="currentColor" />
    <rect x="10" y="12" width="2" height="8" fill="currentColor" />
    <rect x="12" y="14" width="2" height="4" fill="currentColor" />
    
    <rect x="16" y="10" width="2" height="12" fill="currentColor" />
    <rect x="18" y="12" width="2" height="8" fill="currentColor" />
    <rect x="20" y="14" width="2" height="4" fill="currentColor" />

    {/* Vertical bar on the right */}
    <rect x="24" y="10" width="2" height="12" fill="currentColor" />
  </svg>
);

function App() {
  const [step, setStep] = useState(0);
  const [selectedPoisons, setSelectedPoisons] = useState<('cigarette' | 'cigar' | 'vape' | 'hookah' | 'pipe')[]>(['cigarette']);
  const [lastSelectedPoison, setLastSelectedPoison] = useState<'cigarette' | 'cigar' | 'vape' | 'hookah' | 'pipe'>('cigarette');
  const [poisonSubStep, setPoisonSubStep] = useState(0);
  const [age, setAge] = useState(25);
  const [smokingIntensity, setSmokingIntensity] = useState<string>('');

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
  }, [step, poisonSubStep]);

  const triggerHapticFeedback = async (style: ImpactStyle = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (e) {
      if (navigator.vibrate) {
        navigator.vibrate(style === ImpactStyle.Medium ? 45 : style === ImpactStyle.Heavy ? 60 : 20);
      }
    }
  };

  const handleBack = () => {
    triggerHapticFeedback(ImpactStyle.Light);
    if (step === 1) {
      if (poisonSubStep > 0) {
        setPoisonSubStep(poisonSubStep - 1);
      } else {
        setStep(0);
      }
    } else if (step === 1.5) {
      setStep(1);
      setPoisonSubStep(3);
    } else if (step === 2) {
      setStep(1.5);
    }
  };

  const handleNextPills = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHapticFeedback(ImpactStyle.Medium);
    if (poisonSubStep < 3) {
      setPoisonSubStep(poisonSubStep + 1);
    } else {
      setStep(1.5);
    }
  };

  return (
    <div className={`app-shell ${Capacitor.isNativePlatform() ? 'is-native' : 'web-preview'} ${step <= 1.5 ? 'theme-cream' : 'theme-dark'}`}>
      {/* Background blobs for premium glow styling */}
      {step > 1.5 && (
        <div className="bg-glow-container">
          <div className="bg-glow-blob blob-teal"></div>
          <div className="bg-glow-blob blob-purple"></div>
        </div>
      )}

      <div className="app-content">
        {/* Navigation Header */}
        {step >= 0 && (
          <header className="app-header" style={{ justifyContent: step === 1.5 ? 'flex-end' : 'space-between', gap: '12px' }}>
            {step !== 1.5 && (
              <div className="app-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/logo.jpg" alt="SuuQuit Logo" style={{ width: '32px', height: '32px', borderRadius: '12px', flexShrink: 0 }} />
                <span style={{ letterSpacing: '-0.5px', fontWeight: 800, fontSize: '18px', color: step <= 1.5 ? '#1e293b' : '#ffffff' }}>
                  Suu<span style={{ color: '#ef4444' }}>Quit</span>
                </span>
              </div>
            )}
            
            {/* Step 0: Skip button */}
            {step === 0 && (
              <button 
                className="btn-secondary" 
                style={{ 
                  padding: '8px', 
                  borderRadius: '8px', 
                  width: '36px', 
                  height: '36px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginLeft: 'auto',
                  border: '2px solid #1e293b',
                  backgroundColor: '#ffffff',
                  color: '#1e293b',
                  boxShadow: '2px 2px 0px #1e293b',
                  cursor: 'pointer'
                }} 
                onClick={() => {
                  triggerHapticFeedback(ImpactStyle.Medium);
                  setStep(1);
                }}
              >
                <PixelSkip size={16} />
              </button>
            )}

            {/* Logo on the right side for Step 1.5 */}
            {step === 1.5 && (
              <div className="app-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: 'auto' }}>
                <img src="/logo.jpg" alt="SuuQuit Logo" style={{ width: '32px', height: '32px', borderRadius: '12px', flexShrink: 0 }} />
                <span style={{ letterSpacing: '-0.5px', fontWeight: 800, fontSize: '18px', color: '#1e293b' }}>
                  Suu<span style={{ color: '#ef4444' }}>Quit</span>
                </span>
              </div>
            )}

            {/* Back button for Step 1, Step 1.5, and Step 2 */}
            {((step === 2) || (step === 1.5) || (step === 1 && poisonSubStep >= 0)) && (
              <button 
                className="btn-secondary" 
                style={{ 
                  padding: '8px', 
                  borderRadius: '8px', 
                  width: '36px', 
                  height: '36px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: step <= 1.5 ? '2px solid #1e293b' : '2px solid #ffffff',
                  backgroundColor: step <= 1.5 ? '#ffffff' : '#1e293b',
                  color: step <= 1.5 ? '#1e293b' : '#ffffff',
                  boxShadow: step <= 1.5 ? '2px 2px 0px #1e293b' : '2px 2px 0px #ffffff',
                  cursor: 'pointer'
                }} 
                onClick={handleBack}
              >
                <PixelBackArrow size={20} />
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

            {/* Pill Pack Button & Pointing Arrow + Aligned Click Helper (Slide 0) */}
            <div style={{ position: 'absolute', bottom: '80px', left: '24px', right: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20 }}>
              <div className={`click-helper ${revealedElements >= 7 ? 'visible' : ''}`} style={{ position: 'static', padding: 0 }}>
                Tap the pills to continue
              </div>
              <div className={`pop-item ${revealedElements >= 7 ? 'visible' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="arrow-bounce" style={{ pointerEvents: 'none' }}>
                  <PixelArrow />
                </div>
                <div 
                  className="pixel-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerHapticFeedback(ImpactStyle.Medium);
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
          </div>

          {/* SLIDE 1: Cream Poison Selection Screen */}
          <div className={`slide slide-cream ${step === 1 ? 'slide-active' : step < 1 ? 'slide-next' : 'slide-prev'}`} style={{ cursor: 'default' }}>
            {/* Header / Question 1 */}
            <div style={{ padding: '0 24px', marginTop: '24px', width: '100%', zIndex: 10 }}>
              <div className={`poison-question-1 slide-up-item ${revealedElements >= 1 ? 'visible' : ''}`}>
                {poisonSubStep === 0 && "So… you're the brave one who's actually gonna quit smoking?"}
                {poisonSubStep === 1 && "Btw, How old are you?"}
                {poisonSubStep === 2 && "As a friend… how many a day?"}
                {poisonSubStep === 3 && "So, are you ready to start this quit journey with me?"}
              </div>
            </div>

            {/* Question 2 & Selection Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', padding: '0 24px', marginTop: '16px', justifyContent: 'center', zIndex: 10 }}>
              
              {poisonSubStep === 0 ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', gap: '16px', width: '100%' }}>
                    <div className={`poison-question-2 slide-up-item ${revealedElements >= 2 ? 'visible' : ''}`}>
                      What's your poison?
                    </div>
                    
                    {/* Dynamically changing SVG based on selection */}
                    <div className={`poison-image-container pop-item ${revealedElements >= 2 ? 'visible' : ''}`}>
                      {lastSelectedPoison === 'cigarette' && <PixelCigarette size={100} />}
                      {lastSelectedPoison === 'cigar' && <PixelCigar size={100} />}
                      {lastSelectedPoison === 'vape' && <PixelVape size={100} />}
                      {lastSelectedPoison === 'hookah' && <PixelHookah size={100} />}
                      {lastSelectedPoison === 'pipe' && <PixelPipe size={100} />}
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
                        className={`poison-option-item ${selectedPoisons.includes(option.id as any) ? 'active' : ''}`}
                        onClick={async () => {
                          let newPoisons = [...selectedPoisons];
                          if (newPoisons.includes(option.id as any)) {
                            if (newPoisons.length > 1) {
                              newPoisons = newPoisons.filter((p) => p !== option.id);
                            }
                          } else {
                            newPoisons.push(option.id as any);
                          }
                          setSelectedPoisons(newPoisons);
                          setLastSelectedPoison(option.id as any);

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
                </>
              ) : poisonSubStep === 2 ? (
                <>
                  <div className={`poison-question-2 slide-up-item ${revealedElements >= 2 ? 'visible' : ''}`} style={{ marginBottom: '24px' }}>
                    Casual or full addiction?
                  </div>

                  <div className={`poison-options-list slide-up-item ${revealedElements >= 3 ? 'visible' : ''}`}>
                    {[
                      { id: 'just-social', label: 'Just Social / Occasional', sub: '1–3 a day or less', icon: <PixelCasual size={36} /> },
                      { id: 'light', label: 'Light Smoker', sub: '4–9 a day', icon: <PixelLeaf size={36} /> },
                      { id: 'moderate', label: 'Regular Habit', sub: '10–19 a day', icon: <PixelFlame size={36} /> },
                      { id: 'heavy', label: 'Pack a Day', sub: '20–30 a day', icon: <PixelPackFull size={36} /> },
                      { id: 'chain', label: 'Chain Smoker', sub: '30+ a day', icon: <PixelChain size={36} /> },
                    ].map((option) => (
                      <div
                        key={option.id}
                        className={`poison-option-item ${smokingIntensity === option.id ? 'active' : ''}`}
                        onClick={async () => {
                          setSmokingIntensity(option.id);
                          try {
                            await Haptics.impact({ style: ImpactStyle.Light });
                          } catch (e) {
                            if (navigator.vibrate) navigator.vibrate(20);
                          }
                        }}
                        style={{ justifyContent: 'space-between', flexDirection: 'column', alignItems: 'stretch', gap: '2px', padding: '12px 18px' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700 }}>{option.label}</span>
                          <div style={{ display: 'flex', alignItems: 'center' }}>{option.icon}</div>
                        </div>
                        <span style={{ fontSize: '12px', opacity: 0.65, fontWeight: 400 }}>{option.sub}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : poisonSubStep === 3 ? (
                <>
                  <div className={`pop-item ${revealedElements >= 2 ? 'visible' : ''}`} style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
                      {/* Pixel heart */}
                      <rect x="8" y="16" width="12" height="4" fill="#f95c3b" />
                      <rect x="20" y="12" width="8" height="4" fill="#f95c3b" />
                      <rect x="28" y="8" width="8" height="4" fill="#f95c3b" />
                      <rect x="36" y="12" width="8" height="4" fill="#f95c3b" />
                      <rect x="44" y="16" width="12" height="4" fill="#f95c3b" />
                      <rect x="4" y="20" width="56" height="4" fill="#f95c3b" />
                      <rect x="4" y="24" width="56" height="4" fill="#ff7a57" />
                      <rect x="8" y="28" width="48" height="4" fill="#f95c3b" />
                      <rect x="12" y="32" width="40" height="4" fill="#ff7a57" />
                      <rect x="16" y="36" width="32" height="4" fill="#f95c3b" />
                      <rect x="20" y="40" width="24" height="4" fill="#ff7a57" />
                      <rect x="24" y="44" width="16" height="4" fill="#f95c3b" />
                      <rect x="28" y="48" width="8" height="4" fill="#ff7a57" />
                      <rect x="30" y="52" width="4" height="4" fill="#f95c3b" />
                    </svg>
                  </div>

                  <div className={`slide-up-item ${revealedElements >= 2 ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#000', lineHeight: 1.3, marginBottom: '12px' }}>
                      Ready to quit?
                    </div>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: '20px', color: '#555', lineHeight: 1.5 }}>
                      I'll be right here with you — tracking every hour, every dollar saved, every breath easier.
                    </div>
                  </div>

                  <div className={`poison-options-list slide-up-item ${revealedElements >= 3 ? 'visible' : ''}`}>
                    {[
                      { id: 'yes-now', label: "Yes, let's do this NOW!", icon: <PixelFist size={36} /> },
                      { id: 'yes-soon', label: "I'm setting my quit date", icon: <PixelCalendar size={36} /> },
                      { id: 'exploring', label: "Just exploring for now", icon: <PixelSpyglass size={36} /> },
                    ].map((option) => (
                      <div
                        key={option.id}
                        className={`poison-option-item ${smokingIntensity === ('ready-' + option.id) ? 'active' : ''}`}
                        onClick={async () => {
                          setSmokingIntensity('ready-' + option.id);
                          try {
                            await Haptics.impact({ style: ImpactStyle.Light });
                          } catch (e) {
                            if (navigator.vibrate) navigator.vibrate(20);
                          }
                        }}
                        style={{ justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}
                      >
                        <span style={{ fontSize: '16px', fontWeight: 700 }}>{option.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center' }}>{option.icon}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', gap: '16px', width: '100%' }}>
                    <div className={`poison-question-2 slide-up-item ${revealedElements >= 2 ? 'visible' : ''}`}>
                      Select your age group
                    </div>
                    
                    {/* Dynamically changing SVG based on selected age bracket */}
                    <div className={`poison-image-container pop-item ${revealedElements >= 2 ? 'visible' : ''}`}>
                      {age < 18 && <PixelSkateboard size={100} />}
                      {age >= 18 && age <= 25 && <PixelCoffeeMug size={100} />}
                      {age >= 26 && age <= 35 && <PixelHourglass size={100} />}
                      {age >= 36 && age <= 50 && <PixelMedal size={100} />}
                      {age > 50 && <PixelFirstAid size={100} />}
                    </div>
                  </div>

                  {/* Age options list */}
                  <div className={`poison-options-list slide-up-item ${revealedElements >= 3 ? 'visible' : ''}`} style={{ width: '100%' }}>
                    {[
                      { range: '12 - 17', minAge: 15, reaction: "🛹 Rad! Quitting now keeps you active, fit, and in control of your future." },
                      { range: '18 - 25', minAge: 22, reaction: "☕ Starting your career and life with clean lungs is the best investment." },
                      { range: '26 - 35', minAge: 30, reaction: "⏳ Time to focus on longevity. Your body recovery starts the moment you stop." },
                      { range: '36 - 50', minAge: 43, reaction: "🏅 Truly inspiring. It is never too late to reclaim your health and wisdom." },
                      { range: '50+', minAge: 60, reaction: "❤️ The best time to quit was yesterday, the second best is right now!" }
                    ].map((opt) => {
                      const isSelected = (opt.range === '12 - 17' && age < 18) ||
                                         (opt.range === '18 - 25' && age >= 18 && age <= 25) ||
                                         (opt.range === '26 - 35' && age >= 26 && age <= 35) ||
                                         (opt.range === '36 - 50' && age >= 36 && age <= 50) ||
                                         (opt.range === '50+' && age > 50);
                      return (
                        <div 
                          key={opt.range}
                          className={`poison-option-item ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setAge(opt.minAge);
                            triggerHapticFeedback(ImpactStyle.Light);
                          }}
                          style={{ justifyContent: 'space-between', flexDirection: 'column', alignItems: 'stretch', gap: '4px', padding: '12px 18px' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700 }}>{opt.range}</span>
                            <span style={{ fontSize: '12px', opacity: 0.8 }}>Years old</span>
                          </div>
                          {isSelected && (
                            <span style={{ fontSize: '12px', opacity: 0.65, fontWeight: 400, marginTop: '2px' }}>
                              {opt.reaction}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Pill Pack Button & Pointing Arrow + Aligned Click Helper (Slide 1) */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 20, marginTop: '8px' }}>
                <div className={`click-helper ${revealedElements >= 4 ? 'visible' : ''}`} style={{ position: 'static', padding: 0 }}>
                  {poisonSubStep === 0 ? "Tap the pills to continue" : poisonSubStep === 3 ? "Let's go! Tap the pills" : "Tap the pills to continue"}
                </div>
                <div className={`pop-item ${revealedElements >= 4 ? 'visible' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="arrow-bounce" style={{ pointerEvents: 'none' }}>
                    <PixelArrow />
                  </div>
                  <div 
                    className="pixel-btn"
                    onClick={handleNextPills}
                    style={{ transform: 'rotate(-15deg)' }}
                  >
                    <div className="pixel-btn-hover-wrap">
                      <PixelPills />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 1.5: View-only Auth Screen */}
          {step === 1.5 && (
            <AuthView 
              onSuccess={() => {
                triggerHapticFeedback(ImpactStyle.Medium);
                setStep(2); // Go to completion screen
              }}
            />
          )}

          {/* SLIDE 2: Completed Onboarding Screen */}
          {step === 2 && (
            <div className="slide slide-cream slide-active" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', padding: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <img src="/logo.jpg" alt="SuuQuit Logo" style={{ width: '80px', height: '80px', borderRadius: '18px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)' }} />
              </div>
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>
                Setup <span style={{ color: '#ef4444' }}>Completed!</span>
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#555555', lineHeight: 1.6, maxWidth: '320px', marginBottom: '32px' }}>
                Welcome to SuuQuit. You are now successfully connected and ready to start your journey with the community.
              </p>
              <button 
                className="btn-primary" 
                onClick={() => {
                  triggerHapticFeedback(ImpactStyle.Medium);
                  setStep(0); // Restart Onboarding
                }}
                style={{ 
                  padding: '14px 28px', 
                  borderRadius: '12px', 
                  border: '2px solid #1e293b', 
                  backgroundColor: '#1e293b', 
                  color: '#ffffff',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  boxShadow: '4px 4px 0px #ef4444',
                  cursor: 'pointer',
                  width: 'auto'
                }}
              >
                Restart Journey
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
