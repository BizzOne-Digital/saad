export type SectionImageDTO = {
  key: string;
  url: string;
  alt: string;
};

export type SectionItemDTO = {
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
};

export type SectionDTO = {
  key: string;
  title: string;
  order: number;
  published: boolean;
  fields: Record<string, string>;
  images: SectionImageDTO[];
  items: SectionItemDTO[];
};

export type PageDTO = {
  slug: string;
  name: string;
  path: string;
  icon: string;
  published: boolean;
  order: number;
  seo: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  sections: SectionDTO[];
};
