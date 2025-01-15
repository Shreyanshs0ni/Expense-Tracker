"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useCallback, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, getTableColoums, getTableColumns, sql } from "drizzle-orm";
import AddExpense from "../_components/AddExpense";
import BudgetItem from "../../budgets/_components/BudgetItem";

const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const unwrappedParams = React.use(params);

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, unwrappedParams.id))
      .groupBy(Budgets.id);
    setBudgetInfo(result[0]);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full animate-pulse rounded-lg bg-slate-200">
            {" "}
          </div>
        )}
        <AddExpense
          budgetId={unwrappedParams.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpensesScreen;
