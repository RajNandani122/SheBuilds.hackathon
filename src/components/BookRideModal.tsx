import React, { useState } from 'react';
import { Ride, Booking } from '../types/carpool';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Car, 
  CheckCircle2, 
  Lock, 
  Calendar, 
  Sparkles, 
  Leaf 
} from 'lucide-react';

interface BookRideModalProps {
  ride: Ride;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookRideModal: React.FC<BookRideModalProps> = ({
  ride,
  onClose,
  onConfirmBooking,
}) => {
  const [seats, setSeats] = useState(1);
  const [passengerName, setPassengerName] = useState('Jordan Taylor');
  const [emergencyPhone, setEmergencyPhone] = useState('+1 (555) 349-8821');
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedRecurringDays, setSelectedRecurringDays] = useState<string[]>(
    ride.recurringDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  );
  const [pickupNote, setPickupNote] = useState('');
  const [agreedToSafetyRules, setAgreedToSafetyRules] = useState(true);

  const costPerSeat = ride.costDetails.costPerPassenger;
  
  // Weekly recurring calculation with 10% non-profit multi-ride consistency discount
  const weeklyTripsCount = isRecurring ? selectedRecurringDays.length : 1;
  const baseCost = costPerSeat * seats * weeklyTripsCount;
  const discountMultiplier = isRecurring ? 0.9 : 1.0;
  const totalCost = baseCost * discountMultiplier;

  const toggleDay = (day: string) => {
    if (selectedRecurringDays.includes(day)) {
      if (selectedRecurringDays.length > 1) {
        setSelectedRecurringDays(selectedRecurringDays.filter(d => d !== day));
      }
    } else {
      setSelectedRecurringDays([...selectedRecurringDays, day]);
    }
  };

  const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToSafetyRules) return;

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      rideId: ride.id,
      ride: ride,
      passengerName: passengerName || 'Jordan Taylor',
      passengerEmail: 'jordan.t@stanford.edu',
      passengerOrg: 'Stanford University (Verified)',
      passengerAvatar: ride.driver.avatar,
      seatsBooked: seats,
      totalPaid: totalCost,
      pickupCodePin: generatedPin,
      bookedAt: 'Just now',
      isRecurringWeekly: isRecurring,
      recurringDaysSelected: isRecurring ? selectedRecurringDays : undefined,
      status: 'confirmed',
    };

    onConfirmBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Confirm Seat Reservation
            </h2>
            <div className="text-xs text-slate-500">
              Direct peer cost-share · Non-commercial carpool
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

        <form onSubmit={handleConfirm} className="p-6 space-y-5">
          
          {/* Driver & Trip Recap */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={ride.driver.avatar}
                alt={ride.driver.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-emerald-500/20"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">
                  Driver: {ride.driver.name}
                </div>
                <div className="text-xs text-slate-500">
                  {ride.driver.organization} · {ride.driver.rating}★
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded block">
                  PRRS {ride.driver.prrsScore}%
                </span>
                <span className="text-[10px] text-slate-500">Predictive Reliability</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Pickup:</strong> {ride.originHub} at <strong className="text-emerald-700">{ride.departureTime}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span><strong>Drop-off:</strong> {ride.destinationHub}</span>
              </div>
              <div className="flex items-start gap-2">
                <Car className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span><strong>Vehicle:</strong> {ride.driver.vehicle?.color} {ride.driver.vehicle?.make} {ride.driver.vehicle?.model} (Plate: {ride.driver.vehicle?.licensePlateMasked})</span>
              </div>
            </div>
          </div>

          {/* Recurring Weekly Booking Feature */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Recurring Weekly Seat Booking
                </span>
              </div>
              <input
                type="checkbox"
                id="recurringToggle"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Lock in your seat for your regular work or lecture schedule. Guaranteed seat each week with a 10% consistency discount.
            </p>

            {isRecurring && (
              <div className="pt-2 border-t border-emerald-200 space-y-2">
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Select Days of the Week:
                </span>
                <div className="flex items-center gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => {
                    const isSelected = selectedRecurringDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] text-emerald-800 font-medium">
                  {selectedRecurringDays.length} commutes/week booked with 10% carpooler discount applied.
                </div>
              </div>
            )}
          </div>

          {/* Seat Count Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Number of Seats
            </label>
            <div className="flex items-center gap-3">
              {[1, 2].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSeats(num)}
                  disabled={num > ride.availableSeats}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    seats === num
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : num > ride.availableSeats
                      ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border-slate-300 hover:border-slate-400 text-slate-700'
                  }`}
                >
                  {num} Seat{num > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Passenger Contact & Emergency Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Emergency Contact Phone
              </label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Pickup Landmark Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note for Driver (Optional)
            </label>
            <input
              type="text"
              value={pickupNote}
              onChange={(e) => setPickupNote(e.target.value)}
              placeholder="e.g. Waiting near bicycle racks wearing blue backpack"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* EcoCoins reward badge */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
            <span className="text-emerald-950 font-medium flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Earn +{ride.ecoCoinsReward * (isRecurring ? selectedRecurringDays.length : 1)} EcoCoins on this ride</span>
            </span>
            <span className="text-emerald-700 font-bold">Redeemable for Coffee & Tolls</span>
          </div>

          {/* Pricing Total Summary */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-sm">
            <div>
              <span className="text-slate-500 text-xs block">
                {isRecurring ? `Weekly Total (${selectedRecurringDays.length} trips)` : 'One-Way Fair Contribution'}
              </span>
              <span className="font-bold text-slate-900 text-lg tabular-nums">
                ${totalCost.toFixed(2)}
              </span>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span>Zero surge pricing applied</span>
              {isRecurring && <div className="text-emerald-700 font-medium">Includes 10% multi-commute discount</div>}
            </div>
          </div>

          {/* Agreement Checkbox */}
          <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToSafetyRules}
              onChange={(e) => setAgreedToSafetyRules(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-0.5"
            />
            <span>
              I agree to the TrustFirst community safety code: courteous behavior, punctuality, and zero commercial resale of carpool seats.
            </span>
          </label>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreedToSafetyRules}
              className={`px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors shadow-xs ${
                agreedToSafetyRules
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Confirm & Reserve Seat (${totalCost.toFixed(2)})
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
