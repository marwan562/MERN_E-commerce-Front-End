import Image from "next/image";

const HomeMain = () => {
  return (
    <div className="relative w-full h-[110vh]">
      <Image
        src="/images/main-home.jpg"
        alt="main home"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute  space-y-3    bottom-32 left-16 md:bottom-44 md:left-32  z-10 ">
        <div className=" text-4xl">Mixed Textiles</div>
        <p>
          Lorem ipsum dolor sit, amet consectetur <br /> Explicabo voluptatum
          nam, in marwanh
        </p>
        <button className="border border-black text-balance hover:bg-slate-400/35 duration-200 ease-in font-medium px-8 py-2">
          SHOP COLLECTION
        </button>
      </div>
    </div>
  );
};

export default HomeMain;
