import dynamic from "next/dynamic";
import { IProductsTypes } from "@/interface";
import ProductsSkeletons from "../skeletons/ProductsSkeletons";

const ProductList = dynamic(() => import("../ProductsList"), {
  ssr: true,
  loading: () => <ProductsSkeletons />,
});

async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/product/getAll`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Products = async () => {
  const data = (await getProducts()) as IProductsTypes[];


  return (
    <main className="mb-36 container  mb mx-auto">
      <h2 className="text-3xl border-b-2 border-black font-mono">Products</h2>
      <br />
      <div className="grid grid-cols-1 m-3 gap-2 sm:gap-0  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
        {data.map((el) => (
          <ProductList key={el.id} {...el} />
        ))}
      </div>
    </main>
  );
};

export default Products;
