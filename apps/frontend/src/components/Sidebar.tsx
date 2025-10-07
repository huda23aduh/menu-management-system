import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CollapseIcon from "@/app/assets/collapse.svg";
import OpenIcon from "@/app/assets/menu_open.svg";
import Header from "./Header";

import DashboardIcon from "@/app/assets/systems-icon.svg";
import MenuIcon from "@/app/assets/menu-icon.svg";
import SettingsIcon from "@/app/assets/systems-icon.svg";

interface SidebarProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerBreadcrumbs?: { label: string; href?: string }[];
}

export default function SidebarLayout({
  children,
  headerTitle,
  headerBreadcrumbs,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const pathname = usePathname();

  // Detect mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      setCollapsed(mobile);
      if (mobile) setSidebarVisible(false);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { name: "Menus", href: "/menus", icon: MenuIcon },
    { name: "Users & Groups", href: "/settings", icon: SettingsIcon },
    { name: "Competition", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen py-4 px-2 relative">
      {/* Sidebar */}
      <aside
        className={`${isMobile
          ? `fixed top-0 left-0 h-full z-50 bg-gray-900 text-white transition-transform duration-300 ${sidebarVisible ? "translate-x-0" : "-translate-x-full"}`
          : `${collapsed ? "w-16" : "w-64"} bg-gray-900 text-white flex flex-col transition-all duration-300`
          }`}
        style={{ borderRadius: isMobile ? 0 : "24px" }}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && !isMobile && (
            <span className="text-xl font-bold">CLOIT</span>
          )}
          <button
            onClick={() => {
              if (isMobile) setSidebarVisible(false);
              else setCollapsed(!collapsed);
            }}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {collapsed || isMobile ? (
              <OpenIcon className="fill-white w-6 h-6" />
            ) : (
              <CollapseIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${isActive
                  ? "bg-lime-400 text-black font-medium"
                  : "hover:bg-gray-800"
                  }`}
                onClick={() => isMobile && setSidebarVisible(false)}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-black" : "text-gray-400"}`}
                />
                {!collapsed && !isMobile && (
                  <span className="ml-3 truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="ml-2 fixed top-4 left-4 z-50 bg-transparent text-black p-3 rounded-xl hover:bg-gray-800 transition"
        >
          <OpenIcon className="w-6 h-6" />
        </button>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 rounded-[24px] ml-0 lg:ml-4 overflow-y-auto transition-all duration-300 ${isMobile ? "w-full" : ""
          }`}
      >
        <div className="p-6 h-full">
          <div className={`${isMobile ? "mt-8" : ""}`}>
            <Header title={headerTitle} breadcrumbs={headerBreadcrumbs} />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
