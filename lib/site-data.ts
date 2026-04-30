export const siteData = {
  gym: {
    name: 'Summit Climb',
    tagline: 'Find Your Next Move.',
    location: 'Denver, CO',
    phone: '(720) 555-0147',
    email: 'beta@summitclimb.com',
    address: '3200 Walnut St, Denver, CO 80205',
    instagram: 'https://instagram.com/summitclimbdenver',
    hero_image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1600&q=80',
  },
  stats: [
    { value: '18K', label: 'sq ft of Wall' },
    { value: '220+', label: 'Routes Set' },
    { value: '1,800', label: 'Members' },
    { value: '5.5–V15', label: 'All Grades' },
  ],
  walls: [
    { name: 'Bouldering Cave', area: '6,000 sq ft', height: '14 ft', desc: 'Our signature cave features 80+ boulder problems reset every two weeks. Overhang heaven with grades V0 through V10+.', icon: '🪨' },
    { name: 'Lead Wall', area: '4,500 sq ft', height: '45 ft', desc: 'Certified UIAA lead routes from 5.5 to 5.14. Competition-style volumes, featured holds, and internationally inspired setting.', icon: '⛰️' },
    { name: 'Top Rope Zone', area: '3,200 sq ft', height: '35 ft', desc: 'Auto-belay and manual top rope stations. Perfect for beginners, group outings, and working your project for hours.', icon: '🧗' },
    { name: 'Traverse Wall', area: '1,800 sq ft', height: '8 ft', desc: 'Footwork-focused low traverses that improve technique without the pump. Great for warming up or coaching sessions.', icon: '🔀' },
    { name: 'Speed Wall', area: '400 sq ft', height: '15m', desc: 'Regulation 15m IFSC speed wall. Time yourself and chase the record. Currently held at 7.4 seconds.', icon: '⚡' },
    { name: 'Moonboard / Kilter', area: 'Training Boards', height: '40°', desc: 'Two training boards at 40° with full app integration. Set and share problems with the global community.', icon: '📱' },
  ],
  programs: [
    { name: 'Intro to Climbing', price: '$75', details: '3-session series · All equipment · Technique fundamentals' },
    { name: 'Youth Team', price: '$145/mo', details: '3× weekly training · Competition prep · Strength conditioning' },
    { name: 'Adult Beginner League', price: '$89/mo', details: '2× weekly · Community focused · Progress tracking' },
    { name: 'Private Coaching', price: '$80/hr', details: '1-on-1 with certified coach · Video analysis · Custom program' },
  ],
  pricing: [
    { name: 'Day Pass', price: '$22', period: 'per visit', features: ['Full wall access', 'Shoe rental included', 'Chalk bag loan', 'Locker room'], highlight: false },
    { name: 'Monthly', price: '$75', period: 'per month', features: ['Unlimited climbing', 'Shoe rental discount', 'Guest pass (2/mo)', 'Class discounts (20%)', 'App + route tracker'], highlight: true },
    { name: 'Annual', price: '$62', period: 'per month', features: ['Everything in Monthly', 'Free shoe rental always', 'Competition entries (2/yr)', 'Gear shop 15% off', '4 guest passes/mo'], highlight: false },
  ],
};
