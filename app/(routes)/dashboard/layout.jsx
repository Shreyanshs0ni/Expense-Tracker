"use client";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import Budgets from "./budgets/page";
import { useUser } from "@clerk/nextjs";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await DevBundlerService.select()
      .from(Budgets)
      .where(
        eq(
          Budgets.createdBy,
          user ? user.primaryEmailAddress?.emailAddress : null
        )
      );
    console.log(result);
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64 bg-gray-50">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
