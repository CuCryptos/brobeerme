import { Beer, BeerReview, Brewery, BlogPost } from "./types";

export const sampleBeers: Beer[] = [
  {
    id: 1,
    name: "Hazy IPA",
    slug: "hazy-ipa",
    brewery: "Local Craft Co.",
    style: "New England IPA",
    abv: 6.8,
    ibu: 55,
    rating: 4.5,
    reviewCount: 234,
    image: "/beers/hazy-ipa.jpg",
    description:
      "A juicy, tropical hop bomb bursting with notes of mango, citrus, and stone fruit. Hazy and unfiltered with a pillowy soft mouthfeel that makes every sip dangerously drinkable. Dry-hopped with Citra, Mosaic, and Galaxy for maximum aroma.",
    tastingNotes: {
      appearance: "Deep golden haze, persistent white head with excellent lacing",
      aroma: "Tropical fruit explosion — mango, passionfruit, tangerine zest",
      taste: "Juicy citrus up front, soft bitterness, finishes with ripe peach",
      mouthfeel: "Creamy, medium-full body, pillowy carbonation",
    },
  },
  {
    id: 2,
    name: "Amber Lager",
    slug: "amber-lager",
    brewery: "Mountain Brewing",
    style: "Vienna Lager",
    abv: 5.2,
    ibu: 22,
    rating: 4.2,
    reviewCount: 189,
    image: "/beers/amber-lager.jpg",
    description:
      "A crisp and clean amber lager with rich caramel malt sweetness balanced by noble hop character. Brewed low and slow in the Vienna tradition, this beer rewards patience with layers of toasted bread, honey, and a clean dry finish.",
    tastingNotes: {
      appearance: "Brilliant amber-copper, crystal clear, off-white head",
      aroma: "Toasty malt, light honey, subtle floral hops",
      taste: "Caramel and biscuit malt, balanced bitterness, clean finish",
      mouthfeel: "Medium body, smooth, moderate carbonation",
    },
  },
  {
    id: 3,
    name: "Chocolate Stout",
    slug: "chocolate-stout",
    brewery: "Dark Horse Brewery",
    style: "Imperial Stout",
    abv: 7.5,
    ibu: 45,
    rating: 4.8,
    reviewCount: 312,
    image: "/beers/chocolate-stout.jpg",
    description:
      "An indulgent imperial stout brewed with cacao nibs from a local chocolatier and cold-brew coffee. Rich, velvety, and decadent — like drinking a chocolate truffle. Aged on oak for subtle vanilla complexity.",
    tastingNotes: {
      appearance: "Jet black, opaque, tan creamy head",
      aroma: "Dark chocolate, espresso, vanilla, hint of dark fruit",
      taste: "Rich cocoa, roasted coffee, brown sugar, oak vanilla finish",
      mouthfeel: "Full body, velvety smooth, low carbonation, warming",
    },
  },
  {
    id: 4,
    name: "Tropical Sour",
    slug: "tropical-sour",
    brewery: "Wild Side Ales",
    style: "Fruited Sour Ale",
    abv: 4.5,
    ibu: 8,
    rating: 4.3,
    reviewCount: 156,
    image: "/beers/tropical-sour.jpg",
    description:
      "A tart and refreshing sour ale fermented with passionfruit and guava puree. Kettle-soured for a clean, bright acidity that lets the tropical fruit shine. Perfect for warm days and adventurous palates.",
    tastingNotes: {
      appearance: "Hazy peach-pink, thin white head, effervescent",
      aroma: "Passionfruit, guava, light citrus, yogurt tang",
      taste: "Tart passionfruit, sweet guava, clean lactic acidity",
      mouthfeel: "Light body, high carbonation, refreshingly dry",
    },
  },
  {
    id: 5,
    name: "West Coast IPA",
    slug: "west-coast-ipa",
    brewery: "Coastline Brewing Co.",
    style: "American IPA",
    abv: 7.0,
    ibu: 70,
    rating: 4.4,
    reviewCount: 201,
    image: "/beers/west-coast-ipa.jpg",
    description:
      "A classic West Coast IPA with assertive pine and grapefruit hop character backed by a firm malt backbone. Crystal clear, bold, and uncompromisingly bitter — the way IPAs were meant to be.",
    tastingNotes: {
      appearance: "Deep gold, brilliant clarity, white head",
      aroma: "Pine resin, grapefruit, dank herbs",
      taste: "Bold grapefruit and pine, cracker malt, long bitter finish",
      mouthfeel: "Medium body, snappy carbonation, dry finish",
    },
  },
  {
    id: 6,
    name: "Belgian Tripel",
    slug: "belgian-tripel",
    brewery: "Abbey Road Brewing",
    style: "Belgian Tripel",
    abv: 8.5,
    ibu: 30,
    rating: 4.6,
    reviewCount: 178,
    image: "/beers/belgian-tripel.jpg",
    description:
      "A strong Belgian-style ale with complex fruity esters and spicy phenolics from our house yeast. Deceptively drinkable despite its strength, with honeyed sweetness giving way to a bone-dry finish.",
    tastingNotes: {
      appearance: "Pale gold, slight haze, rocky white head",
      aroma: "Banana, clove, white pepper, light honey",
      taste: "Honey, pear, spicy yeast, dry peppery finish",
      mouthfeel: "Medium-light body, effervescent carbonation, warming alcohol",
    },
  },
  {
    id: 7,
    name: "Oatmeal Stout",
    slug: "oatmeal-stout",
    brewery: "Fireside Brewing",
    style: "Oatmeal Stout",
    abv: 5.8,
    ibu: 35,
    rating: 4.1,
    reviewCount: 145,
    image: "/beers/oatmeal-stout.jpg",
    description:
      "A sessionable dark ale brewed with flaked oats for a silky smooth body. Notes of coffee, chocolate, and a touch of sweetness make this the perfect fireside companion.",
    tastingNotes: {
      appearance: "Very dark brown, near-black, tan head",
      aroma: "Coffee, milk chocolate, light roast",
      taste: "Smooth coffee, oat sweetness, subtle chocolate",
      mouthfeel: "Medium body, silky from oats, moderate carbonation",
    },
  },
  {
    id: 8,
    name: "Hefeweizen",
    slug: "hefeweizen",
    brewery: "Bavarian Brothers",
    style: "Hefeweizen",
    abv: 5.0,
    ibu: 12,
    rating: 4.0,
    reviewCount: 167,
    image: "/beers/hefeweizen.jpg",
    description:
      "A traditional Bavarian wheat beer with pronounced banana and clove character from our authentic German yeast strain. Cloudy, refreshing, and endlessly quaffable.",
    tastingNotes: {
      appearance: "Pale straw, cloudy, fluffy white head",
      aroma: "Banana, clove, bubblegum, wheat",
      taste: "Banana bread, light clove spice, soft wheat",
      mouthfeel: "Light-medium body, high carbonation, creamy",
    },
  },
];

