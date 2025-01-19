"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useCallback, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColoums, getTableColumns, sql } from "drizzle-orm";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import BudgetItem from "../../budgets/_components/BudgetItem";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const unwrappedParams = React.use(params);
  const [expensesList, setExpensesList] = useState();
  const route = useRouter();

  const getExpensesList = useCallback(async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, unwrappedParams.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }, [unwrappedParams.id]);

  const getBudgetInfo = useCallback(async () => {
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
    await getExpensesList();
  }, [
    user?.primaryEmailAddress?.emailAddress,
    unwrappedParams.id,
    getExpensesList,
  ]);

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [getBudgetInfo, user]);

  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, unwrappedParams.id))
      .returning();
    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, unwrappedParams.id))
        .returning();
    }
    toast("Budget Deleted!");
    route.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10">
      <h2 className="flex items-center justify-between text-2xl font-bold">
        My Expenses
        <div className="flex items-center gap-2">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="flex items-center justify-center gap-2"
                variant="destructive"
              >
                <Trash />
                <span>Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteBudget}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
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
      <div className="mt-4">
        <h2 className="mb-2 text-lg font-bold">Latest Expenses</h2>

        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpensesScreen;
