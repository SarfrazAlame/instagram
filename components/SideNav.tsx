"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavLink from "./NavLink";
 
const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col px-3 py-4 md:px-2">
      <div
        className="border-t -mt-3 md:ml-0 bg-white dark:bg-neutral-950 h-16  fixed z-50 flex-1 -ml-3 w-full md:relative
      md:h-full bottom-0 
      md:border-none flex flex-row gap-5  md:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 p-2"
      >
        <Logo />
        <NavLink />
        {/* * user && profilelinks */}
      </div>{" "}
    </div>
  );
};

export default SideNav;
