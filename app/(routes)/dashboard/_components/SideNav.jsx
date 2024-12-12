"use client";
import Image from "next/image";
import Dashboard from "../page";
import Link from "next/link";
import { useEffect } from "react";
import {
  icons,
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  const path = usePathname();
  // useEffect(() => {
  //   console.log(path);
  // });
  return (
    <div className="h-screen border p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Image src={"./logo.svg"} alt="logo" width={50} height={50} />{" "}
        <h1 className="tracking-wide">Expense Tracker</h1>
      </div>
      <div className="pt-8">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`mb-2 flex cursor-pointer items-center gap-2 rounded-md p-5 font-medium text-zinc-700 hover:bg-primary/90 hover:text-zinc-900 ${
                path == menu.path && "bg-primary/90 text-zinc-900"
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 flex items-center gap-2 p-5">
        <UserButton />
        <h2 className="text-sm text-zinc-700"> Profile</h2>
      </div>
    </div>
  );
};

export default SideNav;
