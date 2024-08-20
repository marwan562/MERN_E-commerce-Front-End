import dynamic from "next/dynamic";
import { ICategoriesTypes } from "@/interface";
import CategoriesSkeleton from "../skeletons/CategoriesSkeleton";

const RenderCategories = dynamic(() => import("../RenderCategories"), {
  ssr: false,
  loading: () => <CategoriesSkeleton />,
});

async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/category/getAll`,{cache:"force-cache"});

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Categories = async () => {
  const data = (await getCategories()) as ICategoriesTypes[];

  return (
    <main className=" ">
      <div className="  block md:flex ">
        <RenderCategories data={data} />
      </div>
    </main>
  );
};

export default Categories;
