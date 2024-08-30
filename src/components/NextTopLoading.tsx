import NextTopLoader from 'nextjs-toploader';

const NextTopLoading = () => {
  return (
    <NextTopLoader
      color="#000000" 
      initialPosition={0.08} 
      crawlSpeed={200}
      height={3} 
      crawl={true} 
      showSpinner={true}
      easing="ease" 
      speed={200}
      shadow="0 0 10px #000000, 0 0 5px #000000" 
      template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>' // Custom template for the loader
      zIndex={1600} 
      showAtBottom={false} // Whether to show the loader at the bottom
    />
  );
};

export default NextTopLoading;
