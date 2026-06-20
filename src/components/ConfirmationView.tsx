import React, { useState } from "react";
import { Check, Calendar, Users, MapPin, Printer, ExternalLink, RefreshCw, Sparkles, ShieldAlert, FileText } from "lucide-react";
import { Booking } from "../types";

interface ConfirmationViewProps {
  booking: Booking;
  onRestart: () => void;
}

export default function ConfirmationView({ booking, onRestart }: ConfirmationViewProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  // Simulated print / PDF download flow
  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      window.print();
    }, 1200);
  };

  return (
    <div className="fade-in max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Visual Header check circle */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center bg-stone-900 border-2 border-[#c5a880] text-[#c5a880] w-16 h-16 rounded-full shadow-lg shadow-stone-900/10 animate-bounce">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a880] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Booking Confirmed</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Your Sanctuary Awaits
          </h2>
          <p className="text-xs text-stone-400 font-light font-sans mt-1">
            Thank you, <strong className="text-stone-700 font-semibold">{booking.guestName}</strong>. Your luxury stay has been secured under our direct reservation guarantee.
          </p>
        </div>
      </div>

      {/* Main visual invoice ticket */}
      <section className="bg-white border-2 border-stone-200 rounded-3xl overflow-hidden shadow-xl divide-y divide-stone-100">
        
        {/* Ticket Header */}
        <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="block text-[10px] text-[#c5a880] uppercase tracking-widest font-bold">Booking Code Record</span>
            <span className="font-mono text-xl sm:text-2xl font-semibold tracking-wider text-white select-all">
              {booking.bookingCode}
            </span>
          </div>
          <div className="bg-stone-800 border border-stone-700 px-4 py-2 rounded-xl text-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="text-stone-300 font-medium">Guaranteed Status</span>
          </div>
        </div>

        {/* Resort specifics summary */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex gap-4 items-center">
            <img
              src={booking.hotel.image}
              alt={booking.hotel.name}
              className="w-24 h-18 sm:w-28 sm:h-20 rounded-xl object-cover shadow-sm select-none"
            />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Sanctuary</span>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-stone-900 truncate">
                {booking.hotel.name}
              </h3>
              <p className="text-stone-500 text-xs flex items-center gap-1 mt-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>{booking.hotel.location}, {booking.hotel.city}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100 text-xs">
            <div>
              <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider mb-1">Room Class</span>
              <span className="font-serif font-semibold text-stone-800 block text-xs truncate">
                {booking.room.name}
              </span>
            </div>
            <div>
              <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider mb-1">Check-In</span>
              <span className="font-medium text-stone-800 text-xs block truncate">
                {booking.checkIn}
              </span>
            </div>
            <div>
              <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider mb-1">Check-Out</span>
              <span className="font-medium text-stone-800 text-xs block truncate">
                {booking.checkOut}
              </span>
            </div>
            <div>
              <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider mb-1">Occupancy Limit</span>
              <span className="font-medium text-stone-800 text-xs block flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span>{booking.guestsCount} Persons</span>
              </span>
            </div>
          </div>
        </div>

        {/* Customer specifications file details */}
        <div className="p-6 sm:p-8 bg-stone-50/70 space-y-4 text-xs font-light">
          <h4 className="font-bold text-[10px] uppercase text-stone-400 tracking-wider">Registered Guest Profile</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-4 font-sans">
            <div>
              <span className="block text-stone-400 text-[10px] uppercase font-semibold">Registered Name</span>
              <span className="font-medium text-stone-800 text-xs">{booking.guestName}</span>
            </div>
            <div>
              <span className="block text-stone-400 text-[10px] uppercase font-semibold">Email Channel</span>
              <span className="font-medium text-stone-850 text-xs truncate block">{booking.guestEmail}</span>
            </div>
            <div>
              <span className="block text-stone-400 text-[10px] uppercase font-semibold">Phone Contact</span>
              <span className="font-medium text-stone-800 text-xs">{booking.guestPhone}</span>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="pt-2">
              <span className="block text-stone-400 text-[10px] uppercase font-semibold">Special Instructions</span>
              <p className="text-stone-600 bg-white border border-stone-200/50 p-2.5 rounded-xl text-xs mt-1 leading-relaxed italic select-all">
                "{booking.specialRequests}"
              </p>
            </div>
          )}
        </div>

        {/* Pricing breakdown summary */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Financial Transactions Ledger</span>
            <span className="block text-[10px] text-stone-400 font-sans mt-0.5">Paid via Demonstration Card (Fully Settled)</span>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-2xl font-serif font-bold text-stone-900 block">${booking.totalAmount}</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-stone-400 block mt-0.5">Tariffs & Surcharges Bundled</span>
          </div>
        </div>

      </section>

      {/* Policies section */}
      <section className="bg-[#c5a880]/5 border border-[#c5a880]/20 rounded-2xl p-6 space-y-4">
        <h4 className="font-serif font-medium text-stone-900 flex items-center gap-2 text-sm">
          <ShieldAlert className="w-4 h-4 text-[#c5a880]" />
          <span>Crucial Arrival & Stay Policies</span>
        </h4>
        <ul className="list-disc list-inside space-y-2 text-xs font-light text-stone-600 font-sans leading-relaxed pl-1">
          <li><strong>Check-In Window:</strong> Standard reception check-in begins at 3:00 PM. Front desk concierges are on-duty 24/7.</li>
          <li><strong>Identity checks:</strong> A government-issued photo passport or identification card matching the name <strong>{booking.guestName}</strong> is mandatory at check-in.</li>
          <li><strong>Cancellation guidelines:</strong> Full refund claims are permitted self-service until 48 hours prior to check-in dates.</li>
          <li><strong>Confirmation copy:</strong> A confirmation email copy has been dispatched successfully. You may store this ticket digitally or physically as proof.</li>
        </ul>
      </section>

      {/* Main button triggers */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-[#c5a880] hover:text-white font-medium text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPrinting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Printer className="w-4 h-4" />
          )}
          <span>{isPrinting ? "Spawning System Print..." : "Print / PDF Invoice"}</span>
        </button>

        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-stone-100 hover:bg-[#c5a880] hover:text-stone-950 border border-stone-300 text-stone-700 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Book Another Destination</span>
        </button>
      </div>

    </div>
  );
}
