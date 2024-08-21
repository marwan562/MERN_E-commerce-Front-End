"use client";

import dynamic from "next/dynamic";
import { IProductsTypes } from "@/interface";
import ProductsSkeletons from "../skeletons/ProductsSkeletons";
import { useEffect, useState } from "react";
import { actGetWashlist } from "@/toolkit/Washlist/act/actGetWashlist";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useAuth } from "@clerk/nextjs";

const ProductList = dynamic(() => import("../ProductsList"), {
  ssr: false, // Ensures this component is only rendered on the client side
  loading: () => <ProductsSkeletons />,
});

async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/product/getAll`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Products = () => {
  const dispatch = useAppDispatch();
  const { getToken } = useAuth();
  const [products, setProducts] = useState<IProductsTypes[]>([]);
  const { washlist } = useAppSelector((state) => state.washlist);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        const token = await getToken();
        setProducts(data as IProductsTypes[]);
        await dispatch(actGetWashlist(token));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const productsWithWashlist = products.map((product) => ({
    ...product,
    inWashlist: washlist.some((item) => item.productId === product._id),
  }));

  return (
    <main className="mb-36 container mx-auto">
      <h2 className="text-3xl border-b-2 border-black font-mono">Products</h2>
      <br />
      <div className="grid grid-cols-1 m-3 gap-2 sm:gap-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {productsWithWashlist.map((el) => (
          <ProductList key={el._id} {...el} />
        ))}
      </div>
    </main>
  );
};

export default Products;
