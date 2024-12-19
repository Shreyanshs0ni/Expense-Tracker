"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { getTableColumns } from "drizzle-orm";
import { Expenses, Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
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
      .groupBy(Budgets.id);
    setBudgetList(result);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget />
        {budgetList.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
