import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./user/navbar";
import Footer from "./user/footer";
import Navigation from "./user/navigation";
import Sidebar from "./admin/sidebar";
import { useSelector } from "react-redux";

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
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className=" flex">
      <div className="" >
        <Sidebar />
      </div>
      <div className=" min-h-screen  p-5 w-full" style={theme}>
        {children}
        <Outlet />
      </div>
    </div>
  );
}
