export type VerificationBadge = 
  | 'university_verified'
  | 'corporate_verified'
  | 'id_verified'
  | 'driver_license_verified'
  | 'background_checked';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'commuter' | 'driver' | 'both';
  organization: string;
  organizationDomain?: string; // e.g. "stanford.edu", "stripe.com"
  organizationType: 'university' | 'corporate' | 'general';
  verificationBadges: VerificationBadge[];
  trustScore: number; // 90-100 scale
  prrsScore: number; // 90.0 - 99.9% Predictive Ride Reliability Score
  prrsDetails: {
    punctualityRate: number; // e.g. 98.4%
    cancellationRate: number; // e.g. 0.8%
    streakDays: number;
    reliabilityTier: 'Diamond Confirmed' | 'Gold Reliable' | 'Rising Commuter';
  };
  ecoCoins: number; // Sustainability currency
  lifetimeCo2SavedKg: number;
  totalRides: number;
  rating: number;
  joinedDate: string;
  vehicle?: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlateMasked: string;
    evOrHybrid: boolean;
  };
  commuteVibes: {
    talkative: 'quiet' | 'moderate' | 'friendly';
    music: 'podcast' | 'pop/indie' | 'silence' | 'any';
    acTemperature: 'cool' | 'moderate' | 'warm';
    petsAllowed: boolean;
    luggageSpace: 'backpack_only' | 'small_suitcase' | 'spacious';
  };
}

export interface RideWaypoint {
  name: string;
  landmark: string;
  estimatedTime: string;
  type: 'pickup' | 'stop' | 'dropoff';
  lat?: number;
  lng?: number;
}

export interface RideCostDetails {
  totalFuelCost: number;
  totalTolls: number;
  wearTearAllowance: number;
  totalTripCost: number;
  seatsOffered: number;
  costPerPassenger: number;
  soloDrivingCostEstimate: number;
  rideshareAlternativeEstimate: number;
}

export interface Ride {
  id: string;
  driver: UserProfile;
  origin: string;
  originHub: string;
  destination: string;
  destinationHub: string;
  distanceMiles: number;
  estimatedDurationMins: number;
  departureDate: string;
  departureTime: string;
  returnTripAvailable: boolean;
  returnDepartureTime?: string;
  recurringDays?: string[]; // e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  totalSeats: number;
  availableSeats: number;
  costDetails: RideCostDetails;
  waypoints: RideWaypoint[];
  preferences: {
    womenOnly: boolean;
    campusNetworkOnly: boolean;
    quietRide: boolean;
    luggageAllowed: 'backpack' | 'cabin_bag' | 'medium';
    flexibleMinutes: number;
  };
  aiMatchScore?: number;
  aiMatchReasoning?: string;
  ecoCoinsReward: number; // Coins earned per passenger
  routeHighlights: string[];
  status: 'scheduled' | 'boarding' | 'in_transit' | 'completed' | 'cancelled';
}

export interface Booking {
  id: string;
  rideId: string;
  ride: Ride;
  passengerName: string;
  passengerEmail: string;
  passengerOrg: string;
  passengerAvatar: string;
  seatsBooked: number;
  totalPaid: number;
  pickupCodePin: string;
  bookedAt: string;
  isRecurringWeekly?: boolean;
  recurringDaysSelected?: string[];
  status: 'confirmed' | 'on_the_way' | 'in_transit' | 'completed' | 'cancelled';
  cancellationReason?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  provider: string;
  category: 'coffee' | 'toll' | 'charging' | 'parking' | 'books';
  costEcoCoins: number;
  description: string;
  codePlaceholder: string;
  popular?: boolean;
}

export interface CampusLeaderboardEntry {
  rank: number;
  name: string;
  community: string;
  co2SavedKg: number;
  ecoCoins: number;
  ridesCount: number;
}
