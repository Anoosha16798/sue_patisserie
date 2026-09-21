export interface GalleryShot {
  src: string;
  alt: string;
  href: string;
  title: string;
  span?: "hero" | "tall" | "wide" | "square";
}

export const galleryShots: GalleryShot[] = [
  {
    src: "/images/real-gold-side.jpg",
    alt: "Gold-dusted chocolate cake with ganache centre and piped cream",
    href: "/menu/gold-dusted-chocolate",
    title: "Gold chocolate",
    span: "hero",
  },
  {
    src: "/images/real-jungle.jpg",
    alt: "Lion King jungle theme cake with fondant animals",
    href: "/menu/jungle-lion-king",
    title: "Jungle / Lion King",
    span: "tall",
  },
  {
    src: "/images/real-red-velvet.jpg",
    alt: "Red velvet birthday cake with Happy Birthday My King topper",
    href: "/menu/red-velvet",
    title: "Red velvet",
  },
  {
    src: "/images/real-pineapple.jpg",
    alt: "Slice of pineapple layer cake with whipped cream",
    href: "/menu/pineapple",
    title: "Pineapple",
  },
  {
    src: "/images/real-roses.jpg",
    alt: "White birthday cake with red buttercream roses and gold plaque",
    href: "/menu/floral-buttercream",
    title: "Floral roses",
    span: "wide",
  },
  {
    src: "/images/real-gender-reveal.jpg",
    alt: "Pink and blue gender reveal cake with fondant bow",
    href: "/menu/baby-shower-half",
    title: "Gender reveal",
  },
  {
    src: "/images/real-half-baby.jpg",
    alt: "Half baby-shower cake with sleeping baby figurine",
    href: "/menu/baby-shower-half",
    title: "Baby shower half cake",
  },
  {
    src: "/images/real-blue-birthday.jpg",
    alt: "Blue ruffle birthday cake with gold fans and candle",
    href: "/menu/birthday-theme",
    title: "Birthday ruffles",
  },
  {
    src: "/images/real-gold-top.jpg",
    alt: "Top view of gold chocolate cake with ganache pool",
    href: "/menu/gold-dusted-chocolate",
    title: "Ganache pool",
  },
  {
    src: "/images/real-brownie.jpg",
    alt: "Walnut chocolate brownie, dense fudge base",
    href: "/menu/brownies",
    title: "Walnut brownie",
  },
  {
    src: "/images/real-macaron.jpg",
    alt: "Vegan coffee macaron with dark chocolate ganache",
    href: "/menu/coffee-macaron",
    title: "Coffee macaron",
  },
  {
    src: "/images/real-blueberry.jpg",
    alt: "Blueberry cheesecake slice with berry compote and graham base",
    href: "/menu/blueberry-cheesecake",
    title: "Blueberry cheesecake",
    span: "wide",
  },
];
