"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  List,
  ChartLine,
  Mails,
} from "lucide-react";
import { useAdminContext } from "../context/useAdminContext";

const navItems = [
  { key: "", icon: <LayoutDashboard size={20} />, label: "Overview" },
  { key: "orders", icon: <ShoppingCart size={20} />, label: "Orders" },
  { key: "products", icon: <Package size={20} />, label: "Products" },
  {
    key: "products-stats",
    icon: <ChartLine size={20} />,
    label: "Products Stats ",
  },
  { key: "customers", icon: <Users size={20} />, label: "Customers" },
  { key: "categories", icon: <List size={20} />, label: "Categories" },
  { key: "mails", icon: <Mails size={20} />, label: "Mails" },
];


type TProps = {
  className?:string;

}

export const Sidebar = ({ className= " w-64 min-h-screen flex flex-col" }:TProps) => {
  const { activeNav, setActiveNav, isSidebarOpen } = useAdminContext();

  return (
    <aside
      className={` bg-white ${className} ${
        isSidebarOpen ? "block " : "hidden"
      } md:block`}
    >
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl font-bold text-primary">AdminPanel</h1>
      </div>
      <nav className="flex-grow">
        {navItems.map(({ key, icon, label }) => (
          <Link href={`/dashboard/${key}`} key={key} passHref>
            <div
              className={`flex items-center py-4 px-6 hover:bg-gray-200 ${
                activeNav === key ? "bg-gray-200 text-primary" : "text-gray-500"
              }`}
              onClick={() => setActiveNav(key)}
            >
              {icon}
              <span className="mx-4">{label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
