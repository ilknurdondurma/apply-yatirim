import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./user/navbar";
import Footer from "./user/footer";
import Navigation from "./user/navigation";
import Sidebar from "./admin/sidebar";
import { useDispatch, useSelector } from "react-redux";
import NavigationAdmin from "./admin/navigation";
import { toggleSidebar } from "../redux/actions/sidebar/sidebarActions";

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
  const theme = useSelector((state) => state.theme.theme);
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex" style={theme}>
      <div className={`fixed h-full `}>
        <Sidebar />
      </div>
      <div className={`min-h-screen w-full pl-5  ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <NavigationAdmin onToggleSidebar={handleToggleSidebar} />
        {children}
        <Outlet />
      </div>
    </div>
    
  );
}
