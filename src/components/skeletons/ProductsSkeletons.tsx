const ProductsSkeletons = () => {
  const renderSkeleteon = Array(8)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className="border bg-gray-200  animate-pulse border-black shadow rounded-md p-4 w-full mx-auto space-x-6">
          <div className="">
            <div className="skeleton h-[400px] w-[350px] mb-5 "></div>
            <div className=" flex items-center justify-between">
              <div>
                <div className=" skeleton w-[150px] h-3 mb-1"></div>
                <div className=" skeleton w-[92px] h-3"></div>
              </div>
              <div>
                <div className=" skeleton  size-9 "></div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  return renderSkeleteon;
};

export default ProductsSkeletons;
