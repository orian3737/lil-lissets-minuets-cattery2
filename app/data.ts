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

export type GalleryImage = {
  src: string;
  alt: string;
  slot: string;
};

export type Review = {
  name: string;
  quote: string;
  imageUrl: string;
};

export type ParentCat = {
  name: string;
  role: "Dam" | "Sire";
  imageUrl: string;
};

export const site = {
  name: "Lil Lisset's Minuets",
  legalName: "Lil Lisset's Minuets Cattery",
  tagline:
    "Elegant companions, raised with love and refined feline beauty, one Minuet at a time.",
  location: "Litchfield County, Connecticut",
  email: "longwi.2288@gmail.com",
  phone: "(860) 736-386",
  facebookLabel: "Join our Facebook",
  facebookUrl: "https://www.facebook.com/WixStudio",
  contractUrl:
    "https://docs.google.com/document/d/e/2PACX-1vTsfS_0ZKj-GeW1gSG2SmKFb5yeId9Z1bduqnHzprx1ddwnNJwJKjyCrZPNM0Pjww/pub",
  ticaUrl: "https://www.tica.org/",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/kittens", label: "Kittens" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const assets = {
  logo: "/assets/wix/logobust.webp",
  catBanner: "/assets/wix/cat-banner.webp",
  tica: "/assets/wix/tica-logo-1430702035-768x497-removebg-preview.webp",
  homePortrait: "/assets/wix/homepage-pic.webp",
  heroGirl: "/assets/wix/0c9b4e-5ff177c62c5b4d4cb2322ee86af3e19d.webp",
  heroFiller: "/assets/wix/20160807-152726.webp",
  mazyOne: "/assets/wix/20260217-135510-edited-edited.webp",
  mazyTwo: "/assets/wix/k1-edited.webp",
  snowbalee: "/assets/wix/0c9b4e-c867459710cd40ab8018b4a5b8ac0f41.webp",
  star: "/assets/wix/0c9b4e-f7c5363a6d8a4d4b828723bcd3f98f36.webp",
  mindy: "/assets/wix/0c9b4e-8e53cffb80d44605b19edffd44f7e8c4.webp",
  bunbunOne: "/assets/wix/0c9b4e-76728038005a4f1a937bb60d289d14fe.webp",
  bunbunTwo: "/assets/wix/0c9b4e-6335da381a7b4905825da8ea4094681a.webp",
  placeholder: "/assets/wix/0c9b4e-06936aad7ddb472caa6e610bc244623c.webp",
  reviewBrianna: "/assets/wix/img-20241103-210728-edited.webp",
  reviewNana: "/assets/wix/109a2cb2-9b24-488b-b6ac-73056261fc12-edited.webp",
  reviewAshley: "/assets/wix/3ee08cea-2f0a-428b-8dcc-e17f28cd8ec1-edited.webp",
  aboutFamily: "/assets/wix/img-20241103-210844-edited-edited.webp",
  aboutLove: "/assets/wix/img-20241103-210852-edited-edited-edited.webp",
  standardMinuet: "/assets/wix/minuet-standard-pic.webp",
  tanyaSteph: "/assets/wix/img-20241103-210850-edited-edited.webp",
  mazyDam: "/assets/wix/9ba6090b-aebf-4e8b-a625-d9d512d4733e.webp",
  spookDam: "/assets/wix/73049d2d-3e2a-48b3-b669-08ca94b60670.webp",
  bunbunDam: "/assets/wix/955b658f-ba7e-425f-8638-e662f42900b5.webp",
  boujiDam: "/assets/wix/184aac0b-2ca0-4731-9cac-b686dd709db8.webp",
  boogeyDam: "/assets/wix/495177400-122098660448869634-261840976561587555-n.webp",
  eddySire: "/assets/wix/1ce381f0-2b99-4e64-b35a-23c33d2d8ca9.webp",
};

