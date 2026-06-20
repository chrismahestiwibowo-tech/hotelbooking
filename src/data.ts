import { Hotel, Room } from "./types";

export const HOTELS: Hotel[] = [
  {
    id: "h1",
    name: "The Grand Elysian",
    description: "Experience premium skyscraper luxury in the heart of Midtown. Boasting a structural gold-rimmed rooftop pool, dynamic skyline views, and a dedicated 24-7 butler service, it defines modern architectural majesty.",
    rating: 4.9,
    reviewCount: 312,
    location: "745 Fifth Avenue, Manhattan",
    city: "New York",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
    amenities: ["Rooftop Pool", "Free Wi-Fi", "Full Gym", "Private Spa", "24/7 Butler"],
    distanceToCenter: "0.2 mi from Midtown West",
    starRating: 5
  },
  {
    id: "h2",
    name: "Villa Saint-Germain Boutique",
    description: "A cozy and elegant French heritage estate featuring original 18th-century moldings and a secluded courtyard garden. Located just steps from the historic river Seine and local artisan cafés.",
    rating: 4.8,
    reviewCount: 184,
    location: "24 Rue de l'Université, Saint-Germain",
    city: "Paris",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    amenities: ["Courtyard Garden", "Free Wi-Fi", "French Bakery", "Airport Shuttle", "Pet Friendly"],
    distanceToCenter: "0.5 mi from Louvre Museum",
    starRating: 4
  },
  {
    id: "h3",
    name: "Hanami Pavilion Retreat",
    description: "Immerse yourself in Japanese harmony. Adorned with organic bamboo structures, paper screens, natural hot spring onsens, and a peaceful zen rock garden overlooking Mount Fuji.",
    rating: 4.9,
    reviewCount: 228,
    location: "411 Arashiyama Bamboo Grove",
    city: "Kyoto",
    image: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=1200",
    amenities: ["Natural Onsen", "Zen Rock Garden", "Traditional Tea Room", "Tatami Lounge", "Free Wi-Fi"],
    distanceToCenter: "1.1 mi from Arashiyama Center",
    starRating: 5
  },
  {
    id: "h4",
    name: "Palazzo Roma Imperial",
    description: "Live like Roman royalty inside a completely restored 16th-century classical palace. Adorned with fresco ceilings, marble pillars, and views looking directly at antique ruins and historic monuments.",
    rating: 4.7,
    reviewCount: 146,
    location: "Via del Corso 85, Historico",
    city: "Rome",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
    amenities: ["Antique Wine Cellar", "Fresco Lounge", "Free Wi-Fi", "Terrace Dining", "Bicycle Rental"],
    distanceToCenter: "0.3 mi from Trevi Fountain",
    starRating: 4
  },
  {
    id: "h5",
    name: "Aura Ocean Lagoon Resort",
    description: "Paradise redefined with private over-water wooden villas floating directly above crystal clear turquoise lagoons. Step straight from your bedroom deck into the warm Coral Sea.",
    rating: 5.0,
    reviewCount: 94,
    location: "Atoll North Malé 12",
    city: "Maldives",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200",
    amenities: ["In-Water Villas", "Scuba Center", "All-Inclusive Dining", "Over-Ocean Spa", "Snorkeling Reef"],
    distanceToCenter: "Accessible via Seaplane only",
    starRating: 5
  }
];

