import { WPPost, WPMedia, WPBeer, WPBrewery, WPBeerReview } from "./types";

const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || "http://brobeerme.local/wp-json/wp/v2";

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = 60, tags } = options;

  const res = await fetch(`${WP_API}${endpoint}`, {
    next: {
      revalidate,
      tags
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Posts / Blog
export async function getPosts(params?: {
  page?: number;
  perPage?: number;
  categories?: number[];
  search?: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("_embed", "true");

  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.perPage) searchParams.set("per_page", params.perPage.toString());
  if (params?.categories?.length) {
    searchParams.set("categories", params.categories.join(","));
  }
  if (params?.search) searchParams.set("search", params.search);

  return fetchAPI<WPPost[]>(`/posts?${searchParams}`, { tags: ["posts"] });
}

export async function getPost(slug: string) {
  const posts = await fetchAPI<WPPost[]>(`/posts?slug=${slug}&_embed=true`, {
    tags: ["posts"],
  });
  return posts[0] || null;
}

// Pages
export async function getPage(slug: string) {
  const pages = await fetchAPI<WPPost[]>(`/pages?slug=${slug}&_embed=true`, {
    tags: ["pages"],
  });
  return pages[0] || null;
}

// Media
export async function getMedia(id: number) {
  return fetchAPI<WPMedia>(`/media/${id}`);
}

// Categories
export async function getCategories() {
  return fetchAPI<{ id: number; name: string; slug: string; count: number }[]>(
    "/categories",
    { revalidate: 3600 }
  );
}

// Search
export async function searchContent(query: string) {
  return fetchAPI<WPPost[]>(`/posts?search=${encodeURIComponent(query)}&_embed=true`);
}

// Helper to extract featured image URL from embedded post
export function getFeaturedImageUrl(post: WPPost, size: string = "full"): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;

  if (size !== "full" && media.media_details?.sizes?.[size]) {
    return media.media_details.sizes[size].source_url;
  }

  return media.source_url;
}

// Helper to strip HTML tags from content
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

// ─── Custom Post Type Endpoints ────────────────────────────────────────────────

// Beers
export async function getBeers(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  orderby?: string;
  meta_key?: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("_embed", "true");
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.perPage) searchParams.set("per_page", params.perPage.toString());
  if (params?.search) searchParams.set("search", params.search);
  if (params?.orderby) searchParams.set("orderby", params.orderby);
  if (params?.meta_key) searchParams.set("meta_key", params.meta_key);

  return fetchAPI<WPBeer[]>(`/beer?${searchParams}`, { tags: ["beers"] });
}

export async function getBeer(slug: string) {
  const beers = await fetchAPI<WPBeer[]>(`/beer?slug=${slug}&_embed=true`, {
    tags: ["beers"],
  });
  return beers[0] || null;
}

// Breweries
export async function getBreweries(params?: {
  page?: number;
  perPage?: number;
  search?: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("_embed", "true");
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.perPage) searchParams.set("per_page", params.perPage.toString());
  if (params?.search) searchParams.set("search", params.search);

  return fetchAPI<WPBrewery[]>(`/brewery?${searchParams}`, { tags: ["breweries"] });
}

export async function getBrewery(slug: string) {
  const breweries = await fetchAPI<WPBrewery[]>(`/brewery?slug=${slug}&_embed=true`, {
    tags: ["breweries"],
  });
  return breweries[0] || null;
}

// Beer Reviews
export async function getBeerReviews(params?: {
  beerId?: number;
  perPage?: number;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("_embed", "true");
  if (params?.perPage) searchParams.set("per_page", params.perPage.toString());

  return fetchAPI<WPBeerReview[]>(`/beer_review?${searchParams}`, { tags: ["reviews"] });
}