export const homeStoryGallery: GalleryImage[] = [
  {
    src: assets.heroGirl,
    alt: "Lisseth in a princess dress holding a white Minuet kitten",
    slot: "A little girl's love",
  },
  {
    src: "/assets/wix/0c9b4e-2c4de854ce15486a924990b6300433a6.webp",
    alt: "Lisseth holding a dark Minuet cat",
    slot: "The beginning",
  },
  {
    src: "/assets/wix/0c9b4e-418f21436de240628851a1b144c235a9.webp",
    alt: "Lisseth smiling with a cat show ribbon",
    slot: "Show day magic",
  },
  {
    src: "/assets/wix/0c9b4e-4be2c13475044d1c8ae6c6212d763dab.webp",
    alt: "A child gently kissing a newborn kitten",
    slot: "Gentle hands",
  },
  {
    src: "/assets/wix/0c9b4e-81ad62bd39514f8998091e12f510d20b.webp",
    alt: "Lisseth smiling with a tiny kitten near her face",
    slot: "Best friends",
  },
  {
    src: "/assets/wix/20160705-183344-orig-edited-edited.webp",
    alt: "A row of newborn Minuet kittens",
    slot: "New arrivals",
  },
  {
    src: assets.heroFiller,
    alt: "A Minuet kitten sitting in a pink toy car",
    slot: "Tiny adventures",
  },
  {
    src: "/assets/wix/0c9b4e-3dc54894f7d0457db345b26ec1bf3b47.webp",
    alt: "Lisseth at the cattery table with a cat",
    slot: "Cattery days",
  },
];

export const homeIntro = {
  title: "Inspired By a Little Girls LOVE",
  body:
    "Our small home grown operation is a TICA registered cattery. We breed exclusively Minuets Standard Short Leg and Talls, with a family-first focus on health, well-being, happiness, calm temperament, and beautiful companionship. We are located in New Hartford, Connecticut, USA.",
};

export const aboutBenefits = [
  {
    title: "Not Local?",
    body:
      "We will personally escort your kitten to your local airport. Your kitten's safe delivery is our priority, and if you are close enough a simple drive may do. All flights are negotiated.",
  },
  {
    title: "Easy Deposits!",
    body:
      "We accept most forms of payment including Zelle, Cash App, Venmo, PayPal, and crypto. Deposits are $100. Please contact us for deposit instructions.",
  },
  {
    title: "Socialized",
    body:
      "Our kittens are raised in home, living amongst our kids, grandkids, and dogs with a close loving embrace. Your kitten comes with personality and a great temper.",
  },
];

export const aboutStory = [
  "The past 10 years have been more than challenging. More importantly, it was rewarding and victorious. There have been low times and the greatest heights, and through it all there has been Lil Lisset, myself, and the sweetest loving cats one could hope for.",
  "We started with one cat, Gilberta, to help coax Lil Lisset from a world that was scary, with more challenges than a little one should face. Gilberta created the love and interest that started the clapping that communicated Lisseth's love.",
  "That one cat turned into two with Big Sonny, then kittens, motherhood, family, and letting go. Pets enhance our lives: they open doors to emotions, to our hearts, to friends, and to family.",
  "Our search led us to the Minuet breed, a cat known for loving nature, patience, and a strong ability to bond with their humans. Lisseth had the final say, and after careful consideration we welcomed our first Minuet into our home.",
  "As Lisseth grew older, our passion expanded into cat shows. Lisseth joined the Junior Exhibitor Program with TICA, and her cousin Lilly joined her on the journey toward becoming certified TICA judges.",
  "What started as a search for companionship has become a family journey filled with love, growth, and a community of cat enthusiasts. We believe every family deserves the same joy these special cats have brought into our lives.",
];

export const breedStandards = [
  "The Minuet, previously known as the Napoleon, blends Persian and Munchkin traits into a plush, affectionate breed with a round face, expressive eyes, and a distinctive stature.",
  "Standard Minuets have the short legs that qualify them for TICA show standards. Judges evaluate balance, proportion, a sweet rounded expression, mobility, and coat condition.",
  "Non-standard Minuets share the same breed characteristics except they have regular-length legs. They are equally loved for temperament and beauty, and may participate in alter and household pet classes.",
  "Both standard and non-standard Minuets are affectionate companions, gentle with children, adaptable in family homes, and happiest with human interaction.",
];