export const sampleReviews: BeerReview[] = [
  {
    id: 1,
    beerId: 1,
    author: "HopHead Mike",
    rating: 5,
    content:
      "Absolutely crushable! The mango and citrus notes are incredibly vibrant. This is my go-to hazy and it never disappoints. The mouthfeel is like drinking a cloud.",
    date: "2025-01-15",
    tastingNotes: { appearance: 4, aroma: 5, taste: 5, mouthfeel: 5 },
  },
  {
    id: 2,
    beerId: 1,
    author: "CraftBeerSarah",
    rating: 4,
    content:
      "Great hazy IPA with tons of tropical character. Only knock is it's a touch sweet for my taste. But the aroma when you crack the can is unreal.",
    date: "2025-01-10",
    tastingNotes: { appearance: 4, aroma: 5, taste: 4, mouthfeel: 4 },
  },
  {
    id: 3,
    beerId: 1,
    author: "BrewDogDave",
    rating: 5,
    content:
      "One of the best NEIPAs I've had outside of New England. Incredible hop aroma and that pillowy soft body. Bought a case immediately.",
    date: "2025-01-05",
    tastingNotes: { appearance: 5, aroma: 5, taste: 5, mouthfeel: 4 },
  },
  {
    id: 4,
    beerId: 1,
    author: "BeerNovice22",
    rating: 4,
    content:
      "I'm new to craft beer and this was a great introduction to IPAs. Not too bitter, very fruity and approachable. Will definitely try more from this brewery.",
    date: "2024-12-28",
    tastingNotes: { appearance: 4, aroma: 4, taste: 4, mouthfeel: 4 },
  },
  {
    id: 5,
    beerId: 3,
    author: "DarkBeerDan",
    rating: 5,
    content:
      "This is the stout that got me into stouts. The chocolate and coffee balance is perfection. The oak aging adds just the right amount of complexity.",
    date: "2025-01-12",
    tastingNotes: { appearance: 5, aroma: 5, taste: 5, mouthfeel: 5 },
  },
  {
    id: 6,
    beerId: 3,
    author: "StoutSnob",
    rating: 5,
    content:
      "Pours like motor oil, drinks like liquid dessert. The cacao nibs are clearly high quality — you get real chocolate, not that artificial candy flavor. Outstanding.",
    date: "2025-01-08",
    tastingNotes: { appearance: 5, aroma: 5, taste: 5, mouthfeel: 4 },
  },
];

