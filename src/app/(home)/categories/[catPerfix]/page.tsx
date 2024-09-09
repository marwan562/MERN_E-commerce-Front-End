"use client";
import ProductList from "@/components/ProductsList";
import { IProductsTypes } from "@/interface";
import { useAppSelector } from "@/lib/store";
import { title } from "process";
import React, { useEffect, useState } from "react";

const getProductByCatPrefix = async (
  catPerfix: string
): Promise<IProductsTypes[]> => {
  const res = await fetch(`${process.env.BASE_URL}/category/${catPerfix}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return await res.json();
};

const CatPefix = ({
  params,
  title,
  similarProduct,
}: {
  params: { catPerfix: string };
  title?: string;
  similarProduct?: string;
}) => {
  const [products, setProducts] = useState<IProductsTypes[]>([]);
  const { washlist } = useAppSelector((state) => state.washlist);

  const productsWithWashlist = products.map((product) => ({
    ...product,
    inWashlist: washlist.some((item) => item.productId._id === product._id),
  }));

  useEffect(() => {
    getProductByCatPrefix(params.catPerfix).then((data) => setProducts(data));
  }, [params.catPerfix]);

  return (
    <main className="mb-36 container mx-auto mt-24">
      <h2 className="text-3xl border-b-2 border-black font-mono">
        {title ? title : `${params?.catPerfix?.toUpperCase()}&apos;s Products`}
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

export default CatPefix;