export const catteryGoals = [
  "Every cat and kitten is first and foremost a beloved pet in our home. We prioritize enrichment, socialization, and care so kittens transition confidently into new homes.",
  "Our goal is to grow as a family and cattery while fostering deep respect and love for the breed.",
  "As Lisseth and Lilly continue their TICA work, they are gaining hands-on experience that can shape future work in feline judging and the broader cat breeding world.",
  "Tanya and Stephanie are beginning to open their own bloodlines as extensions of our cattery, helping diversify and strengthen our program while maintaining the loving environment we hold dear.",
];

export const starterKittens: Kitten[] = [
  {
    id: 1,
    name: "Mazy's 1",
    sex: "Male",
    born: "2025-12-28",
    standard: "Yes",
    tica: "Registered",
    showQuality: "Yes",
    availability: "Yes",
    mother: "Mazy",
    breed: "Minuet",
    price: "$2,000",
    status: "available",
    imageUrl: assets.mazyOne,
    notes:
      "Bright, social little boy with a show-quality look and a gentle family-raised temperament.",
  },
  {
    id: 2,
    name: "Mazy's 2",
    sex: "Female",
    born: "2025-12-28",
    standard: "Yes",
    tica: "Registered",
    showQuality: "No",
    availability: "Yes",
    mother: "Mazy",
    breed: "Minuet",
    price: "$2,000",
    status: "available",
    imageUrl: assets.mazyTwo,
    notes:
      "Sweet companion prospect with a soft expression, plush coat, and confident social nature.",
  },
  {
    id: 3,
    name: "Star",
    sex: "Female",
    born: "2025-07-29",
    standard: "Tall",
    tica: "Registered",
    showQuality: "Yes",
    availability: "Sold",
    mother: "Mazy",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: assets.star,
    notes: "Recently placed girl from Mazy, kept visible for litter history.",
  },
  {
    id: 4,
    name: "Snowbalee",
    sex: "Female",
    born: "2025-07-27",
    standard: "Short",
    tica: "Registered",
    showQuality: "Yes",
    availability: "Sold",
    mother: "Spook",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: assets.snowbalee,
    notes: "Placed kitten profile preserved for families researching past litters.",
  },
  {
    id: 5,
    name: "Mindy",
    sex: "Female",
    born: "2025-07-27",
    standard: "Short",
    tica: "Registered",
    showQuality: "No",
    availability: "Sold",
    mother: "Spook",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: assets.mindy,
    notes: "Sweet Spook kitten shown as a prior placement.",
  },
  {
    id: 6,
    name: "Bun Buns 1",
    sex: "Female",
    born: "2025-08-30",
    standard: "Tall",
    tica: "Registered",
    showQuality: "TBD",
    availability: "Sold",
    mother: "Bun Bun",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: assets.bunbunOne,
    notes: "Archived Bun Bun kitten profile for the sold gallery.",
  },
  {
    id: 7,
    name: "Bun Bun's 2",
    sex: "Female",
    born: "2025-08-30",
    standard: "Tall",
    tica: "Registered",
    showQuality: "TBD",
    availability: "10/31/25",
    mother: "Bun Bun",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: assets.bunbunTwo,
    notes: "Archived short standard boy from Bun Bun.",
  },
  {
    id: 8,
    name: "Bun Bun's 3",
    sex: "Male",
    born: "2025-08-30",
    standard: "Short",
    tica: "Registered",
    showQuality: "TBD",
    availability: "10/31/25",
    mother: "Bun Bun",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: "/assets/wix/f994fd14-81ad-413b-83e0-83fd101f5195.webp",
    notes: "Sold Bun Bun kitten profile kept for the original site archive.",
  },
  {
    id: 9,
    name: "Bun Bun's 4",
    sex: "Female",
    born: "2025-08-30",
    standard: "TBD",
    tica: "Registered",
    showQuality: "TBD",
    availability: "10/31/25",
    mother: "Bun Bun",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: "/assets/wix/aa91b255-e147-4552-a2e4-662d7c2e78bf.webp",
    notes: "Sold Bun Bun kitten profile kept for the original site archive.",
  },
  {
    id: 10,
    name: "Bun Bun's 5",
    sex: "Female",
    born: "2025-08-30",
    standard: "Short",
    tica: "Registered",
    showQuality: "TBD",
    availability: "10/31/25",
    mother: "Bun Bun",
    breed: "Minuet",
    price: "Sold",
    status: "sold",
    imageUrl: "/assets/wix/3b5bd57b-8a5f-4ff3-aa3f-c0b263b94273.webp",
    notes: "Sold Bun Bun kitten profile kept for the original site archive.",
  },
  {
    id: 11,
    name: "Bouji's 1",
    sex: "TBD",
    born: "2025-09-10",
    standard: "TBD",
    tica: "Registered",
    showQuality: "TBD",
    availability: "Sold",
    mother: "Bouji",
    breed: "Exotic Persian",
    price: "Sold",
    status: "sold",
    imageUrl: "/assets/wix/7f08eb7b-9787-4712-a6f8-602be00c5c64.webp",
    notes: "Sold Bouji profile kept for the original site archive.",
  },
  {
    id: 12,
    name: "Bouji's 2",
    sex: "TBD",
    born: "2025-09-10",
    standard: "TBD",
    tica: "Registered",
    showQuality: "TBD",
    availability: "Sold",
    mother: "Bouji",
    breed: "Exotic Persian",
    price: "Sold",
    status: "sold",
    imageUrl: "/assets/wix/7b2c761b-8a84-4d8b-9b33-db48878293ad.webp",
    notes: "Sold Bouji profile kept for the original site archive.",
  },
];

