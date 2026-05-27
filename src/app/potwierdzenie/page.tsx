import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Potwierdzenie zamówienia — FashionHero",
};

export default function PotwierdzeniePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-[28px] font-normal text-charcoal mb-3">
          Dziękujemy!
        </h1>
        <p className="text-sm text-warm-gray mb-1">
          Twoje zamówienie zostało przyjęte.
        </p>
        <p className="text-sm text-warm-gray mb-10">
          Potwierdzenie wyślemy na Twój adres e-mail.
        </p>
        <Link href="/" className="btn-cta">
          Wróć do sklepu
        </Link>
      </div>
    </div>
  );
}
