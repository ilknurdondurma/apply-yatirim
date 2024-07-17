import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Navigation from "./navigation";

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
