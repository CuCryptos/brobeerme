// WordPress Post Types
export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
}

// Application Types
export interface Beer {
  id: number;
  name: string;
  slug: string;
  brewery: string;
  style: string;
  abv: number;
  ibu?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  tastingNotes: {
    appearance: string;
    aroma: string;
    taste: string;
    mouthfeel: string;
  };
}

export interface BeerReview {
  id: number;
  beerId: number;
  author: string;
  rating: number;
  content: string;
  date: string;
  tastingNotes: {
    appearance: number;
    aroma: number;
    taste: number;
    mouthfeel: number;
  };
}

export interface Brewery {
  id: number;
  name: string;
  slug: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  image: string;
  website?: string;
  phone?: string;
  hours?: Record<string, string>;
  beers: Beer[];
  rating: number;
  reviewCount: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// WordPress CPT Response Types
export interface WPBeer extends WPPost {
  meta: {
    brewery: string;
    style: string;
    abv: number;
    ibu: number;
    rating: number;
    review_count: number;
    tasting_appearance: string;
    tasting_aroma: string;
    tasting_taste: string;
    tasting_mouthfeel: string;
  };
  tasting_notes: {
    appearance: string;
    aroma: string;
    taste: string;
    mouthfeel: string;
  };
}

export interface WPBrewery extends WPPost {
  meta: {
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
    website: string;
    phone: string;
    hours: string;
    rating: number;
    review_count: number;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    lng: number;
  };
  parsed_hours: Record<string, string> | null;
}

export interface WPBeerReview extends WPPost {
  meta: {
    beer_id: number;
    reviewer_name: string;
    rating: number;
    note_appearance: number;
    note_aroma: number;
    note_taste: number;
    note_mouthfeel: number;
  };
  review_tasting_notes: {
    appearance: number;
    aroma: number;
    taste: number;
    mouthfeel: number;
  };
}
