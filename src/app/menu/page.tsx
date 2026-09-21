import type { Metadata } from "next";
import { MenuBoard } from "@/components/MenuBoard";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Full Sue Patisserie menu. Basic and premium cakes with whipped cream and buttercream prices, plus teacakes, cupcakes, biscuits, brownies and jars.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div className="px-5 py-12 md:px-8 md:py-16">
      <MenuBoard />
    </div>
  );
}
