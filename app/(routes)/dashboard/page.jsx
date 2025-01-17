"use client";
import { useCallback, useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState();
  const { user } = useUser();

  const getBudgetList = useCallback(async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`
          .mapWith(Number)
          .as("totalSpend"),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number).as("totalItem"),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
  }, [user]);

  useEffect(() => {
    user && getBudgetList();
  }, [user, getBudgetList]);

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">Hi, {user?.fullName} 💜</h2>
      <p className="mt-2 text-gray-500">
        Here's what happening with your money, lets Manage your expenses
      </p>

      <CardInfo budgetList={budgetList} />
    </div>
  );
};
export default Dashboard;
