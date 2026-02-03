import React, { useState, useEffect } from 'react';

export default function LootixPrototype() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [countdown, setCountdown] = useState({ days: 12, hours: 5, mins: 32, secs: 47 });
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [email, setEmail] = useState('');

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
      title: 'LOOT LEGENDARY',
      subtitle: 'GEAR UP. LEVEL UP.',
    },
    {
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
      title: 'WIN EPIC PRIZES',
      subtitle: 'Every purchase earns entries.',
    },
    {
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
      title: 'ADVENTURE AWAITS',
      subtitle: '$5,000 Gaming PC Giveaway',
    }
  ];

  const products = [
    { id: 1, name: 'Summit Hoodie', price: 89, entries: 5340, badge: 'NEW', multiplier: '60X', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
    { id: 2, name: 'Trail Runner Tee', price: 45, entries: 2700, badge: 'SALE', multiplier: '60X', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', salePrice: 35 },
    { id: 3, name: 'Explorer Joggers', price: 75, entries: 4500, badge: null, multiplier: '60X', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80' },
    { id: 4, name: 'Basecamp Cap', price: 35, entries: 2100, badge: 'NEW', multiplier: '60X', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80' },
  ];

  const categories = [
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80' },
    { name: 'Shirts', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    { name: 'Bundles', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80' },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, heroSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; mins = 0; secs = 0; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1A1A2E',
      color: '#F5F5F5',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflowX: 'hidden',
    },
    announcementBar: {
      backgroundColor: '#D97706',
      color: 'white',
      textAlign: 'center',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.05em',
    },
    nav: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#0F0F1A',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(139, 69, 19, 0.2)',
    },
    navInner: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      fontFamily: 'Oswald, sans-serif',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
    },
    navLink: {
      color: '#B8B8B8',
      fontSize: '13px',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textDecoration: 'none',
      transition: 'color 0.2s',
      cursor: 'pointer',
    },
    navLinkHighlight: {
      color: '#D97706',
    },
    ctaButton: {
      backgroundColor: '#D97706',
      color: 'white',
      padding: '10px 24px',
      fontSize: '13px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    hero: {
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      overflow: 'hidden',
    },
    heroSlide: {
      position: 'absolute',
      inset: 0,
      transition: 'opacity 1s ease, transform 1s ease',
    },
    heroImage: {
      position: 'absolute',
      inset: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'transform 6s ease-out',
    },
    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(15,15,26,0.5) 0%, rgba(15,15,26,0.6) 50%, rgba(26,26,46,1) 100%)',
    },
    heroContent: {
      position: 'relative',
      zIndex: 10,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 16px',
    },
    heroTitle: {
      fontSize: 'clamp(40px, 8vw, 80px)',
      fontWeight: '700',
      letterSpacing: '-0.02em',
      marginBottom: '16px',
      fontFamily: 'Oswald, sans-serif',
    },
    heroSubtitle: {
      fontSize: 'clamp(18px, 3vw, 24px)',
      color: '#B8B8B8',
      marginBottom: '32px',
      letterSpacing: '0.05em',
    },
    countdownContainer: {
      marginBottom: '32px',
    },
    countdownLabel: {
      fontSize: '12px',
      color: '#6B7280',
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      marginBottom: '16px',
    },
    countdownGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
    },
    countdownBlock: {
      backgroundColor: 'rgba(22, 33, 62, 0.8)',
      backdropFilter: 'blur(8px)',
      borderRadius: '8px',
      padding: '16px',
      minWidth: '70px',
    },
    countdownNumber: {
      fontSize: '32px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
    },
    countdownUnit: {
      fontSize: '10px',
      color: '#6B7280',
      letterSpacing: '0.2em',
      marginTop: '4px',
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'center',
      marginBottom: '32px',
    },
    primaryButton: {
      backgroundColor: '#D97706',
      color: 'white',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      position: 'relative',
      overflow: 'hidden',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#D97706',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      border: '2px solid #D97706',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    trustBadges: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '24px',
      fontSize: '14px',
      color: '#6B7280',
    },
    trustBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    checkIcon: {
      width: '16px',
      height: '16px',
      color: '#16A34A',
    },
    slideControls: {
      position: 'absolute',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    playPauseBtn: {
      background: 'none',
      border: 'none',
      color: '#6B7280',
      cursor: 'pointer',
      padding: '4px',
    },
    dotsContainer: {
      display: 'flex',
      gap: '8px',
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    trustStatsBar: {
      backgroundColor: '#16213E',
      borderTop: '1px solid rgba(139, 69, 19, 0.3)',
      borderBottom: '1px solid rgba(139, 69, 19, 0.3)',
      padding: '24px 16px',
    },
    statsGrid: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px',
    },
    statItem: {
      textAlign: 'center',
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#D97706',
      fontFamily: 'Oswald, sans-serif',
    },
    statLabel: {
      fontSize: '11px',
      color: '#6B7280',
      letterSpacing: '0.2em',
      marginTop: '4px',
    },
    section: {
      padding: '64px 16px',
      maxWidth: '1280px',
      margin: '0 auto',
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '32px',
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
    },
    blinkingUnderscore: {
      color: '#D97706',
      animation: 'blink 1s step-end infinite',
    },
    viewAllLink: {
      color: '#D97706',
      fontSize: '14px',
      fontWeight: '600',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '24px',
    },
    productCard: {
      backgroundColor: '#16213E',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(139, 69, 19, 0.3)',
      transition: 'all 0.3s',
      cursor: 'pointer',
    },
    productCardHover: {
      borderColor: '#8B4513',
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
    },
    productImageContainer: {
      position: 'relative',
      aspectRatio: '1',
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s',
    },
    productImageHover: {
      transform: 'scale(1.1)',
    },
    productBadge: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      padding: '4px 8px',
      fontSize: '11px',
      fontWeight: '700',
      color: 'white',
    },
    multiplierBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      backgroundColor: '#D97706',
      padding: '4px 8px',
      fontSize: '11px',
      fontWeight: '700',
      color: 'white',
    },
    quickViewOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(15, 15, 26, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.3s',
    },
    quickViewBtn: {
      border: '1px solid #D97706',
      color: '#D97706',
      backgroundColor: 'transparent',
      padding: '8px 24px',
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      cursor: 'pointer',
    },
    productInfo: {
      padding: '16px',
    },
    productName: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    productPricing: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    productPrice: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#D97706',
      fontFamily: 'Oswald, sans-serif',
    },
    productOldPrice: {
      fontSize: '14px',
      color: '#6B7280',
      textDecoration: 'line-through',
      marginLeft: '8px',
    },
    productEntries: {
      fontSize: '12px',
      color: '#6B7280',
    },
    giveawaySection: {
      padding: '64px 16px',
      backgroundColor: '#0F0F1A',
    },
    giveawayGrid: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
      alignItems: 'center',
    },
    giveawayImageContainer: {
      position: 'relative',
    },
    giveawayImage: {
      width: '100%',
      borderRadius: '8px',
    },
    valueBadge: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      backgroundColor: '#DC2626',
      color: 'white',
      padding: '8px 16px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
    },
    giveawayLabel: {
      color: '#D97706',
      fontSize: '13px',
      fontWeight: '600',
      letterSpacing: '0.2em',
    },
    giveawayTitle: {
      fontSize: '32px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
      marginTop: '8px',
      marginBottom: '16px',
    },
    giveawayDesc: {
      color: '#B8B8B8',
      marginBottom: '24px',
      lineHeight: '1.6',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 24px 0',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#B8B8B8',
      marginBottom: '8px',
    },
    entryCalculator: {
      backgroundColor: 'rgba(217, 119, 6, 0.1)',
      border: '1px solid rgba(217, 119, 6, 0.3)',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
      textAlign: 'center',
    },
    entryText: {
      color: '#D97706',
      fontWeight: '600',
    },
    entryCount: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#D97706',
      fontFamily: 'Oswald, sans-serif',
    },
    activeBadge: {
      backgroundColor: '#D97706',
      color: 'white',
      fontSize: '11px',
      padding: '2px 8px',
      fontWeight: '700',
      marginLeft: '8px',
    },
    fullWidthBtn: {
      width: '100%',
      backgroundColor: '#D97706',
      color: 'white',
      padding: '16px',
      fontSize: '16px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    rulesLink: {
      display: 'block',
      textAlign: 'center',
      color: '#6B7280',
      fontSize: '14px',
      marginTop: '16px',
      cursor: 'pointer',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
    },
    categoryCard: {
      position: 'relative',
      aspectRatio: '1',
      overflow: 'hidden',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    categoryImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s',
    },
    categoryOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(15,15,26,1), rgba(15,15,26,0.4), transparent)',
    },
    categoryName: {
      position: 'absolute',
      bottom: '16px',
      left: '16px',
      fontSize: '18px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
    },
    howItWorksSection: {
      padding: '64px 16px',
      backgroundColor: '#16213E',
    },
    howItWorksGrid: {
      maxWidth: '900px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px',
      textAlign: 'center',
    },
    stepNumber: {
      width: '64px',
      height: '64px',
      margin: '0 auto 16px',
      borderRadius: '50%',
      border: '2px solid #D97706',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '700',
      color: '#D97706',
      fontFamily: 'Oswald, sans-serif',
      transition: 'all 0.3s',
    },
    stepTitle: {
      fontSize: '20px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
      marginBottom: '8px',
    },
    stepDesc: {
      color: '#B8B8B8',
      fontSize: '14px',
    },
    winnersSection: {
      padding: '64px 16px',
      backgroundColor: '#0F0F1A',
      textAlign: 'center',
    },
    winnersContent: {
      maxWidth: '600px',
      margin: '0 auto',
    },
    winnersTitle: {
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
      marginBottom: '16px',
    },
    winnersDesc: {
      color: '#B8B8B8',
      marginBottom: '32px',
    },
    emailSection: {
      backgroundColor: '#D97706',
      padding: '48px 16px',
      textAlign: 'center',
    },
    emailTitle: {
      fontSize: '28px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
      color: 'white',
      marginBottom: '8px',
    },
    emailDesc: {
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '24px',
    },
    emailForm: {
      display: 'flex',
      gap: '12px',
      maxWidth: '400px',
      margin: '0 auto',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    emailInput: {
      flex: 1,
      minWidth: '200px',
      padding: '12px 16px',
      backgroundColor: 'white',
      color: '#1A1A2E',
      border: 'none',
      outline: 'none',
      fontSize: '14px',
    },
    emailButton: {
      backgroundColor: '#0F0F1A',
      color: 'white',
      padding: '12px 24px',
      fontWeight: '700',
      letterSpacing: '0.1em',
      border: 'none',
      cursor: 'pointer',
    },
    bonusText: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: '14px',
      marginTop: '16px',
    },
    footer: {
      backgroundColor: '#0F0F1A',
      borderTop: '1px solid rgba(139, 69, 19, 0.2)',
      padding: '48px 16px 24px',
    },
    footerGrid: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '32px',
      marginBottom: '32px',
    },
    footerLogo: {
      fontSize: '20px',
      fontWeight: '700',
      fontFamily: 'Oswald, sans-serif',
    },
    footerTagline: {
      color: '#6B7280',
      fontSize: '14px',
      marginTop: '8px',
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
      marginTop: '16px',
    },
    socialIcon: {
      width: '20px',
      height: '20px',
      color: '#6B7280',
      cursor: 'pointer',
    },
    footerHeading: {
      fontWeight: '700',
      fontSize: '13px',
      letterSpacing: '0.1em',
      marginBottom: '16px',
    },
    footerLinks: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    footerLink: {
      color: '#6B7280',
      fontSize: '14px',
      marginBottom: '8px',
      cursor: 'pointer',
    },
    footerAddress: {
      color: '#6B7280',
      fontSize: '14px',
      lineHeight: '1.6',
    },
    footerBottom: {
      borderTop: '1px solid rgba(139, 69, 19, 0.2)',
      paddingTop: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      maxWidth: '1280px',
      margin: '0 auto',
    },
    copyright: {
      color: '#6B7280',
      fontSize: '14px',
    },
    legalLinks: {
      display: 'flex',
      gap: '16px',
    },
    legalLink: {
      color: '#6B7280',
      fontSize: '14px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap');
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .giveaway-grid { grid-template-columns: 1fr !important; }
          .categories-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .how-it-works-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* Announcement Bar */}
      <div style={styles.announcementBar}>
        <span style={{ animation: 'pulse 2s infinite' }}>🔥</span> 60X ENTRIES ON ALL ORDERS — FREE SHIPPING OVER $75 <span style={{ animation: 'pulse 2s infinite' }}>🔥</span>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>LOOTIX</div>
          <div style={styles.navLinks} className="nav-links">
            <span style={{...styles.navLink, ...styles.navLinkHighlight}}>JUST ARRIVED<span style={styles.blinkingUnderscore}>_</span></span>
            <span style={styles.navLink}>MENS</span>
            <span style={styles.navLink}>WOMENS</span>
            <span style={styles.navLink}>ACCESSORIES</span>
            <span style={styles.navLink}>QUICK ENTRIES</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={styles.ctaButton}>ENTER NOW</button>
            <div style={{ position: 'relative' }}>
              <svg style={{ width: '24px', height: '24px', color: '#B8B8B8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#D97706', color: 'white', fontSize: '11px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slideshow */}
      <section style={styles.hero}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.heroSlide,
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
            }}
          >
            <div 
              style={{
                ...styles.heroImage,
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
              }}
            />
            <div style={styles.heroOverlay} />
          </div>
        ))}

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{heroSlides[currentSlide].title}</h1>
          <p style={styles.heroSubtitle}>{heroSlides[currentSlide].subtitle}</p>

          <div style={styles.countdownContainer}>
            <p style={styles.countdownLabel}>Giveaway Ends March 15, 2026</p>
            <div style={styles.countdownGrid}>
              {[
                { value: countdown.days, label: 'DAYS' },
                { value: countdown.hours, label: 'HOURS' },
                { value: countdown.mins, label: 'MINS' },
                { value: countdown.secs, label: 'SECS' }
              ].map((item, i) => (
                <div key={i} style={styles.countdownBlock}>
                  <div style={styles.countdownNumber}>{pad(item.value)}</div>
                  <div style={styles.countdownUnit}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton}>ENTER NOW</button>
            <button style={styles.secondaryButton}>SHOP GEAR</button>
          </div>

          <div style={styles.trustBadges}>
            {['Free Entry', 'Weekly Drawings', 'Ships Worldwide'].map((badge, i) => (
              <span key={i} style={styles.trustBadge}>
                <svg style={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div style={styles.slideControls}>
          <button style={styles.playPauseBtn} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div style={styles.dotsContainer}>
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  ...styles.dot,
                  backgroundColor: index === currentSlide ? '#D97706' : '#6B7280',
                  width: index === currentSlide ? '32px' : '8px',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section style={styles.trustStatsBar}>
        <div style={styles.statsGrid} className="stats-grid">
          {[
            { value: '$50K+', label: 'PRIZES GIVEN' },
            { value: '250+', label: 'WINNERS' },
            { value: '10K+', label: 'MEMBERS' },
            { value: 'FREE', label: 'TO ENTER' }
          ].map((stat, i) => (
            <div key={i} style={styles.statItem}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Just Arrived Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>JUST ARRIVED<span style={styles.blinkingUnderscore}>_</span></h2>
          <span style={styles.viewAllLink}>View all →</span>
        </div>
        <div style={styles.productsGrid}>
          {products.map((product) => (
            <div 
              key={product.id}
              style={{
                ...styles.productCard,
                ...(hoveredProduct === product.id ? styles.productCardHover : {}),
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div style={styles.productImageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    ...styles.productImage,
                    ...(hoveredProduct === product.id ? styles.productImageHover : {}),
                  }}
                />
                {product.badge && (
                  <span style={{
                    ...styles.productBadge,
                    backgroundColor: product.badge === 'SALE' ? '#DC2626' : '#D97706',
                  }}>
                    {product.badge}
                  </span>
                )}
                <span style={styles.multiplierBadge}>{product.multiplier}</span>
                <div style={{
                  ...styles.quickViewOverlay,
                  opacity: hoveredProduct === product.id ? 1 : 0,
                  pointerEvents: hoveredProduct === product.id ? 'auto' : 'none',
                }}>
                  <button style={styles.quickViewBtn}>QUICK VIEW</button>
                </div>
              </div>
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{product.name}</h3>
                <div style={styles.productPricing}>
                  <div>
                    <span style={styles.productPrice}>${product.salePrice || product.price}</span>
                    {product.salePrice && <span style={styles.productOldPrice}>${product.price}</span>}
                  </div>
                  <span style={styles.productEntries}>{product.entries.toLocaleString()} entries</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Current Giveaway */}
      <section style={styles.giveawaySection}>
        <div style={styles.giveawayGrid} className="giveaway-grid">
          <div style={styles.giveawayImageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80"
              alt="Gaming PC"
              style={styles.giveawayImage}
            />
            <div style={styles.valueBadge}>VALUE: $5,000</div>
          </div>
          <div>
            <span style={styles.giveawayLabel}>CURRENT GIVEAWAY<span style={styles.blinkingUnderscore}>_</span></span>
            <h2 style={styles.giveawayTitle}>Custom Gaming PC Build</h2>
            <p style={styles.giveawayDesc}>Win a fully loaded custom gaming PC worth over $5,000. Built with the latest components for maximum performance.</p>
            <ul style={styles.featureList}>
              {['RTX 4080 Super Graphics Card', 'AMD Ryzen 9 7950X Processor', '64GB DDR5 RAM', '2TB NVMe SSD Storage'].map((item, i) => (
                <li key={i} style={styles.featureItem}>
                  <svg style={{ width: '16px', height: '16px', color: '#16A34A', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div style={styles.entryCalculator}>
              <span style={styles.entryText}>This purchase = </span>
              <span style={styles.entryCount}>3,000 entries</span>
              <span style={styles.activeBadge}>60X ACTIVE</span>
            </div>
            <button style={styles.fullWidthBtn}>ENTER NOW — FREE</button>
            <span style={styles.rulesLink}>View Official Rules</span>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section style={styles.section}>
        <h2 style={{...styles.sectionTitle, textAlign: 'center', marginBottom: '32px'}}>SHOP BY CATEGORY<span style={styles.blinkingUnderscore}>_</span></h2>
        <div style={styles.categoriesGrid} className="categories-grid">
          {categories.map((cat, i) => (
            <div key={i} style={styles.categoryCard}>
              <img src={cat.image} alt={cat.name} style={styles.categoryImage} />
              <div style={styles.categoryOverlay} />
              <span style={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={styles.howItWorksSection}>
        <h2 style={{...styles.sectionTitle, textAlign: 'center', marginBottom: '48px'}}>HOW IT WORKS<span style={styles.blinkingUnderscore}>_</span></h2>
        <div style={styles.howItWorksGrid} className="how-it-works-grid">
          {[
            { num: '01', title: 'BROWSE', desc: 'Shop our premium streetwear or grab Quick Entry packs.' },
            { num: '02', title: 'ENTER', desc: 'Every $1 = 60 entries. Free entry also available.' },
            { num: '03', title: 'WIN', desc: 'Winners drawn weekly. Prizes shipped worldwide.' }
          ].map((step, i) => (
            <div key={i}>
              <div style={styles.stepNumber}>{step.num}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button style={styles.primaryButton}>START ENTERING NOW</button>
        </div>
      </section>

      {/* Winners Section */}
      <section style={styles.winnersSection}>
        <div style={styles.winnersContent}>
          <h2 style={styles.winnersTitle}>BE OUR FIRST WINNER<span style={styles.blinkingUnderscore}>_</span></h2>
          <p style={styles.winnersDesc}>We're launching soon! Enter our inaugural giveaway for your chance to make history as a Lootix winner. Real prizes. Real winners. Real soon.</p>
          <button style={styles.primaryButton}>ENTER NOW</button>
        </div>
      </section>

      {/* Email Section */}
      <section style={styles.emailSection}>
        <h2 style={styles.emailTitle}>GET NOTIFIED<span style={{ animation: 'blink 1s step-end infinite' }}>_</span></h2>
        <p style={styles.emailDesc}>Be first to know about new giveaways + get bonus entries.</p>
        <div style={styles.emailForm}>
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.emailInput}
          />
          <button style={styles.emailButton}>JOIN</button>
        </div>
        <p style={styles.bonusText}>🎁 Get 500 BONUS ENTRIES just for signing up!</p>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid} className="footer-grid">
          <div>
            <div style={styles.footerLogo}>LOOTIX</div>
            <p style={styles.footerTagline}>Look cool and get cool shit.</p>
            <div style={styles.socialLinks}>
              <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
              <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              <svg style={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
            </div>
          </div>
          <div>
            <h4 style={styles.footerHeading}>SHOP</h4>
            <ul style={styles.footerLinks}>
              {['New Drops', 'Mens', 'Womens', 'Quick Entries'].map((item, i) => (
                <li key={i} style={styles.footerLink}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={styles.footerHeading}>INFO</h4>
            <ul style={styles.footerLinks}>
              {['Current Giveaway', 'Past Winners', 'How It Works', 'FAQ'].map((item, i) => (
                <li key={i} style={styles.footerLink}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={styles.footerHeading}>CONTACT</h4>
            <div style={styles.footerAddress}>
              <p>Lootix LLC</p>
              <p>123 Adventure Way</p>
              <p>Denver, CO 80202</p>
              <p style={{ marginTop: '8px' }}>hello@getlootix.com</p>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2026 Lootix LLC. All rights reserved.</p>
          <div style={styles.legalLinks}>
            {['Terms', 'Privacy', 'Official Rules'].map((item, i) => (
              <span key={i} style={styles.legalLink}>{item}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
