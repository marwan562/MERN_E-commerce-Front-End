import NextTopLoader from 'nextjs-toploader';

const NextTopLoading = () => {
  return (
    <NextTopLoader
      color="#000000" // Set loader color to black
      initialPosition={0.08} // Initial position of the loader
      crawlSpeed={200} // Speed at which the loader crawls
      height={3} // Height of the loader
      crawl={true} // Whether the loader should crawl
      showSpinner={true} // Whether to show a spinner
      easing="ease" // Easing function for the loader
      speed={200} // Speed of the loader animation
      shadow="0 0 10px #000000, 0 0 5px #000000" // Black shadow effect of the loader
      template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>' // Custom template for the loader
      zIndex={1600} // Z-index of the loader
      showAtBottom={false} // Whether to show the loader at the bottom
    />
  );
};

export default NextTopLoading;
