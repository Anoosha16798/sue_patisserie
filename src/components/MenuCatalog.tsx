"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { menuCategories, menuItems, getMenuItemById } from "@/data/menu";
import { MenuCard } from "@/components/MenuCard";
import { ItemDetailModal } from "@/components/ItemDetailModal";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";
import type { MenuItem, MenuSubcategoryId } from "@/types/menu";

export function MenuCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const requested = searchParams.get("item");
  const selected = requested ? (getMenuItemById(requested) ?? null) : null;
  const [filter, setFilter] = useState<"all" | MenuSubcategoryId>("all");

  const visible = useMemo(() => {
    if (filter === "all") return menuItems;
    return menuItems.filter((item) => item.subcategory === filter);
  }, [filter]);

  function openItem(item: MenuItem) {
    router.replace(`${pathname}?item=${item.id}`, { scroll: false });
  }

  function closeItem() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-5 mb-10 overflow-x-auto border-y border-cocoa/8 bg-ivory/90 px-5 py-3 backdrop-blur md:mx-0 md:rounded-full md:border md:px-2">
        <div className="flex min-w-max gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </FilterChip>
          {menuCategories.flatMap((category) =>
            category.subcategories.map((sub) => (
              <FilterChip
                key={sub.id}
                active={filter === sub.id}
                onClick={() => setFilter(sub.id)}
              >
                {sub.title}
              </FilterChip>
            )),
          )}
        </div>
      </div>

      {menuCategories.map((category) => {
        const categoryItems = visible.filter((item) => item.category === category.id);
        if (categoryItems.length === 0) return null;
        return (
          <section key={category.id} className="mb-16">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] tracking-[0.24em] text-gold uppercase">
                  {category.tagline}
                </p>
                <h2 className="font-display mt-2 text-4xl text-cocoa md:text-5xl">
                  {category.title}
                </h2>
              </div>
              {category.id === "quick-bites" ? (
                <AnimatedIllustration kind="gift" className="hidden h-20 w-24 text-cocoa/20 md:block" />
              ) : (
                <AnimatedIllustration kind="kids" className="hidden h-20 w-28 text-cocoa/20 md:block" />
              )}
            </div>

            {category.subcategories.map((sub) => {
              const items = categoryItems.filter((item) => item.subcategory === sub.id);
              if (items.length === 0) return null;
              return (
                <div key={sub.id} className="mb-10">
                  <div className="mb-4">
                    <h3 className="text-sm tracking-[0.18em] text-cocoa uppercase">
                      {sub.title}
                    </h3>
                    <p className="mt-1 text-sm text-cocoa/55">{sub.blurb}</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, index) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        index={index}
                        onSelect={openItem}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <AnimatedIllustration kind="kids" className="h-28 w-40 text-cocoa/30" />
          <p className="font-display mt-4 text-2xl">Nothing in this tin yet.</p>
        </div>
      ) : null}

      <ItemDetailModal item={selected} onClose={closeItem} />
    </div>
  );
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: string;
}

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs tracking-wide whitespace-nowrap transition ${
        active ? "bg-cocoa text-foam" : "bg-cream text-cocoa hover:bg-blush/60"
      }`}
    >
      {children}
    </button>
  );
}
