// apps/frontend/src/components/Header.tsx
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@/app/assets/systems-icon.svg";
import MenuIcon from "@/app/assets/menu-icon.svg";
import SettingsIcon from "@/app/assets/systems-icon.svg";

interface HeaderProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string; icon?: React.ComponentType<{ className?: string }> }[];
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  const pathname = usePathname();

  // If no breadcrumbs provided, generate them from the pathname
  const generatedBreadcrumbs = breadcrumbs || generateBreadcrumbsFromPath(pathname);

  // If no title provided, use the last breadcrumb item
  const pageTitle = title || generatedBreadcrumbs[generatedBreadcrumbs.length - 1]?.label || "Page";

  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      <nav className="flex mb-4 px-2 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {/* First breadcrumb item with folder icon */}
          <li className="flex items-center">
            <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-2">
              <DashboardIcon fill="#D0D5DD" className="w-[24px] h-[24px] text-xl" style={{ fill: '#D0D5DD' }} />
            </Link>
          </li>

          {/* Rest of the breadcrumbs */}
          {generatedBreadcrumbs.map((breadcrumb, index) => {
            const IconComponent = breadcrumb.icon;
            return (
              <li key={index} className="flex items-center">
                <span className="mx-2 text-gray-300">/</span>
                {breadcrumb.href ? (
                  <Link
                    href={breadcrumb.href}
                    className="hover:text-gray-700 transition-colors flex items-center gap-2"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4 text-gray-400" />}
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium flex items-center gap-2">
                    {IconComponent && <IconComponent className="w-4 h-4 text-gray-400" />}
                    {breadcrumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Page Title */}
      <div className="flex items-center gap-3 py-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#253BFF]">
          <MenuIcon className="w-[24px] h-[24px] text-xl" style={{ fill: 'white' }} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
      </div>
    </div>
  );
}

// Helper function to generate breadcrumbs from pathname with icons
function generateBreadcrumbsFromPath(pathname: string): { label: string; href?: string; icon?: React.ComponentType<{ className?: string }> }[] {
  const pathSegments = pathname.split("/").filter(segment => segment);

  if (pathname === "/dashboard" || pathSegments.length === 0) {
    return [];
  }

  // Map path segments to icons
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    dashboard: DashboardIcon,
    menus: MenuIcon,
    settings: SettingsIcon,
    users: SettingsIcon,
    groups: SettingsIcon,
    competition: SettingsIcon,
  };

  return pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    const icon = iconMap[segment];

    return index === pathSegments.length - 1
      ? { label, icon }
      : { label, href, icon };
  });
}