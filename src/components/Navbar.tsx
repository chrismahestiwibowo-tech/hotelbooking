import React from "react";
import { Hotel as HotelIcon, Compass, Sparkles, BookOpen } from "lucide-react";

interface NavbarProps {
  onNavigate: (view: "home" | "list" | "details" | "booking" | "confirmation") => void;
  activeView: string;
  hasActiveBooking: boolean;
  onViewActiveBooking: () => void;
}

export default function Navbar({
  onNavigate,
  activeView,
  hasActiveBooking,
  onViewActiveBooking,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 text-stone-900 hover:text-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-200 rounded-lg p-1"
          >
            <div className="bg-stone-900 text-[#c5a880] p-2 rounded-lg">
              <HotelIcon className="w-5 h-5" />
            </div>
            <span className="font-serif text-lg tracking-wide font-semibold text-stone-900">
              Elysian Stay
            </span>
          </button>

          {/* Navigation Items */}
          <nav className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate("home")}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
                activeView === "home"
                  ? "text-stone-900 border-b border-stone-800 pb-0.5"
                  : "text-stone-600 hover:text-stone-900 pb-0.5"
              }`}
            >
              <Compass className="w-4 h-4 text-stone-400" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => onNavigate("list")}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
                activeView === "list"
                  ? "text-stone-900 border-b border-stone-800 pb-0.5"
                  : "text-stone-600 hover:text-stone-900 pb-0.5"
              }`}
            >
              <Sparkles className="w-4 h-4 text-stone-400" />
              <span>Destinations</span>
            </button>

            {hasActiveBooking && (
              <button
                onClick={onViewActiveBooking}
                className="relative flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/80 text-amber-900 px-3.5 py-1.5 rounded-full border border-amber-200/60 font-medium text-xs tracking-wider uppercase transition-all"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a880]"></span>
                </span>
                <BookOpen className="w-3.5 h-3.5" />
                <span>My Booking</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
