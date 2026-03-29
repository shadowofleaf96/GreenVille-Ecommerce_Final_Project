"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { fetchVendorProfile } from "@/store/slices/admin/authSlice";

import Nav from "./nav";
import Main from "./main";
import Header from "./header";

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminAuth);
  const { data: settings } = useSelector((state) => state.adminSettings);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (admin?.role === "vendor" && admin?._id) {
      dispatch(fetchVendorProfile(admin._id));
    }
  }, [admin, dispatch]);

  useEffect(() => {
    // Redirect to settings if it's the first time and settings are default
    const isNewStore = 
      settings && 
      settings.website_title?.en === "My Modern Store" && 
      !settings.logo_url;

    const hasRedirected = sessionStorage.getItem("admin_setup_redirected");

    if (isNewStore && admin?.role === "admin" && !hasRedirected && pathname !== "/admin/settings") {
      sessionStorage.setItem("admin_setup_redirected", "true");
      router.push("/admin/settings");
    }
  }, [settings, admin, router, pathname]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50/50">
      <Header onOpenNav={() => setOpenNav(true)} />

      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
