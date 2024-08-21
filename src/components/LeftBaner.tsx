import Image from "next/image";

type TProps = {
  image: string;
};
const LeftBaner = ({ image }: TProps) => {
  return (
    <div className="w-full md:w-1/2 px-4 mb-8">
      <Image
        src={image}
        alt="Product"
        width={500}
        height={500}
        className="w-full h-full rounded-lg shadow-md mb-4"
      />
    </div>
  );
};

export default LeftBaner;
