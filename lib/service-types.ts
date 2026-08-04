export type ServiceCardDTO = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  features?: string[];
  badge?: string;
};

export type ServiceWhyItemDTO = {
  title: string;
  description?: string;
};

export type ServiceDTO = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  benefits: string[];
  icon?: string;
  image?: string;
  imageAlt?: string;
  price?: string;
  featured: boolean;
  published: boolean;
  order: number;
  category: string;
  urgent: boolean;
  eyebrow?: string;
  heroImage?: string;
  heroImageAlt?: string;
  includesHeading?: string;
  includesDescription?: string;
  includes: string[];
  cardsHeading?: string;
  cardsDescription?: string;
  cards: ServiceCardDTO[];
  whyHeading?: string;
  whyItems: ServiceWhyItemDTO[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  videoSrc?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoThumbnail?: string;
  phoneDisplay?: string;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};