export const sampleBreweries: Brewery[] = [
  {
    id: 1,
    name: "Local Craft Co.",
    slug: "local-craft-co",
    description:
      "A neighborhood brewery dedicated to pushing the boundaries of hop-forward beers. Our taproom is a gathering place for hop heads and casual drinkers alike, with 16 rotating taps and a dog-friendly patio.",
    location: {
      lat: 30.2672,
      lng: -97.7431,
      address: "123 Brewers Lane",
      city: "Austin",
      state: "TX",
      zip: "78701",
    },
    image: "/breweries/local-craft.jpg",
    website: "https://localcraftco.com",
    phone: "(512) 555-0123",
    hours: {
      Monday: "Closed",
      Tuesday: "3pm – 10pm",
      Wednesday: "3pm – 10pm",
      Thursday: "3pm – 11pm",
      Friday: "12pm – 12am",
      Saturday: "12pm – 12am",
      Sunday: "12pm – 8pm",
    },
    beers: [sampleBeers[0]],
    rating: 4.6,
    reviewCount: 324,
  },
  {
    id: 2,
    name: "Mountain Brewing",
    slug: "mountain-brewing",
    description:
      "Nestled in the hills outside Austin, Mountain Brewing combines old-world lager tradition with Texas innovation. Our gravity-fed brewhouse and natural spring water produce beers of exceptional clarity and character.",
    location: {
      lat: 30.3525,
      lng: -97.8283,
      address: "456 Summit Road",
      city: "Austin",
      state: "TX",
      zip: "78733",
    },
    image: "/breweries/mountain-brewing.jpg",
    website: "https://mountainbrewing.com",
    phone: "(512) 555-0456",
    hours: {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "4pm – 9pm",
      Thursday: "4pm – 9pm",
      Friday: "2pm – 11pm",
      Saturday: "12pm – 11pm",
      Sunday: "12pm – 7pm",
    },
    beers: [sampleBeers[1]],
    rating: 4.4,
    reviewCount: 218,
  },
  {
    id: 3,
    name: "Dark Horse Brewery",
    slug: "dark-horse-brewery",
    description:
      "Specialists in dark, complex ales. Our barrel-aging program features over 200 bourbon, wine, and rum barrels housing stouts, porters, and Belgian-inspired strong ales. Visit our tasting room for exclusive cellar pours.",
    location: {
      lat: 30.2489,
      lng: -97.7501,
      address: "789 Dark Alley",
      city: "Austin",
      state: "TX",
      zip: "78704",
    },
    image: "/breweries/dark-horse.jpg",
    website: "https://darkhorsebrewery.com",
    phone: "(512) 555-0789",
    hours: {
      Monday: "Closed",
      Tuesday: "4pm – 10pm",
      Wednesday: "4pm – 10pm",
      Thursday: "4pm – 11pm",
      Friday: "2pm – 12am",
      Saturday: "12pm – 12am",
      Sunday: "12pm – 9pm",
    },
    beers: [sampleBeers[2], sampleBeers[6]],
    rating: 4.8,
    reviewCount: 412,
  },
  {
    id: 4,
    name: "Wild Side Ales",
    slug: "wild-side-ales",
    description:
      "Austin's premier sour and wild ale producer. We use a coolship, foeder barrels, and Texas-grown fruit to create complex, tart ales inspired by Belgian lambic tradition with a Lone Star twist.",
    location: {
      lat: 30.2950,
      lng: -97.7155,
      address: "321 Funky Blvd",
      city: "Austin",
      state: "TX",
      zip: "78702",
    },
    image: "/breweries/wild-side.jpg",
    website: "https://wildsideales.com",
    phone: "(512) 555-0321",
    hours: {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "5pm – 10pm",
      Thursday: "5pm – 10pm",
      Friday: "3pm – 11pm",
      Saturday: "1pm – 11pm",
      Sunday: "1pm – 7pm",
    },
    beers: [sampleBeers[3]],
    rating: 4.5,
    reviewCount: 187,
  },
  {
    id: 5,
    name: "Coastline Brewing Co.",
    slug: "coastline-brewing-co",
    description:
      "Bringing West Coast IPA culture to Central Texas. Our beers are crystal clear, aggressively hopped, and unapologetically bitter. The taproom features a full kitchen serving craft burgers and tacos.",
    location: {
      lat: 30.2210,
      lng: -97.7690,
      address: "555 Hop Street",
      city: "Austin",
      state: "TX",
      zip: "78745",
    },
    image: "/breweries/coastline.jpg",
    website: "https://coastlinebrewing.com",
    phone: "(512) 555-0555",
    hours: {
      Monday: "Closed",
      Tuesday: "4pm – 10pm",
      Wednesday: "4pm – 10pm",
      Thursday: "4pm – 10pm",
      Friday: "12pm – 12am",
      Saturday: "12pm – 12am",
      Sunday: "12pm – 8pm",
    },
    beers: [sampleBeers[4]],
    rating: 4.3,
    reviewCount: 256,
  },
  {
    id: 6,
    name: "Abbey Road Brewing",
    slug: "abbey-road-brewing",
    description:
      "A Belgian-inspired brewery and taproom where traditional techniques meet Texas creativity. Our house yeast strain has been cultured from a 200-year-old Belgian monastery. Enjoy our ales alongside artisan cheese and charcuterie.",
    location: {
      lat: 30.3080,
      lng: -97.7530,
      address: "888 Monastery Way",
      city: "Austin",
      state: "TX",
      zip: "78757",
    },
    image: "/breweries/abbey-road.jpg",
    website: "https://abbeyroadbrewing.com",
    phone: "(512) 555-0888",
    hours: {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "4pm – 10pm",
      Thursday: "4pm – 10pm",
      Friday: "2pm – 11pm",
      Saturday: "12pm – 11pm",
      Sunday: "12pm – 8pm",
    },
    beers: [sampleBeers[5]],
    rating: 4.7,
    reviewCount: 198,
  },
  {
    id: 7,
    name: "Fireside Brewing",
    slug: "fireside-brewing",
    description:
      "A cozy brewpub specializing in sessionable, easy-drinking ales. Our wood-fired oven turns out incredible pizzas that pair perfectly with our oatmeal stout and ESB. Live music every Friday night.",
    location: {
      lat: 30.2785,
      lng: -97.7320,
      address: "222 Ember Court",
      city: "Austin",
      state: "TX",
      zip: "78703",
    },
    image: "/breweries/fireside.jpg",
    website: "https://firesidebrewing.com",
    phone: "(512) 555-0222",
    hours: {
      Monday: "4pm – 10pm",
      Tuesday: "4pm – 10pm",
      Wednesday: "4pm – 10pm",
      Thursday: "4pm – 11pm",
      Friday: "12pm – 12am",
      Saturday: "12pm – 12am",
      Sunday: "12pm – 9pm",
    },
    beers: [sampleBeers[6]],
    rating: 4.2,
    reviewCount: 345,
  },
  {
    id: 8,
    name: "Bavarian Brothers",
    slug: "bavarian-brothers",
    description:
      "Authentic German-style beers brewed to Reinheitsgebot purity standards. Our biergarten seats 200 and hosts Oktoberfest celebrations, stein-holding competitions, and weekly polka nights.",
    location: {
      lat: 30.3320,
      lng: -97.7080,
      address: "999 Prost Avenue",
      city: "Austin",
      state: "TX",
      zip: "78752",
    },
    image: "/breweries/bavarian.jpg",
    website: "https://bavarianbrothers.com",
    phone: "(512) 555-0999",
    hours: {
      Monday: "Closed",
      Tuesday: "4pm – 10pm",
      Wednesday: "4pm – 10pm",
      Thursday: "4pm – 10pm",
      Friday: "12pm – 12am",
      Saturday: "11am – 12am",
      Sunday: "11am – 9pm",
    },
    beers: [sampleBeers[7]],
    rating: 4.4,
    reviewCount: 289,
  },
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Rise of Hazy IPAs: Why Juice Bombs Took Over Craft Beer",
    slug: "rise-of-hazy-ipas",
    excerpt:
      "From a regional curiosity to the most popular craft beer style in America — how New England IPAs changed everything we thought we knew about hoppy beer.",
    content: `
The craft beer world has experienced plenty of revolutions, but few have been as rapid and complete as the rise of the hazy IPA. In less than a decade, what started as an underground New England phenomenon has become the single most popular style at craft breweries across the country.

## The Origins

It all started in the early 2010s at small breweries like The Alchemist and Tree House in New England. These brewers discovered that by adjusting their water chemistry, using specific yeast strains, and dry-hopping during active fermentation, they could create IPAs with an entirely different character than the clear, bitter West Coast IPAs that dominated the market.

## What Makes Them Different

The key differences come down to technique:

- **Water chemistry**: Higher chloride-to-sulfate ratios create a softer, rounder mouthfeel
- **Yeast selection**: English and specific American strains that don't fully attenuate, leaving residual sweetness
- **Dry hopping**: Adding hops during fermentation creates biotransformation, producing unique tropical fruit flavors
- **No filtering**: The deliberate haze comes from proteins, hop oils, and yeast in suspension

## The Flavor Revolution

Where West Coast IPAs hit you with pine, resin, and assertive bitterness, hazies offer juicy tropical fruit — mango, passionfruit, guava — with a pillowy soft mouthfeel and low perceived bitterness despite massive hop loads.

For many drinkers, especially those new to craft beer, this was the gateway. Hazies are approachable in a way that a 100-IBU West Coast IPA simply isn't.

## Where We Are Now

Today, virtually every craft brewery in America has at least one hazy IPA on their tap list. The style has evolved into sub-categories — milkshake IPAs, smoothie IPAs, cold IPAs — each pushing the boundaries further.

Whether you're a haze bro or a West Coast purist, there's no denying the impact this style has had on the industry. It brought millions of new drinkers to craft beer and proved that innovation in brewing is far from over.
    `.trim(),
    image: "/blog/hazy-ipa.jpg",
    author: "Mike Reynolds",
    date: "2025-01-20",
    categories: ["Beer Styles", "Industry"],
    tags: ["IPA", "hazy", "craft beer", "trends"],
  },
  {
    id: 2,
    title: "A Beginner's Guide to Beer Tasting: How to Train Your Palate",
    slug: "beginners-guide-beer-tasting",
    excerpt:
      "Ready to go beyond 'I like it' or 'I don't'? Learn the fundamentals of beer tasting — from proper glassware to identifying off-flavors.",
    content: `
You don't need to be a certified cicerone to taste beer thoughtfully. With a few simple techniques, you can dramatically improve your ability to identify flavors, appreciate complexity, and describe what you're drinking.

## The Five S's of Beer Tasting

### 1. See
Hold your glass up to the light. What color is it? Is it clear or hazy? What does the head look like — is it thin and fizzy, or thick and creamy? Does it leave lacing on the glass as you drink?

### 2. Swirl
Gently swirl the beer in your glass. This releases volatile aromatics and helps you get a better sense of the aroma. You'll also see how the head reforms and whether it sticks to the glass.

### 3. Smell
This is where most of the "tasting" actually happens. Our sense of smell is responsible for about 80% of what we perceive as flavor. Take short sniffs rather than one long inhale. Try to identify specific notes — is it fruity? Malty? Roasty? Hoppy?

### 4. Sip
Take a moderate sip and let it coat your entire palate. Notice the initial flavors that hit your tongue, how they evolve mid-palate, and what lingers in the finish. Pay attention to:
- **Sweetness** (front of tongue)
- **Bitterness** (back of tongue)
- **Acidity** (sides of tongue)
- **Body** (thin and watery vs. thick and chewy)
- **Carbonation** (prickly vs. smooth)

### 5. Savor
After swallowing, breathe out through your nose. This retronasal olfaction reveals additional flavors. Notice how long the finish lasts and whether new flavors emerge.

## Common Flavor Descriptors

- **Malt**: Bread, biscuit, caramel, toffee, chocolate, coffee, roast
- **Hops**: Pine, citrus, tropical fruit, floral, herbal, dank
- **Yeast**: Banana, clove, pepper, bubblegum, barnyard
- **Other**: Vanilla, oak, bourbon, smoke, honey

## Practice Makes Perfect

The best way to develop your palate is to taste deliberately and often. Try side-by-side comparisons of different styles. Keep tasting notes. And most importantly, trust your own palate — there's no wrong answer in beer tasting.
    `.trim(),
    image: "/blog/tasting-guide.jpg",
    author: "Sarah Chen",
    date: "2025-01-15",
    categories: ["Education", "Guides"],
    tags: ["tasting", "beginners", "guide", "palate"],
  },
  {
    id: 3,
    title: "Austin's Best Kept Secret Breweries You Need to Visit",
    slug: "austin-secret-breweries",
    excerpt:
      "Beyond the big names, Austin has a thriving underground beer scene. We visited 10 under-the-radar breweries that deserve way more attention.",
    content: `
Austin, Texas is known for its vibrant craft beer scene, but most visitors only scratch the surface. While iconic spots like Jester King and Pinthouse draw crowds, there's a thriving ecosystem of smaller breweries doing incredible work without the fanfare.

We spent a month exploring Austin's lesser-known breweries, and here are our top picks.

## 1. Dark Horse Brewery

Tucked away in a converted warehouse in South Austin, Dark Horse is doing some of the most impressive barrel-aged stouts in Texas. Their chocolate stout, aged on locally-sourced cacao nibs and cold brew, is worth the trip alone.

**Must try**: Chocolate Stout, Barrel-Aged Barleywine

## 2. Wild Side Ales

If you're into sour beer, Wild Side is a revelation. Their coolship program — one of only a handful in Texas — produces spontaneously fermented ales with remarkable complexity. The taproom is intimate and the staff incredibly knowledgeable.

**Must try**: Tropical Sour, Spontaneous Blend No. 3

## 3. Fireside Brewing

This cozy brewpub pairs outstanding sessionable ales with wood-fired pizza. It's the kind of place where you settle in for an evening. Their oatmeal stout is silky smooth, and the ESB is one of the best in the state.

**Must try**: Oatmeal Stout, English Best Bitter

## Planning Your Visit

Most of these spots are within a 20-minute drive of downtown Austin. We recommend starting at Dark Horse in the afternoon, heading to Wild Side for a flight of sours, and finishing with pizza and pints at Fireside.

Cheers, Austin. Your beer scene keeps getting better.
    `.trim(),
    image: "/blog/austin-breweries.jpg",
    author: "Dave Martinez",
    date: "2025-01-10",
    categories: ["Travel", "Local"],
    tags: ["Austin", "breweries", "travel", "local"],
  },
  {
    id: 4,
    title: "Stout Season: 5 Dark Beers to Warm Your Winter",
    slug: "stout-season-winter-beers",
    excerpt:
      "When the temperature drops, it's time for rich, warming dark beers. Here are five stouts and porters that belong in your winter rotation.",
    content: `
There's something deeply satisfying about cracking open a pitch-black stout on a cold evening. The roasted malts, the chocolate and coffee notes, the warming alcohol — dark beers are built for winter.

Here are five that we've been reaching for this season.

## 1. Dark Horse Chocolate Stout

An imperial stout brewed with cacao nibs and cold brew coffee. It's rich, velvety, and dangerously drinkable for its 7.5% ABV. The oak aging adds vanilla complexity that ties everything together.

## 2. Baltic Porter from Abbey Road

A lager-fermented dark beer with notes of dark fruit, chocolate, and a clean finish. At 8.2%, it's strong but incredibly smooth. The lager yeast gives it a refinement that most dark ales lack.

## 3. Fireside Oatmeal Stout

The most sessionable beer on this list at 5.8%, but don't let the modest ABV fool you — the flavor is full and satisfying. Silky from the oats with a perfect balance of coffee and chocolate.

## 4. Milk Stout from Mountain Brewing

Sweet but not cloying, this milk stout uses lactose for body and residual sweetness. Notes of milk chocolate, caramel, and cream soda. A crowd-pleaser for dark beer newbies.

## 5. Coffee Porter from Coastline

A robust porter brewed with locally roasted beans. Bold coffee flavor up front, with baker's chocolate and a dry, roasty finish. The perfect morning-after beer (no judgment).

## Pairing Tips

Dark beers are incredibly food-friendly:
- **Stouts** pair beautifully with aged cheeses, chocolate desserts, and grilled meats
- **Porters** complement barbecue, mushroom dishes, and bread pudding
- **Baltic Porters** are fantastic with smoked fish and charcuterie

Stay warm out there.
    `.trim(),
    image: "/blog/stout-season.jpg",
    author: "Mike Reynolds",
    date: "2025-01-05",
    categories: ["Beer Styles", "Seasonal"],
    tags: ["stout", "porter", "winter", "dark beer"],
  },
  {
    id: 5,
    title: "From Grain to Glass: How Craft Beer Is Made",
    slug: "grain-to-glass-how-beer-is-made",
    excerpt:
      "Ever wondered what happens between the farm and your pint glass? A complete breakdown of the brewing process from malting to packaging.",
    content: `
Beer is one of humanity's oldest beverages, yet the process of making it remains a fascinating blend of science and art. Let's walk through the journey from raw grain to the beer in your glass.

## Step 1: Malting

Brewing starts with grain — usually barley, but also wheat, rye, or oats. The grain is soaked in water, allowed to partially germinate (which converts starches to fermentable sugars), then kiln-dried to stop germination. The temperature and duration of kilning determines the malt's color and flavor — from pale pilsner malt to deeply roasted chocolate malt.

## Step 2: Mashing

The malted grain is crushed and mixed with hot water in a vessel called a mash tun. This activates enzymes that break down the remaining starches into simple sugars. The resulting sweet liquid is called wort.

## Step 3: Lautering & Boiling

The wort is separated from the grain (lautering) and transferred to a kettle for boiling. During the boil, hops are added at various times:
- **Bittering hops** (60+ minutes): provide bitterness to balance malt sweetness
- **Flavor hops** (15-30 minutes): add herbal, floral, or citrus flavors
- **Aroma hops** (0-5 minutes): contribute volatile aromatic compounds

## Step 4: Fermentation

After cooling, the wort is transferred to a fermentation vessel and yeast is added. The yeast consumes the sugars and produces alcohol and carbon dioxide. This is where the magic happens — yeast also creates hundreds of flavor compounds that define the beer's character.

- **Ale yeast** (top-fermenting): ferments warm (60-75°F), produces fruity esters
- **Lager yeast** (bottom-fermenting): ferments cold (45-55°F), produces clean, crisp flavors

## Step 5: Conditioning

After primary fermentation, beer is conditioned (aged) to allow flavors to mellow and mature. This can take days for a simple pale ale or months for a barrel-aged imperial stout.

## Step 6: Packaging

Finally, the beer is carbonated (naturally or force-carbonated) and packaged in kegs, cans, or bottles. And then it ends up in your glass.

Simple ingredients, complex results. That's the beauty of brewing.
    `.trim(),
    image: "/blog/grain-to-glass.jpg",
    author: "Sarah Chen",
    date: "2024-12-28",
    categories: ["Education", "Brewing"],
    tags: ["brewing", "process", "education", "beginners"],
  },
  {
    id: 6,
    title: "IPA vs. Pale Ale: What's the Difference?",
    slug: "ipa-vs-pale-ale",
    excerpt:
      "They're both hoppy, they're both popular — but IPAs and pale ales are distinct styles with different histories. Here's how to tell them apart.",
    content: `
It's one of the most common questions in craft beer: what's the difference between an IPA and a pale ale? They're closely related, but understanding the distinction will help you order with confidence.

## The Short Answer

An IPA (India Pale Ale) is essentially a bigger, hoppier, stronger version of a pale ale. Think of a pale ale as the IPA's more approachable sibling.

## The Numbers

| | Pale Ale | IPA |
|---|---|---|
| ABV | 4.5-6.5% | 5.5-7.5% |
| IBU | 30-50 | 40-70+ |
| Color | Gold to amber | Gold to copper |

## History

**Pale Ale** originated in England in the 18th century. The term "pale" referred to the lighter color compared to the porters and stouts that dominated at the time.

**IPA** has a more colorful origin story. Legend has it that British brewers added extra hops to pale ales being shipped to India to preserve them on the long sea voyage. The extra hops created a bolder, more bitter beer that became a style of its own.

## Flavor Profiles

**Pale Ale**: Balanced between malt and hops. You'll taste biscuity, bready malt alongside moderate hop character. The bitterness is present but not aggressive. It's an everyday drinker.

**IPA**: Hop-forward and assertive. The malt takes a back seat to big hop flavors — whether that's pine and grapefruit (West Coast) or mango and juice (New England). The bitterness is more prominent and the aroma more intense.

## Which Should You Order?

- Want something balanced and easy? Go pale ale.
- Want something bold and hop-forward? Go IPA.
- New to craft beer? Start with a pale ale and work your way up.

Either way, you're in for a good time.
    `.trim(),
    image: "/blog/ipa-vs-pale.jpg",
    author: "Dave Martinez",
    date: "2024-12-20",
    categories: ["Education", "Beer Styles"],
    tags: ["IPA", "pale ale", "comparison", "education"],
  },
];

export function getBeerBySlug(slug: string): Beer | undefined {
  return sampleBeers.find((b) => b.slug === slug);
}

export function getReviewsForBeer(beerId: number): BeerReview[] {
  return sampleReviews.filter((r) => r.beerId === beerId);
}

export function getBreweryBySlug(slug: string): Brewery | undefined {
  return sampleBreweries.find((b) => b.slug === slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return sampleBlogPosts.find((p) => p.slug === slug);
}

export function getAllBlogCategories(): string[] {
  const categories = sampleBlogPosts.flatMap((p) => p.categories);
  return Array.from(new Set(categories));
}
