"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // ⛔ evita push desnecessário ao montar
    if (value === initialValue) return;

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("q", value);
        params.set("page", "1"); // reset page ao buscar
      } else {
        params.delete("q");
        params.set("page", "1");
      }

      router.push(`?${params.toString()}`);
    }, 400); // ⏱ debounce

    return () => clearTimeout(timeout);
  }, [value, initialValue, router, searchParams]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Pesquisar por..."
      className="w-full rounded-full border px-4 py-2 text-sm focus:outline-none"
    />
  );
}
