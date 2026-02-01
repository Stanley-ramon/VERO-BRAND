"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
};

export function CategoryFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const active = searchParams.get("category");

  function selectCategory(slug?: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set("category", slug);
      params.set("page", "1");
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => selectCategory()}
        className={`rounded-full border px-4 py-1 text-sm ${
          !active ? "bg-black text-white" : ""
        }`}
      >
        Todos
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => selectCategory(cat.slug)}
          className={`rounded-full border px-4 py-1 text-sm ${
            active === cat.slug ? "bg-black text-white" : ""
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
