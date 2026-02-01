"use client";

import Link from "next/link";

type PaginationProps = {
  page: number;
  hasNextPage: boolean;
  query?: string;
};

export function Pagination({ page, hasNextPage, query }: PaginationProps) {
  const createUrl = (page: number) => {
    const params = new URLSearchParams();

    if (query) params.set("q", query);
    params.set("page", String(page));

    return `?${params.toString()}`;
  };

  return (
    <div className="mt-8 flex justify-center gap-4">
      {page > 1 && (
        <Link
          href={createUrl(page - 1)}
          className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Anterior
        </Link>
      )}

      <span className="flex items-center text-sm text-gray-500">
        Página {page}
      </span>

      {hasNextPage && (
        <Link
          href={createUrl(page + 1)}
          className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Próxima
        </Link>
      )}
    </div>
  );
}
