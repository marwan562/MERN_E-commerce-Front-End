import React from "react";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import DetailsProduct from "@/components/DetailsProduct";
import LeftBaner from "@/components/LeftBaner";
import { ICategoriesTypes, IProductsTypes } from "@/interface";
import CatPefix from "../../categories/[catPerfix]/page";

const getProductById = async (id: string): Promise<IProductsTypes> => {
  const res = await fetch(`${process.env.BASE_URL}/product/details/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return await res.json();
};

const DetailsProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductById(params.productId);

  return (
    <div className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <NextBreadcrumb
          homeElement="Home"
          separator={<span className="mx-2">/</span>}
          containerClasses="flex space-x-2"
          listClasses="text-blue-500"
          activeClasses="font-bold"
          capitalizeLinks
          productTitle={productDetails.title}
        />
        <div className="flex flex-wrap -mx-4 mt-8">
          <LeftBaner image={productDetails.img} />
          <DetailsProduct {...productDetails} />
        </div>

        <CatPefix title="Products Similar Category" similarProduct={productDetails._id} params={{ catPerfix: productDetails.category.title }} />
      </div>
    </div>
  );
};

export default DetailsProductPage;
