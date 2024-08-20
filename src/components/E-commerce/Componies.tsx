import Image from "next/image";

export default function Componies() {
  return (
    <div className=" h-[80vh]  md:h-[150vh]  flex justify-center items-center ">
      <div>
        <Image
          className="w-full mb-16 h-full"
          src="/images/componies.png"
          alt="componies"
          layout="responsive"
          sizes="120vw"
          width={0}
          height={0}
        />
        <Image
          className="w-full h-full"
          src={
            "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718413566/hqoly3yixzominywgdqj.png"
          }
          alt="componies"
          objectFit="cover"
          sizes="50vw"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
}
