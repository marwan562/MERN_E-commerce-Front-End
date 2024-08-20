import Image from "next/image";

const renderTheImages = [
  "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718418887/zh4udetc1owadebhlnao.png",
  "https://res.cloudinary.com/dgba7n7ct/image/upload/v1718418949/rffnfffb6zc7zbw9g5on.png",
];

const MeetTheArtist = () => {
  return (
    <div className=" p-5 container mx-auto mt-[70px] ">
      <div className="flex items-center justify-between gap-5 md:gap-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {renderTheImages.map((el, inx) => (
            <Image
              key={++inx}
              src={el}
              alt="img-artist"
              width={450}
              height={700}
              layout="responsive"
            />
          ))}
        </div>
        <div className="  space-y-6 ">
          <h2 className="text-4xl">
            Meet The Artist <br /> Behaind The Corsen <br /> Maria & Sophia
          </h2>
          <p className="text-sm font-mono text-gray-600">
            {" "}
            Lorem inpus dordm, amet constrabtur
            <br /> adicspice educate euit, sed do eiusmad,ur adicspice educate
            euit, sed do
          </p>
          <button className="border border-black text-balance hover:bg-slate-400/35 duration-200 ease-in font-medium px-8 py-2">
            TALK WITH ME
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetTheArtist;
