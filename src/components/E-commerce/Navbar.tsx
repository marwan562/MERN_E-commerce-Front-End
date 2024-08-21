import Image from "next/image";
import NavCart from "./NavCart";
import NavigationMenu from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import LogInUser from "../Bottons/LogInUser";
import WashlistHeader from "./WashlistHeader";

const Navbar = () => {
  return (
    <nav>
      <div className="flex backdrop-blur-lg z-50 items-center container mx-auto px-3 border-b border-x rounded-b-md border-x-black border-b-black pb-3 justify-between pt-5 fixed top-0 left-0 right-0">
        <div className="flex items-center gap-5">
          <Image
            className="w-[92px] cursor-pointer h-[18px] object-cover"
            src="/svg/corsen-main-logo-svg.svg"
            alt="logo"
            height={0}
            width={0}
          />
          <ul className="hidden md:flex font-semibold items-center gap-5">
            <Button className={"  font-bold text-[15px]"} variant="link">
              Home
            </Button>
          </ul>
          <NavigationMenu />
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className=" items-center hidden md:flex space-x-2 hover:underline cursor-pointer tracking-wide font-bold text-[15px]">
            <span title="search">SEARCH</span> {/* icon search */}
            <Image src="/svg/search.svg" alt="cart" width={14} height={15} />
          </div>

          <NavCart />

          <WashlistHeader />
          <LogInUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