export const ROOMS_BY_HOTEL: Record<string, Room[]> = {
  h1: [
    {
      id: "r_h1_1",
      name: "Atelier Classic Room",
      description: "Elegant layout featuring full height custom steel sash windows looking out over Central Park. Highlights include a marble bathroom with soaking tub and a cozy velvet writing alcove.",
      pricePerNight: 280,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1611891405210-3027602d517a?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 King Bed", "Smart TV", "Central Park View", "Nespresso Machine", "Rain Shower"],
      bedType: "King Bed",
      size: "420 sq ft",
      availableCount: 4
    },
    {
      id: "r_h1_2",
      name: "Elysian Club Executive",
      description: "Extra spacious suite located on high floors, complete with a separate work desk space, customizable sleep-temperature mattress, and priority club lounge hospitality access.",
      pricePerNight: 450,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 California King", "Club Lounge Access", "High Floor Skyline View", "Premium Bar", "Spas Bath"],
      bedType: "California King",
      size: "610 sq ft",
      availableCount: 3
    },
    {
      id: "r_h1_3",
      name: "Royal Skyline Penthouse",
      description: "The crown jewel of mid-town. Fully panoramic floor-to-ceiling glass wrapping around the living quarters, a dining room for six, private open-air terrace, and a Steinway grand piano.",
      pricePerNight: 1200,
      capacity: 4,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600",
      amenities: ["2 Master Bedrooms", "Private Terrace", "Steinway Piano", "Top Floor Views", "Kitchenette"],
      bedType: "2 King Beds",
      size: "1,450 sq ft",
      availableCount: 1
    }
  ],
  h2: [
    {
      id: "r_h2_1",
      name: "Boutique Cozy Double",
      description: "Intimate and quiet Parisian alcove room, beautifully upholstered in classic silk toile with high ceilings and historical courtyard garden soundscapes.",
      pricePerNight: 190,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 Queen Bed", "Toile De Jouy Decor", "Courtyard View", "Vintage Writing Desk", "L'Occitane Toiletries"],
      bedType: "Queen Bed",
      size: "260 sq ft",
      availableCount: 5
    },
    {
      id: "r_h2_2",
      name: "Saint-Germain Junior Suite",
      description: "Magnificent Parisian suite featuring a decorative fireplace hearth, custom crown moldings, and dynamic street-view French balconies overlooking Saint-Germain.",
      pricePerNight: 320,
      capacity: 3,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 King Bed + Double Sofa Bed", "French Balcony", "Walk-In Closet", "Complimentary Macarons", "Dyson Styler"],
      bedType: "King + Sofa Bed",
      size: "480 sq ft",
      availableCount: 2
    },
    {
      id: "r_h2_3",
      name: "Duplex Garden Pavillion",
      description: "A gorgeous two-story personal duplex with a spiral staircase, glass atrium sky view, and exclusive direct key-pass to the private hotel rear botanical sanctuary.",
      pricePerNight: 550,
      capacity: 4,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600",
      amenities: ["2 King Beds", "Private Garden Exit", "Two-level Floorplan", "Glass Atrium Roof", "Plentiful Natural Light"],
      bedType: "2 King Beds",
      size: "820 sq ft",
      availableCount: 1
    }
  ],
  h3: [
    {
      id: "r_h3_1",
      name: "Traditional Washitsu Room",
      description: "Authentic Kyoto living. Fragrant tatami flooring handwoven with local rushed grass, soft premium futon bedding laid out by local hosts, and elegant shoji screens.",
      pricePerNight: 210,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=600",
      amenities: ["Premium Futons", "Tatami Floor Matting", "Private Garden View", "Yukata Kimonos", "Ceremonial Tea Set"],
      bedType: "2 Futons",
      size: "320 sq ft",
      availableCount: 4
    },
    {
      id: "r_h3_2",
      name: "Hinoki Wood Forest Room",
      description: "Modern comforts meets traditional carpentry. Built completely of local aromatic Hinoki cypress wood, showcasing custom mountain frames and custom slide-open doors.",
      pricePerNight: 350,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 Western King Bed", "Hinoki Wood Accent walls", "VFC Air Filtration", "Sake Welcome Set", "Private Onsen access"],
      bedType: "King Bed",
      size: "440 sq ft",
      availableCount: 3
    },
    {
      id: "r_h3_3",
      name: "Sakura Emperor Pavilion",
      description: "An unbelievable luxury pavilion featuring its very own direct-fed warm geothermal spring bath outdoor wood-deck, custom stone gardens, and fine lacquered dining sets.",
      pricePerNight: 780,
      capacity: 4,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=600",
      amenities: ["Private Geothermal Hot Spring", "Zen Garden Balcony", "Custom Shiatsu Massager", "Local Chef In-Room Dining", "Air Purification"],
      bedType: "2 King Beds",
      size: "1,100 sq ft",
      availableCount: 1
    }
  ],
  h4: [
    {
      id: "r_h4_1",
      name: "Classical Florentine Room",
      description: "Decorated with rich tapestry screens, fine mahogany desks, historic stone framing, and a luxury bathroom finished with authentic Italian Statuario marble.",
      pricePerNight: 180,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 Queen Bed", "Statuario Marble Bath", "Smart Control Climate", "Historical Street View", "Limoncello Welcome"],
      bedType: "Queen Bed",
      size: "290 sq ft",
      availableCount: 5
    },
    {
      id: "r_h4_2",
      name: "Villa Borghese Grand Suite",
      description: "A prestigious classical layout containing a separate salon, writing quarters, and beautiful hand-restored fresco artwork dating back centuries.",
      pricePerNight: 310,
      capacity: 3,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 King Bed + 1 Daybed", "Antique Frescoes", "Espresso Bar", "Bluetooth Audio Set", "Fluffy Luxury Robes"],
      bedType: "King + Daybed",
      size: "520 sq ft",
      availableCount: 2
    },
    {
      id: "r_h4_3",
      name: "Imperial Terrace Penthouse",
      description: "Features a huge private outdoor stone terrace with comfortable loungers, outdoor dining set, fire pit, and direct vistas towards Rome's ancient tiled domes.",
      pricePerNight: 680,
      capacity: 4,
      image: "https://images.unsplash.com/photo-1629140751219-c1a5edecf14c?auto=format&fit=crop&q=80&w=600",
      amenities: ["2 King Beds", "Vast View Terrace", "Outdoor Gas Firepit", "Luxury Wine Fridge", "Personal Guide Service"],
      bedType: "2 King Beds",
      size: "980 sq ft",
      availableCount: 1
    }
  ],
  h5: [
    {
      id: "r_h5_1",
      name: "Overwater Lagoon Bungalow",
      description: "Float gracefully above the ocean water. This bungalow features a glass-floor viewing window to see coral reefs from your lounge chair and steps leading straight to the lagoon.",
      pricePerNight: 450,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600",
      amenities: ["1 King Bed", "Glass Floor Fish View", "Direct Lagoon Access Stairs", "Outdoor Shower", "Daybed Balcony"],
      bedType: "King Bed",
      size: "560 sq ft",
      availableCount: 3
    },
    {
      id: "r_h5_2",
      name: "Sunset Infinity Pool Villa",
      description: "Splendid overwater villa equipped with its own private infinity pool extending over the waves, providing uninterrupted views of the deep ocean sunset horizons.",
      pricePerNight: 720,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600",
      amenities: ["California King Bed", "Private Infinity Pool", "Hammocks over the Water", "Piped-in underwater music", "Sunset View Facing"],
      bedType: "California King",
      size: "820 sq ft",
      availableCount: 2
    },
    {
      id: "r_h5_3",
      name: "Two-Bedroom Coral Pavillion",
      description: "The ultimate tropical dream escape. Fully independent luxury floating mansion with a large wooden deck, dual suites, private bar, transparent dining room, and an outdoor hot tub.",
      pricePerNight: 1600,
      capacity: 6,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600",
      amenities: ["2 Floating Master Suites", "Luxury Floating Breakfast", "Direct Coral Reef Snorkel", "Private Outdoor Hot-Tub", "Telescope Star Gazer"],
      bedType: "2 California Kings",
      size: "1,750 sq ft",
      availableCount: 1
    }
  ]
};
