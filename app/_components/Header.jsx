import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="p-3 flex justify-between items-center border shadow-sm">
      <div className="flex items-center gap-2">
        <Image src={"./logo.svg"} alt="logo" width={50} height={50} />{" "}
        <h1 className="underline">Expense Tracker</h1>
      </div>
      <Button size="sm">Get Started</Button>
    </div>
  );
};

export default Header;
