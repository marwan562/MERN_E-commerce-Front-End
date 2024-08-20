import { IBlogsTypes } from "@/interface";
import Image from "next/image";

async function getBlogs() {
  const res = await fetch("http://localhost:5005/blog");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blogs = async () => {
  // const data = (await getBlogs()) as IBlogsTypes[];

  return (
    <div className="container mx-auto mb-5 p-5 md:p-0">
      <div className="text-center font-mono mb-10">
        <h2 className="text-4xl mb-2">Read Our Blogs Posts</h2>
        <p className=" md:max-w-[55%] mx-auto">
          lorem inpus dordm, amet constrabtur adicspice educate euit, sed do
          eiusmad,ur adicspice educate euit, sed do
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* {data.map((el) => {
          return (
            <div key={el.id} className=" relative mb-5 md:mb-0 ">
              {el.createdAt && (
                <div className="absolute left-5 border top-5 border-black flex bg-white">
                  <div className="text-sm font-mono p-1">
                    {el.createdAt.toLocaleUpperCase()}
                  </div>
                </div>
              )}
              <Image
                src={el.img}
                alt={`blogs-${el.title}`}
                width={0}
                height={0}
                layout="responsive"
              />
              <h2 className="text-center border-b-2 border-x-2 rounded-b-md font-mono  border-black">
                {el.title.toLocaleUpperCase()}
              </h2>
              <h1 className="text-center max-w-[90%] mx-auto mt-2 font-semibold">
                {el.description}.
              </h1>
              <p className="text-md cursor-pointer hover:bg-black hover:text-white px-1 font-mono text-center mt-1 border-b-2 border-black w-fit m-auto ">
                READ MORE
              </p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Blogs;
