import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // API Route: Guest Relations Online Chat Bot Svc
  app.post("/api/guest-relation/chat", async (req, res) => {
    try {
      const { messages, activeBooking, searchParams } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Convert messages array into standard format
      // We will map system instruction separately to guide model's persona
      const mappedContents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      // Generate a detailed system instruction that contextually guides the Digital Butler chatbot
      // about the resort portfolio and current booking structures
      const systemInstruction = `
You are "Elysian Concierge", the official online guest-relations AI virtual butler for the "Elysian Stay" luxury hotel portfolio.
Your role is to offer warm, ultra-professional, and highly informative digital hospitality.

About Elysian Stay Portfolio & Inventory:
-------------------------------------------
1. The Grand Elysian (New York, Manhattan)
   - Vibe: Premium skyscraper luxury, gold-rimmed rooftop pool, 24/7 butler.
   - Rooms:
     * Atelier Classic Room ($280/night, capacity 2, central park views)
     * Elysian Club Executive ($450/night, capacity 2, skyline view, club lounge)
     * Royal Skyline Penthouse ($1200/night, capacity 4, private terrace, Steinway grand piano)
2. Villa Saint-Germain Boutique (Paris, France)
   - Vibe: Parisian history, botanical courtyard garden, 18th-century moldings.
   - Rooms:
     * Boutique Cozy Double ($190/night, capacity 2, toile upholstery)
     * Saint-Germain Junior Suite ($320/night, capacity 3, fireplace, street balconies)
     * Duplex Garden Pavillion ($550/night, capacity 4, two-story, sky atrium dome)
3. Hanami Pavilion Retreat (Kyoto, Japan)
   - Vibe: Traditional hot spring onsens, bamboo craft structure, zen stone garden.
   - Rooms:
     * Traditional Washitsu Room ($210/night, capacity 2, tatami mats, futons, tea sets)
     * Hinoki Wood Forest Room ($350/night, capacity 2, western premium, private onsen passage)
     * Sakura Emperor Pavilion ($780/night, capacity 4, open-air geothermal spring path deck)
4. Palazzo Roma Imperial (Rome, Italy)
   - Vibe: Restored 16th-century palace, antique marble columns, fresco ceilings.
   - Rooms:
     * Classical Florentine Room ($180/night, capacity 2, Statuario marble bath, street view)
     * Villa Borghese Grand Suite ($310/night, capacity 3, separate salon, hand-restored frescos)
     * Imperial Terrace Penthouse ($680/night, capacity 4, vast stone terrace with fire pit)
5. Aura Ocean Lagoon Resort (Maldives Atoll)
   - Vibe: Overwater villas, crystal lagoons, snorkeling reefs, seaplane transfer only.
   - Rooms:
     * Overwater Lagoon Bungalow ($450/night, capacity 2, ocean floor window, lagoon stairs)
     * Sunset Infinity Pool Villa ($720/night, capacity 2, private over waves pool, sunset views)
     * Two-Bedroom Coral Pavillion ($1600/night, capacity 6, giant luxury floating mansion, hot tub)

Elysian Stay Booking Policies:
--------------------------------
- Best Price Guarantee: We promise to match lower prices and award an extra 10% coupon.
- Fully Flexible Cancellation: Guests can cancel self-service up to 48 hours prior to check-in for a complete refund.
- Reception & Check-In: Standard check-in starts at 3:00 PM. Front desk butler reception is available 24 hours a day.

Context about the current user query:
--------------------------------------
- Active Booking Status: ${activeBooking ? `YES, active booking exists under name "${activeBooking.guestName}", email "${activeBooking.guestEmail}" at "${activeBooking.hotel.name}" (${activeBooking.hotel.city}) in the "${activeBooking.room.name}" room. Code: ${activeBooking.bookingCode}. Period: ${activeBooking.checkIn} to ${activeBooking.checkOut}, total amount: $${activeBooking.totalAmount}. Special Requests entered: "${activeBooking.specialRequests || 'None'}"` : `NO ACTIVE BOOKING registered yet.`}
- Current Search Criteria: Default city selection is "${searchParams?.city || 'All'}", checking in "${searchParams?.checkIn || 'not specified'}" and out in "${searchParams?.checkOut || 'not specified'}" for ${searchParams?.guests || 2} guests.

Hospitality Tone Requirements:
- Use polite, refined, elite-tier hotel language (e.g. "It is an absolute pleasure to assist you", "My warmest regards", "Our concierge team will ensure").
- Be concise but helpful. Always mention relevant hotels, available rooms, configurations, or exact prices from the listing data above based on what the guest asks.
- Never make up fake hotels outside the five listed above.
- Ensure your markdown formatting is clean and easy to read. Let's make our interaction delightful!
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: mappedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Guest Relations API Server Error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error" });
    }
  });

  // Serve static assets or use Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Elysian Server running on port ${PORT}`);
  });
}

startServer();
