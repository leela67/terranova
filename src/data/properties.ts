export type Property = {
  id: string;          // stable slug-friendly id
  title: string;       // display title
  address: string;
  bedrooms: number;
  bathrooms: number;
  price?: string;      // prices exist but DO NOT render on Featured Properties page
  images: string[];    // local image paths
  description?: string;
  details?: Array<{ label: string; value: string }>;
  amenities?: string[]; // list of property amenities
  location?: {
    lat: number;
    lng: number;
  };
};

export const properties: Property[] = [
  {
    id: "nyhsha",
    title: "Nysha’s Haven",
    address: "Premium Residential Complex, Hyderabad",
    bedrooms: 4,
    bathrooms: 4,
    price: "₹1.2 Cr onwards",
    images: [
      "/images/nyhsha/1.png",
      "/images/nyhsha/2.png",
      "/images/nyhsha/3.png",
      "/images/nyhsha/4.png",
      "/images/nyhsha/5.png",
      "/images/nyhsha/6.png",
      "/images/nyhsha/7.png",
      "/images/nyhsha/8.png",
    ],
    description: "Terranova’s first project, Nysha’s Haven, was created to capture the true essence of Bali without leaving India.From rattan ceilings and raw basalt floors to live-edge wood, this nearly 1-acre farmhouse blends natural materials with smart design. Nysha’s Haven was built with premium care, using Burma Teak that withstands monsoons, hand-carved stonework, and a seven-tonne steel staircase engineered for both style and function.Nysha’s Haven also perfectly balances relaxation and activity: a luxury farmhouse with swimming pool facing the lake, a tennis court that converts for multiple sports, and spaces are designed for both lively gatherings and quiet family moments. Open layouts, natural materials, and thoughtful placement of rooms add a distinct character to the farmhouse.Through Nysha’s Haven, Terranova successfully shows that true luxury isn’t about display, it’s about comfort, balance, and spaces that feel just right.",
    details: [
      { label: "Project Type", value: "Luxury Farmhouse" },
      { label: "Total Floors", value: "G+2" },
      { label: "Unit Types", value: "3BHK, 4BHK" },
      { label: "Amenities", value: "Gym, Pool, Clubhouse" },
      { label: "Location", value: "Gandipet, Hyderabad" },
      { label: "Status", value: "Sold" },
    ],
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Clubhouse",
      "Children's Play Area",
      "Landscaped Gardens",
      "24/7 Security",
      "Power Backup",
      "Covered Parking",
      "Intercom Facility",
      "Elevator Access"
    ],
    location: {
      lat: 17.3850,
      lng: 78.4867
    },
  },
  
  {
    id: "verdara",
    title: "Verdara",
    address: "Premium Luxury Farmhouse",
    bedrooms: 5,
    bathrooms: 5,
    price: "₹85 Lakh onwards",
    images: [
      "/images/verdara/1.jpg",
      "/images/verdara/2.jpg",
      "/images/verdara/3.jpg",
      "/images/verdara/4.jpg",
      "/images/verdara/5.jpg",
      "/images/verdara/6.jpg",
      "/images/verdara/7.jpg",
      "/images/verdara/8.jpg",
    ],
    description: "Tucked amidst wide-open farmland and framed by lush mango orchards, Grow More 1 is Terranova’s take on earthy elegance. Spread across 2.5 acres, this four-bedroom farmhouse brings together natural textures, handcrafted furniture, and panoramic glass walls that invite nature inside. Every corner — from the infinity-edge pool to the terracotta walkways — celebrates simple luxury. The house opens to a sunlit courtyard with a stone water feature at its center, offering the perfect spot for slow mornings or quiet reflection. A gourmet kitchen, smart home systems, and custom teakwood interiors add refinement without compromising comfort.The outdoors are equally stunning — a private gazebo, herb garden, and an open-air dining deck make evenings unforgettable. Grow More 1 isn’t just a farmhouse; it’s where weekends turn into memories, and land turns into legacy.",
    details: [
      { label: "Project Type", value: "High-rise Apartments" },
      { label: "Total Floors", value: "G+20" },
      { label: "Unit Types", value: "1BHK, 2BHK, 3BHK" },
      { label: "Amenities", value: "Sky Lounge, Fitness Center" },
      { label: "Location", value: "IT Corridor" },
      { label: "Status", value: "Launching Soon" },
    ],
    amenities: [
      "4 spacious bedrooms with ensuite baths",
      "Jacuzzi Deck",
      "Infinity Pool",
      "Smart Home Automation",
      "Solar-powered energy systems",
      "Outdoor Dining Area",
      "Bar Lounge",
      "Private Herb and Fruit Garden"
    ],
    location: {
      lat: 17.3616,
      lng: 78.4747
    },
  },
  {
    id: "vivara",
    title: "Vivara",
    address: "Premium Luxury Farmhouse",
    bedrooms: 5,
    bathrooms: 5,
    price: "₹1.8 Cr onwards",
    images: [
      "/images/vivara/1.png",
      "/images/vivara/2.png",
      "/images/vivara/3.png",
      "/images/vivara/4.png",
      "/images/vivara/5.png",
      "/images/vivara/6.png",
      "/images/vivara/7.png",
    ],
    description: "If Grow More 1 was nature’s charm, Grow More 2 is modern sophistication. Located just a few kilometers apart, this 3-acre farmhouse blends clean architectural lines with soft, organic materials. Designed for those who crave silence with style, its architecture breathes through double-height ceilings, neutral palettes, and floor-to-ceiling windows. Inside, you’ll find a seamless living-dining space, a state-of-the-art kitchen, and 5 tastefully done bedrooms that balance functionality with form. Every piece of furniture, lighting, and texture has been custom-designed by Terranova’s in-house studio to ensure perfect harmony. The property also includes a yoga pavilion, a rain-fed pond, and an outdoor cinema setup for star-lit movie nights. Grow More 2 is more than a second home — it’s an elevated living experience rooted in design and detail.",
    details: [
      { label: "Project Type", value: "Garden Apartments" },
      { label: "Total Floors", value: "G+8" },
      { label: "Unit Types", value: "2BHK, 3BHK, 4BHK" },
      { label: "Amenities", value: "Garden Spaces, Yoga Deck" },
      { label: "Location", value: "Green Belt Area" },
      { label: "Status", value: "Pre-Launch" },
    ],
    amenities: [
      "5 Bedrooms",
      "2 Living Spaces",
      "Open Kitchen",
      "Yoga and Meditation Deck",
      "Rain-fed Pond with Deck seating",
      "Outdoor Theater",
      "Firepit Zone",
      "Full-service Housekeeping",
      "Automation-ready infrastructure"
    ],
    location: {
      lat: 17.3702,
      lng: 78.4820
    },
  },
  {
    id: "ayana",
    title: "Ayana Farms",
    address: "Premium Luxury Farmhouse",
    bedrooms: 4,
    bathrooms: 4,
    price: "₹1.2 Cr onwards",
    images: [
      "/images/ayana_farms/1.jpg",
      "/images/ayana_farms/2.jpg",
      "/images/ayana_farms/3.jpg",
      "/images/ayana_farms/4.jpg",
      "/images/ayana_farms/5.jpg",
      "/images/ayana_farms/6.jpg",
      "/images/ayana_farms/7.jpg",
      "/images/ayana_farms/8.jpg",
    ],
    description: "Ayana Farms is a modern farmhouse inspired by the charm of Kerala homes. It beautifully blends Indian warmth, craftsmanship, and culture with a clean, minimal design. The space feels calm and inviting, with open courtyards, verandahs, and decks that let in plenty of light and fresh air, making every corner connect naturally with the outdoors. Built on a single level of about 15,000 sq. ft., Ayana Farms includes spacious living and dining areas, cozy bedrooms, a lounge, and a central open courtyard with a tree at its heart. Locally sourced stone, warm wood, and handcrafted details give it a sense of comfort and authenticity while keeping the overall look modern and elegant. What sets Ayana Farms apart is its soul. It doesn’t imitate western-style farmhouses but celebrates Indian design in a fresh, thoughtful way",
    details: [
      { label: "Project Type", value: "Luxury Farmhouse" },
      { label: "Total Floors", value: "G+2" },
      { label: "Unit Types", value: "3BHK, 4BHK" },
      { label: "Amenities", value: "Gym, Pool, Clubhouse" },
      { label: "Location", value: "Gandipet, Hyderabad" },
      { label: "Status", value: "Sold" },
    ],
    amenities: [
      "4 Bedrooms with Garden-facing decks",
      "Lounge",
      "Bar",
      "Games zone for leisure",
      "Handcrafted pooja room with Kerala detailing",
      "Pool deck",
      "Lawns",
      "Shaded verandahs",
      "Automation-ready",
      "Modern infrastructure"
    ],
    location: {
      lat: 17.3950,
      lng: 78.4650
    },
  },
  {
    id: "bavisvara",
    title: "Bavisvara Retreat",
    address: "Premium Luxury Farmhouse",
    bedrooms: 5,
    bathrooms: 5,
    price: "₹1.2 Cr onwards",
    images: [
      "/images/bavisvara/1.jpg",
      "/images/bavisvara/2.jpg",
      "/images/bavisvara/3.jpg",
      "/images/bavisvara/4.jpg",
      "/images/bavisvara/5.jpg",
      "/images/bavisvara/6.jpg",
      "/images/bavisvara/7.jpg",
      "/images/bavisvara/8.jpg",
    ],
    description: "Nestled near the foothills, Bavisgunta is where raw beauty meets craftsmanship. Built using locally sourced stone and reclaimed wood, this farmhouse is a tribute to sustainable architecture. With 4 bedrooms, an organic farm, and an outdoor bath that overlooks the hills, it feels both grounding and indulgent. Inside, soft lighting, vintage furniture, and handmade décor bring warmth and character to every space. A cozy reading loft overlooks the central courtyard, while the outdoor kitchen invites families to cook, eat, and laugh under the stars. What makes Bavisgunta special is its connection with nature — from the chirping birds to the fragrance of jasmine in the evenings, everything feels deeply personal.",
    details: [
      { label: "Project Type", value: "Luxury Farmhouse" },
      { label: "Total Floors", value: "G+2" },
      { label: "Unit Types", value: "3BHK, 4BHK" },
      { label: "Amenities", value: "Gym, Pool, Clubhouse" },
      { label: "Location", value: "Gandipet, Hyderabad" },
      { label: "Status", value: "Sold" },
    ],
    amenities: [
      "Eco-built with local materials",
      "5 Bedrooms with open-air showers",
      "Organic Farm",
      "Greenhouse",
      "Stone gazebo",
      "Outdoor kitchen",
      "Lawns",
      "Pet-friendly with nature trails"
    ],
    location: {
      lat: 17.3780,
      lng: 78.4550
    },
  },
  {
    id: "anaeva",
    title: "Anaeva",
    address: "Plotting and Development",
    bedrooms: 5,
    bathrooms: 5,
    price: "100+ acres",
    images: [
      "/images/anaeva/1.jpg",
      "/images/anaeva/2.jpg",
      "/images/anaeva/3.jpg",
      "/images/anaeva/4.jpg",
      "/images/anaeva/5.jpg",
      "/images/anaeva/6.jpg",
      "/images/anaeva/7.jpg",
      "/images/anaeva/8.jpg",
    ],
    description: "Tucked amidst quiet meadows, Anaeva is where minimal design meets earthy charm. Built using natural lime plaster and reclaimed teak, every inch of this farmhouse speaks of mindful luxury. With five bedrooms opening to wide courtyards, an infinity plunge pool, and fruit-laden trees around, Anaeva feels like time itself has slowed down. Inside, breezy linen drapes, terracotta floors, and handcrafted pottery add a touch of calm. The living area flows into a sunlit verandah, perfect for slow breakfasts or evening conversations. At night, the soft hum of crickets and distant lights from the valley turn it into a living postcard. What makes Anaeva unforgettable is its quiet philosophy, a space designed not to escape life, but to return to it.",
    details: [
      { label: "Project Type", value: "Premium Luxury Farmhouse" },
      // { label: "Total Floors", value: "G+2" },
      { label: "Unit Types", value: "5BHK, 5 Bathrooms" },
      { label: "Amenities", value: "Gym, Pool" },
      { label: "Location", value: "Gandipet, Hyderabad" },
      { label: "Status", value: "For Sale" },
    ],
    amenities: [
      "Constructed using reclaimed wood and lime plaster",
      "5 bedrooms with skylit bathrooms",
      "Infinity plunge pool and open courtyards",
      "Orchard with seasonal fruits and flowering plants",
      "Outdoor dining deck with barbecue setup",
      "Pet-friendly and fully solar-powered"
    ],
    location: {
      lat: 17.3500,
      lng: 78.4400
    },
  },
  {
    id: "arthaven",
    title: "Arthaven",
    address: "Premium Luxury Farmhouse",
    bedrooms: 5,
    bathrooms: 5,
    price: "100+ acres",
    images: [
      "/images/arthaven/1.jpg",
      "/images/arthaven/2.jpg",
      "/images/arthaven/3.jpg",
      "/images/arthaven/4.jpg",
      "/images/arthaven/5.jpg",
      "/images/arthaven/6.jpg",
      "/images/arthaven/7.jpg",
      "/images/arthaven/8.jpg",
    ],
    description: "Perched on a gentle rise, Arthaven blends art, architecture, and nature into one seamless canvas. Built using rammed earth and steel, this 4-bedroom retreat celebrates design in its purest form. Every wall, nook, and corridor tells a story — from its sculptural staircase to the mural that runs through the living space. Inside, muted tones and raw textures balance luxury with restraint. Floor-to-ceiling glass opens to mountain views, while a sunken lounge near the pond becomes the heart of the house. The kitchen, designed for community cooking, doubles as a creative corner for those who love experimenting. What sets Arthaven apart is its immersive feel, a place where architecture inspires and silence heals.",
    details: [
      { label: "Project Type", value: "Premium Luxury Farmhouse" },
      // { label: "Total Floors", value: "G+2" },
      { label: "Unit Types", value: "5BHK, 5BHK" },
      { label: "Amenities", value: "Gym, Pool" },
      { label: "Location", value: "Gandipet, Hyderabad" },
      { label: "Status", value: "For Sale" },
    ],
    amenities: [
      "Built using rammed earth and an exposed steel framework",
      "4 bedrooms with panoramic glass walls",
      "Private art studio and reading cove",
      "Reflective pond with a sunken lounge",
      "Outdoor amphitheater for gatherings",
      "Native landscaping and a bird-friendly ecosystem"
    ],
    location: {
      lat: 11.4102,
      lng: 76.6950
    },
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};