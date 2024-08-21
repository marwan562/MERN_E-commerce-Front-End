import React from "react";
import DetailsProduct from "@/components/DetailsProduct";
import LeftBaner from "@/components/LeftBaner";
import { IProductsTypes } from "@/interface";

const getProductById = async (id: string):Promise<IProductsTypes> => {
  const res = await fetch(`${process.env.BASE_URL}/product/details/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return await res.json();
};

const DetailsProductPage = async ({ params }: { params: { productId: string } }) => {
  
  const productDetails = await getProductById(params.productId)

  

  return (
    <div className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <LeftBaner image={productDetails.img} />

          <DetailsProduct {...productDetails}/>
        </div>
      </div>
    </div>
  );
};

export default DetailsProductPage;
