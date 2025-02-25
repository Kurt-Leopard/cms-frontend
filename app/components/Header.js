import React from "react";
import { usePathname } from "next/navigation";
import { modifyPathname } from "../helper/utils";
const Header = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 bg-white border-y px-4 py-[6px] flex items-center justify-between text-sm font-medium z-[10]">
      <h1 className="font-semibold text-gray-900">
        {modifyPathname(pathname.replace(/\/[a-f0-9\-]+$/, ""))} / Home
      </h1>
      <div>
        <div className="border w-[45px] h-[45px] bg-gray-50 text-lg text-bold rounded-full flex items-center justify-center">
          <span>M</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
