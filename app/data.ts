export type Kitten = {
  id?: number;
  name: string;
  sex: string;
  born: string;
  standard: string;
  tica: string;
  showQuality: string;
  availability: string;
  mother: string;
  breed: string;
  price: string;
  status: "available" | "reserved" | "sold" | "hidden";
  imageUrl: string;
  notes: string;
};

export type BlogPost = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: "draft" | "published";
  cadence: "daily" | "weekly" | "monthly";
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  publishedAt: string;
};

export const starterKittens: Kitten[] = [
  {
    id: 1,
    name: "Mazy's 1",
    sex: "Male",
    born: "2025-12-28",
    standard: "Short leg standard",
    tica: "Registered",
    showQuality: "Yes",
    availability: "Ready for reservation",
    mother: "Mazy",
    breed: "Minuet",
    price: "$2,000",
    status: "available",
    imageUrl: "/wix/k1.jpg",
    notes:
      "Bright, social little boy with a show-quality look and a gentle family-raised temperament.",
  },
  {
    id: 2,
    name: "Mazy's 2",
    sex: "Female",
    born: "2025-12-28",
    standard: "Short leg standard",
    tica: "Registered",
    showQuality: "No",
    availability: "Accepting inquiries",
    mother: "Mazy",
    breed: "Minuet",
    price: "$2,000",
    status: "available",
    imageUrl: "/wix/mazy2.jpg",
    notes:
      "Sweet companion prospect with a soft expression, plush coat, and confident social nature.",
  },
  {
    id: 3,
    name: "Snowbalee",
    sex: "Female",
    born: "2025-07-27",
    standard: "Short",
    tica: "Registered",
    showQuality: "Yes",
    availability: "Placed",
    mother: "Spook",
    breed: "Minuet",
    price: "Placed",
    status: "sold",
    imageUrl: "/wix/snowbalee.jpg",
    notes:
      "Shown as a recently placed kitten so visitors understand how availability changes over time.",
  },
  {
    id: 4,
    name: "Star",
    sex: "Female",
    born: "2025-07-29",
    standard: "Tall",
    tica: "Registered",
    showQuality: "Yes",
    availability: "Placed",
    mother: "Mazy",
    breed: "Minuet",
    price: "Placed",
    status: "sold",
    imageUrl: "/wix/star.jpg",
    notes:
      "Recently placed tall girl from Mazy, kept in the archive for trust and sales history.",
  },
  {
    id: 5,
    name: "Mindy",
    sex: "Female",
    born: "2025-07-27",
    standard: "Short",
    tica: "Registered",
    showQuality: "No",
    availability: "Placed",
    mother: "Spook",
    breed: "Minuet",
    price: "Placed",
    status: "sold",
    imageUrl: "/wix/mindy.jpg",
    notes:
      "A sweet Spook kitten shown as placed so families can see prior litters and availability changes.",
  },
  {
    id: 6,
    name: "Bun Bun's 2",
    sex: "Female",
    born: "2025-08-30",
    standard: "Tall",
    tica: "Registered",
    showQuality: "TBD",
    availability: "Placed",
    mother: "Bun Bun",
    breed: "Minuet",
    price: "Placed",
    status: "sold",
    imageUrl: "/wix/bunbun2.jpg",
    notes:
      "Archived Bun Bun kitten profile, useful for showing litter progress and past placements.",
  },
  {
    id: 7,
    name: "Bun Bun's 3",
    sex: "Male",
    born: "2025-08-30",
    standard: "Short",
    tica: "Registered",
    showQuality: "TBD",
    availability: "Placed",
    mother: "Bun Bun",
    breed: "Minuet",
    price: "Placed",
    status: "sold",
    imageUrl: "/wix/bunbun3.jpg",
    notes:
      "Archived short standard boy from Bun Bun with full fields preserved for future sales records.",
  },
];

export const starterPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Prepare Your Home for a Minuet Kitten",
    slug: "prepare-home-for-minuet-kitten",
    excerpt:
      "A simple checklist for creating a calm, kitten-safe first week at home.",
    body:
      "Start with one quiet room, keep food and litter familiar, and let your kitten build confidence before opening the whole home. Minuets are affectionate and curious, so gentle structure helps them settle beautifully.",
    status: "published",
    cadence: "monthly",
    seoTitle: "Preparing Your Home for a Minuet Kitten",
    seoDescription:
      "Lil Lisset's Minuets shares practical tips for bringing home a family-raised Minuet kitten.",
    keywords: "Minuet kitten care, Connecticut cattery, kitten checklist",
    publishedAt: "2026-07-01",
  },
];

export const aiBlogPrompt =
  "Write a friendly SEO blog post for Lil Lisset's Minuets, a TICA registered family cattery in Litchfield County, CT. Topic: [TOPIC]. Include practical advice, Minuet breed education, a soft call to inquire about available kittens, and SEO keywords for Minuet kittens, short leg Minuet cats, and Connecticut cattery.";
