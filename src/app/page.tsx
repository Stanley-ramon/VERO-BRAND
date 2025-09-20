import Image from "next/image";

import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
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
    <>
      <Header />
      <div className="space-y-6 px-5">
        <Image
          src="/banner 1 vero.png"
          alt="leve uma vida com estilo."
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />

        <ProductList products={products} title="mais vendidos" />

        <Image
          src="/banner2.png"
          alt="leve uma vida com estilo."
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </>
  );
};

export default Home;
