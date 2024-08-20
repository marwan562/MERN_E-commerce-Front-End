/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    BASE_URL:process.env.BASE_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dgba7n7ct/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
