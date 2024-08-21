// components/CategoryCard.js
import Image from "next/image";

const CategoryCard = ({ title, image, altText, isHiddenOnMobile }) => {
  return (
    <div className={`relative group flex justify-center items-center h-full w-full ${isHiddenOnMobile ? 'hidden md:block' : ''} hover:scale-105 duration-300 cursor-pointer`}>
      <Image
        width={500}
        height={500}
        className="object-center object-cover h-full w-full rounded-md"
        src={image}
        alt={altText}
      />
      <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
        {title}
      </button>
      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
    </div>
  );
};

export default CategoryCard;
