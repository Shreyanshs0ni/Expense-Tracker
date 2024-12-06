"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 flex justify-between items-center border shadow-sm">
      <div className="flex items-center gap-2">
        <Image src={"./logo.svg"} alt="logo" width={50} height={50} />{" "}
        <h1 className="tracking-wide">Expense Tracker</h1>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          {" "}
          <Button size="sm">Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