export const parentCats: ParentCat[] = [
  { name: "Mazy", role: "Dam", imageUrl: assets.mazyDam },
  { name: "Spook", role: "Dam", imageUrl: assets.spookDam },
  { name: "Bun Bun", role: "Dam", imageUrl: assets.bunbunDam },
  { name: "Bouji", role: "Dam", imageUrl: assets.boujiDam },
  { name: "Boogey", role: "Dam", imageUrl: assets.boogeyDam },
  { name: "Eddy", role: "Sire", imageUrl: assets.eddySire },
];

export const reviews: Review[] = [
  {
    name: "Brianna",
    imageUrl: assets.reviewBrianna,
    quote:
      "He is the most adorable cat ever and I'm so glad you can produce the cutest cats ever. Everyone loves him too; he is a people person and so cuddly.",
  },
  {
    name: "Nana",
    imageUrl: assets.reviewNana,
    quote:
      "I have two Minuet cats from Wilma. From first contact to pickup, working with Wilma was a delight. The kittens were well socialized, organized with paperwork, and are the sweetest, most beautiful cats.",
  },
  {
    name: "Ashley",
    imageUrl: assets.reviewAshley,
    quote:
      "I adopted Willow from Wilma back in 2016 and could not be happier. She is still in perfect health and the best girl in the world. I cannot recommend Wilma enough.",
  },
];

