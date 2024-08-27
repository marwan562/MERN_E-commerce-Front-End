import NextBreadcrumb from "@/components/NextBreadcrumb";
import Image from "next/image";
import Link from "next/link";

const CategoeiesPage = () => {
  return (
    <div className="flex  m-5">
      <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col  space-y-10">
          <div className="flex flex-col  gap-2  mt-5  ">
            <NextBreadcrumb
              homeElement="Home"
              separator={<span className="mx-2">{"/"}</span>}
              containerClasses="flex space-x-2"
              listClasses="text-blue-500"
              activeClasses="font-bold"
              capitalizeLinks
            />
            <h1 className="text-3xl font-mono underline xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 dark:text-white">
              Shop By Category
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 w-full">
            <Link href={"/categories/men"}>
              <div className="relative group flex justify-center hover:scale-105 duration-300 cursor-pointer items-center h-full w-full">
                <Image
                  width={500}
                  height={500}
                  className="object-center object-cover h-full w-full rounded-md "
                  src="https://res.cloudinary.com/dgba7n7ct/image/upload/v1718405930/zm18d8hjnrz7a0dkjgch.png"
                  alt="girl-image"
                />
                <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  Men
                </button>
              </div>
            </Link>

            <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0 ">
              <div className="relative group flex justify-center items-center h-full w-full hover:scale-105 duration-300 cursor-pointer">
                <Image
                  width={500}
                  height={500}
                  className="object-center object-cover h-full w-full"
                  src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png"
                  alt="shoe-image"
                />
                <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  Shoes
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
              </div>
              <div className="relative group flex justify-center items-center h-full w-full hover:scale-105 duration-300 cursor-pointer">
                <Image
                  width={500}
                  height={500}
                  className="object-center object-cover h-full w-full"
                  src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png"
                  alt="watch-image"
                />
                <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  Watches
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
              </div>
            </div>

            <Link href={"/categories/women"}>
              <div className="relative group justify-center items-center h-full w-full hidden lg:flex hover:scale-105 duration-300 cursor-pointer">
                <Image
                  width={500}
                  height={500}
                  className="object-center object-cover h-full w-full"
                  src="https://res.cloudinary.com/dgba7n7ct/image/upload/v1718405921/bznrznzlc8bppirnljpu.png"
                  alt="girl-image"
                />
                <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                  Women
                </button>
                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
              </div>
            </Link>
            <div className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
              <Image
                width={500}
                height={500}
                className="object-center object-cover h-full w-full hidden md:block"
                src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png"
                alt="girl-image"
              />
              <Image
                width={500}
                height={500}
                className="object-center object-cover h-full w-full md:hidden"
                src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
                alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
              />
              <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                Women
              </button>
              <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
            </div>
          </div>
          <div className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
            <Image
              width={500}
              height={500}
              className="object-center object-cover h-full w-full hidden md:block"
              src="https://res.cloudinary.com/dgba7n7ct/image/upload/v1718405921/bznrznzlc8bppirnljpu.png"
              alt="girl-image"
            />
            <Image
              width={500}
              height={500}
              className="object-center object-cover h-full w-full sm:hidden"
              src="https://res.cloudinary.com/dgba7n7ct/image/upload/v1718405921/bznrznzlc8bppirnljpu.png"
              alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
            />
            <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
              Women
            </button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoeiesPage;
