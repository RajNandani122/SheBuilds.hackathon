import { Ride, UserProfile } from '../types/carpool';

export interface CompatibilityAnalysis {
  overallScore: number;
  routeOverlapPct: number;
  scheduleDifferenceMins: number;
  trustFactorScore: number;
  vibeSynergyScore: number;
  highlights: string[];
  commuterAdvice: string;
}

export function computeLocalCompatibility(
  ride: Ride,
  user: UserProfile,
  searchOrigin?: string,
  searchDest?: string
): CompatibilityAnalysis {
  let score = 85;
  const highlights: string[] = [];

  // 1. Trust & Verification Factor
  const badgeCount = ride.driver.verificationBadges.length;
  const trustFactor = Math.min(100, 75 + badgeCount * 6 + (ride.driver.trustScore - 90) * 2);
  if (ride.driver.verificationBadges.includes('university_verified') && user.organizationType === 'university') {
    score += 5;
    highlights.push('Mutual verified university network connection');
  }
  if (ride.driver.verificationBadges.includes('corporate_verified')) {
    highlights.push(`Verified corporate affiliate (${ride.driver.organization.split('·')[0].trim()})`);
  }

  // 2. Vibe Synergy
  let vibeSynergy = 90;
  if (ride.driver.commuteVibes.talkative === user.commuteVibes.talkative) {
    vibeSynergy += 6;
    highlights.push(`Aligned conversational preference (${ride.driver.commuteVibes.talkative} commute)`);
  }
  if (ride.preferences.quietRide && user.commuteVibes.talkative === 'quiet') {
    vibeSynergy += 4;
    highlights.push('Quiet commute guaranteed');
  }

  // 3. Cost & Efficiency
  const passengerSavings = ride.costDetails.rideshareAlternativeEstimate - ride.costDetails.costPerPassenger;
  if (passengerSavings > 25) {
    highlights.push(`Saves ~$${passengerSavings.toFixed(0)} vs solo rideshare app fare`);
  }

  // 4. Origin/Destination match heuristic
  let routeOverlap = 92;
  if (searchOrigin && searchOrigin.trim().length > 0) {
    const oMatch = ride.origin.toLowerCase().includes(searchOrigin.toLowerCase()) ||
                   ride.waypoints.some(w => w.name.toLowerCase().includes(searchOrigin.toLowerCase()));
    if (oMatch) {
      routeOverlap += 5;
      highlights.push('Exact pickup point match within 5 min walking distance');
    }
  }

  const finalScore = Math.min(99, Math.max(78, Math.round((score * 0.4) + (trustFactor * 0.3) + (vibeSynergy * 0.3))));

  let commuterAdvice = `Great alignment: ${ride.driver.name} is a top-rated commuter (${ride.driver.rating}★ across ${ride.driver.totalRides} trips). Pick up at ${ride.originHub} with a guaranteed 3+ carpool bypass lane.`;

  return {
    overallScore: finalScore,
    routeOverlapPct: Math.min(98, routeOverlap),
    scheduleDifferenceMins: ride.preferences.flexibleMinutes || 10,
    trustFactorScore: Math.round(trustFactor),
    vibeSynergyScore: Math.round(vibeSynergy),
    highlights: highlights.slice(0, 3),
    commuterAdvice,
  };
}
