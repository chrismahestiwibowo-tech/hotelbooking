import React, { useState, useMemo } from "react";
import { Filter, MapPin, Star, Building, Wifi, CreditCard, RefreshCw, X } from "lucide-react";
import { Hotel, SearchParams } from "../types";
import { HOTELS } from "../data";

interface HotelListViewProps {
  searchParams: SearchParams;
  onSelectHotel: (hotel: Hotel) => void;
  onResetSearch: () => void;
}

export default function HotelListView({
  searchParams,
  onSelectHotel,
  onResetSearch,
}: HotelListViewProps) {
  // Filters State
  const [selectedCity, setSelectedCity] = useState<string>(searchParams.city || "All");
  const [maxPrice, setMaxPrice] = useState<number>(1800);
  const [minStarredRating, setMinStarredRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Unique lists from mock db
  const cities = ["All", ...Array.from(new Set(HOTELS.map((h) => h.city)))];
  const allAmenities = Array.from(
    new Set(HOTELS.flatMap((h) => h.amenities))
  );

  // Handle Amenity selections
  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    setSelectedCity("All");
    setMaxPrice(1800);
    setMinStarredRating(0);
    setSelectedAmenities([]);
    onResetSearch();
  };

  // Filter Hotels based on params
  const filteredHotels = useMemo(() => {
    return HOTELS.filter((hotel) => {
      // City Filter
      if (selectedCity !== "All" && hotel.city !== selectedCity) {
        return false;
      }
      // Star Rating Filter
      if (minStarredRating > 0 && hotel.starRating < minStarredRating) {
        return false;
      }
      // Amenities Filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }
      // Price Filter: Checked against starting price (hardcoded filter baseline of $180)
      // Standard room starting price is roughly estimated based on our actual dataset (Standard rooms range from $180 to $450)
      const mockPriceEstimate = hotel.id === "h5" ? 450 : hotel.id === "h1" ? 280 : 180;
      if (mockPriceEstimate > maxPrice) {
        return false;
      }

      return true;
    });
  }, [selectedCity, maxPrice, minStarredRating, selectedAmenities]);

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Breadcrumb/Headline banner */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-stone-900 text-stone-100 p-6 sm:p-8 rounded-2xl">
        <div>
          <p className="text-xs text-[#c5a880] tracking-widest uppercase font-medium">Available Havens</p>
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal mt-1">
            {selectedCity === "All" ? "Everywhere Worldwide" : `Refined Stays in ${selectedCity}`}
          </h2>
          <p className="text-stone-400 font-light text-xs sm:text-sm mt-1">
            Showing {filteredHotels.length} out of {HOTELS.length} properties matching your check-in criteria
          </p>
        </div>
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-1.5 border border-stone-700 hover:border-stone-500 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium tracking-wide text-xs uppercase px-4 py-2.5 rounded-lg transition-all cursor-pointer active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Parameters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side: Filter Sidebar */}
        <aside className="w-full lg:w-80 bg-white border border-stone-200 p-6 rounded-2xl h-fit sticky lg:top-24 space-y-8">
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <span className="font-serif font-semibold text-lg text-stone-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#c5a880]" />
              <span>Filter Sanctuary</span>
            </span>
            <button
              onClick={handleClearFilters}
              className="text-stone-400 hover:text-stone-900 text-[11px] uppercase tracking-wider font-semibold underline underline-offset-4 cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Destination Selector */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider">Region / City</h4>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((cityOption) => (
                <button
                  key={cityOption}
                  onClick={() => setSelectedCity(cityOption)}
                  className={`text-xs px-3 py-2 rounded-lg font-medium transition-all text-left truncate ${
                    selectedCity === cityOption
                      ? "bg-stone-900 text-[#c5a880]"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {cityOption}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing slider approximation */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs uppercase font-bold text-stone-400 tracking-wider">
              <span>Budget Cap</span>
              <span className="text-stone-800 font-bold">${maxPrice} / night</span>
            </div>
            <input
              type="range"
              min="150"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-stone-800 bg-stone-100 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>$150</span>
              <span>$2000+</span>
            </div>
          </div>

          {/* Star Ratings */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider">Hotel Rating Level</h4>
            <div className="space-y-1.5">
              {[0, 4, 5].map((stars) => (
                <label
                  key={stars}
                  className="flex items-center gap-2 text-xs font-semibold text-stone-600 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="starRating"
                    checked={minStarredRating === stars}
                    onChange={() => setMinStarredRating(stars)}
                    className="accent-stone-800 scale-105"
                  />
                  <span>
                    {stars === 0 ? "Any Stars Level" : `${stars} Stars Sanctuary`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Included Features & Amenities */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider">Included Amenities</h4>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {allAmenities.map((amenity) => {
                const isChecked = selectedAmenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 text-xs font-medium text-stone-600 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleAmenity(amenity)}
                      className="accent-stone-800 rounded border-stone-300"
                    />
                    <span className={isChecked ? "text-stone-900 font-semibold" : ""}>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Side: Hotels Listings */}
        <main className="flex-1 space-y-8">
          {filteredHotels.length === 0 ? (
            <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200/50 p-8">
              <Building className="w-12 h-12 text-[#c5a880] mx-auto opacity-70 mb-4" />
              <h3 className="font-serif text-xl font-normal text-stone-900">No Resorts Found</h3>
              <p className="text-stone-500 font-light text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                We couldn't locate any available luxury properties matching your exact filtered specifications. Try modifying your criteria.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 inline-flex bg-stone-900 text-[#c5a880] px-6 py-2.5 rounded-xl font-semibold tracking-wider text-xs uppercase hover:bg-stone-800 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredHotels.map((hotel) => {
              // Standard room starting price approximation
              const startPrice = hotel.id === "h5" ? 450 : hotel.id === "h1" ? 280 : 180;
              return (
                <div
                  key={hotel.id}
                  className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group"
                >
                  {/* Photo with responsive sizes */}
                  <div className="w-full md:w-80 h-56 md:h-auto min-h-52 relative overflow-hidden flex-shrink-0">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] duration-500 transition-all select-none"
                    />
                    <span className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-sm text-stone-50 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-stone-700/20">
                      {hotel.city}
                    </span>
                  </div>

                  {/* Body Copy */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating details */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-center gap-1 text-xs text-amber-500">
                          {Array.from({ length: hotel.starRating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                          <span className="text-stone-400 font-light text-[10px] ml-1.5">
                            ({hotel.starRating}-Star Sanctuary)
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/50 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{hotel.rating}</span>
                          <span className="font-light text-stone-400 text-[10px] ml-0.5">({hotel.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl font-normal text-stone-900 mt-2 leading-tight group-hover:text-[#b39369] transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-light flex items-center gap-1.5 mt-2 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0" />
                        <span>{hotel.location}</span>
                        <span className="text-stone-300">•</span>
                        <span className="italic text-stone-400 font-sans text-[10px]">{hotel.distanceToCenter}</span>
                      </p>

                      <p className="text-stone-500 text-xs font-light leading-relaxed mb-4 line-clamp-3">
                        {hotel.description}
                      </p>

                      {/* Amenities Tagging */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {hotel.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="bg-stone-50/80 border border-stone-200/50 text-stone-600 rounded-lg text-[10px] px-2.5 py-1 font-medium tracking-wide flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/70" />
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">Best Room Starting From</span>
                        <span className="text-2xl font-serif text-stone-900">${startPrice}<span className="text-xs text-stone-400 font-sans font-light"> / night</span></span>
                      </div>
                      <button
                        onClick={() => onSelectHotel(hotel)}
                        className="w-full sm:w-auto bg-[#c5a880] hover:bg-[#b39369] text-white font-semibold tracking-wider text-xs uppercase px-6 py-3.5 rounded-xl transition-all shadow-sm cursor-pointer hover:shadow-md active:scale-95"
                      >
                        Explore Rooms
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
