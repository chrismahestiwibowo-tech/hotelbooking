import React, { useState } from "react";
import { Search, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Hotel, SearchParams } from "../types";
import { HOTELS } from "../data";

interface HomeViewProps {
  onSearch: (params: SearchParams) => void;
  onSelectHotel: (hotel: Hotel) => void;
}

export default function HomeView({ onSearch, onSelectHotel }: HomeViewProps) {
  // Setup default values for search criteria
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 3);

  const formatDateString = (d: Date) => {
    return d.toISOString().split("T")[0];
  };

  const [city, setCity] = useState("All");
  const [checkIn, setCheckIn] = useState(formatDateString(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateString(dayAfter));
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, checkIn, checkOut, guests });
  };

  // Extract unique cities from data for selection list
  const cities = ["All", ...Array.from(new Set(HOTELS.map((h) => h.city)))];

  // We show 3 featured hotels on home view
  const featuredHotels = HOTELS.slice(0, 3);

  return (
    <div className="fade-in space-y-16 pb-16">
      {/* Search Hero Section */}
      <section className="relative h-[540px] flex items-center justify-center rounded-3xl overflow-hidden mt-6 mx-4 sm:mx-8 lg:mx-12 shadow-xl">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1600"
            alt="Luxury Swimming Pool"
            className="w-full h-full object-cover scale-105 select-none"
          />
          <div className="absolute inset-0 bg-stone-900/40 backdrop-brightness-75" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5a880] mb-3 inline-block bg-stone-900/35 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Elysian Resorts & Hotels
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-normal text-stone-100">
            Find Sanctuary <span className="italic">Anywhere On Earth</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-200/90 max-w-2xl mx-auto font-light">
            Indulge in handpicked high-end hotels across New York, Paris, Rome, Kyoto and Maldives. Verified cleanliness, top-tier amenities, and best price guarantee.
          </p>

          {/* Booking Widget Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-white/95 text-stone-900 p-6 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-4 items-stretch justify-between text-left max-w-5xl mx-auto backdrop-blur-sm border border-stone-200/40"
          >
            {/* Destination Selection */}
            <div className="flex-1 min-w-[140px] border-b lg:border-b-0 lg:border-r border-stone-100 pb-3 lg:pb-0 lg:pr-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Destination</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-stone-800 bg-transparent font-medium focus:outline-none focus:ring-1 focus:ring-[#c5a880] rounded-md py-1 pr-2 cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="text-stone-900">
                    {c === "All" ? "Everywhere (All Cities)" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In Date */}
            <div className="flex-1 min-w-[140px] border-b lg:border-b-0 lg:border-r border-stone-100 pb-3 lg:pb-0 lg:pr-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Check In</span>
              </label>
              <input
                type="date"
                value={checkIn}
                min={formatDateString(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-stone-800 bg-transparent font-medium focus:outline-none focus:ring-1 focus:ring-[#c5a880] rounded-md py-1"
                required
              />
            </div>

            {/* Check-Out Date */}
            <div className="flex-1 min-w-[140px] border-b lg:border-b-0 lg:border-r border-stone-100 pb-3 lg:pb-0 lg:pr-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Check Out</span>
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || formatDateString(tomorrow)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-stone-800 bg-transparent font-medium focus:outline-none focus:ring-1 focus:ring-[#c5a880] rounded-md py-1"
                required
              />
            </div>

            {/* Guests Count */}
            <div className="flex-1 min-w-[120px] pb-3 lg:pb-0 lg:pr-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">
                <Users className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Guests count</span>
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="w-full text-stone-800 bg-transparent font-medium focus:outline-none focus:ring-1 focus:ring-[#c5a880] rounded-md py-1"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center">
              <button
                type="submit"
                id="search_hotels_btn"
                className="w-full lg:w-auto bg-stone-900 hover:bg-stone-800 text-[#c5a880] hover:text-white transition-all font-semibold tracking-wide text-xs uppercase px-7 py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-stone-800/10 active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>Search Hotels</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Popular Tourist Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs text-stone-400 font-semibold tracking-wider uppercase mb-2">Instant Inspiration</p>
          <h2 className="text-2xl font-serif text-stone-900">Explore Selected Collections</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {["New York", "Paris", "Kyoto", "Rome", "Maldives"].map((cityName) => (
              <button
                key={cityName}
                onClick={() => onSearch({ city: cityName, checkIn: formatDateString(tomorrow), checkOut: formatDateString(dayAfter), guests: 2 })}
                className="bg-white hover:bg-stone-50 border border-stone-200 hover:border-stone-400 px-5 /4 py-2.5 rounded-full text-xs font-semibold tracking-wider text-stone-700 transition-all flex items-center gap-1.5 shadow-sm hover:translate-y-[-1px] cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>{cityName}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-stone-100 pb-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880]">Our Favorites</span>
            <h2 className="text-3xl font-serif text-stone-900 mt-1">Featured Sanctuary Stays</h2>
          </div>
          <button
            onClick={() => onSearch({ city: "All", checkIn: formatDateString(tomorrow), checkOut: formatDateString(dayAfter), guests: 2 })}
            className="group flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors uppercase tracking-widest mt-2 sm:mt-0"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 text-[#c5a880] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Featured Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                />
                <span className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-sm text-stone-50 text-xs px-3.5 py-1.5 rounded-full font-light tracking-wide uppercase border border-stone-600/30">
                  {hotel.city}
                </span>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-stone-900 font-semibold px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}</span>
                </div>
              </div>

              {/* Box Details */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h3 className="font-serif text-xl font-normal text-stone-900 leading-snug group-hover:text-[#b39369] transition-colors">
                  {hotel.name}
                </h3>
                <p className="text-xs text-stone-400 font-medium flex items-center gap-1.5 mt-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{hotel.location}</span>
                </p>
                <p className="text-stone-500 text-xs font-light tracking-normal leading-relaxed mb-6 line-clamp-3">
                  {hotel.description}
                </p>
                <div className="mt-auto pt-5 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Prices from</span>
                    <span className="text-lg font-semibold text-stone-800">$180<span className="text-xs text-stone-400 font-light font-sans"> / night</span></span>
                  </div>
                  <button
                    onClick={() => onSelectHotel(hotel)}
                    className="bg-[#c5a880]/10 hover:bg-[#c5a880] text-stone-800 hover:text-white px-5 py-2.5 rounded-xl font-medium text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assurance / Values Section */}
      <section className="bg-stone-50 py-16 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="inline-block bg-stone-900 text-[#c5a880] p-3 rounded-2xl shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-medium text-stone-900">Best Price Guaranteed</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Found a lower price elsewhere? We will happily match it and provide an additional 10% coupon off your next booking with us. No questions asked.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-block bg-stone-900 text-[#c5a880] p-3 rounded-2xl shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-medium text-stone-900">Flexible Bookings</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                We understand that plans change. Enjoy free cancellation options up to 48 hours prior to your scheduled check-in on most room types.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-block bg-stone-900 text-[#c5a880] p-3 rounded-2xl shadow-sm">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-medium text-stone-900">Elysian Concierge 24/7</h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Our support team acts as your personal digital travel butler. Reach out via live support or text assistant for anything from dinner reservations to spa bookings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
