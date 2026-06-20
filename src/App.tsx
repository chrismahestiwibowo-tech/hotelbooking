import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import HotelListView from "./components/HotelListView";
import RoomDetailsView from "./components/RoomDetailsView";
import BookingView from "./components/BookingView";
import ConfirmationView from "./components/ConfirmationView";
import { Hotel, Room, SearchParams, Booking } from "./types";

export default function App() {
  // Navigation View Controller
  const [view, setView] = useState<
    "home" | "list" | "details" | "booking" | "confirmation"
  >("home");

  // State keepers
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // Default parameters initialization
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 3);

  const formatDateString = (d: Date) => {
    return d.toISOString().split("T")[0];
  };

  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: "All",
    checkIn: formatDateString(tomorrow),
    checkOut: formatDateString(dayAfter),
    guests: 2,
  });

  // Action: Handle searches from home widget
  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setView("list");
  };

  // Action: Select hotel deep details
  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setView("details");
  };

  // Action: Select room details
  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setView("booking");
  };

  // Action: Submit booking confirmation
  const handleSubmitBooking = (bookingPayload: Booking) => {
    setActiveBooking(bookingPayload);
    setView("confirmation");
  };

  // Action: Reset parameters completely or clear stays
  const handleResetSearch = () => {
    setSearchParams({
      city: "All",
      checkIn: formatDateString(tomorrow),
      checkOut: formatDateString(dayAfter),
      guests: 2,
    });
  };

  const handleRestart = () => {
    // Clear selections to allow exploring other options
    setSelectedHotel(null);
    setSelectedRoom(null);
    setActiveBooking(null);
    setView("home");
  };

  // View renderer switcher
  const renderView = () => {
    switch (view) {
      case "home":
        return (
          <HomeView
            onSearch={handleSearch}
            onSelectHotel={handleSelectHotel}
          />
        );
      case "list":
        return (
          <HotelListView
            searchParams={searchParams}
            onSelectHotel={handleSelectHotel}
            onResetSearch={handleResetSearch}
          />
        );
      case "details":
        if (!selectedHotel) {
          setView("home");
          return null;
        }
        return (
          <RoomDetailsView
            hotel={selectedHotel}
            searchParams={searchParams}
            onSelectRoom={handleSelectRoom}
            onBack={() => setView("list")}
          />
        );
      case "booking":
        if (!selectedHotel || !selectedRoom) {
          setView("home");
          return null;
        }
        return (
          <BookingView
            hotel={selectedHotel}
            room={selectedRoom}
            searchParams={searchParams}
            onSubmitBooking={handleSubmitBooking}
            onBack={() => setView("details")}
          />
        );
      case "confirmation":
        if (!activeBooking) {
          setView("home");
          return null;
        }
        return (
          <ConfirmationView
            booking={activeBooking}
            onRestart={handleRestart}
          />
        );
      default:
        return <HomeView onSearch={handleSearch} onSelectHotel={handleSelectHotel} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/60 selection:bg-[#c5a880]/30 select-text">
      {/* Universal Sticky Header */}
      <Navbar
        activeView={view}
        onNavigate={(targetView) => {
          // Guard detail checks
          if (targetView === "details" && !selectedHotel) return;
          if (targetView === "booking" && (!selectedHotel || !selectedRoom)) return;
          if (targetView === "confirmation" && !activeBooking) return;
          setView(targetView);
        }}
        hasActiveBooking={activeBooking !== null}
        onViewActiveBooking={() => setView("confirmation")}
      />

      {/* Primary Display Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-0 sm:px-4">
        {renderView()}
      </main>

      {/* Minimal Aesthetic Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 border-t border-stone-800 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="font-serif text-stone-300 font-light text-sm">Elysian Stay Resorts & Hotels</p>
          <p className="font-light tracking-wide max-w-md mx-auto text-[11px] text-stone-500">
            Providing hand-vetted luxury destinations globally. Clean sheets, best fares, and absolute sanctuary guaranteed offline.
          </p>
          <div className="text-stone-600 pt-4 border-t border-stone-800/60 font-mono text-[9px] uppercase tracking-widest">
            © 2026 Elysian Stay Group LLC • Authorized Digital Agent
          </div>
        </div>
      </footer>
    </div>
  );
}