const galleryFiles = [
  "0c9b4e-0459124932a247f6803197006570f3c3.webp",
  "0c9b4e-06936aad7ddb472caa6e610bc244623c.webp",
  "0c9b4e-06aebce0c56e4037aa7b19a334f6b45f.webp",
  "0c9b4e-2ec48a6c9e044e7083d92319a05b1784.webp",
  "0c9b4e-320ac70323e34d17bba4097f18ef9e6a.webp",
  "0c9b4e-33d19799e66143679e86fd6d324e67bd.webp",
  "0c9b4e-35f8ba9709354e24b90e0f8a86152815.webp",
  "0c9b4e-3dc54894f7d0457db345b26ec1bf3b47.webp",
  "0c9b4e-4034cf671d3c409b891a9d85b173b1b3.webp",
  "0c9b4e-418f21436de240628851a1b144c235a9.webp",
  "0c9b4e-42a9e166304644ea8cc58c9481dd5844.webp",
  "0c9b4e-4be2c13475044d1c8ae6c6212d763dab.webp",
  "0c9b4e-5c62f8244f83439eb3fefc0b309b30cf.webp",
  "0c9b4e-6fd2c339361b414e9eafef0f0983c429.webp",
  "0c9b4e-70842cfee0ff4761b98f12a73324ebed.webp",
  "0c9b4e-70d8e5f61b864d928be31a6c2a578c50.webp",
  "0c9b4e-81ad62bd39514f8998091e12f510d20b.webp",
  "0c9b4e-86644c1ea2cf462db7c837e1e73857e0.webp",
  "0c9b4e-982f99a42c7a4bbabee4c81adc1413b4.webp",
  "0c9b4e-9bca2c9548734fadbbab31b3326e6847.webp",
  "0c9b4e-db0d7204960f4f0bb6d96a56ff158b92.webp",
  "0c9b4e-dd70c5ac6fe94eeba5f80785d7a46246.webp",
  "0c9b4e-e6f6079ecc274b94ae99030c2a1642ed.webp",
  "0c9b4e-ebac1a80453a4f42b57b91a63cfccedf.webp",
  "0c9b4e-ffec50cc35c149b5b5d0976596bc049f.webp",
  "20160630-145635-orig.webp",
  "20160705-183344-orig.webp",
  "20160723-163655.webp",
  "20160807-143708.webp",
  "20160807-150408.webp",
  "20160807-152032.webp",
  "20260217-134958.webp",
  "20260217-135042.webp",
  "20260217-135046.webp",
  "20260217-135148.webp",
  "20260217-135234.webp",
  "20260217-135510.webp",
  "380b3c5b-ab4d-4ee0-83cc-4b0fd0727467-edited.webp",
  "495177400-122098660448869634-261840976561587555-n.webp",
  "download-1-edited.webp",
  "download-2-edited.webp",
  "img-20241103-210728-edited.webp",
  "img-20241103-210745-edited.webp",
  "img-20241103-210800-edited.webp",
  "img-20241103-210805-edited.webp",
  "img-20241103-210815-edited.webp",
  "img-20241103-210824-edited.webp",
  "img-20241103-210841-edited-edited.webp",
  "k1-edited.webp",
];

export const galleryImages: GalleryImage[] = galleryFiles.map((file, index) => ({
  src: `/assets/wix/${file}`,
  alt: `Lil Lisset's Minuet cattery photo ${index + 1}`,
  slot: `gallery-${String(index + 1).padStart(2, "0")}`,
}));

export const starterPosts: BlogPost[] = [
  {
    id: 1,
    title: "Preparing Your Home for a Minuet Kitten",
    slug: "prepare-home-for-minuet-kitten",
    excerpt:
      "A calm first room, familiar supplies, and a slower introduction help a Minuet kitten settle confidently.",
    body:
      "Start with a quiet room, keep food and litter familiar, and let your kitten build confidence before opening the whole home. Minuets are affectionate and curious, so gentle structure helps them settle beautifully.",
    status: "published",
    cadence: "monthly",
    seoTitle: "Preparing Your Home for a Minuet Kitten",
    seoDescription:
      "Lil Lisset's Minuets shares practical tips for bringing home a family-raised Minuet kitten.",
    keywords: "Minuet kitten care, Connecticut cattery, kitten checklist",
    publishedAt: "2026-07-01",
  },
  {
    id: 2,
    title: "What Makes the Minuet Cat Breed Special?",
    slug: "what-makes-minuet-cats-special",
    excerpt:
      "A search-friendly breed education post draft for families comparing Minuets, Persians, and Munchkins.",
    body:
      "Minuets are loved for their round expressions, plush coats, and sweet family personalities. A responsible breeder explains leg type, coat care, socialization, and what to ask before reserving a kitten.",
    status: "draft",
    cadence: "monthly",
    seoTitle: "What Makes Minuet Cats Special?",
    seoDescription:
      "Learn about Minuet cats, short leg standards, tall kittens, temperament, grooming, and how to choose a responsible cattery.",
    keywords: "Minuet cats, short leg Minuet, TICA Minuet breeder",
    publishedAt: "",
  },
];

export const aiBlogPrompt =
  "Write a friendly SEO blog post for Lil Lisset's Minuets, a TICA registered family cattery in Litchfield County, CT. Topic: [TOPIC]. Include practical advice, Minuet breed education, a soft call to inquire about available kittens, and SEO keywords for Minuet kittens, short leg Minuet cats, and Connecticut cattery.";
