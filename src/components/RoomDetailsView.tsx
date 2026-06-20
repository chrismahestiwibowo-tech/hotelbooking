import React, { useMemo } from "react";
import { ArrowLeft, Star, MapPin, Check, Info, Users, Trees, Bed, Maximize, Shield, HelpCircle, Pocket } from "lucide-react";
import { Hotel, Room, SearchParams } from "../types";
import { ROOMS_BY_HOTEL } from "../data";

interface RoomDetailsViewProps {
  hotel: Hotel;
  searchParams: SearchParams;
  onSelectRoom: (room: Room) => void;
  onBack: () => void;
}

export default function RoomDetailsView({
  hotel,
  searchParams,
  onSelectRoom,
  onBack,
}: RoomDetailsViewProps) {
  // Get rooms for this hotel
  const rooms = useMemo(() => {
    return ROOMS_BY_HOTEL[hotel.id] || [];
  }, [hotel.id]);

  // Calculate dynamic stay nights
  const nights = useMemo(() => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 2;
    const date1 = new Date(searchParams.checkIn);
    const date2 = new Date(searchParams.checkOut);
    const timeDiff = date2.getTime() - date1.getTime();
    if (isNaN(timeDiff)) return 2;
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days > 0 ? days : 2;
  }, [searchParams.checkIn, searchParams.checkOut]);

  // Mock guest testimonials based on destination of hotel
  const testimonials = [
    {
      guest: "Elena Rostova",
      date: "May 2026",
      rating: 5,
      comment: "Absolutely pristine. The service was impeccable from the moment our taxi pulled up. The details and architecture here feel like a private masterpiece.",
    },
    {
      guest: "Arthur Pendelton",
      date: "April 2026",
      rating: 4.8,
      comment: "A magnificent retreat. We spent our mornings in the private spa. The design choices, high ceilings, and beautiful lighting made this stay unforgettable.",
    },
  ];

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back CTA Router */}
      <div>
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#c5a880] group-hover:translate-x-[-3px] transition-transform" />
          <span>See All Hoteles</span>
        </button>
      </div>

      {/* Hotel Large Display Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Banner with absolute controls */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden h-[330px] lg:h-[450px] relative shadow-lg">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/10 to-transparent" />
          <div className="absolute top-4 left-4 bg-[#c5a880] text-stone-900 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
            Luxury Standard
          </div>
        </div>

        {/* Short info descriptor panel */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1 bg-amber-50 text-[#b39369] px-3 py-1 rounded-full text-xs font-medium w-fit border border-amber-200/50">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{hotel.rating} Rating ({hotel.reviewCount} verified guests)</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight leading-tight">
              {hotel.name}
            </h1>
            <p className="text-stone-500 text-xs font-semibold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span>{hotel.location} • {hotel.city}</span>
            </p>
          </div>

          <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
            {hotel.description}
          </p>

          <div className="pt-4 border-t border-stone-200/50 space-y-3">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Sanctuary Core Perks</span>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="bg-white border border-stone-200 text-stone-700 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-light"
                >
                  <Check className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main split grid: Rooms on the right, informational blueprints on the left */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left column: Testimonials & Site Blueprints */}
        <section className="space-y-8 lg:sticky lg:top-24">
          
          {/* Calendar Trip Parameters summary */}
          <div className="bg-stone-900 text-[#c5a880] p-6 rounded-2xl space-y-4 shadow-md">
            <h3 className="font-serif text-lg font-normal text-white border-b border-stone-800 pb-2 flex items-center gap-2">
              <Pocket className="w-4 h-4 text-[#c5a880]" />
              <span>Stay Parameters</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px] tracking-wider mb-0.5">Check In Date</span>
                <span className="text-stone-100 font-medium">{searchParams.checkIn || "Tomorrow"}</span>
              </div>
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px] tracking-wider mb-0.5">Check Out Date</span>
                <span className="text-stone-100 font-medium">{searchParams.checkOut || "Next day"}</span>
              </div>
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px] tracking-wider mb-0.5">Guest Count Limit</span>
                <span className="text-stone-100 font-medium">{searchParams.guests} Persons</span>
              </div>
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px] tracking-wider mb-0.5">Stay Length</span>
                <span className="text-stone-100 font-medium text-xs bg-stone-800 px-2 py-0.5 rounded-full inline-block border border-stone-700">{nights} Nights</span>
              </div>
            </div>
            <div className="bg-stone-800/50 p-3 rounded-xl border border-stone-700 text-[10px] text-stone-300 font-sans leading-relaxed">
              Price calculations shown next to room options automatically account for the <strong>{nights} nights multiplier</strong>.
            </div>
          </div>

          {/* Interactive Layout blueprint sketch */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-stone-900">
              Resort Level Blueprint
            </h3>
            <div className="relative border-2 border-dashed border-stone-200 rounded-xl p-4 bg-stone-50 overflow-hidden">
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono uppercase">
                <div className="bg-white border rounded p-2 text-stone-400">Rear Garden</div>
                <div className="bg-[#c5a880]/10 border border-[#c5a880]/40 rounded p-2 text-stone-800 font-semibold shadow-sm col-span-2">Private Lagoon</div>
                <div className="bg-[#c5a880]/15 border border-[#c5a880]/40 rounded p-3 text-[#b39369] font-semibold col-span-2 shadow-sm">Your Luxury Suites</div>
                <div className="bg-white border rounded p-2 text-stone-400">Concierge Lobby</div>
                <div className="bg-white border rounded p-2 text-stone-400 font-semibold col-span-3">Rooftop Pool & Lounge</div>
              </div>
              <div className="mt-3 text-center text-stone-400 text-[9px] uppercase tracking-widest font-mono">
                ✦ High Security Enclave Plan ✦
              </div>
            </div>
          </div>

          {/* Customer Feedback */}
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-medium text-stone-900">Verified Guest Reviews</h3>
            <div className="space-y-4">
              {testimonials.map((test, index) => (
                <div key={index} className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-stone-800">{test.guest}</span>
                    <span className="text-[10px] text-stone-400">{test.date}</span>
                  </div>
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-500 font-light text-xs italic leading-relaxed">
                    "{test.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right column: Room Selection Blocks */}
        <section className="lg:col-span-2 space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-normal text-stone-900">Select Your Private Sanctuary</h2>
            <p className="text-xs text-stone-500 font-light">Choose from our curated room tiers. Live pricing is fully calculated.</p>
          </div>

          <div className="space-y-8">
            {rooms.map((room) => {
              const totalPrice = room.pricePerNight * nights;
              const hasCapacityIssues = searchParams.guests > room.capacity;
              
              return (
                <div
                  key={room.id}
                  className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group relative ${
                    hasCapacityIssues ? "border-stone-200 opacity-90" : "border-stone-200"
                  }`}
                >
                  {/* Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto min-h-48 relative overflow-hidden flex-shrink-0">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform select-none"
                    />
                    <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-sm text-stone-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {room.size}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-serif text-lg font-normal text-stone-900 group-hover:text-[#b39369] transition-colors">
                          {room.name}
                        </h4>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                          room.availableCount <= 1 
                            ? "bg-[#c5a880]/15 text-stone-800" 
                            : "bg-[#c5a880]/10 text-stone-800"
                        }`}>
                          Only {room.availableCount} left
                        </span>
                      </div>

                      <p className="text-stone-500 text-xs font-light leading-relaxed mt-2.5 mb-4">
                        {room.description}
                      </p>

                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6 bg-stone-50/75 p-3 rounded-xl border border-stone-200/40 text-stone-600 text-xs font-light">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-stone-400" />
                          <span>Cap: Up to {room.capacity} Guests</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-stone-400" />
                          <span>{room.bedType}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize className="w-4 h-4 text-stone-400" />
                          <span>{room.size} Space Floor Plan</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-[#c5a880]" />
                          <span>Free Spa access included</span>
                        </div>
                      </div>

                      {/* Amenities Icons Row */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {room.amenities.map((a) => (
                          <span key={a} className="bg-white border border-stone-200/80 text-stone-500 rounded text-[10px] px-2 py-0.5">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Book Action Block */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-baseline gap-1 text-stone-900">
                          <span className="text-lg font-bold">${room.pricePerNight}</span>
                          <span className="text-[10px] text-stone-400 font-sans tracking-wide">/ PER NIGHT</span>
                        </div>
                        <div className="text-xs text-[#b39369] font-medium mt-0.5">
                          Total stays: ${totalPrice} for {nights} nights
                        </div>
                      </div>

                      {hasCapacityIssues ? (
                        <div className="bg-stone-50 px-3 py-2.5 rounded-lg text-stone-500 text-[10px] font-sans flex items-center gap-1.5 border border-stone-200 italic">
                          <Info className="w-3.5 h-3.5 text-stone-400" />
                          <span>Incompatible with guest limit ({searchParams.guests} guests selected)</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onSelectRoom(room)}
                          className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-[#c5a880] hover:text-white font-medium tracking-wide text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
                        >
                          Select & Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
