import { resolveCmsImageUrl } from "@/lib/upload/resolve-image";

export type GalleryImageDTO = {
  url: string;
  alt: string;
  type: "before" | "after" | "main";
};

export type GalleryProjectDTO = {
  _id?: string;
  title: string;
  slug: string;
  city: string;
  description?: string;
  category: string[];
  images: GalleryImageDTO[];
  beforeImage?: GalleryImageDTO;
  afterImage?: GalleryImageDTO;
  featured: boolean;
  published: boolean;
  order: number;
};

export const GALLERY_CATEGORIES = [
  "installations",
  "repairs",
  "modern",
  "traditional",
  "commercial",
  "openers",
  "before-after",
] as const;

export function primaryImageUrl(project: {
  images?: GalleryImageDTO[];
  afterImage?: GalleryImageDTO;
}): string {
  const raw =
    project.images?.find((i) => i.type === "main")?.url ||
    project.images?.[0]?.url ||
    project.afterImage?.url ||
    "/gallery-01.jpg";
  return resolveCmsImageUrl(raw);
}

export const GALLERY_SEED: Omit<GalleryProjectDTO, "_id">[] = [
  {
    title: "Wood-Look Double Install",
    slug: "wood-look-double-vaughan",
    city: "Vaughan",
    description: "Premium wood-look double garage door installation.",
    category: ["installations", "modern"],
    images: [
      {
        url: "/gallery-01.jpg",
        alt: "Wood-look double garage door in Vaughan",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 1,
  },
  {
    title: "Modern Slot-Window Door",
    slug: "modern-slot-window-toronto",
    city: "Toronto",
    description: "Contemporary door with slot windows.",
    category: ["installations", "modern"],
    images: [
      {
        url: "/gallery-02.jpg",
        alt: "Modern slot-window garage door in Toronto",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 2,
  },
  {
    title: "Classic Long-Panel Door",
    slug: "classic-long-panel-brampton",
    city: "Brampton",
    description: "Traditional long-panel garage door.",
    category: ["installations", "traditional"],
    images: [
      {
        url: "/gallery-03.jpg",
        alt: "Classic long-panel garage door in Brampton",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 3,
  },
  {
    title: "Contemporary Grey Door",
    slug: "contemporary-grey-richmond-hill",
    city: "Richmond Hill",
    description: "Clean contemporary grey sectional door.",
    category: ["installations", "modern"],
    images: [
      {
        url: "/gallery-04.jpg",
        alt: "Contemporary grey garage door in Richmond Hill",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 4,
  },
  {
    title: "Brown Sectional Doors",
    slug: "brown-sectional-mississauga",
    city: "Mississauga",
    description: "Warm brown sectional doors for curb appeal.",
    category: ["installations", "traditional"],
    images: [
      {
        url: "/gallery-05.jpg",
        alt: "Brown sectional garage doors in Mississauga",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 5,
  },
  {
    title: "White Carriage Style",
    slug: "white-carriage-oakville",
    city: "Oakville",
    description: "Classic white carriage-style garage door.",
    category: ["installations", "traditional"],
    images: [
      {
        url: "/gallery-06.jpg",
        alt: "White carriage style garage door in Oakville",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 6,
  },
  {
    title: "Black Modern Aluminum",
    slug: "black-modern-aluminum-toronto",
    city: "Toronto",
    description: "Sleek black modern aluminum garage door.",
    category: ["installations", "modern"],
    images: [
      {
        url: "/gallery-07.jpg",
        alt: "Black modern aluminum garage door in Toronto",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 7,
  },
  {
    title: "Steel Repair Project",
    slug: "steel-repair-markham",
    city: "Markham",
    description: "Professional steel garage door repair.",
    category: ["repairs"],
    images: [
      {
        url: "/services-repair.jpg",
        alt: "Steel garage door repair in Markham",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 8,
  },
  {
    title: "Commercial Installation",
    slug: "commercial-installation-north-york",
    city: "North York",
    description: "Commercial garage door installation for business property.",
    category: ["commercial", "installations"],
    images: [
      {
        url: "/services-commercial.jpg",
        alt: "Commercial garage door installation in North York",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 9,
  },
  {
    title: "GTA Service Coverage",
    slug: "gta-service-vehicle",
    city: "Greater Toronto Area",
    description: "On-site service coverage across the GTA.",
    category: ["installations"],
    images: [
      {
        url: "/gallery-service-truck.jpg",
        alt: "Soro Garage Door Services vehicle",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 10,
  },
  {
    title: "Full Door Transformation",
    slug: "before-after-transformation",
    city: "Greater Toronto Area",
    description: "Before and after garage door replacement.",
    category: ["before-after", "installations"],
    images: [
      {
        url: "/after-new-door.jpg",
        alt: "Garage door after replacement",
        type: "main",
      },
    ],
    beforeImage: {
      url: "/before-old-door.jpg",
      alt: "Garage door before replacement",
      type: "before",
    },
    afterImage: {
      url: "/after-new-door.jpg",
      alt: "Garage door after replacement",
      type: "after",
    },
    featured: true,
    published: true,
    order: 11,
  },
  {
    title: "Insulated Steel Install",
    slug: "insulated-steel-ajax",
    city: "Ajax",
    description: "Energy-efficient insulated steel garage door installation.",
    category: ["installations", "modern"],
    images: [
      {
        url: "/install-insulated-steel.jpg",
        alt: "Insulated steel garage door in Ajax",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 12,
  },
  {
    title: "Full-View Glass Modern Door",
    slug: "full-view-glass-etobicoke",
    city: "Etobicoke",
    description: "Contemporary full-view glass garage door for modern homes.",
    category: ["installations", "modern"],
    images: [
      {
        url: "/install-glass-modern.jpg",
        alt: "Full-view glass garage door in Etobicoke",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 13,
  },
  {
    title: "Carriage Door Upgrade",
    slug: "carriage-door-burlington",
    city: "Burlington",
    description: "Classic carriage-style door upgrade with premium hardware.",
    category: ["installations", "traditional"],
    images: [
      {
        url: "/install-carriage.jpg",
        alt: "Carriage style garage door in Burlington",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 14,
  },
  {
    title: "Aluminum Door Install",
    slug: "aluminum-door-scarborough",
    city: "Scarborough",
    description: "Lightweight aluminum garage door with clean modern lines.",
    category: ["installations", "modern"],
    images: [
      {
        url: "/door-aluminum.jpg",
        alt: "Aluminum garage door in Scarborough",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 15,
  },
  {
    title: "Fiberglass Door Project",
    slug: "fiberglass-door-pickering",
    city: "Pickering",
    description: "Durable fiberglass garage door installation.",
    category: ["installations"],
    images: [
      {
        url: "/door-fiberglass.jpg",
        alt: "Fiberglass garage door in Pickering",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 16,
  },
  {
    title: "Steel Door Replacement",
    slug: "steel-door-replacement-whitby",
    city: "Whitby",
    description: "Full steel garage door replacement with new weather seals.",
    category: ["installations", "repairs"],
    images: [
      {
        url: "/door-steel.jpg",
        alt: "Steel garage door replacement in Whitby",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 17,
  },
  {
    title: "Traditional Raised Panel",
    slug: "traditional-raised-panel-newmarket",
    city: "Newmarket",
    description: "Traditional raised-panel garage door for classic curb appeal.",
    category: ["installations", "traditional"],
    images: [
      {
        url: "/door-traditional.jpg",
        alt: "Traditional raised panel garage door in Newmarket",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 18,
  },
  {
    title: "Broken Spring Repair",
    slug: "broken-spring-repair-milton",
    city: "Milton",
    description: "Same-day broken spring replacement and safety check.",
    category: ["repairs", "openers"],
    images: [
      {
        url: "/repair-broken-spring.jpg",
        alt: "Broken spring repair in Milton",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 19,
  },
  {
    title: "Cable Replacement Service",
    slug: "cable-replacement-aurora",
    city: "Aurora",
    description: "Garage door cable replacement and rebalancing.",
    category: ["repairs"],
    images: [
      {
        url: "/repair-cables.jpg",
        alt: "Garage door cable repair in Aurora",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 20,
  },
  {
    title: "Track Realignment Repair",
    slug: "track-realignment-georgetown",
    city: "Georgetown",
    description: "Bent track repair and roller replacement.",
    category: ["repairs"],
    images: [
      {
        url: "/repair-tracks.jpg",
        alt: "Garage door track repair in Georgetown",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 21,
  },
  {
    title: "Smart Opener Upgrade",
    slug: "smart-opener-upgrade-king-city",
    city: "King City",
    description: "Wi-Fi enabled garage door opener installation.",
    category: ["openers", "installations"],
    images: [
      {
        url: "/opener-technology.jpg",
        alt: "Smart garage door opener in King City",
        type: "main",
      },
    ],
    featured: true,
    published: true,
    order: 22,
  },
  {
    title: "Commercial Warehouse Door",
    slug: "commercial-warehouse-concord",
    city: "Concord",
    description: "Heavy-duty commercial warehouse door installation.",
    category: ["commercial", "installations"],
    images: [
      {
        url: "/commercial-warehouse.jpg",
        alt: "Commercial warehouse garage door in Concord",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 23,
  },
  {
    title: "Retail Bay Door Install",
    slug: "retail-bay-door-downtown-toronto",
    city: "Toronto",
    description: "Commercial retail bay door for storefront access.",
    category: ["commercial", "installations"],
    images: [
      {
        url: "/commercial-retail.jpg",
        alt: "Commercial retail bay door in Toronto",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 24,
  },
  {
    title: "Auto Shop Overhead Door",
    slug: "auto-shop-overhead-door-brampton",
    city: "Brampton",
    description: "Commercial overhead door for automotive shop.",
    category: ["commercial"],
    images: [
      {
        url: "/commercial-auto-shop.jpg",
        alt: "Auto shop overhead door in Brampton",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 25,
  },
  {
    title: "Organized Garage Finish",
    slug: "organized-garage-finish-vaughan",
    city: "Vaughan",
    description: "Clean finished garage interior after door installation.",
    category: ["installations"],
    images: [
      {
        url: "/interior-organized-garage.jpg",
        alt: "Organized garage interior in Vaughan",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 26,
  },
  {
    title: "Premium Door Installation",
    slug: "premium-door-installation-mississauga",
    city: "Mississauga",
    description: "Complete premium garage door installation with insulation and weather seals.",
    category: ["installations"],
    images: [
      {
        url: "/services-installation.jpg",
        alt: "Premium garage door installation in Mississauga",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 27,
  },
  {
    title: "Emergency Door Repair",
    slug: "emergency-door-repair-toronto",
    city: "Toronto",
    description: "Urgent same-day garage door repair for stuck or offline doors.",
    category: ["repairs"],
    images: [
      {
        url: "/services-emergency.jpg",
        alt: "Emergency garage door repair in Toronto",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 28,
  },
  {
    title: "Quiet Belt-Drive Opener",
    slug: "quiet-belt-drive-opener-oakville",
    city: "Oakville",
    description: "Quiet belt-drive opener install for residential garage.",
    category: ["openers", "installations"],
    images: [
      {
        url: "/services-opener.jpg",
        alt: "Quiet belt-drive garage door opener in Oakville",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 29,
  },
  {
    title: "Tune-Up & Maintenance",
    slug: "tune-up-maintenance-richmond-hill",
    city: "Richmond Hill",
    description: "Preventive garage door maintenance and safety tune-up.",
    category: ["repairs"],
    images: [
      {
        url: "/services-maintenance.jpg",
        alt: "Garage door maintenance in Richmond Hill",
        type: "main",
      },
    ],
    featured: false,
    published: true,
    order: 30,
  },
];
