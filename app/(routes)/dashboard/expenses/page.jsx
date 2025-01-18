"use client";
import { useCallback, useEffect, useState } from "react";
import CardInfo from "../_components/CardInfo";
import BarChartDashboard from "../_components/BarChartDashboard";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { BarChart } from "recharts";
import BudgetItem from "../budgets/_components/BudgetItem";
import { createDeflate } from "zlib";
import ExpenseListTable from "./_components/ExpenseListTable";

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();
  console.log(user);

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
    getAllExpenses();
    setBudgetList(result);
  }, [user]);

  useEffect(() => {
    user && getBudgetList();
  }, [user, getBudgetList]);

  //used to get all the expenses of user
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log("result", result);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">My Expenses</h2>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList()}
        />
      </div>
    </div>
  );
};
export default Dashboard;
