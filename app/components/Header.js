import React from "react";
import { usePathname } from "next/navigation";
import { modifyPathname } from "../helper/utils";
const Header = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 bg-white border-y p-4 text-sm font-medium">
      <h1 className="font-semibold text-gray-900">
        {modifyPathname(pathname)}
      </h1>
    </div>
  );
};

export default Header;
