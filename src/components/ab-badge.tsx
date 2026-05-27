"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AbBadgeProps {
  variant: "a" | "b";
}

export function AbBadge({ variant }: AbBadgeProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function switchTo(v: "a" | "b") {
    localStorage.setItem("ab_checkout", v);
    setOpen(false);
    router.push(v === "b" ? "/checkout/bpf" : "/checkout");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-charcoal text-white text-xs rounded-xl px-3 py-2.5 flex flex-col gap-1 shadow-lg min-w-[200px]">
          <button
            className={`text-left px-2 py-1.5 rounded-lg transition-colors ${
              variant === "a"
                ? "opacity-50 cursor-default"
                : "hover:bg-white/10"
            }`}
            onClick={() => variant !== "a" && switchTo("a")}
          >
            Wersja A · bez ochrony{variant === "a" ? " (aktywna)" : " →"}
          </button>
          <button
            className={`text-left px-2 py-1.5 rounded-lg transition-colors ${
              variant === "b"
                ? "opacity-50 cursor-default"
                : "hover:bg-white/10"
            }`}
            onClick={() => variant !== "b" && switchTo("b")}
          >
            Wersja B · z ochroną{variant === "b" ? " (aktywna)" : " →"}
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-charcoal/80 text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-charcoal transition-colors"
      >
        🧪 Wersja {variant.toUpperCase()}
      </button>
    </div>
  );
}
