export type DoorStyleImageDTO = {
  url: string;
  alt: string;
};

export type DoorStyleDTO = {
  _id?: string;
  modelName: string;
  slug: string;
  description?: string;
  size: string;
  colour: string;
  windowStyle: string;
  material?: string;
  category: string[];
  images: DoorStyleImageDTO[];
  featured: boolean;
  published: boolean;
  order: number;
};

export const DOOR_STYLE_CATEGORIES = [
  "steel",
  "aluminum",
  "fiberglass",
  "modern",
  "traditional",
  "carriage",
  "glass",
] as const;

export function primaryDoorStyleImage(style: {
  images?: DoorStyleImageDTO[];
}): string {
  return style.images?.[0]?.url || "/door-steel.jpg";
}

export const DOOR_STYLES_SEED: Omit<DoorStyleDTO, "_id">[] = [
  {
    modelName: "Heritage Raised Panel Steel",
    slug: "heritage-raised-panel-steel",
    description:
      "Classic raised-panel steel door with excellent insulation and curb appeal. A timeless choice for traditional homes.",
    size: '9\' × 7\' (also available 16\' × 7\')',
    colour: "White / Almond / Brown",
    windowStyle: "Optional top-row short windows",
    material: "Insulated Steel (R-16)",
    category: ["steel", "traditional"],
    images: [
      { url: "/door-steel.jpg", alt: "Heritage raised panel steel door" },
      { url: "/door-traditional.jpg", alt: "Traditional raised panel close-up" },
      { url: "/gallery-03.jpg", alt: "Heritage steel door installed" },
    ],
    featured: true,
    published: true,
    order: 1,
  },
  {
    modelName: "Modern Full-View Aluminum",
    slug: "modern-full-view-aluminum",
    description:
      "Sleek aluminum frame with full-view glass panels for contemporary homes. Maximum natural light and modern style.",
    size: '16\' × 8\'',
    colour: "Black / Clear Anodized / Bronze",
    windowStyle: "Full-view tempered glass panels",
    material: "Aluminum + Glass",
    category: ["aluminum", "modern", "glass"],
    images: [
      { url: "/door-aluminum.jpg", alt: "Modern full-view aluminum door" },
      { url: "/install-glass-modern.jpg", alt: "Full-view glass garage door" },
      { url: "/gallery-02.jpg", alt: "Modern slot window aluminum door" },
    ],
    featured: true,
    published: true,
    order: 2,
  },
  {
    modelName: "Wood-Look Fiberglass Carriage",
    slug: "wood-look-fiberglass-carriage",
    description:
      "Beautiful wood-grain fiberglass that never warps or needs staining. Carriage-style hardware included.",
    size: '9\' × 7\'',
    colour: "Cedar / Mahogany / Driftwood",
    windowStyle: "Arch or rectangle carriage windows",
    material: "Fiberglass",
    category: ["fiberglass", "carriage", "traditional"],
    images: [
      { url: "/door-fiberglass.jpg", alt: "Wood-look fiberglass carriage door" },
      { url: "/install-carriage.jpg", alt: "Carriage style garage door" },
      { url: "/gallery-06.jpg", alt: "White carriage style door" },
    ],
    featured: true,
    published: true,
    order: 3,
  },
  {
    modelName: "Contemporary Flush Steel",
    slug: "contemporary-flush-steel",
    description:
      "Clean flush-panel steel door with a modern minimal look. Perfect for new builds and renovations.",
    size: '16\' × 7\'',
    colour: "Charcoal Grey / Black / White",
    windowStyle: "No windows or slim horizontal lights",
    material: "Insulated Steel (R-18)",
    category: ["steel", "modern"],
    images: [
      { url: "/gallery-04.jpg", alt: "Contemporary grey flush steel door" },
      { url: "/install-insulated-steel.jpg", alt: "Insulated steel door install" },
      { url: "/gallery-07.jpg", alt: "Black modern steel door" },
    ],
    featured: true,
    published: true,
    order: 4,
  },
  {
    modelName: "Classic Long Panel Steel",
    slug: "classic-long-panel-steel",
    description:
      "Long horizontal panel design that complements ranch and bungalow homes across the GTA.",
    size: '9\' × 7\'',
    colour: "Sandtone / White / Brown",
    windowStyle: "Optional clear or frosted windows",
    material: "Steel",
    category: ["steel", "traditional"],
    images: [
      { url: "/gallery-03.jpg", alt: "Classic long panel steel door" },
      { url: "/gallery-05.jpg", alt: "Brown sectional long panel doors" },
      { url: "/door-traditional.jpg", alt: "Traditional long panel detail" },
    ],
    featured: false,
    published: true,
    order: 5,
  },
  {
    modelName: "Premium Insulated Double Door",
    slug: "premium-insulated-double-door",
    description:
      "Double-car insulated steel doors with matching finish. Quiet operation and strong weather sealing.",
    size: '16\' × 8\'',
    colour: "Espresso / Black / White",
    windowStyle: "Optional decorative top windows",
    material: "Insulated Steel (R-16–R-18)",
    category: ["steel", "modern"],
    images: [
      { url: "/gallery-01.jpg", alt: "Premium wood-look double door" },
      { url: "/services-installation.jpg", alt: "Double door installation" },
      { url: "/interior-organized-garage.jpg", alt: "Finished garage interior" },
    ],
    featured: true,
    published: true,
    order: 6,
  },
  {
    modelName: "Commercial Overhead Steel",
    slug: "commercial-overhead-steel",
    description:
      "Heavy-duty commercial overhead door for shops, warehouses, and retail bay openings.",
    size: '12\' × 12\' (custom sizes available)',
    colour: "White / Grey / Custom",
    windowStyle: "Optional vision panels",
    material: "Commercial Steel",
    category: ["steel"],
    images: [
      { url: "/commercial-warehouse.jpg", alt: "Commercial warehouse door" },
      { url: "/commercial-auto-shop.jpg", alt: "Auto shop overhead door" },
      { url: "/commercial-retail.jpg", alt: "Retail bay door" },
      { url: "/services-commercial.jpg", alt: "Commercial door installation" },
    ],
    featured: false,
    published: true,
    order: 7,
  },
  {
    modelName: "Black Modern Aluminum",
    slug: "black-modern-aluminum",
    description:
      "Bold black aluminum door with contemporary panel layout. Ideal for modern architecture.",
    size: '16\' × 7\'',
    colour: "Matte Black",
    windowStyle: "Slim rectangular windows or none",
    material: "Aluminum",
    category: ["aluminum", "modern"],
    images: [
      { url: "/gallery-07.jpg", alt: "Black modern aluminum door" },
      { url: "/door-aluminum.jpg", alt: "Aluminum garage door detail" },
      { url: "/gallery-02.jpg", alt: "Modern aluminum with windows" },
    ],
    featured: false,
    published: true,
    order: 8,
  },
];
