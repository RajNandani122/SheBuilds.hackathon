import React, { useState } from 'react';
import { Ride, UserProfile } from '../types/carpool';
import { 
  X, 
  Car, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Plus, 
  AlertCircle 
} from 'lucide-react';

interface OfferRideModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onOfferRideCreated: (ride: Ride) => void;
}

export const OfferRideModal: React.FC<OfferRideModalProps> = ({
  currentUser,
  onClose,
  onOfferRideCreated,
}) => {
  const [origin, setOrigin] = useState('Palo Alto (Stanford Campus)');
  const [originHub, setOriginHub] = useState('Tresidder Memorial Union / Oval');
  const [destination, setDestination] = useState('San Francisco (Financial District)');
  const [destinationHub, setDestinationHub] = useState('Salesforce Transit Center (Beale St)');
  const [departureDate, setDepartureDate] = useState('Tomorrow, Oct 10');
  const [departureTime, setDepartureTime] = useState('8:00 AM');
  const [returnTrip, setReturnTrip] = useState(true);
  const [returnTime, setReturnTime] = useState('5:30 PM');
  
  const [seats, setSeats] = useState(3);
  const [costPerSeat, setCostPerSeat] = useState(5.0);
  
  const [vehicleMake, setVehicleMake] = useState('Tesla');
  const [vehicleModel, setVehicleModel] = useState('Model 3');
  const [vehicleYear, setVehicleYear] = useState(2023);
  const [isEv, setIsEv] = useState(true);

  const [womenOnly, setWomenOnly] = useState(false);
  const [campusOnly, setCampusOnly] = useState(false);
  const [quietRide, setQuietRide] = useState(false);
  const [luggageAllowed, setLuggageAllowed] = useState<'backpack' | 'cabin_bag' | 'medium'>('backpack');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const distanceMiles = 32.5;
    const estDuration = 40;

    const newRide: Ride = {
      id: `ride_custom_${Date.now()}`,
      driver: {
        ...currentUser,
        role: 'both',
        vehicle: {
          make: vehicleMake,
          model: vehicleModel,
          year: vehicleYear,
          color: 'Pearl Silver',
          licensePlateMasked: '7ABC•••',
          evOrHybrid: isEv,
        },
      },
      origin,
      originHub,
      destination,
      destinationHub,
      distanceMiles,
      estimatedDurationMins: estDuration,
      departureDate,
      departureTime,
      returnTripAvailable: returnTrip,
      returnDepartureTime: returnTrip ? returnTime : undefined,
      totalSeats: seats,
      availableSeats: seats,
      costDetails: {
        totalFuelCost: Math.round(costPerSeat * seats * 0.35 * 100) / 100,
        totalTolls: 7.00,
        wearTearAllowance: Math.round(costPerSeat * seats * 0.25 * 100) / 100,
        totalTripCost: costPerSeat * seats,
        seatsOffered: seats,
        costPerPassenger: costPerSeat,
        soloDrivingCostEstimate: 21.00,
        rideshareAlternativeEstimate: 52.00,
      },
      waypoints: [
        { name: originHub, landmark: 'Departure Point', estimatedTime: departureTime, type: 'pickup' },
        { name: 'Bay Bridge / US-101 Carpool Lane', landmark: 'HOV 3+ Express Bypass', estimatedTime: '8:25 AM', type: 'stop' },
        { name: destinationHub, landmark: 'Final Destination Drop', estimatedTime: '8:40 AM', type: 'dropoff' },
      ],
      preferences: {
        womenOnly,
        campusNetworkOnly: campusOnly,
        quietRide,
        luggageAllowed,
        flexibleMinutes: 10,
      },
      aiMatchScore: 97,
      aiMatchReasoning: 'Newly listed community carpool along primary commuter artery. Verified peer credentials active.',
      ecoCoinsReward: 30,
      recurringDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      routeHighlights: ['FastTrak HOV Carpool lane access', 'Clean EV interior', 'Direct zero-detour route'],
      status: 'scheduled',
    };

    onOfferRideCreated(newRide);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Offer a Carpool Ride
            </h2>
            <div className="text-xs text-slate-500">
              Share empty car seats with verified commuters along your regular trip
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Section 1: Route & Waypoints */}
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              1. Route & Designated Pickup Spot
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departure City / Area
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  placeholder="e.g. Palo Alto, Berkeley"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Pickup Hub / Landmark
                </label>
                <input
                  type="text"
                  value={originHub}
                  onChange={(e) => setOriginHub(e.target.value)}
                  required
                  placeholder="e.g. Caltrain Plaza, Campus Union"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination City / Hub
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  placeholder="e.g. San Francisco Financial District"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Drop-off Hub
                </label>
                <input
                  type="text"
                  value={destinationHub}
                  onChange={(e) => setDestinationHub(e.target.value)}
                  required
                  placeholder="e.g. Salesforce Transit Center, Market & 2nd"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Date & Timing */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              2. Departure Schedule
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Commute Date
                </label>
                <input
                  type="text"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departure Time
                </label>
                <input
                  type="text"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  required
                  placeholder="8:00 AM"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Return Commute Option
                </label>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="returnTripCheckbox"
                    checked={returnTrip}
                    onChange={(e) => setReturnTrip(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="returnTripCheckbox" className="text-xs text-slate-700 cursor-pointer">
                    Offer evening return trip (5:30 PM)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Seats & Fair Price Contribution */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              3. Available Seats & Fair Cost Math
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seats Offered to Commuters
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSeats(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                        seats === num
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-slate-300 hover:border-slate-400 text-slate-700'
                      }`}
                    >
                      {num} {num === 1 ? 'Seat' : 'Seats'}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  3+ carpool riders allows toll discount and carpool diamond lane bypass.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fair Cost Contribution per Seat ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    step="0.5"
                    value={costPerSeat}
                    onChange={(e) => setCostPerSeat(parseFloat(e.target.value) || 1)}
                    className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 tabular-nums font-semibold"
                  />
                </div>
                <span className="text-[11px] text-emerald-700 mt-1 block">
                  Fair recommended price: $4.00 – $6.50 (covers bridge toll & electric energy split).
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Vehicle Information */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              4. Vehicle & Clean Energy
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Make
                </label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  required
                  placeholder="e.g. Tesla, Toyota, Honda"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Model & Year
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  required
                  placeholder="e.g. Model 3, Prius"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clean Energy Vehicle
                </label>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="evToggle"
                    checked={isEv}
                    onChange={(e) => setIsEv(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="evToggle" className="text-xs text-slate-700 cursor-pointer">
                    Electric (EV) or Hybrid
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Trust & Community Rules */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              5. Trust & Preference Controls
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={womenOnly}
                  onChange={(e) => setWomenOnly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Women-Only Carpool</div>
                  <div className="text-[11px] text-slate-500">Only verified female riders can book</div>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={campusOnly}
                  onChange={(e) => setCampusOnly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div>
                  <div className="text-xs font-semibold text-slate-900">University/Corporate Peers Only</div>
                  <div className="text-[11px] text-slate-500">Must have matching .edu or corporate email</div>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={quietRide}
                  onChange={(e) => setQuietRide(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div>
                  <div className="text-xs font-semibold text-slate-900">Quiet Commute Mode</div>
                  <div className="text-[11px] text-slate-500">Ideal for work, reading, or quiet rest</div>
                </div>
              </label>

              <div className="p-3 rounded-lg border border-slate-200">
                <div className="text-xs font-semibold text-slate-900 mb-1">Luggage Space Allowance</div>
                <select
                  value={luggageAllowed}
                  onChange={(e) => setLuggageAllowed(e.target.value as any)}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2 py-1"
                >
                  <option value="backpack">Backpack / Laptop bag only</option>
                  <option value="cabin_bag">Cabin rollaboard bag</option>
                  <option value="medium">Medium suitcase</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submission and Action */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Your ride will be verified and published to the live corridor feed.
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
              >
                Publish Carpool Ride
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
