import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./user/navbar";
import Footer from "./user/footer";
import Navigation from "./user/navigation";
import Sidebar from "./admin/sidebar";
import { useSelector } from "react-redux";
import NavigationAdmin from "./admin/navigation";

export function Layout({ children }) {
  const bellekteTutulanNavbar = useMemo(() => <Navbar />, []);
  const bellekteTutulanFooter = useMemo(() => <Footer />, []);
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="flex flex-col" style={theme}>
      <Navigation />
      {bellekteTutulanNavbar}
      <main className="min-h-screen mt-10 " >
        {children}
        <Outlet />
      </main>
      {bellekteTutulanFooter}
    </div>
  );
}

export function AdminLayout({ children }) {

  return (
      <div className=" flex">
      <div className="" >
        <Sidebar />
      </div>
      <div className=" min-h-screen w-full pl-5" >
        <NavigationAdmin/>
        {children}
        <Outlet />
      </div>
    </div>
    
  );
}
