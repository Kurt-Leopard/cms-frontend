import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  SearchIcon,
  BlueprintIcon,
  BlockIcon,
  PageIcon,
  ContentIcon,
  SiteIcon,
  SettingsIcon,
} from "../../public/icons/icons";

const menuItems = [
  { label: "Dashboard", icon: <HomeIcon />, href: "/dashboard" },
  { label: "Search", icon: <SearchIcon />, href: "/search" },
  { label: "Blueprint", icon: <BlueprintIcon />, href: "/blueprint" },
  { label: "Block", icon: <BlockIcon />, href: "/block" },
  { label: "Page", icon: <PageIcon />, href: "/page" },
  { label: "Content", icon: <ContentIcon />, href: "/content" },
  { label: "Site", icon: <SiteIcon />, href: "/site" },
  { label: "Settings", icon: <SettingsIcon />, href: "/settings" },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center w-[300px] h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
      <Link className="flex items-center w-full px-3 mt-3" href="/">
        <svg
          className="w-8 h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span className="ml-2 text-sm font-bold">QuickPage</span>
      </Link>

      <div className="w-full flex flex-col justify-between h-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center w-full h-12 px-3 mt-2 rounded ${
                pathname.startsWith(item.href)
                  ? "text-gray-200 bg-gray-700"
                  : ""
              }`}
            >
              {item.icon}
              <span className="ml-2 text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <Link
          className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 rounded-lg my-4 hover:bg-gray-700 hover:text-gray-300"
          href="#"
        >
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
