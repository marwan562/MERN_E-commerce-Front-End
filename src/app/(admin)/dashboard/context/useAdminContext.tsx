"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

type NavItem = "overview" | "orders" | "products" | "customers" | "categories";

interface AdminContextProps {
  activeNav: NavItem | string;
  setActiveNav: (navItem: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const getInitialNav = (): string => {
    const path = pathname.split("/")[2]; 
    return (path as string) || "overview";
  };

  const [activeNav, setActiveNav] = useState(getInitialNav);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveNav(getInitialNav());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ pathname]);

  const handleNavClick = useCallback((item: string) => {
    setActiveNav(item);
    setIsSidebarOpen(false);
    router.push(`/dashboard/${item}`);
  }, [router]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        activeNav,
        setActiveNav: handleNavClick,
        isSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
