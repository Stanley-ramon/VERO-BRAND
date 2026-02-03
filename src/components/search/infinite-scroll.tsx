"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type InfiniteScrollProps = {
  hasNextPage: boolean;
  query?: string;
};

export function InfiniteScroll({ hasNextPage, query }: InfiniteScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔁 reset quando muda a busca
  useEffect(() => {
    isFetching.current = false;
    setLoading(false);
  }, [query]);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetching.current) return;

        isFetching.current = true;
        setLoading(true);

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

  // 🚫 acabou tudo → não renderiza nada
  if (!hasNextPage && !loading) return null;

  return (
    <div ref={ref} className="py-10 text-center text-sm text-gray-500">
      {loading && hasNextPage ? "buscando mais produtos…" : null}
    </div>
  );
}
