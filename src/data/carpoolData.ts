export interface Driver {
  id: string;
  name: string;
  gender: 'female' | 'male';
  avatar: string;
  carModel: string;
  carYear: number;
  carColor: string;
  plateNumber: string;
  availableSeats: number;
  totalSeats: number;
  routeOverlapPct: number;
  detourKm: number;
  reliabilityScore: number; // e.g. 9.2 / 10
  costShareInr: number;
  pickupTime: string;
  days: string;
  womenOnly: boolean;
  rating: number;
  ridesCompleted: number;
  onTimePct: number;
  cancellationsPct: number;
  badges: string[];
  vibe: 'Quiet' | 'Chatty' | 'Music' | 'Any';
  recentReviews: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export const DRIVERS: Driver[] = [
  {
    id: 'driver_sneha',
    name: 'Sneha Rao',
    gender: 'female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    carModel: 'Maruti Suzuki Baleno',
    carYear: 2023,
    carColor: 'Metallic Silver',
    plateNumber: 'KA-01-MJ-4021',
    availableSeats: 2,
    totalSeats: 3,
    routeOverlapPct: 92,
    detourKm: 3,
    reliabilityScore: 9.2,
    costShareInr: 110,
    pickupTime: '08:30 AM',
    days: 'Mon-Fri',
    womenOnly: true,
    rating: 4.95,
    ridesCompleted: 148,
    onTimePct: 99.2,
    cancellationsPct: 0.3,
    badges: ['Email Verified', 'Acme ID Verified', 'Live Selfie Check', 'Background Checked'],
    vibe: 'Quiet',
    recentReviews: [
      {
        reviewerName: 'Ananya K. (Acme Design)',
        rating: 5,
        comment: 'Always precisely on time at Richmond Circle! Very smooth driving and loved the quiet morning focus vibe.',
        date: '2 days ago',
      },
      {
        reviewerName: 'Meera S. (Acme Eng)',
        rating: 5,
        comment: 'Super safe commute. Clean car, pleasant music, and saved me ₹300 everyday on cab surge.',
        date: '1 week ago',
      },
      {
        reviewerName: 'Divya R. (Acme HR)',
        rating: 5,
        comment: 'Reliable daily carpool. Never cancels even during peak Bangalore monsoon rain.',
        date: '2 weeks ago',
      },
    ],
  },
  {
    id: 'driver_arjun',
    name: 'Arjun Mehta',
    gender: 'male',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    carModel: 'Maruti Swift Dzire',
    carYear: 2022,
    carColor: 'Arctic White',
    plateNumber: 'KA-05-NB-7819',
    availableSeats: 3,
    totalSeats: 4,
    routeOverlapPct: 87,
    detourKm: 6,
    reliabilityScore: 8.5,
    costShareInr: 120,
    pickupTime: '08:15 AM',
    days: 'Mon-Fri',
    womenOnly: false,
    rating: 4.88,
    ridesCompleted: 112,
    onTimePct: 97.4,
    cancellationsPct: 1.1,
    badges: ['Email Verified', 'Acme ID Verified', 'Live Selfie Check'],
    vibe: 'Music',
    recentReviews: [
      {
        reviewerName: 'Vikram P. (Product)',
        rating: 5,
        comment: 'Great tech banter and fantastic podcast playlist. Very punctual.',
        date: '3 days ago',
      },
      {
        reviewerName: 'Karthik N. (Data)',
        rating: 4,
        comment: 'Takes the Agara flyover bypass to avoid Silk Board congestion. Good drive.',
        date: '2 weeks ago',
      },
      {
        reviewerName: 'Sanjay M. (DevOps)',
        rating: 5,
        comment: 'Comfortable car and fair fuel share. Will carpool regularly.',
        date: '1 month ago',
      },
    ],
  },
  {
    id: 'driver_kavya',
    name: 'Kavya Nair',
    gender: 'female',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    carModel: 'Hyundai Creta SX',
    carYear: 2024,
    carColor: 'Phantom Black',
    plateNumber: 'KA-03-PL-9022',
    availableSeats: 2,
    totalSeats: 4,
    routeOverlapPct: 85,
    detourKm: 4,
    reliabilityScore: 8.9,
    costShareInr: 115,
    pickupTime: '08:20 AM',
    days: 'Mon-Fri',
    womenOnly: true,
    rating: 4.92,
    ridesCompleted: 94,
    onTimePct: 98.6,
    cancellationsPct: 0.8,
    badges: ['Email Verified', 'Acme ID Verified', 'Live Selfie Check', 'Background Checked'],
    vibe: 'Chatty',
    recentReviews: [
      {
        reviewerName: 'Pooja V. (Marketing)',
        rating: 5,
        comment: 'Spacious Creta, wonderful morning conversations, and zero toll hassle.',
        date: 'Yesterday',
      },
      {
        reviewerName: 'Swathi B. (QA)',
        rating: 5,
        comment: 'Always greets with a smile! Highly recommended for female commuters.',
        date: '5 days ago',
      },
      {
        reviewerName: 'Nandini J. (Ops)',
        rating: 5,
        comment: 'Driving is very disciplined. Reached Acme Tech Park 10 mins early.',
        date: '3 weeks ago',
      },
    ],
  },
  {
    id: 'driver_rahul',
    name: 'Rahul Verma',
    gender: 'male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    carModel: 'Hyundai i20 Asta',
    carYear: 2021,
    carColor: 'Fiery Red',
    plateNumber: 'KA-04-ER-3420',
    availableSeats: 2,
    totalSeats: 3,
    routeOverlapPct: 78,
    detourKm: 9,
    reliabilityScore: 7.8,
    costShareInr: 130,
    pickupTime: '08:10 AM',
    days: 'Mon-Fri',
    womenOnly: false,
    rating: 4.75,
    ridesCompleted: 64,
    onTimePct: 95.2,
    cancellationsPct: 2.3,
    badges: ['Email Verified', 'Acme ID Verified'],
    vibe: 'Music',
    recentReviews: [
      {
        reviewerName: 'Amit S. (Backend)',
        rating: 5,
        comment: 'Decent ride, knows good inner lane shortcuts when Hosur road is packed.',
        date: '4 days ago',
      },
      {
        reviewerName: 'Deepak R. (Security)',
        rating: 4,
        comment: 'Good driver, air conditioning was nice and chilled.',
        date: '2 weeks ago',
      },
      {
        reviewerName: 'Varun K. (Support)',
        rating: 4,
        comment: 'Good commute overall, on time departure.',
        date: '1 month ago',
      },
    ],
  },
];

export const CURRENT_USER = {
  name: 'Priya Sharma',
  email: 'priya@acme.com',
  company: 'Acme Corp',
  verified: true,
  rating: 4.9,
  reliabilityScore: 9.0, // /10
  co2SavedKg: 142.6,
  ecoCoins: 1640,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  defaultHome: '12.9750, 77.6000', // Richmond Town, Bangalore
  defaultOffice: '12.9352, 77.6245', // Acme Tech Park, Koramangala
};

export const REWARDS = [
  {
    id: 'coffee',
    title: 'Free Coffee Pass',
    partner: 'Cafe Coffee Day / Blue Tokai',
    coins: 500,
    description: 'Complimentary handcrafted brew or cappuccino at cafe kiosks near tech park entrance.',
    voucherCode: 'ACME-COFFEE-500-FREE',
    icon: '☕',
  },
  {
    id: 'parking',
    title: 'Free Reserved Carpool Parking',
    partner: 'Acme Tech Park Tower B',
    coins: 1000,
    description: 'Guaranteed prime shaded parking slot right next to the lobby elevators for 1 day.',
    voucherCode: 'ACME-PRK-1000-VIP',
    icon: '🚗',
  },
  {
    id: 'movie',
    title: 'Movie Ticket Voucher',
    partner: 'PVR Inox Cinemas Forum Mall',
    coins: 2000,
    description: '1 complimentary ticket for any 2D/3D movie screening on weekdays or weekends.',
    voucherCode: 'ACME-PVR-2000-TKT',
    icon: '🎟️',
  },
];

export const LEADERBOARD = [
  { rank: 1, name: 'Sneha Rao', badge: 'Mobility Champion', coins: 2450, co2Kg: 184.2 },
  { rank: 2, name: 'Arjun Mehta', badge: 'Daily Commuter', coins: 1980, co2Kg: 142.8 },
  { rank: 3, name: 'Priya Sharma (You)', badge: 'Green Star', coins: 1640, co2Kg: 128.6 },
  { rank: 4, name: 'Kavya Nair', badge: 'Eco Driver', coins: 1420, co2Kg: 112.4 },
];
