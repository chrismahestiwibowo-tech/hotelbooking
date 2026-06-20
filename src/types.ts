export interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  city: string;
  image: string;
  amenities: string[];
  distanceToCenter: string;
  starRating: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  image: string;
  amenities: string[];
  bedType: string;
  size: string;
  availableCount: number;
}

export interface Booking {
  id: string;
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  totalAmount: number;
  bookingCode: string;
  bookedAt: string;
}

export interface SearchParams {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}
