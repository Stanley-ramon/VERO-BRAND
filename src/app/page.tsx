import Image from "next/image";

import { Header } from "@/components/common/header";
import productList from "@/components/common/product-list";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";

import product from "./product/page";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      Variants: true,
    },
  });

  return (
    <>
      <Header></Header>
      <div className="space-y-6 px-5">
        <Image
          src="/banner1.png"
          alt="leve uma vida com estilo."
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        ></Image>

        <ProductList products={products} title="mais vendidos"></ProductList>

        <Image
          src="/banner2.png"
          alt="leve uma vida com estilo."
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        ></Image>
      </div>
    </>
  );
};

export default Home;
