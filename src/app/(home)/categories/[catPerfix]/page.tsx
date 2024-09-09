"use client";
import ProductList from "@/components/ProductsList";
import { IProductsTypes } from "@/interface";
import { useAppSelector } from "@/lib/store";
import React, { useEffect, useState } from "react";

const getProductByCatPrefix = async (
  catPrefix: string
): Promise<IProductsTypes[]> => {
  const res = await fetch(`${process.env.BASE_URL}/category/${catPrefix}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return await res.json();
};

interface CatPrefixProps {
  params: { catPrefix: string };
  title?: string;
  similarProduct?: string;
}

const CatPrefix: React.FC<CatPrefixProps> = ({
  params,
  title,
  similarProduct,
}) => {
  const [products, setProducts] = useState<IProductsTypes[]>([]);
  const { washlist } = useAppSelector((state) => state.washlist);

  const productsWithWashlist = products.map((product) => ({
    ...product,
    inWashlist: washlist.some((item) => item.productId._id === product._id),
  }));

  useEffect(() => {
    getProductByCatPrefix(params.catPrefix).then((data) => setProducts(data));
  }, [params.catPrefix]);

  return (
    <main className="mb-36 container mx-auto mt-24">
      <h2 className="text-3xl border-b-2 border-black font-mono">
        {title ? title : `${params.catPrefix.toUpperCase()}'s Products`}
      </h2>
      <br />
      <div className="grid grid-cols-1 m-3 gap-2 sm:gap-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {productsWithWashlist.map((el) =>
          el._id === similarProduct ? null : (
            <ProductList key={el._id} {...el} />
          )
        )}
      </div>
    </main>
  );
};

export default CatPrefix;
