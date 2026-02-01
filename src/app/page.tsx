import Image from "next/image";
import Link from "next/link";

import ProductList from "@/components/product/product-list";
import { db } from "@/db";

const Home = async () => {
  // Busca os produtos do DB
  const productsFromDB = await db.query.productTable.findMany({
    with: { Variants: true }, // DB retorna "Variants" maiúsculo
  });

  // Mapeia para o formato que o ProductList espera
  const products = productsFromDB.map((p) => ({
    ...p,
    variants: p.Variants, // transforma "Variants" em "variants"
  }));

  return (
    <div className="space-y-6 px-5">
      <div className="relative">
        <Image
          src="/banner 1 vero.png"
          alt="leve uma vida com estilo."
          height={0}
          width={0}
          sizes="45vw"
          className="h-auto w-full"
        />

        <Link
          href="/product/camiseta-ver"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white px-6 py-2 font-bold text-black transition hover:bg-neutral-800 hover:text-white"
        >
          Comprar
        </Link>
      </div>

      {/*<ProductList products={products} title="mais vendidos" />*/}
      <div className="flex items-center gap-2 p-4 px-3 md:p-5">
        <div className="flex max-w-[60%] flex-col gap-3 px-5">
          <h1 className="text-2xl leading-tight font-bold">
            <span className="block">Coleção 2026</span>
            <span className="block">O início.</span>
          </h1>
          <p className="text-1xl mt-2">
            O começo da VERØ esta nas cores que nunca saem de moda
          </p>
          <Link
            href="/product/camiseta-ver"
            className="mt-5 mb-3 inline-flex rounded-full bg-black px-3 py-2 font-semibold text-white"
          >
            Ver coleção
          </Link>
        </div>

        <div className="">
          {
            <Image
              src="/coleção 2026 conjunto.png"
              alt="Coleção 2026."
              height={0}
              width={0}
              sizes="100vw"
              className="mx-auto w-[85%] items-center rounded-[20px]"
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
