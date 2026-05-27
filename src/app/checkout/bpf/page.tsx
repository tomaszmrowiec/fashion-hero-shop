"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { AbBadge } from "@/components/ab-badge";

function formatPLN(n: number) {
  return (
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n) + " PLN"
  );
}

const DEMO_SUBTOTAL = 189;
const DEMO_SHIPPING = 12;
const DEMO_BPF = DEMO_SUBTOTAL * 0.025;
const DEMO_TOTAL = DEMO_SUBTOTAL + DEMO_SHIPPING + DEMO_BPF;

function DemoCheckout() {
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-32">
      <div className="bg-muted/70 rounded-lg px-4 py-2.5 mb-5 text-center">
        <p className="text-xs text-warm-gray">
          Tryb demo — dodaj produkt do koszyka, aby zobaczyć swoje zamówienie
        </p>
      </div>

      <p className="text-[10px] font-medium uppercase tracking-widest text-warm-gray mb-2">
        Podsumowanie
      </p>
      <h1 className="text-[28px] font-normal text-charcoal leading-tight mb-5">
        Twoje zamówienie
      </h1>

      {/* Demo product card */}
      <div className="bg-card rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/5 p-4 flex gap-3 mb-8">
        <div
          className="w-24 h-28 rounded-lg flex-shrink-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, #f5f0e844 0%, #f5f0e822 35%, #f5f4f1 65%)",
          }}
        />
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-warm-gray">
              SUKIENKI
            </p>
            <p className="text-[15px] font-medium text-charcoal mt-1.5">
              Sukienka midi w kwiaty
            </p>
            <p className="text-xs text-warm-gray mt-0.5">
              Rozmiar 36 · Kolor: ecru
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[11px] uppercase tracking-wide text-warm-gray">
              Ilość: 1
            </span>
            <span className="text-[15px] font-medium text-charcoal">
              {formatPLN(DEMO_SUBTOTAL)}
            </span>
          </div>
        </div>
      </div>

      {/* Price breakdown */}
      <p className="text-[10px] font-medium uppercase tracking-widest text-warm-gray mb-4">
        Rozliczenie
      </p>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray">Produkt</span>
          <span className="font-medium text-charcoal">{formatPLN(DEMO_SUBTOTAL)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-warm-gray">Dostawa</span>
          <span className="font-medium text-charcoal">{formatPLN(DEMO_SHIPPING)}</span>
        </div>
        <div className="bg-muted/70 rounded-xl px-4 py-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <ShieldCheck className="h-[18px] w-[18px] text-warm-gray flex-shrink-0" />
              <span className="text-sm font-medium text-charcoal">
                Ochrona zakupu (2,5%)
              </span>
            </div>
            <span className="text-sm font-medium text-charcoal whitespace-nowrap">
              {formatPLN(DEMO_BPF)}
            </span>
          </div>
          <p className="text-xs text-warm-gray leading-relaxed mt-1.5 pl-[26px]">
            Bezpłatny zwrot + priorytetowy support jeśli coś pójdzie nie tak.
          </p>
        </div>
        <div className="flex items-baseline justify-between pt-4 border-t border-border/60">
          <span className="text-[11px] font-medium uppercase tracking-wide text-warm-gray">
            Razem
          </span>
          <span className="text-[22px] font-medium text-charcoal">
            {formatPLN(DEMO_TOTAL)}
          </span>
        </div>
      </div>

      {/* Sticky CTA */}
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
    </div>
  );
}

export default function BpfCheckoutPage() {
  const { items } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 299 ? 0 : 19.9;
  const bpf = subtotal * 0.025;
  const total = subtotal + shipping + bpf;

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.6px] text-warm-gray">
            <li>
              <Link href="/" className="hover:text-charcoal transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-charcoal">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-[32px] font-normal text-charcoal mb-8">Checkout</h1>

        {items.length === 0 ? (
          <DemoCheckout />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16">
            {/* Left: Form */}
            <div>
              {/* Shipping Information */}
              <section className="mb-10">
                <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal mb-5 pb-2 border-b border-border">
                  SHIPPING INFORMATION
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-warm-gray mb-1.5">First Name</label>
                    <input
                      type="text"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-gray mb-1.5">Last Name</label>
                    <input
                      type="text"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-warm-gray mb-1.5">Email</label>
                    <input
                      type="email"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-warm-gray mb-1.5">Address</label>
                    <input
                      type="text"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-gray mb-1.5">City</label>
                    <input
                      type="text"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-gray mb-1.5">State</label>
                    <input
                      type="text"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-gray mb-1.5">ZIP Code</label>
                    <input
                      type="text"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      placeholder="ZIP"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-gray mb-1.5">Country</label>
                    <input
                      type="text"
                      className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-charcoal transition-colors"
                      defaultValue="Poland"
                      readOnly
                    />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="mb-10">
                <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal mb-5 pb-2 border-b border-border">
                  PAYMENT
                </h2>
                <div className="bg-cream-light px-6 py-8 text-center">
                  <p className="text-sm text-warm-gray mb-1">Payment integration coming soon.</p>
                  <p className="text-xs text-warm-gray/60">This is a demo checkout page.</p>
                </div>
              </section>

              {/* Place Order */}
              <Link href="/potwierdzenie" className="btn-cta w-full sm:w-auto sm:min-w-[280px] block text-center sm:inline-flex">
                PLACE ORDER
              </Link>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="bg-cream-light p-6 sticky top-20">
                <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal mb-5 pb-2 border-b border-cream-dark">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div
                        className="w-16 h-16 rounded flex-shrink-0"
                        style={{
                          background: `radial-gradient(ellipse at 50% 55%, ${item.color.hex}44 0%, ${item.color.hex}22 35%, #ece9e2 65%)`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-medium uppercase tracking-wide truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-warm-gray">
                          {item.color.name} / Size {item.size}
                        </p>
                        <p className="text-xs text-warm-gray">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-charcoal">
                        {(item.product.price * item.quantity).toFixed(0)} zl
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-cream-dark">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Subtotal</span>
                    <span className="font-medium">{subtotal.toFixed(0)} zl</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `${shipping.toFixed(2)} zl`}
                    </span>
                  </div>

                  {/* BPF line — the only difference vs Version A */}
                  <div className="bg-white rounded-lg px-3 py-2.5 border border-cream-dark">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-warm-gray flex-shrink-0" />
                        <span className="text-xs font-medium text-charcoal">
                          Buyer Protection (2.5%)
                        </span>
                      </div>
                      <span className="text-xs font-medium text-charcoal whitespace-nowrap">
                        {bpf.toFixed(2)} zl
                      </span>
                    </div>
                    <p className="text-[11px] text-warm-gray leading-relaxed mt-1 pl-[22px]">
                      Free returns + priority support if something goes wrong.
                    </p>
                  </div>

                  <div className="flex justify-between text-sm pt-3 border-t border-cream-dark mt-3">
                    <span className="font-medium text-charcoal">Total</span>
                    <span className="font-medium text-charcoal text-lg">{total.toFixed(2)} zl</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <AbBadge variant="b" />
    </>
  );
}
