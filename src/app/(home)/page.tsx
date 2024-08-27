import About from "@/components/About";
import Products from "@/components/E-commerce/Products";
import Categories from "@/components/E-commerce/Categories";
import HomeMain from "@/components/HomeMain";
import Componies from "@/components/E-commerce/Componies";
import Blogs from "@/components/E-commerce/OnyxTheFlow";
import MeetTheArtist from "@/components/E-commerce/MeetTheArtist";
import InstagramSwipper from "@/components/E-commerce/InstagramSwipper";


export default function Home() {
  return (
    <div className=" ">
      <HomeMain />
      <About />
      <Products />
      <Categories />
      <Componies />
      <Blogs />
      <MeetTheArtist />
      <InstagramSwipper  />
    </div>
  );
}
