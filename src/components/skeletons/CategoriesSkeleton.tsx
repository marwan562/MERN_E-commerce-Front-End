const CategoriesSkeleton = () => {
  return Array(2)
    .fill(0)
    .map((_, inx) => {
      return (
        <div
          key={inx}
          className="border  border-black shadow rounded-md p-4 w-full mx-auto space-x-6"
        >
          <div className="">
            <div className="skeleton h-[700px]  mb-5 "></div>
            <div className=" flex items-center justify-between"></div>
          </div>
        </div>
      );
    });
};

export default CategoriesSkeleton;
