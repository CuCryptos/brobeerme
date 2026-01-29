import { Beer, BeerReview, Brewery, BlogPost } from "./types";
import * as api from "./api";
import { mapWPBeer, mapWPBrewery, mapWPReview, mapWPBlogPost } from "./mappers";
import {
  sampleBeers,
  sampleBreweries,
  sampleReviews,
  sampleBlogPosts,
  getBeerBySlug as sampleGetBeerBySlug,
  getBreweryBySlug as sampleGetBreweryBySlug,
  getReviewsForBeer as sampleGetReviewsForBeer,
  getBlogPostBySlug as sampleGetBlogPostBySlug,
  getAllBlogCategories as sampleGetAllBlogCategories,
} from "./sample-data";

// ─── Beers ─────────────────────────────────────────────────────────────────────

export async function getBeers(): Promise<Beer[]> {
  try {
    const wpBeers = await api.getBeers({ perPage: 100 });
    if (wpBeers && wpBeers.length > 0) {
      return wpBeers.map(mapWPBeer);
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  return sampleBeers;
}

export async function getBeerBySlug(slug: string): Promise<Beer | undefined> {
  try {
    const wpBeer = await api.getBeer(slug);
    if (wpBeer) {
      return mapWPBeer(wpBeer);
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  return sampleGetBeerBySlug(slug);
}

// ─── Breweries ─────────────────────────────────────────────────────────────────

export async function getBreweries(): Promise<Brewery[]> {
  try {
    const wpBreweries = await api.getBreweries({ perPage: 100 });
    if (wpBreweries && wpBreweries.length > 0) {
      // Also fetch beers to associate with breweries
      let allBeers: Beer[] = [];
      try {
        const wpBeers = await api.getBeers({ perPage: 100 });
        allBeers = wpBeers.map(mapWPBeer);
      } catch {
        allBeers = sampleBeers;
      }

      return wpBreweries.map((wp) => {
        const breweryName = wp.title.rendered;
        const beersForBrewery = allBeers.filter((b) => b.brewery === breweryName);
        return mapWPBrewery(wp, beersForBrewery);
      });
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  return sampleBreweries;
}

export async function getBreweryBySlug(slug: string): Promise<Brewery | undefined> {
  try {
    const wpBrewery = await api.getBrewery(slug);
    if (wpBrewery) {
      // Fetch associated beers
      let beers: Beer[] = [];
      try {
        const wpBeers = await api.getBeers({ perPage: 100 });
        const allBeers = wpBeers.map(mapWPBeer);
        beers = allBeers.filter((b) => b.brewery === wpBrewery.title.rendered);
      } catch {
        // Use sample beers filtered by brewery name
        beers = sampleBeers.filter((b) => b.brewery === wpBrewery.title.rendered);
      }
      return mapWPBrewery(wpBrewery, beers);
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  return sampleGetBreweryBySlug(slug);
}

// ─── Reviews ───────────────────────────────────────────────────────────────────

export async function getBeerReviews(beerId?: number): Promise<BeerReview[]> {
  try {
    const wpReviews = await api.getBeerReviews({ perPage: 100 });
    if (wpReviews && wpReviews.length > 0) {
      const mapped = wpReviews.map(mapWPReview);
      if (beerId !== undefined) {
        return mapped.filter((r) => r.beerId === beerId);
      }
      return mapped;
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  if (beerId !== undefined) {
    return sampleGetReviewsForBeer(beerId);
  }
  return sampleReviews;
}

// ─── Blog Posts ────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const wpPosts = await api.getPosts({ perPage: 100 });
    if (wpPosts && wpPosts.length > 0) {
      return wpPosts.map(mapWPBlogPost);
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  return sampleBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const wpPost = await api.getPost(slug);
    if (wpPost) {
      return mapWPBlogPost(wpPost);
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  return sampleGetBlogPostBySlug(slug);
}

export async function getAllBlogCategories(): Promise<string[]> {
  try {
    const cats = await api.getCategories();
    if (cats && cats.length > 0) {
      return cats.filter((c) => c.slug !== "uncategorized").map((c) => c.name);
    }
  } catch {
    // WordPress unreachable, fall through to sample data
  }
  return sampleGetAllBlogCategories();
}
