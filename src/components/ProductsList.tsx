import Image from "next/image";
import AddToCart from "./Bottons/AddToCart";
import { IProductsTypes } from "@/interface";
import Link from "next/link";

interface TProps extends IProductsTypes {}

const ProductList = ({
  role,
  img,
  title,
  price,
  cat_prefix,
  id,
  stock,
}: TProps) => {
  const data = {
    role,
    img,
    title,
    price,
    cat_prefix,
    id,
    stock,
  };
  return (
    <div className="relative border-2 group border-black hover:scale-95 duration-300   ">
      {role && (
        <div className="absolute  left-6 border border-black flex bg-white">
          <div className="text-sm font-mono p-1">
            {role?.toLocaleUpperCase()}
          </div>
        </div>
      )}
      <div className="absolute cursor-pointer top-3 right-4">
        <Image
          src={"/svg/washlist.svg"}
          alt="wishlist"
          width={15}
          height={15}
        />
      </div>

      <Image
        className="border-b border-black"
        src={img}
        alt={title}
        width={350}
        height={450}
        layout="responsive"
      />
      <div className="flex items-center justify-between ">
        <Link
          href={`/details/${id}`}
          className="font-mono group-hover:underline cursor-pointer ml-3"
        >
          <h2 className="text-lg  ">{title?.toLocaleUpperCase()}</h2>
          <p className="text-md">${price?.toFixed(2)}</p>
        </Link>
        <AddToCart data={data} />
      </div>
    </div>
  );
};

export default ProductList;
