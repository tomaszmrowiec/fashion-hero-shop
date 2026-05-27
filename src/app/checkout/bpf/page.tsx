"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { AbBadge } from "@/components/ab-badge";

function formatPLN(n: number): string {
  return (
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n) + " PLN"
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  shoes: "BUTY",
  socks: "SKARPETKI",
  apparel: "ODZIEŻ",
  accessories: "AKCESORIA",
};

type DisplayItem = {
  name: string;
  category: string;
  price: number;
  colorName: string;
  colorHex: string;
  colorImage: string;
  size: number;
  quantity: number;
};

const DEMO_ITEMS: DisplayItem[] = [
  {
    name: "Sukienka midi w kwiaty",
    category: "SUKIENKI",
    price: 189,
    colorName: "ecru",
    colorHex: "#f5f0e8",
    colorImage: "",
    size: 36,
    quantity: 1,
  },
];
const DEMO_SHIPPING = 12;

export default function BpfCheckoutPage() {
  const { items } = useCart();
  const isDemo = items.length === 0;

  const displayItems: DisplayItem[] = isDemo
    ? DEMO_ITEMS
    : items.map((item) => ({
        name: item.product.name,
        category:
          CATEGORY_LABELS[item.product.productCategory] ??
          item.product.productCategory.toUpperCase(),
        price: item.product.price,
        colorName: item.color.name,
        colorHex: item.color.hex,
        colorImage: item.color.image,
        size: item.size,
        quantity: item.quantity,
      }));

  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = isDemo ? DEMO_SHIPPING : subtotal >= 299 ? 0 : 19.9;
  const bpf = subtotal * 0.025;
  const total = subtotal + shipping + bpf;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Announcement bar */}
      <div className="bg-charcoal text-white text-center py-2 flex-shrink-0">
        <p className="text-[11px] font-medium tracking-wider">
          Darmowa dostawa od 299 zł · Łatwe zwroty
        </p>
      </div>

      {/* Checkout header */}
      <header className="bg-white border-b border-black/5 px-4 py-4 flex-shrink-0">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-charcoal italic">
            FashionHero
          </span>
          <span className="text-nav text-warm-gray">Checkout</span>
        </div>
      </header>

      {/* Main content — pb-32 clears the sticky CTA bar */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-6 pb-32">
        {isDemo && (
          <div className="bg-muted/70 rounded-lg px-4 py-2.5 mb-5 text-center">
            <p className="text-xs text-warm-gray">
              Tryb demo — dodaj produkt do koszyka, aby zobaczyć swoje zamówienie
            </p>
          </div>
        )}

        {/* Section: PODSUMOWANIE */}
        <p className="text-[10px] font-medium uppercase tracking-widest text-warm-gray mb-2">
          Podsumowanie
        </p>
        <h1 className="text-[28px] font-normal text-charcoal leading-tight mb-5">
          Twoje zamówienie
        </h1>

        <div className="space-y-3 mb-8">
          {displayItems.map((item, index) => {
            const showThumb = item.colorImage.startsWith("/images/");
            return (
              <div
                key={index}
                className="bg-card rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/5 p-4 flex gap-3"
              >
                <div
                  className="w-24 h-28 rounded-lg flex-shrink-0 overflow-hidden"
                  style={{
                    background: `radial-gradient(ellipse at 50% 55%, ${item.colorHex}44 0%, ${item.colorHex}22 35%, #f5f4f1 65%)`,
                  }}
                >
                  {showThumb && (
                    <Image
                      src={item.colorImage}
                      alt={item.name}
                      width={96}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-warm-gray">
                      {item.category}
                    </p>
                    <p className="text-[15px] font-medium text-charcoal mt-1.5">
                      {item.name}
                    </p>
                    <p className="text-xs text-warm-gray mt-0.5">
                      Rozmiar {item.size} · Kolor: {item.colorName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[11px] uppercase tracking-wide text-warm-gray">
                      Ilość: {item.quantity}
                    </span>
                    <span className="text-[15px] font-medium text-charcoal">
                      {formatPLN(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section: ROZLICZENIE */}
        <p className="text-[10px] font-medium uppercase tracking-widest text-warm-gray mb-4">
          Rozliczenie
        </p>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-warm-gray">Produkt</span>
            <span className="font-medium text-charcoal">{formatPLN(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-warm-gray">Dostawa</span>
            <span className="font-medium text-charcoal">
              {shipping === 0 ? "0,00 PLN" : formatPLN(shipping)}
            </span>
          </div>

          {/* BPF highlighted box */}
          <div className="bg-muted/70 rounded-xl px-4 py-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="h-[18px] w-[18px] text-warm-gray flex-shrink-0" />
                <span className="text-sm font-medium text-charcoal">
                  Ochrona zakupu (2,5%)
                </span>
              </div>
              <span className="text-sm font-medium text-charcoal whitespace-nowrap">
                {formatPLN(bpf)}
              </span>
            </div>
            <p className="text-xs text-warm-gray leading-relaxed mt-1.5 pl-[26px]">
              Bezpłatny zwrot + priorytetowy support jeśli coś pójdzie nie tak.
            </p>
          </div>

          {/* Total */}
          <div className="flex items-baseline justify-between pt-4 border-t border-border/60">
            <span className="text-[11px] font-medium uppercase tracking-wide text-warm-gray">
              Razem
            </span>
            <span className="text-[22px] font-medium text-charcoal">
              {formatPLN(total)}
            </span>
          </div>
        </div>
      </main>

      {/* Sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3 z-40">
        <div className="max-w-md mx-auto">
          <Link
            href="/potwierdzenie"
            className="btn-cta w-full block text-center"
            style={{ paddingTop: "14px", paddingBottom: "14px" }}
          >
            Kupuję i płacę
          </Link>
          <p className="text-[11px] text-warm-gray text-center leading-relaxed mt-2">
            Klikając akceptujesz regulamin sklepu FashionHero.
          </p>
        </div>
      </div>

      <AbBadge variant="b" />
    </div>
  );
}
