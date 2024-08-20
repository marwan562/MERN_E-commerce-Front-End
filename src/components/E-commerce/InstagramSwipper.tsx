
import Image from "next/image";

const InstagramSwipper = () => {
 const instagramImages =  [
    "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426325/hsvtt9ktj4rsokeukhqy.png",
    "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426319/dfag9iftetccgn6fcnht.png",
    "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426333/fwmk7vwbgcice0l4gfmy.png",
    "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426312/cfe8pbd812uwsdyuf9uf.png",
    "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426600/zz9tglvlels3k8vhinvk.png",
    "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426589/cdtvssef8ybmwewgsrir.png",
    "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718426339/pu0iexx4zkszd7odywb3.png"
  ]

  return (
    <div className={"mb-[50px]"}>
      <h2
        className={
          "container m-auto text-2xl font-mono underline mb-5 mt-10"
        }
      >
        Instagram Follow Us M_v65n
      </h2>
      <div className="flex space-x-2  overflow-x-auto no-scrollbar ">
        {instagramImages && (
          instagramImages.map((el, inx) => (
            <Image
              className="rounded-md border border-black"
              key={inx}
              src={el}
              width={300}
              height={300}
              alt={`image-${inx}`}
            />
          ))
        ) }
      </div>
    </div>
  );
};

export default InstagramSwipper;
