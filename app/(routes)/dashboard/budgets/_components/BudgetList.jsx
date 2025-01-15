"use client";

import React, { useCallback, useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { desc, getTableColumns } from "drizzle-orm";
import { Expenses, Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);

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
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem key={index} budget={budget} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[150px] w-full animate-pulse rounded-lg bg-slate-200"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
