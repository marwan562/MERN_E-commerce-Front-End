import { ICategoriesTypes } from "@/interface";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  data: ICategoriesTypes[];
};

const RenderCategories = ({ data }: TProps) => {
  return data.map((el) => {
    return (
      <div key={el._id} className="relative mb-5 md:mb-0">
        <Image
          className="w-full border-y-2 border-black h-full"
          src={el.img}
          alt={el.title}
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className=" absolute left-[40%] mx-auto top-[45%]   text-center">
          <h2 className=" text-5xl font-mono mb-7">
            {el.title.toLocaleUpperCase()}
          </h2>
         <Link href={`/categories/${el.title}`}  >
         <button className="border border-black text-balance hover:bg-slate-400/35 duration-200 ease-in font-mono px-8 py-2">
            SHOP COLLECTION
          </button>
          </Link>
        </div>
      </div>
    );
  });
};

export default RenderCategories;
