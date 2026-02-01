"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  hasNextPage: boolean;
};

export function InfiniteScroll({ hasNextPage }: InfiniteScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isLoading = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔓 libera o lock quando a página muda
  useEffect(() => {
    isLoading.current = false;
  }, [searchParams]);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // ⛔ evita múltiplos pushes
        if (isLoading.current) return;
        isLoading.current = true;

        const params = new URLSearchParams(searchParams.toString());
        const currentPage = Number(params.get("page") ?? "1");

        params.set("page", String(currentPage + 1));

        router.push(`?${params.toString()}`, { scroll: false });
      },
      { rootMargin: "200px" },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasNextPage, router, searchParams]);

  if (!hasNextPage) return null;

  return (
    <div ref={ref} className="py-10 text-center text-sm text-gray-500">
      buscando mais produtos…
    </div>
  );
}
