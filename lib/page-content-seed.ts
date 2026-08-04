/**
 * Default page + section content for CMS seed.
 * Images reference files already in /public.
 */

export type SeedSection = {
  key: string;
  title: string;
  order: number;
  fields: Record<string, string>;
  images: { key: string; url: string; alt: string }[];
  items: {
    id?: string;
    title?: string;
    description?: string;
    text?: string;
    image?: string;
    imageAlt?: string;
    features?: string[];
    cta?: string;
    link?: string;
    number?: string;
    city?: string;
  }[];
};

export type SeedPage = {
  slug: string;
  name: string;
  path: string;
  icon: string;
  order: number;
  seo: { title: string; description: string; ogImage?: string };
  sections: SeedSection[];
};

export const PAGE_CONTENT_SEED: SeedPage[] = [
  {
    slug: "home",
    name: "Home Page",
    path: "/",
    icon: "🏠",
    order: 1,
    seo: {
      title: "Soro Garage Door Services | Repair & Installation — GTA",
      description:
        "Trusted garage door repair and installation across the Greater Toronto Area. Same-day service available.",
      ogImage: "/home-hero.png",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "Serving the Greater Toronto Area",
          heading: "Trusted Garage Door Repair & Installation Across the Greater Toronto Area",
          description:
            "Professional garage door installation, repairs, spring replacement, opener installation, and same-day service with honest pricing and Canadian-made garage doors.",
          ratingLabel: "Google Reviews",
          ratingValue: "5.0",
          ratingSubtext: "500+ Happy Customers",
          ctaPrimary: "REQUEST A FREE ESTIMATE →",
          ctaPrimaryLink: "/contact",
          ctaCall: "CALL 647-299-0283",
          ctaText: "TEXT US",
          badge1Title: "Same-Day",
          badge1Subtitle: "Service Available",
          badge2Title: "Canadian-Made",
          badge2Subtitle: "Garage Doors",
          badge3Title: "Professional",
          badge3Subtitle: "Workmanship",
        },
        images: [
          {
            key: "background",
            url: "/home-hero.png",
            alt: "Premium garage door installation in the Greater Toronto Area",
          },
        ],
        items: [],
      },
      {
        key: "trust_strip",
        title: "Trust Strip",
        order: 2,
        fields: {},
        images: [],
        items: [
          { text: "Free On-Site Estimates" },
          { text: "Same-Day Service Available" },
          { text: "Canadian-Made Doors" },
          { text: "Professional Workmanship" },
          { text: "10-Year Panel Warranty" },
          { text: "Owner-Operated Service" },
        ],
      },
      {
        key: "services",
        title: "Services Showcase",
        order: 3,
        fields: {
          heading: "Complete Garage Door Solutions",
          description:
            "From new installations to emergency repairs, we provide comprehensive garage door services across the GTA.",
        },
        images: [],
        items: [
          {
            id: "installation",
            title: "New Garage Door Installation",
            description:
              "Premium Canadian-made garage doors with professional installation. Steel, aluminum, and fiberglass options available.",
            features: ["2-inch insulation", "Tempered glass windows", "10-year warranty"],
            image: "/services-installation.jpg",
            imageAlt: "New garage door installation",
            link: "/services/installation",
          },
          {
            id: "repair",
            title: "Garage Door Repair",
            description:
              "Fast, reliable repairs for broken springs, cables, rollers, tracks, and panels. Same-day service available.",
            features: ["Spring replacement", "Cable repair", "Track alignment"],
            image: "/services-repair.jpg",
            imageAlt: "Garage door repair service",
            link: "/services/repair",
          },
          {
            id: "spring",
            title: "Broken Spring Replacement",
            description:
              "Expert spring replacement service. High-cycle torsion springs installed with precision and safety.",
            features: ["High-cycle springs", "Safety inspection", "Lifetime labor warranty"],
            image: "/services-spring.jpg",
            imageAlt: "Garage door spring replacement",
            link: "/services/repair",
          },
          {
            id: "opener",
            title: "Garage Door Openers",
            description:
              "Professional opener installation and repair. LiftMaster, Chamberlain, and Genie systems.",
            features: ["Smart openers", "Belt & chain drive", "Wifi connectivity"],
            image: "/services-opener.jpg",
            imageAlt: "Garage door opener installation",
            link: "/services/opener",
          },
          {
            id: "maintenance",
            title: "Maintenance & Tune-Ups",
            description:
              "Preventive maintenance to keep your garage door running smoothly and safely year-round.",
            features: ["Full inspection", "Lubrication", "Safety testing"],
            image: "/services-maintenance.jpg",
            imageAlt: "Garage door maintenance",
            link: "/services",
          },
          {
            id: "emergency",
            title: "Emergency Same-Day Service",
            description:
              "Urgent repairs when you need them most. Garage door stuck or unsafe? We're here to help.",
            features: ["Same-day arrival", "Fast diagnosis", "Immediate repairs"],
            image: "/services-emergency.jpg",
            imageAlt: "Emergency garage door service",
            link: "/services/emergency",
          },
        ],
      },
      {
        key: "video",
        title: "Video Section",
        order: 4,
        fields: {
          heading: "Our Work In Motion",
          description:
            "Since day one, we've helped customers across the GTA with installations and repairs. Our team delivers premium workmanship you can trust.",
          videoSrc: "/videos/garage-work.mp4",
        },
        images: [],
        items: [],
      },
      {
        key: "premium_product",
        title: "Premium Product",
        order: 5,
        fields: {
          badge: "Premium Quality",
          heading: "2-Inch Polyurethane Insulated Doors",
          description:
            "Experience superior energy efficiency, noise reduction, and durability with our premium Canadian-made garage doors.",
          feature1Title: "Superior Insulation",
          feature1Text:
            "2-inch polyurethane foam core provides exceptional R-value for energy savings.",
          feature2Title: "Real Tempered Glass",
          feature2Text:
            "Authentic tempered glass windows, not acrylic. Durable, scratch-resistant, and stunning.",
          feature3Title: "Canadian-Made Construction",
          feature3Text:
            "Built to withstand harsh Canadian winters. Quality materials, expert craftsmanship.",
          feature4Title: "10-Year Panel Warranty",
          feature4Text: "Confidence backed by a strong panel warranty on qualifying doors.",
          ctaText: "Request a Free Estimate",
          ctaLink: "/contact",
        },
        images: [
          {
            key: "main",
            url: "/gallery-01.jpg",
            alt: "Premium insulated garage door with tempered glass windows",
          },
        ],
        items: [],
      },
      {
        key: "before_after",
        title: "Before & After",
        order: 6,
        fields: {
          heading: "Complete Transformations",
          description:
            "See the dramatic difference a new garage door makes. Real projects from across the GTA.",
          projectTitle: "Full Door Replacement",
          projectCity: "Greater Toronto Area",
          projectDescription: "Worn door replaced with a modern insulated sectional door.",
        },
        images: [
          {
            key: "before",
            url: "/before-old-door.jpg",
            alt: "Garage door before replacement",
          },
          {
            key: "after",
            url: "/after-new-door.jpg",
            alt: "Garage door after professional installation",
          },
        ],
        items: [],
      },
      {
        key: "why_choose",
        title: "Why Choose Soro",
        order: 7,
        fields: {
          heading: "Why Choose Soro Garage Doors",
          description:
            "Experience the difference of working with a dedicated, local garage door specialist.",
        },
        images: [],
        items: [
          {
            title: "Honest, Transparent Pricing",
            description:
              "No hidden fees. Clear quotes before we start. Fair pricing for quality work you can trust.",
          },
          {
            title: "Owner-Operated Service",
            description:
              "Direct communication with the owner. Personal attention to every detail of your project.",
          },
          {
            title: "Fast Response Times",
            description:
              "Same-day service available. We understand garage door emergencies can't wait.",
          },
          {
            title: "Professional Workmanship",
            description:
              "Skilled technicians with years of experience. Every job done right the first time.",
          },
          {
            title: "Residential & Commercial",
            description:
              "Serving homeowners, property managers, and businesses across the Greater Toronto Area.",
          },
          {
            title: "Always Available",
            description:
              "Monday to Sunday, 8 AM to 8 PM. Call, text, or email—we're here when you need us.",
          },
        ],
      },
      {
        key: "process",
        title: "Process",
        order: 8,
        fields: {
          heading: "Our Simple 5-Step Process",
          description:
            "From your first contact to final installation, we make it easy and stress-free.",
        },
        images: [],
        items: [
          {
            number: "01",
            title: "Request Estimate",
            description: "Call, text, or fill out our online form. Tell us what you need.",
          },
          {
            number: "02",
            title: "On-Site Assessment",
            description: "We visit your location for a thorough, no-obligation inspection.",
          },
          {
            number: "03",
            title: "Clear Quote",
            description: "Receive a detailed, transparent quote with no hidden fees.",
          },
          {
            number: "04",
            title: "Professional Work",
            description: "Expert installation or repair completed to the highest standards.",
          },
          {
            number: "05",
            title: "Final Walkthrough",
            description:
              "Complete safety test and demonstration. Your satisfaction guaranteed.",
          },
        ],
      },
      {
        key: "pricing",
        title: "Pricing Preview",
        order: 9,
        fields: {
          heading: "Transparent Starting Prices",
          description:
            "Final pricing depends on the selected product, site conditions, parts, door size, and required work.",
          disclaimer:
            "All prices are starting-at estimates. Free on-site estimates available.",
        },
        images: [],
        items: [
          { title: "Garage Door Installation", text: "Starting at $1,299" },
          { title: "Garage Door Openers", text: "Starting at $600 installed" },
          { title: "Spring Replacement", text: "Starting at $160" },
          { title: "Garage Door Repairs", text: "Starting at $129" },
          { title: "On-Site Estimates", text: "Free" },
        ],
      },
      {
        key: "recent_projects",
        title: "Recent Projects",
        order: 10,
        fields: {
          heading: "Recent Projects Across the GTA",
          description: "A selection of installations and upgrades completed for local homeowners.",
        },
        images: [],
        items: [
          {
            title: "Wood-Look Double Install",
            city: "Vaughan",
            image: "/gallery-01.jpg",
            imageAlt: "Wood-look double garage door in Vaughan",
          },
          {
            title: "Modern Slot-Window Door",
            city: "Toronto",
            image: "/gallery-02.jpg",
            imageAlt: "Modern slot-window garage door in Toronto",
          },
          {
            title: "Classic Long-Panel Door",
            city: "Brampton",
            image: "/gallery-03.jpg",
            imageAlt: "Classic long-panel garage door in Brampton",
          },
          {
            title: "Contemporary Grey Door",
            city: "Richmond Hill",
            image: "/gallery-04.jpg",
            imageAlt: "Contemporary grey garage door in Richmond Hill",
          },
          {
            title: "Brown Sectional Doors",
            city: "Mississauga",
            image: "/gallery-05.jpg",
            imageAlt: "Brown sectional garage doors in Mississauga",
          },
          {
            title: "GTA Service Coverage",
            city: "Greater Toronto Area",
            image: "/gallery-service-truck.jpg",
            imageAlt: "Soro Garage Door Services vehicle covering the GTA",
          },
        ],
      },
      {
        key: "reviews",
        title: "Reviews Preview",
        order: 11,
        fields: {
          heading: "What Our Customers Say",
          description: "Real feedback from homeowners across the Greater Toronto Area.",
          ctaText: "Read All Reviews",
          ctaLink: "/testimonials",
        },
        images: [],
        items: [],
      },
      {
        key: "service_areas",
        title: "Service Areas",
        order: 12,
        fields: {
          heading: "Serving the Greater Toronto Area",
          description:
            "Professional garage door installation, repair, and emergency service across the GTA.",
        },
        images: [],
        items: [
          { text: "Toronto" },
          { text: "Mississauga" },
          { text: "Brampton" },
          { text: "Vaughan" },
          { text: "Markham" },
          { text: "Richmond Hill" },
          { text: "Etobicoke" },
          { text: "North York" },
          { text: "Scarborough" },
          { text: "Oakville" },
          { text: "Milton" },
          { text: "Burlington" },
          { text: "Ajax" },
          { text: "Pickering" },
          { text: "Whitby" },
        ],
      },
      {
        key: "emergency_cta",
        title: "Emergency CTA",
        order: 13,
        fields: {
          badge: "EMERGENCY SERVICE AVAILABLE",
          heading: "Garage Door Stuck or Unsafe?",
          description:
            "Same-day service available across the GTA. Call or text now for fast help.",
          ctaCall: "Call 647-299-0283",
          ctaText: "Text Us",
          ctaEstimate: "Request Free Estimate",
          ctaEstimateLink: "/contact",
        },
        images: [
          {
            key: "background",
            url: "/services-emergency.jpg",
            alt: "Emergency garage door service",
          },
        ],
        items: [],
      },
    ],
  },
  {
    slug: "about",
    name: "About Us",
    path: "/about",
    icon: "ℹ️",
    order: 2,
    seo: {
      title: "About Us | Soro Garage Door Services",
      description:
        "Learn about Soro Garage Door Services — owner-operated garage door repair and installation across the GTA.",
      ogImage: "/interior-organized-garage.jpg",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "About Soro",
          heading: "Local Garage Door Experts You Can Trust",
          description:
            "Owner-operated service focused on honest recommendations, quality Canadian-made doors, and professional workmanship across the Greater Toronto Area.",
        },
        images: [
          {
            key: "background",
            url: "/interior-organized-garage.jpg",
            alt: "Modern organized garage with premium door",
          },
        ],
        items: [],
      },
      {
        key: "story",
        title: "Company Story",
        order: 2,
        fields: {
          heading: "Our Story",
          description:
            "Soro Garage Door Services proudly serves homeowners and businesses across the Greater Toronto Area. We specialize in new garage door installation, repairs, spring replacement, opener installation, cables, rollers, maintenance, and emergency same-day service.",
          paragraph2:
            "We provide high-quality Canadian-made garage doors, honest pricing, professional workmanship, and outstanding customer service. Our goal is to keep every garage door safe, reliable, attractive, and operating smoothly.",
        },
        images: [
          {
            key: "main",
            url: "/gallery-02.jpg",
            alt: "Completed garage door project",
          },
        ],
        items: [],
      },
      {
        key: "values",
        title: "Mission & Values",
        order: 3,
        fields: {
          heading: "Mission & Values",
          description: "What drives every job we take on.",
        },
        images: [
          {
            key: "main",
            url: "/technician-professional.jp.png",
            alt: "Professional garage door technician at work",
          },
        ],
        items: [
          {
            title: "Safety First",
            description:
              "Garage doors involve high tension. We prioritize safe repairs and never recommend unsafe DIY spring or cable work.",
          },
          {
            title: "Honest Pricing",
            description:
              "Clear recommendations and transparent starting prices before work begins.",
          },
          {
            title: "Canadian-Made Quality",
            description:
              "We install premium doors built for Ontario weather and long-term reliability.",
          },
          {
            title: "Owner-Operated Care",
            description:
              "Personal attention from a local operator who stands behind the work.",
          },
        ],
      },
      {
        key: "cta",
        title: "Closing CTA",
        order: 4,
        fields: {
          heading: "Ready for a Safer, Better Garage Door?",
          description: "Request a free on-site estimate or call us today.",
          ctaPrimary: "Request Free Estimate",
          ctaPrimaryLink: "/contact",
          ctaCall: "Call 647-299-0283",
        },
        images: [
          {
            key: "background",
            url: "/gallery-04.jpg",
            alt: "Premium garage door installation",
          },
        ],
        items: [],
      },
    ],
  },
  {
    slug: "services",
    name: "Services",
    path: "/services",
    icon: "🔧",
    order: 3,
    seo: {
      title: "Garage Door Services | Soro Garage Door Services",
      description:
        "Installation, repair, springs, openers, maintenance, commercial, and same-day emergency garage door service in the GTA.",
      ogImage: "/services-repair.jpg",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "Our Services",
          heading: "Complete Garage Door Solutions",
          description:
            "Professional installation, repair, openers, and emergency service for homes and businesses across the GTA.",
        },
        images: [
          {
            key: "background",
            url: "/services-repair.jpg",
            alt: "Garage door repair and service",
          },
        ],
        items: [],
      },
      {
        key: "services_list",
        title: "Services List",
        order: 2,
        fields: {
          heading: "What We Offer",
          description: "Select a service to learn more or request a free estimate.",
        },
        images: [],
        items: [
          {
            title: "New Garage Door Installation",
            description: "Premium Canadian-made doors installed professionally.",
            image: "/services-installation.jpg",
            imageAlt: "Garage door installation",
            link: "/services/installation",
          },
          {
            title: "Garage Door Repair",
            description: "Springs, cables, rollers, tracks, panels, and more.",
            image: "/services-repair.jpg",
            imageAlt: "Garage door repair",
            link: "/services/repair",
          },
          {
            title: "Opener Installation & Repair",
            description: "Smart and traditional opener systems.",
            image: "/services-opener.jpg",
            imageAlt: "Garage door opener",
            link: "/services/opener",
          },
          {
            title: "Emergency Same-Day Service",
            description: "Urgent help when your door is stuck or unsafe.",
            image: "/services-emergency.jpg",
            imageAlt: "Emergency garage door service",
            link: "/services/emergency",
          },
          {
            title: "Commercial Garage Door Service",
            description: "Reliable service for businesses and property managers.",
            image: "/services-commercial.jpg",
            imageAlt: "Commercial garage door service",
            link: "/services/commercial",
          },
          {
            title: "Maintenance & Tune-Ups",
            description: "Keep your door safe, quiet, and reliable year-round.",
            image: "/services-maintenance.jpg",
            imageAlt: "Garage door maintenance",
            link: "/contact",
          },
        ],
      },
      {
        key: "cta",
        title: "CTA",
        order: 3,
        fields: {
          heading: "Need Help Choosing a Service?",
          description: "Call or request a free on-site estimate — we'll recommend the right fix.",
          ctaPrimary: "Request Free Estimate",
          ctaPrimaryLink: "/contact",
        },
        images: [
          {
            key: "background",
            url: "/services-installation.jpg",
            alt: "Professional garage door service",
          },
        ],
        items: [],
      },
    ],
  },
  {
    slug: "gallery",
    name: "Gallery",
    path: "/gallery",
    icon: "🖼️",
    order: 4,
    seo: {
      title: "Project Gallery | Soro Garage Door Services",
      description: "Browse recent garage door installations and upgrades across the GTA.",
      ogImage: "/gallery-01.jpg",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "Our Work",
          heading: "Project Gallery",
          description: "Real installations and upgrades completed for GTA homeowners.",
        },
        images: [
          {
            key: "background",
            url: "/gallery-01.jpg",
            alt: "Garage door project gallery",
          },
        ],
        items: [],
      },
      {
        key: "projects",
        title: "Projects",
        order: 2,
        fields: {
          heading: "Featured Projects",
          description: "Filter-ready project list managed from the admin panel.",
        },
        images: [],
        items: [
          {
            title: "Wood-Look Double Install",
            city: "Vaughan",
            description: "Premium wood-look double garage door installation.",
            image: "/gallery-01.jpg",
            imageAlt: "Wood-look double garage door in Vaughan",
          },
          {
            title: "Modern Slot-Window Door",
            city: "Toronto",
            description: "Contemporary door with slot windows.",
            image: "/gallery-02.jpg",
            imageAlt: "Modern slot-window garage door in Toronto",
          },
          {
            title: "Classic Long-Panel Door",
            city: "Brampton",
            description: "Traditional long-panel style door.",
            image: "/gallery-03.jpg",
            imageAlt: "Classic long-panel garage door in Brampton",
          },
          {
            title: "Contemporary Grey Door",
            city: "Richmond Hill",
            description: "Clean contemporary grey sectional door.",
            image: "/gallery-04.jpg",
            imageAlt: "Contemporary grey garage door in Richmond Hill",
          },
          {
            title: "Brown Sectional Doors",
            city: "Mississauga",
            description: "Warm brown sectional doors for curb appeal.",
            image: "/gallery-05.jpg",
            imageAlt: "Brown sectional garage doors in Mississauga",
          },
          {
            title: "Additional Project",
            city: "GTA",
            description: "Another completed installation across the GTA.",
            image: "/gallery-06.jpg",
            imageAlt: "Garage door project",
          },
          {
            title: "Premium Finish Install",
            city: "GTA",
            description: "Premium finish garage door project.",
            image: "/gallery-07.jpg",
            imageAlt: "Premium garage door finish",
          },
          {
            title: "Service Vehicle",
            city: "Greater Toronto Area",
            description: "On-site service coverage across the GTA.",
            image: "/gallery-service-truck.jpg",
            imageAlt: "Soro service vehicle",
          },
        ],
      },
    ],
  },
  {
    slug: "testimonials",
    name: "Testimonials",
    path: "/testimonials",
    icon: "⭐",
    order: 5,
    seo: {
      title: "Customer Reviews | Soro Garage Door Services",
      description: "Read customer feedback for Soro Garage Door Services across the GTA.",
      ogImage: "/gallery-03.jpg",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "Reviews",
          heading: "What Our Customers Say",
          description: "Feedback from homeowners and businesses we have served across the GTA.",
          googleReviewCta: "Leave Us a Google Review",
          googleReviewsCta: "Read More Reviews on Google",
        },
        images: [
          {
            key: "background",
            url: "/gallery-03.jpg",
            alt: "Customer garage door project",
          },
        ],
        items: [],
      },
      {
        key: "reviews_intro",
        title: "Reviews Intro",
        order: 2,
        fields: {
          heading: "Customer Testimonials",
          description:
            "Reviews shown on this page are managed in the admin panel. Only real customer feedback should be published.",
        },
        images: [
          { key: "support1", url: "/gallery-01.jpg", alt: "Completed project photo 1" },
          { key: "support2", url: "/gallery-02.jpg", alt: "Completed project photo 2" },
          { key: "support3", url: "/gallery-04.jpg", alt: "Completed project photo 3" },
          { key: "support4", url: "/gallery-05.jpg", alt: "Completed project photo 4" },
          { key: "support5", url: "/services-installation.jpg", alt: "Installation work" },
        ],
        items: [],
      },
    ],
  },
  {
    slug: "faq",
    name: "FAQ",
    path: "/faq",
    icon: "❓",
    order: 6,
    seo: {
      title: "FAQ | Soro Garage Door Services",
      description:
        "Answers about garage door repair costs, installation, springs, openers, warranties, and GTA service areas.",
      ogImage: "/services-maintenance.jpg",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "Help Centre",
          heading: "Frequently Asked Questions",
          description:
            "Find answers about installation, repairs, pricing, warranties, and emergency service.",
        },
        images: [
          {
            key: "background",
            url: "/services-maintenance.jpg",
            alt: "Garage door maintenance and service",
          },
        ],
        items: [],
      },
      {
        key: "faq_support",
        title: "Support Imagery",
        order: 2,
        fields: {
          heading: "Still Have Questions?",
          description: "Call, text, or request a free estimate — we're happy to help.",
        },
        images: [
          { key: "img1", url: "/repair-broken-spring.jpg", alt: "Broken spring repair" },
          { key: "img2", url: "/repair-cables.jpg", alt: "Cable replacement" },
          { key: "img3", url: "/repair-tracks.jpg", alt: "Track alignment" },
          { key: "img4", url: "/opener-technology.jpg", alt: "Garage door opener" },
          { key: "img5", url: "/door-steel.jpg", alt: "Steel garage door" },
        ],
        items: [],
      },
    ],
  },
  {
    slug: "contact",
    name: "Contact",
    path: "/contact",
    icon: "📞",
    order: 7,
    seo: {
      title: "Contact / Free Estimate | Soro Garage Door Services",
      description:
        "Request a free on-site estimate. Call or text 647-299-0283. Serving the Greater Toronto Area.",
      ogImage: "/contact-hero.jpg",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "Get In Touch",
          heading: "Request a Free Estimate",
          description:
            "Tell us about your garage door needs. Same-day service available across the GTA.",
        },
        images: [
          {
            key: "background",
            url: "/contact-hero.jpg",
            alt: "Contact Soro Garage Door Services",
          },
        ],
        items: [],
      },
      {
        key: "contact_info",
        title: "Contact Information",
        order: 2,
        fields: {
          heading: "How to Reach Us",
          phone: "647-299-0283",
          email: "info@sorogaragedoors.ca",
          serviceArea: "Greater Toronto Area, Ontario",
          hours: "Monday–Sunday, 8:00 AM–8:00 PM",
          note: "Free on-site estimates. Same-day service available.",
        },
        images: [
          { key: "img1", url: "/gallery-service-truck.jpg", alt: "Service vehicle" },
          { key: "img2", url: "/services-emergency.jpg", alt: "Emergency service ready" },
          { key: "img3", url: "/interior-organized-garage.jpg", alt: "Finished garage interior" },
          { key: "img4", url: "/gallery-06.jpg", alt: "Recent project" },
          { key: "img5", url: "/door-traditional.jpg", alt: "Traditional garage door" },
        ],
        items: [],
      },
      {
        key: "form_intro",
        title: "Quote Form Intro",
        order: 3,
        fields: {
          heading: "Free Estimate Form",
          description:
            "Fill out the form and we will contact you using your preferred method. For urgent repairs, call or text 647-299-0283.",
        },
        images: [],
        items: [],
      },
    ],
  },
  {
    slug: "door-types",
    name: "Door Types",
    path: "/door-types",
    icon: "🚪",
    order: 8,
    seo: {
      title: "Garage Door Types | Soro Garage Door Services",
      description: "Steel, aluminum, and fiberglass garage door options for GTA homes.",
      ogImage: "/door-steel.jpg",
    },
    sections: [
      {
        key: "hero",
        title: "Hero",
        order: 1,
        fields: {
          eyebrow: "Door Options",
          heading: "Garage Door Types",
          description: "Explore steel, aluminum, and fiberglass doors suited to Ontario homes.",
        },
        images: [
          { key: "background", url: "/door-steel.jpg", alt: "Steel garage door" },
        ],
        items: [],
      },
      {
        key: "types",
        title: "Door Types",
        order: 2,
        fields: {
          heading: "Choose the Right Door",
          description: "Each material has different strengths for insulation, weight, and style.",
        },
        images: [],
        items: [
          {
            title: "Steel Garage Doors",
            description: "Durable, insulated options popular for residential homes.",
            image: "/door-steel.jpg",
            imageAlt: "Steel garage door",
          },
          {
            title: "Aluminum Garage Doors",
            description: "Lighter construction with modern full-view possibilities.",
            image: "/door-aluminum.jpg",
            imageAlt: "Aluminum garage door",
          },
          {
            title: "Fiberglass Garage Doors",
            description: "Attractive finishes with solid everyday performance.",
            image: "/door-fiberglass.jpg",
            imageAlt: "Fiberglass garage door",
          },
          {
            title: "Traditional Styles",
            description: "Classic panel designs that complement established neighbourhoods.",
            image: "/door-traditional.jpg",
            imageAlt: "Traditional garage door style",
          },
        ],
      },
    ],
  },
];
