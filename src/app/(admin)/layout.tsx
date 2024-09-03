"use client";

import React from "react";
import { AdminProvider } from "./context/useAdminContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar  className={` bg-white   w-64 min-h-screen   hidden md:block`}/>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
