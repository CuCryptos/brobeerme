import { Beer, BeerReview, Brewery, BlogPost, WPBeer, WPBrewery, WPBeerReview, WPPost } from "./types";
import { getFeaturedImageUrl, stripHtml } from "./api";

export function mapWPBeer(wp: WPBeer): Beer {
  return {
    id: wp.id,
    name: wp.title.rendered,
    slug: wp.slug,
    brewery: wp.meta?.brewery || "",
    style: wp.meta?.style || "",
    abv: wp.meta?.abv || 0,
    ibu: wp.meta?.ibu || undefined,
    rating: wp.meta?.rating || 0,
    reviewCount: wp.meta?.review_count || 0,
    image: getFeaturedImageUrl(wp) || `/beers/${wp.slug}.jpg`,
    description: wp.content?.rendered ? stripHtml(wp.content.rendered).trim() : "",
    tastingNotes: {
      appearance: wp.tasting_notes?.appearance || wp.meta?.tasting_appearance || "",
      aroma: wp.tasting_notes?.aroma || wp.meta?.tasting_aroma || "",
      taste: wp.tasting_notes?.taste || wp.meta?.tasting_taste || "",
      mouthfeel: wp.tasting_notes?.mouthfeel || wp.meta?.tasting_mouthfeel || "",
    },
  };
}

export function mapWPBrewery(wp: WPBrewery, beers: Beer[] = []): Brewery {
  const hours = wp.parsed_hours || (wp.meta?.hours ? tryParseJSON(wp.meta.hours) : undefined);

  return {
    id: wp.id,
    name: wp.title.rendered,
    slug: wp.slug,
    description: wp.content?.rendered ? stripHtml(wp.content.rendered).trim() : "",
    location: {
      lat: wp.location?.lat || wp.meta?.lat || 0,
      lng: wp.location?.lng || wp.meta?.lng || 0,
      address: wp.location?.address || wp.meta?.address || "",
      city: wp.location?.city || wp.meta?.city || "",
      state: wp.location?.state || wp.meta?.state || "",
      zip: wp.location?.zip || wp.meta?.zip || "",
    },
    image: getFeaturedImageUrl(wp) || `/breweries/${wp.slug}.jpg`,
    website: wp.meta?.website || undefined,
    phone: wp.meta?.phone || undefined,
    hours: hours || undefined,
    beers,
    rating: wp.meta?.rating || 0,
    reviewCount: wp.meta?.review_count || 0,
  };
}

export function mapWPReview(wp: WPBeerReview): BeerReview {
  return {
    id: wp.id,
    beerId: wp.meta?.beer_id || 0,
    author: wp.meta?.reviewer_name || "",
    rating: wp.meta?.rating || 0,
    content: wp.content?.rendered ? stripHtml(wp.content.rendered).trim() : "",
    date: wp.date,
    tastingNotes: {
      appearance: wp.review_tasting_notes?.appearance || wp.meta?.note_appearance || 0,
      aroma: wp.review_tasting_notes?.aroma || wp.meta?.note_aroma || 0,
      taste: wp.review_tasting_notes?.taste || wp.meta?.note_taste || 0,
      mouthfeel: wp.review_tasting_notes?.mouthfeel || wp.meta?.note_mouthfeel || 0,
    },
  };
}

export function mapWPBlogPost(wp: WPPost): BlogPost {
  const categories = wp._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || [];
  const tags = wp._embedded?.["wp:term"]?.[1]?.map((t) => t.name) || [];

  return {
    id: wp.id,
    title: wp.title.rendered,
    slug: wp.slug,
    excerpt: wp.excerpt?.rendered ? stripHtml(wp.excerpt.rendered).trim() : "",
    content: wp.content?.rendered ? stripHtml(wp.content.rendered).trim() : "",
    image: getFeaturedImageUrl(wp) || `/blog/${wp.slug}.jpg`,
    author: "BroBeerMe",
    date: wp.date,
    categories,
    tags,
  };
}

function tryParseJSON(str: string): Record<string, string> | undefined {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" ? parsed : undefined;
  } catch {
    return undefined;
  }
}
