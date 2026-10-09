import React, { useState } from 'react';
import { Booking } from '../types/carpool';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Car, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  PhoneCall, 
  RotateCcw, 
  Star, 
  KeyRound, 
  Navigation, 
  Check 
} from 'lucide-react';

interface MyRidesViewProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string, reason: string) => void;
  onUpdateStatus: (bookingId: string, status: Booking['status']) => void;
  onFindRides: () => void;
}

export const MyRidesView: React.FC<MyRidesViewProps> = ({
  bookings,
  onCancelBooking,
  onUpdateStatus,
  onFindRides,
}) => {
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings.length > 0 ? bookings[0].id : ''
  );
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('Schedule change / remote work day');
  const [copiedTripLink, setCopiedTripLink] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<{ [bookingId: string]: boolean }>({});
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTags, setReviewTags] = useState<string[]>(['Punctual', 'Smooth Driving']);

  const activeBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const handleShareTrip = (booking: Booking) => {
    const shareText = `TrustFirst Carpool Live Trip: I am riding with verified driver ${booking.ride.driver.name} (${booking.ride.driver.vehicle?.make} ${booking.ride.driver.vehicle?.model}, Plate: ${booking.ride.driver.vehicle?.licensePlateMasked}) from ${booking.ride.originHub} to ${booking.ride.destinationHub}. Pickup PIN: ${booking.pickupCodePin}.`;
    navigator.clipboard.writeText(shareText);
    setCopiedTripLink(true);
    setTimeout(() => setCopiedTripLink(false), 2500);
  };

  const handleConfirmCancel = (id: string) => {
    onCancelBooking(id, cancelReason);
    setCancellingId(null);
  };

  const toggleReviewTag = (tag: string) => {
    if (reviewTags.includes(tag)) {
      setReviewTags(reviewTags.filter((t) => t !== tag));
    } else {
      setReviewTags([...reviewTags, tag]);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <Car className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          No Booked Carpools Yet
        </h3>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          Search commuter routes along University or Silicon Valley corridors to find a matched carpool and start saving.
        </p>
        <button
          onClick={onFindRides}
          className="mt-6 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Explore Available Rides
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-1">
            Active Commute Dashboard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Carpool Bookings & Live Status
          </h2>
        </div>

        {/* Booking selector tabs */}
        {bookings.length > 1 && (
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {bookings.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setSelectedBookingId(b.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  (activeBooking && activeBooking.id === b.id)
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ride {idx + 1} ({b.ride.driver.name.split(' ')[0]})
              </button>
            ))}
          </div>
        )}
      </div>

      {activeBooking && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Ride Status & Interactive Simulation */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Ride Status
                  </span>
                  <div className="text-lg font-bold text-slate-900 capitalize flex items-center gap-2 mt-0.5">
                    {activeBooking.status === 'confirmed' && (
                      <span className="text-emerald-700">Scheduled & Confirmed</span>
                    )}
                    {activeBooking.status === 'on_the_way' && (
                      <span className="text-amber-700">Driver En Route to Pickup</span>
                    )}
                    {activeBooking.status === 'in_transit' && (
                      <span className="text-blue-700">In Transit (HOV Express Lane)</span>
                    )}
                    {activeBooking.status === 'completed' && (
                      <span className="text-slate-900">Trip Completed</span>
                    )}
                    {activeBooking.status === 'cancelled' && (
                      <span className="text-rose-700">Ride Cancelled</span>
                    )}
                  </div>
                </div>

                {/* Pickup PIN Card (Critical trust builder) */}
                {activeBooking.status !== 'cancelled' && (
                  <div className="bg-slate-900 text-white px-3.5 py-2 rounded-lg text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Pickup PIN</span>
                    <span className="text-lg font-mono font-bold tracking-widest text-emerald-400 tabular-nums">
                      {activeBooking.pickupCodePin}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Progress Stepper */}
              {activeBooking.status !== 'cancelled' && (
                <div className="py-4">
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className={`${activeBooking.status === 'confirmed' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                      1. Booked
                    </div>
                    <div className={`${activeBooking.status === 'on_the_way' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                      2. En Route
                    </div>
                    <div className={`${activeBooking.status === 'in_transit' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                      3. In Transit
                    </div>
                    <div className={`${activeBooking.status === 'completed' ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                      4. Completed
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full transition-all duration-300"
                      style={{
                        width:
                          activeBooking.status === 'confirmed' ? '25%' :
                          activeBooking.status === 'on_the_way' ? '50%' :
                          activeBooking.status === 'in_transit' ? '75%' : '100%',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Interactive Demo Simulation Controller for Hackathon Judges / Testers */}
              <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <div className="font-semibold text-slate-700 mb-2 flex items-center justify-between">
                  <span>Interactive Live Lifecycle Simulator:</span>
                  <span className="text-slate-500 font-normal">Test all ride states in real time</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(activeBooking.id, 'confirmed')}
                    className={`px-2.5 py-1 rounded border text-xs ${
                      activeBooking.status === 'confirmed' ? 'bg-emerald-600 text-white border-emerald-600 font-semibold' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Scheduled
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(activeBooking.id, 'on_the_way')}
                    className={`px-2.5 py-1 rounded border text-xs ${
                      activeBooking.status === 'on_the_way' ? 'bg-amber-600 text-white border-amber-600 font-semibold' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Driver En Route
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(activeBooking.id, 'in_transit')}
                    className={`px-2.5 py-1 rounded border text-xs ${
                      activeBooking.status === 'in_transit' ? 'bg-blue-600 text-white border-blue-600 font-semibold' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    In Transit
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(activeBooking.id, 'completed')}
                    className={`px-2.5 py-1 rounded border text-xs ${
                      activeBooking.status === 'completed' ? 'bg-slate-900 text-white border-slate-900 font-semibold' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              {/* Trip Route Details */}
              <div className="mt-5 space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">Pickup:</span> {activeBooking.ride.originHub}
                      <span className="text-slate-500 block">{activeBooking.ride.departureDate} at {activeBooking.ride.departureTime}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
                    <Navigation className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">Destination:</span> {activeBooking.ride.destinationHub}
                      <span className="text-slate-500 block">Est. travel time: ~{activeBooking.ride.estimatedDurationMins} mins</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Action Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleShareTrip(activeBooking)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {copiedTripLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedTripLink ? 'Trip Details Copied!' : 'Share Trip with Contact'}</span>
                </button>

                {activeBooking.status !== 'cancelled' && activeBooking.status !== 'completed' && (
                  <button
                    type="button"
                    onClick={() => setCancellingId(activeBooking.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 underline underline-offset-2"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>

            </div>

            {/* Post-Ride Rating & Review Flow (when completed) */}
            {activeBooking.status === 'completed' && (
              <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Rate Your Commute with {activeBooking.ride.driver.name}
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Mutual reviews build long-term safety and accountability within our verified commuter network.
                </p>

                {submittedReview[activeBooking.id] ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Thank you! Your 5.0★ review and safety badges have been recorded on {activeBooking.ride.driver.name}&apos;s profile.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Star selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-700 font-medium">Your Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setReviewRating(s)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                s <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-800 ml-2">{reviewRating}.0 / 5.0</span>
                    </div>

                    {/* Quick feedback tags */}
                    <div>
                      <span className="text-xs text-slate-700 font-medium block mb-2">
                        Safety & Commute Compliments:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {['Punctual', 'Smooth Driving', 'Great Conversation', 'Clean EV', 'Respectful of Quiet', 'Direct Route'].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleReviewTag(tag)}
                            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                              reviewTags.includes(tag)
                                ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittedReview({ ...submittedReview, [activeBooking.id]: true })}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Submit Commute Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Cancellation Drawer Modal */}
            {cancellingId === activeBooking.id && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-950">
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                  <span>Confirm Free Cancellation</span>
                </div>
                <p className="text-xs text-slate-600">
                  Under the TrustFirst policy, cancelling now releases your reserved seat back to fellow commuters with zero penalties.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reason for cancellation
                  </label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Schedule change / remote work day">Schedule change / remote work day</option>
                    <option value="Taking transit / public train">Taking transit / public train</option>
                    <option value="Need different departure time">Need different departure time</option>
                    <option value="Personal emergency">Personal emergency</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleConfirmCancel(activeBooking.id)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Confirm Cancellation
                  </button>
                  <button
                    type="button"
                    onClick={() => setCancellingId(null)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Keep Booking
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Driver Verification & Trust Card */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Driver Safety & Vehicle Dossier
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={activeBooking.ride.driver.avatar}
                  alt={activeBooking.ride.driver.name}
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {activeBooking.ride.driver.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {activeBooking.ride.driver.organization}
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold">
                    ★ {activeBooking.ride.driver.rating.toFixed(2)} · {activeBooking.ride.driver.trustScore}% Trust Score
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Vehicle:</span>
                  <span className="font-semibold text-slate-900">
                    {activeBooking.ride.driver.vehicle?.color} {activeBooking.ride.driver.vehicle?.make} {activeBooking.ride.driver.vehicle?.model}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Plate:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {activeBooking.ride.driver.vehicle?.licensePlateMasked} (CA)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Paid Fair Share:</span>
                  <span className="font-semibold text-emerald-700 tabular-nums">
                    ${activeBooking.totalPaid.toFixed(2)} ({activeBooking.seatsBooked} seat)
                  </span>
                </div>
              </div>

              {/* Safety Badges Checklist */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>State Government ID Verified</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Valid Driver License & Insurance verified</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Affiliation SSO Checked ({activeBooking.ride.driver.organization.split('·')[0].trim()})</span>
                </div>
              </div>
            </div>

            {/* Emergency Protocol Assistance */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
              <div className="font-semibold text-white flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>TrustFirst Safety Dispatch & Support</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                If vehicle assistance or urgent itinerary support is needed during your commute, our community safety team is on standby 24/7.
              </p>
              <div className="pt-1 flex items-center justify-between text-slate-400">
                <span>Trip Reference:</span>
                <span className="font-mono text-emerald-300">{activeBooking.id}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
