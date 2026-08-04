export type FaqDTO = {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
  order: number;
};

export const FAQ_CATEGORIES = [
  "Installation",
  "Repairs",
  "Garage Door Openers",
  "Warranty & Maintenance",
  "Pricing & Estimates",
  "Service Areas",
  "Emergency Service",
  "Springs and Cables",
] as const;

export const FAQS_SEED: Omit<FaqDTO, "_id">[] = [
  {
    question: "How much does a new garage door installation cost?",
    answer:
      "New garage door installation starts at $1,299 and varies based on door size, style, insulation level, window options, and hardware. We provide free on-site estimates with detailed pricing breakdown.",
    category: "Installation",
    published: true,
    order: 1,
  },
  {
    question: "Do you install insulated garage doors?",
    answer:
      "Yes, we specialize in 2-inch polyurethane insulated garage doors with superior R-value for energy efficiency. These Canadian-made doors are built for our climate and significantly reduce heat loss.",
    category: "Installation",
    published: true,
    order: 2,
  },
  {
    question: "What is a polyurethane-insulated garage door?",
    answer:
      "Polyurethane insulation is foam injected between steel layers, providing superior insulation, soundproofing, and door strength compared to polystyrene panels. It offers better R-value and durability.",
    category: "Installation",
    published: true,
    order: 3,
  },
  {
    question: "Are the windows made from real tempered glass?",
    answer:
      "Yes, we use real tempered glass windows, not acrylic alternatives. Tempered glass is more durable, scratch-resistant, and provides an authentic premium appearance.",
    category: "Installation",
    published: true,
    order: 4,
  },
  {
    question: "How much does garage door repair cost?",
    answer:
      "Repair costs start at $129 and depend on the issue. Spring replacement starts at $160, cable replacement at $129. We provide upfront pricing before starting any work.",
    category: "Repairs",
    published: true,
    order: 5,
  },
  {
    question: "Do you provide same-day garage door service?",
    answer:
      "Yes, we offer same-day emergency service across the GTA based on availability. Call or text us for urgent repairs and we'll do our best to assist you the same day.",
    category: "Emergency Service",
    published: true,
    order: 6,
  },
  {
    question: "Can I use my garage door if the spring is broken?",
    answer:
      "No. Never attempt to operate a garage door with a broken spring. The door is extremely heavy without spring support and can cause serious injury or property damage. Call for professional spring replacement immediately.",
    category: "Springs and Cables",
    published: true,
    order: 7,
  },
  {
    question: "How long do garage door springs last?",
    answer:
      "Standard springs last 7-10 years or 10,000-15,000 cycles. We install high-cycle springs rated for 25,000-30,000 cycles for extended lifespan.",
    category: "Springs and Cables",
    published: true,
    order: 8,
  },
  {
    question: "How much does a garage door opener cost installed?",
    answer:
      "Garage door opener installation starts at $600 including the opener unit, installation, programming, and safety testing. Smart WiFi openers are available.",
    category: "Garage Door Openers",
    published: true,
    order: 9,
  },
  {
    question: "What type of garage door opener is best?",
    answer:
      "Belt drive openers are ultra-quiet and ideal for homes with living spaces above the garage. Chain drive openers are durable and cost-effective. We recommend based on your specific needs.",
    category: "Garage Door Openers",
    published: true,
    order: 10,
  },
  {
    question: "Can you install smart garage door openers?",
    answer:
      "Yes, we install WiFi-connected smart openers that allow you to control and monitor your garage door from your smartphone anywhere.",
    category: "Garage Door Openers",
    published: true,
    order: 11,
  },
  {
    question: "What does the panel warranty cover?",
    answer:
      "Our Canadian-made garage doors include a 10-year manufacturer warranty covering defects in door panels, including warping, cracking, and delamination under normal use.",
    category: "Warranty & Maintenance",
    published: true,
    order: 12,
  },
  {
    question: "How often should a garage door receive maintenance?",
    answer:
      "We recommend annual maintenance including lubrication, safety testing, spring adjustment, and hardware inspection to extend door life and prevent issues.",
    category: "Warranty & Maintenance",
    published: true,
    order: 13,
  },
  {
    question: "Do you provide free on-site estimates?",
    answer:
      "Yes, we provide free, no-obligation on-site estimates. We'll assess your needs, take measurements, discuss options, and provide detailed pricing.",
    category: "Pricing & Estimates",
    published: true,
    order: 14,
  },
  {
    question: "Are there hidden fees?",
    answer:
      "No. We provide transparent upfront pricing. The estimate we give you is the price you pay. No surprises, no hidden fees.",
    category: "Pricing & Estimates",
    published: true,
    order: 15,
  },
  {
    question: "Which GTA cities do you serve?",
    answer:
      "We serve Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Milton, Etobicoke, North York, Scarborough, Ajax, Pickering, Whitby, and surrounding GTA communities.",
    category: "Service Areas",
    published: true,
    order: 16,
  },
  {
    question: "Do you service commercial garage doors?",
    answer:
      "Yes, we provide garage door installation, repair, and maintenance for commercial properties, businesses, and property management companies across the GTA.",
    category: "Service Areas",
    published: true,
    order: 17,
  },
];
