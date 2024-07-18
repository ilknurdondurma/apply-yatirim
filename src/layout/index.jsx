import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Navigation from "./navigation";
import Sidebar from "./sidebar";

export function Layout({ children }) {
  const bellekteTutulanNavbar = useMemo(() => <Navbar />, []);
  const bellekteTutulanFooter = useMemo(() => <Footer />, []);

  return (
    <div className="flex flex-col">
      <Navigation />
      {bellekteTutulanNavbar}
      <main className="min-h-screen mt-10 mx-auto">
        {children}
        <Outlet />
      </main>
      {bellekteTutulanFooter}
    </div>
  );
}

export function AdminLayout({ children }) {
  const bellekteTutulanFooter = useMemo(() => <Footer />, []);

  return (
    <div className="flex flex-col">
      <div className=" w-full  grid grid-cols-5 md:grid-cols-6 sm:grid-cols-1 gap-4">
        <span className="sm:hidden col-span-1 md:col-span-2 ">
          <Sidebar />
        </span>
        <main className="flex-grow min-h-screen p-5 sm:m-3 col-span-4 md:col-span-4">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
