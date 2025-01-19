"use client";
import { eq } from "drizzle-orm";
import React, { useEffect, useCallback } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import AuthChecker from "@/app/_components/AuthChecker";

const DashboardLayout = ({ children }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const checkUserBudgets = useCallback(async () => {
    if (!user || !user.primaryEmailAddress) return;

    try {
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress));

      if (result.length === 0) {
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.error("Error checking user budgets:", error);
    }
  }, [user, router]);

  useEffect(() => {
    if (isLoaded && user) {
      checkUserBudgets();
    }
  }, [isLoaded, user, checkUserBudgets]);

  return (
    <div>
      {/* <AuthChecker /> */}

      <div className="fixed hidden md:block md:w-64">
        <SideNav />
      </div>
      <div className="bg-gray-50 md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
