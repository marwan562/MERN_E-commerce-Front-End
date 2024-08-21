import Image from "next/image";
import NavCart from "./NavCart";
import NavigationMenu from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import LogInUser from "../Bottons/LogInUser";
import WashlistHeader from "./WashlistHeader";
import Link from "next/link";
import NavSearch from "../NavSearch";

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
              <Link href={"/"}> Home</Link>
            </Button>
          </ul>
          <NavigationMenu />
        </div>
        <div className="flex items-center justify-center gap-5">
        <NavSearch />

          <NavCart />

          <WashlistHeader />
          <LogInUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
