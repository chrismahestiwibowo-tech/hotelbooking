import React, { useState, useMemo } from "react";
import { ArrowLeft, ShieldCheck, CreditCard, Building, Calendar, Users, Info, Sparkles, Receipt } from "lucide-react";
import { Hotel, Room, SearchParams, Booking } from "../types";

interface BookingViewProps {
  hotel: Hotel;
  room: Room;
  searchParams: SearchParams;
  onSubmitBooking: (booking: Booking) => void;
  onBack: () => void;
}

export default function BookingView({
  hotel,
  room,
  searchParams,
  onSubmitBooking,
  onBack,
}: BookingViewProps) {
  // Personal Details state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Payment mock state list
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Dynamic calculations based on stays
  const nights = useMemo(() => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 2;
    const date1 = new Date(searchParams.checkIn);
    const date2 = new Date(searchParams.checkOut);
    const timeDiff = date2.getTime() - date1.getTime();
    if (isNaN(timeDiff)) return 2;
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days > 0 ? days : 2;
  }, [searchParams.checkIn, searchParams.checkOut]);

  const baseTotal = room.pricePerNight * nights;
  const taxesAndFees = Math.round(baseTotal * 0.12); // 12% dynamic tourism tax
  const wellnessFee = 45; // resort flat service fee
  const grandTotal = baseTotal + taxesAndFees + wellnessFee;

  // Handle submit form trigger
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone) {
      alert("Please complete all required fields.");
      return;
    }

    // Creating booking code mockup details
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `ELS-${hotel.city.substring(0, 3).toUpperCase()}-${randomSuffix}`;
    const bookedAt = new Date().toLocaleString();

    const bookingPayload: Booking = {
      id: `booking_${Date.now()}`,
      hotel,
      room,
      checkIn: searchParams.checkIn || new Date().toISOString().split("T")[0],
      checkOut: searchParams.checkOut || new Date().toISOString().split("T")[0],
      guestsCount: searchParams.guests || 2,
      guestName: `${firstName} ${lastName}`,
      guestEmail: email,
      guestPhone: phone,
      specialRequests: specialRequests || undefined,
      totalAmount: grandTotal,
      bookingCode,
      bookedAt,
    };

    onSubmitBooking(bookingPayload);
  };

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Return to room list */}
      <div>
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#c5a880] group-hover:translate-x-[-3px] transition-transform" />
          <span>Revise Room Selection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        
        {/* Left Column: Form Intake (60% weight) */}
        <div className="lg:col-span-3 space-y-8">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">Secure Your Sanctuary</h2>
            <p className="text-xs text-stone-500 font-light mt-1">Please provide the guest registration and confirmation detail fields below.</p>
          </div>

          <form onSubmit={handleConfirmReservation} className="space-y-8">
            
            {/* Step 1: Guest Personal details */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-5 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <span className="bg-stone-900 text-[#c5a880] w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold font-sans">1</span>
                <span>Primary Guest Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 text-xs text-stone-800 transition-colors bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 text-xs text-stone-800 transition-colors bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john.doe@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 text-xs text-stone-800 transition-colors bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Contact Telephone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 text-xs text-stone-800 transition-colors bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Special Accommodations Request (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Smoking preferences, early check-in, dynamic arrival times, extra towels, or accessibility guidelines..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 text-xs text-stone-800 transition-colors bg-stone-50/50 resize-none"
                />
              </div>
            </div>

            {/* Step 2: Payment simulation */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-5 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <span className="bg-stone-900 text-[#c5a880] w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold font-sans">2</span>
                <span>Secure Payment Reservation Simulator</span>
              </h3>

              {/* Secure banner */}
              <div className="bg-amber-50/80 border border-amber-200/50 rounded-xl p-4 text-xs text-amber-800 flex gap-2.5 items-start">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold block">Demo Sandbox Guarantee</span>
                  <span className="font-light block text-amber-700 font-sans leading-relaxed">
                    This is an educational design prototype. Standard network billing is mocked, meaning no charges are executed. <strong>Do NOT insert real sensitive credentials.</strong> Feel free to fill in mock characters to proceed.
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 text-xs text-stone-800 transition-colors bg-stone-50/50"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 pl-10 text-xs text-stone-800 transition-colors bg-stone-50/50"
                      />
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">Expiration</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full border border-stone-200 hover:border-stone-400 focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] rounded-xl p-3 text-xs text-stone-800 transition-colors bg-stone-50/50 text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submission triggers */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="submit"
                id="sumbit_booking_btn"
                className="w-full bg-[#c5a880] hover:bg-[#b39369] text-white font-semibold tracking-wider text-xs uppercase px-8 py-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Spot & Book Stay</span>
              </button>
              <span className="text-[10px] text-stone-400 font-sans uppercase font-medium">✦ 48-Hour Free Cancellation Apply</span>
            </div>

          </form>
        </div>

        {/* Right Column: Dynamic Invoice Ledger (40% weight) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-medium text-stone-900 border-b border-stone-200/60 pb-3 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#c5a880]" />
              <span>Sanctuary Invoice Ledger</span>
            </h3>

            {/* Resort preview */}
            <div className="flex gap-4 items-center bg-white p-3 rounded-xl border border-stone-100">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-20 h-16 rounded-lg object-cover flex-shrink-0 select-none"
              />
              <div className="min-w-0">
                <h4 className="font-serif text-xs font-semibold text-stone-900 truncate">{hotel.name}</h4>
                <p className="text-[10px] text-stone-400 truncate flex items-center gap-1 mt-0.5">
                  <Building className="w-3 h-3 flex-shrink-0 text-[#c5a880]" />
                  <span>{hotel.location}</span>
                </p>
                <span className="inline-block text-[9px] bg-amber-50 text-amber-800 font-bold px-1.5 py-0.5 rounded mt-1">
                  ★ {hotel.rating} Hotel
                </span>
              </div>
            </div>

            {/* Room choice preview */}
            <div className="space-y-2.5 text-xs text-stone-600 border-b border-stone-200 pb-5">
              <div className="flex justify-between items-center bg-stone-100/60 py-2 px-3 rounded-lg">
                <span className="font-bold text-stone-800 text-[10px] uppercase tracking-wider">Room Type Selected</span>
                <span className="font-semibold text-stone-950 font-serif">{room.name}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Stay: {nights} Nights</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>Limit: Up to {room.capacity} Guests</span>
                </div>
              </div>
            </div>

            {/* Billing items math stack */}
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Nightly Fare (${room.pricePerNight} x {nights} nights)</span>
                <span className="font-semibold text-stone-900">${baseTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 flex items-center gap-1">
                  <span>Local VAT & Tourism Surcharge (12%)</span>
                  <Sparkles className="w-3 h-3 text-[#c5a880]" />
                </span>
                <span className="font-semibold text-stone-900">${taxesAndFees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Fixed Wellness & Cleaning Fee</span>
                <span className="font-semibold text-stone-900">${wellnessFee}</span>
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-serif text-base font-normal text-stone-900">Calculated Sum</span>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#b39369]">${grandTotal}</span>
                  <span className="block text-[8px] text-stone-400 font-sans tracking-widest uppercase font-bold mt-0.5">All Inclusive Tariffs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secure disclaimer bar */}
          <div className="bg-white border border-stone-200/50 p-4 rounded-xl flex items-center gap-3 text-stone-400 text-[10px] font-sans leading-relaxed">
            <div className="bg-stone-50 p-2 rounded-lg border text-[#c5a880]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            </div>
            <span>
              Your transmission is protected by standard end-to-end 256-bit encryption. Refund requests can be processed self-service under rules.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
