export type MenuCategoryId = "signature-cakes" | "quick-bites";

export type MenuSubcategoryId =
  | "basic-range"
  | "premium-range"
  | "custom-themes"
  | "teacakes"
  | "cupcakes-muffins"
  | "cookies-biscuits"
  | "squares-jars";

export interface IngredientBullets {
  0: string;
  1: string;
  2: string;
  3: string;
}

export type IngredientBulletList = [string, string, string, string];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceWhipped: number | null;
  priceButtercream: number | null;
  images: string[];
  ingredientBullets: IngredientBulletList;
  category: MenuCategoryId;
  subcategory: MenuSubcategoryId;
  unit: string;
  featured?: boolean;
  video?: string;
  isCustomTheme?: boolean;
  tags?: string[];
}

export interface MenuSubcategory {
  id: MenuSubcategoryId;
  title: string;
  blurb: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  title: string;
  tagline: string;
  subcategories: MenuSubcategory[];
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  label: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  frosting: "whipped" | "buttercream" | "not-sure";
  message: string;
}

export interface FeaturedMedia {
  id: string;
  title: string;
  caption: string;
  image: string;
  video?: string;
  href: string;
  span: "tall" | "wide" | "square" | "hero";
}
